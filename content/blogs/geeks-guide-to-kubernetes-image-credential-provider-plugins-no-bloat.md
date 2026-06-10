---
title: "Geek's Guide to Kubernetes Image Credential Provider Plugins: No Bloat"
date: 2025-08-30T19:02:50Z
description: "A step-by-step Kind setup for Kubernetes image credential provider plugins."
tags: ["kubernetes", "devops", "architecture", "docker"]
canonicalURL: "https://bupd.hashnode.dev/geeks-guide-to-kubernetes-image-credential-provider-plugins-no-bloat"
aliases: ["/bupd/geeks-guide-to-kubernetes-image-credential-provider-plugins-no-bloat-54mh/", "/blog/geeks-guide-to-kubernetes-image-credential-provider-plugins-no-bloat/", "/posts/geeks-guide-to-kubernetes-image-credential-provider-plugins-no-bloat/"]
reading_time: 5
---

I spent more than 8 hours wrestling with Kubernetes image credential provider plugins before finally stumbling upon the real solution. If you think this is as simple as dropping a config into [Kind](https://kind.sigs.k8s.io/) or [Minikube](https://minikube.sigs.k8s.io/docs/start/) think again. It doesn't work that way, and I'd rather save you the wasted time I went through.

This guide comes from someone who considers a debugger "bloat." If you share that mindset, you'll feel right at home.

In this blog, I will walk you step by step through setting up a [Kubernetes image credential provider plugin](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-credential-provider/) in a Kind cluster. We'll manually configure the Kubelet to use your [custom credential provider plugin](https://github.com/bupd/k8stemps/blob/main/credential-provider-plugin/main.go). no shortcuts, no bloat, just the essentials.

## Step 1

Create your Cluster.

I am going for a basic three-node cluster to work with. Use the following configuration to spin it up. This setup includes one control-plane node and two worker nodes. feel free to add more configs if you want.

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
```

## Step 2

Copy the Credential Provider Plugin Binary and Config to all the nodes.

You can also use a daemonset to do this in production. but I have gone with simple docker cp. Because we are still in the development stage of the credential-provider-plugin. I have my credentilal-plugin and config in a directory

```bash
ls -la credential-provider-plugin

# copy the entire folder into k8s nodes
docker cp ./credential-provider-plugin kind-control-plane:/etc/kubernetes/credential-providers
```

## Step 3

Modify the Kubelet Configuration.

The real fun begins now. The Kubelet's configuration on a kind cluster is managed by a file called `kubeadm-flags.env`. We need to pull this file from the control-plane node, modify it, and push it back.

It will be located in `/var/lib/kubelet/kubeadm-flags.env`.

```bash
docker cp kind-control-plane:/var/lib/kubelet/kubeadm-flags.env ./kubeadm-flags-kind.env
```

Edit the file to include the credential provider flags:

- `--image-credential-provider-bin-dir`: the directory where our plugin binary resides.
- `--image-credential-provider-config`: the path to the configuration file for the plugin.

Note: Don't forget to separately quote the values. Seriously, I've seen two hours vanish because of this.

Before:

```text
KUBELET_KUBEADM_ARGS="--node-ip=172.18.0.3 --node-labels= --pod-infra-container-image=registry.k8s.io/pause:3.10.1 --provider-id=kind://docker/kind/kind-control-plane"
```

After:

```text
KUBELET_KUBEADM_ARGS="--node-ip=172.18.0.3 --node-labels= --pod-infra-container-image=registry.k8s.io/pause:3.10.1 --provider-id=kind://docker/kind/kind-control-plane --image-credential-provider-bin-dir='/etc/kubernetes/credential-providers' --image-credential-provider-config='/etc/kubernetes/credential-providers/config.yml'"
```

Copy the modified file back to the control plane:

```bash
docker cp ./kubeadm-flags-kind.env kind-control-plane:/var/lib/kubelet/kubeadm-flags.env
```

## Step 4

Restart the kubelet.

```bash
docker exec -it kind-control-plane sh
systemctl daemon-reload && systemctl restart kubelet
```

## Step 5

The most reliable way to verify if your plugin is working is to embed a webhook into it. This allows all inputs and outputs to be sent to a webhook endpoint, giving you a straightforward way to monitor the plugin's execution. While it may feel a bit hacky, i love it.

Another way to test the plugin is by pulling an image that requires the default static credentials configured in your plugin. If the plugin is working correctly, the pod should start successfully with the image, confirming that the pull operation uses the expected credentials.

You can try this by applying the example [`pod.yaml`](https://github.com/bupd/k8stemps/blob/main/sapod-test.yaml) file:

```bash
kubectl apply -f pod.yaml
```

Once the pod starts, you'll be able to confirm that the hardcoded credentials from the credential-provider-plugin is being used as intended.

## Bonus

Here is a simple script with which you can automate all this:

- <https://github.com/bupd/k8stemps/blob/c0ffeeba2e0b53e63f69b244e5cc2f7e0e6698c9/test-kind-credential-provider-plugin.sh>

## References

- <https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/control-plane-flags/>
- <https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/>
- <https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/kubelet-integration/>
- <https://kubernetes.io/docs/reference/config-api/kubelet-credentialprovider.v1/#credentialprovider-kubelet-k8s-io-v1-CredentialProviderResponse>
- [credential-provider-echo-token](https://github.com/liggitt/kubernetes/tree/0904efcc86d02c8e6b71961ecae92d6cc41ddf40/staging/src/k8s.io/kubelet/cmd/credential-provider-echo-token)
- [ecr credential provider](https://github.com/kubernetes/cloud-provider-aws/tree/master/cmd/ecr-credential-provider)
- [cloudsmith-kubernetes-credential-provider](https://github.com/cloudsmith-io/cloudsmith-kubernetes-credential-provider/blob/master/main.go)
