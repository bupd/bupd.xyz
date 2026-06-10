---
title: "Contribute to Zulip: A Beginner's Guide"
date: 2024-03-25T16:56:52Z
description: "A beginner-friendly guide to getting through Zulip's initial open source development setup."
tags: ["opensource", "zulip", "docker", "vagrant"]
canonicalURL: "https://dev.to/bupd/contribute-to-zulip-a-beginners-guide-7fn"
reading_time: 4
---

Are you eager to contribute to the vibrant Zulip open-source community but intimidated by the initial setup process? Fear not! This beginner-friendly guide will walk you through the essential steps, overcoming common setup challenges and empowering you to make your first meaningful contribution to Zulip.

## The Hard Way:

[**_[Read the Docs]_**](https://zulip.readthedocs.io/en/latest/) The best resource you will ever find!

## Understanding the Initial Setup Challenge:

### The Roadblock:

One of the primary hurdles for new contributors is the initial setup, which can be perceived as challenging and time-consuming. This guide will help you navigate through this obstacle, ensuring a smoother onboarding experience.

### Tools You'll Need:

Before diving into the setup process, make sure you have Vagrant, [Docker.io](http://Docker.io), and Git.

```bash
sudo apt install vagrant docker.io git
```

These tools are essential for creating a development environment for Zulip.

## The Solution: Overcoming Connection Issues

```bash
# the only commands you will need
vagrant up
vagrant provision
vagrant ssh

(env)
./tools/run-dev
```

If any error occurs while developing read the docs or just google it.

**Beware! Blindly running commands can severely damage your system, even with the help of large language models like GPT and Bard.** I experienced this firsthand and am writing this to prevent others from making the same mistake.

### A Frustrating Journey:

Many contributors, including myself, have faced connectivity issues while setting up Zulip. Despite thorough documentation readings, some errors may persist, leaving you feeling stranded.

### Seeking Help:

Don't hesitate to reach out for assistance. The Zulip community has dedicated channels for learning, and the documentation provides in-depth information. If you encounter difficulties, don't panic others might be facing the same issues.

![Zulip Software - 2023 Reviews, Pricing & Demo](https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/f7798cb9-ad0e-4bd3-80b2-eb7a498219ec.png?auto=format&q=50)

Ok then Lets start with the development `vagrant up --provider=docker` start with this.

```text
Step 1/8 : FROM ubuntu:20.04
 ---> 83a4bf3bb050
Step 2/8 : ARG UBUNTU_MIRROR
 ---> Using cache
 ---> 22f35a6c2e5c
Step 3/8 : RUN echo locales locales/default_environment_locale select C.UTF-8 | debconf-set-selections && echo locales locales/locales_to_be_generated select "C.UTF-8 UTF-8" | debconf-set-selections && { [! "$UBUNTU_MIRROR"] || sed -i "s|http://\(\w*\.\)*archive\.ubuntu\.com/ubuntu/\? |$UBUNTU_MIRROR |" /etc/apt/sources.list; } && printf 'y\n\n' | unminimize && apt-get install --no-install-recommends -y ca-certificates curl locales openssh-server python3 sudo systemd && rm -rf /var/lib/apt/lists/*
 ---> Using cache
 ---> 751b95a0cf53
Step 4/8 : ARG VAGRANT_UID
 ---> Using cache
 ---> 7a89701b804e
Step 5/8 : RUN dpkg-divert --add --rename /bin/systemctl && curl -fLsS --retry 3 -o /bin/systemctl 'https://raw.githubusercontent.com/gdraheim/docker-systemctl-replacement/v1.5.7106/files/docker/systemctl3.py' && echo '7479f4cd0d1604e5c5eb5329f0a6a3a80fea811e2f9889e3083c2c29b229ff99 /bin/systemctl' | sha256sum -c && chmod +x /bin/systemctl && ln -nsf /bin/true /usr/sbin/policy-rc.d && mkdir -p /run/sshd && ln -ns /lib/systemd/system/postgresql@.service /etc/systemd/system/multi-user.target.wants/postgresql@12-main.service && useradd -ms /bin/bash -u "$VAGRANT_UID" vagrant && mkdir -m 700 ~vagrant/.ssh && curl -fLsS --retry 3 -o ~vagrant/.ssh/authorized_keys 'https://raw.githubusercontent.com/hashicorp/vagrant/be7876d83644aa6bdf7f951592fdc681506bcbe6/keys/vagrant.pub' && chown -R vagrant: ~vagrant/.ssh && echo 'vagrant ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/vagrant
 ---> Running in 61d245ae69d6
Adding 'local diversion of /bin/systemctl to /bin/systemctl.distrib'
curl: (35) OpenSSL SSL_connect: Connection reset by peer in connection to raw.githubusercontent.com:443
```

You will be greeted with the above error!

### The VPN Solution:

One effective solution to resolve connection problems is to use a Virtual Private Network (VPN). I personally recommend using ProtonVPN, which offers a free tier. Alternatively, consider the flatpak version of ProtonVPN for a hassle-free experience.

### Implementation:

1. Install a VPN, for example ProtonVPN.
2. Create a VPN connection with OpenVPN.
3. Verify the VPN connection to an available server.

## Docker Build Process: An Overview

### Dockerfile Modifications: optional

Inspecting the Dockerfile reveals steps to set up the Zulip development environment. The initial setup might fail due to SSL connection issues during the Docker build process.

### Resolving SSL Connection Issues:

To tackle SSL connection problems during the Docker build, ensure your **VPN** is active. This simple step can save you from hours of troubleshooting.

## Completing the Setup:

### Vagrant Up:

After resolving the initial setup challenges, proceed with executing `vagrant up --provider=docker`. If any errors occur, don't be discouraged. Retry the command with `vagrant provision`.

### Successful Completion:

Upon successful execution of the `vagrant provision` command, you'll receive a message indicating the completion of the development setup. Though it might take some time, the wait is worthwhile.

### Running Zulip:

Initiate the Zulip server by running `vagrant ssh` and then `./tools/run-dev`. Visit [`localhost:9991/devlogin`](http://localhost:9991/devlogin) to witness the successful setup, confirming your readiness to contribute.

![Image of Zulip devlogin](https://zulip.readthedocs.io/en/latest/_images/zulip-devlogin.png)

### Celebrate Your Success:

Congratulations! You've conquered the initial setup challenges and are now ready to dive into **Zulip** development. This experience not only enhances your coding skills but also exposes you to best practices in open-source contribution.

### Embrace the Journey:

Zulip's community is supportive, and your journey as a contributor has just begun. Continue exploring, learning, and engaging with the community to become a proficient developer with Zulip.

By following these steps, you've taken a significant stride towards becoming a 10x developer in the world of open source. Happy coding!
