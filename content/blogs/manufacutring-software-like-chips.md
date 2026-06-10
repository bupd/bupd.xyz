---
title: "Manufacturing Software Like Chips"
date: 2026-06-10T00:00:00Z
description: "What changes when code becomes cheap and software needs manufacturing systems instead of heroic production?"
tags: ["platform-engineering", "ai", "kubernetes", "supply-chain", "harbor"]
slug: "manufacutring-software-like-chips"
aliases: ["/blogs/manufacturing-software-like-chips/"]
reading_time: 6
---

What if software is manufactured like semiconductors?

That question sounds strange only because software still carries the mythology of craft. We talk about individual developers, clever prompts, velocity, tickets, and heroic debugging sessions. We still design many organizations as if humans are the primary producers of code.

That assumption is starting to break.

Code is becoming cheap. Not free, not automatically good, but cheap enough that writing it is no longer the only scarce part of the system. When code becomes cheap, the bottleneck moves somewhere else: design, verification, quality control, traceability, packaging, release systems, and production governance.

That is why I think software needs to learn from manufacturing.

## The wrong lesson from AI coding


The industry currently spends too much energy asking: how do I prompt an agent better?

That is the shallow layer. Prompts matter, but prompts are not the factory. A prompt in a Markdown file is not a production system, a quality model, a traceability chain, or a release process.

If AI agents are the manufacturers of software, then the platform is the factory.

The factory decides what inputs are accepted. It defines how work is decomposed. It controls which tools are available. It checks whether the output matches the specification. It records provenance. It rejects defective artifacts. It moves approved artifacts into production.

Agents do not need to understand the business in the human sense. They need to understand the specification, the constraints, the interfaces, and the acceptance checks.

## From design artifact to production artifact

Semiconductor manufacturing is not a person walking into a clean room and improvising a chip. There are design artifacts, simulation, verification, masks, process controls, yield analysis, and traceability across the production line.

Software can use the same mental model.

A product idea should become a design artifact. That design artifact should become implementation tasks. Implementation should produce build artifacts. Build artifacts should carry provenance, tests, policy results, and deployment intent. Platforms should move those artifacts through controlled environments.

That maps cleanly to the cloud native world:

- Design artifacts become issues, PRDs, ADRs, schemas, API contracts, and executable acceptance tests.
- Production lines become CI pipelines, GitOps controllers, policy engines, and preview environments.
- Manufactured goods become OCI artifacts, container images, Helm charts, SBOMs, attestations, and signed releases.
- Quality control becomes tests, static analysis, policy-as-code, vulnerability scanning, and runtime verification.
- Traceability becomes Git history, provenance attestations, build logs, deployment records, and registry metadata.
- The factory floor becomes Kubernetes, platform APIs, and internal developer platforms.

This framing turns software from "someone wrote code" into "a controlled system produced an artifact."

## Quality control becomes the center

When humans write most code by hand, review often focuses on the code itself. When agents can generate code quickly, reviewing every line as the primary safety mechanism stops scaling.

The review target has to move upward.

We should review the specification. We should review the test harness. We should review the production constraints. We should review the policy boundary. We should review the artifact metadata. Code review still matters, but it is no longer the only gate.

Manufacturing does not rely on inspecting every atom of every chip by hand. It relies on controlled inputs, repeatable processes, sampling, automated verification, and yield signals. Software needs the same shift.

The question becomes: can the platform prove that this artifact satisfies the design?

## Harbor, OCI, and software supply chains

This is where my Harbor brain takes over.

If software is manufactured, registries are not just places where images sit. They are warehouses, distribution centers, quality checkpoints, and metadata hubs.

An OCI registry can store more than a container image. It can store charts, SBOMs, signatures, attestations, WebAssembly modules, model artifacts, policy bundles, and other production outputs. The registry becomes part of the manufacturing record.

Harbor already lives in this world: artifact storage, access control, scanning, replication, signing integrations, robot accounts, policies, and governance around distribution. In an agent-heavy future, that kind of infrastructure becomes more important, not less.

The artifact is the unit of production. The registry is part of the factory.

## GitOps as a conveyor belt

GitOps is usually described as "Git as the source of truth." That is true, but the manufacturing analogy makes it sharper.

GitOps is a conveyor belt with reconciliation.

Desired state enters the system. Controllers compare desired state with actual state. Drift is detected. Changes are applied. History is preserved. Rollback exists. The system continuously pulls production toward the approved design.

That is a manufacturing primitive. It is not just deployment automation. It is a repeatable production line for runtime state.

When paired with OCI artifacts, provenance, and policy, GitOps gives us a way to move manufactured software through environments without depending on a human remembering the right sequence of commands.

## Agents as manufacturers

The most useful way to think about AI agents is not "junior developer" or "magic coworker." I prefer "manufacturing provider."

You give a manufacturing provider a specification, inputs, constraints, and acceptance tests. You expect an output that can be inspected. You do not expect the provider to discover your entire business model by vibes.

That changes how we write work for agents.

Good agent work packets should include:

- The desired behavior.
- The files and boundaries that matter.
- The interfaces that must not change.
- The tests that prove success.
- The policies the output must satisfy.
- The artifact expected at the end.

If the agent fails, the fix is often not "better prompt." The fix is a better production system.

## Platform matters more than prompts

This is the main point.

Prompts are instructions. Platforms are manufacturing systems.

A strong platform can make average prompts safer. A weak platform can make clever prompts dangerous. If the output cannot be verified, traced, packaged, promoted, and rolled back, then the organization is not manufacturing software. It is generating code and hoping the rest works out.

The future I want is boring in the best way:

- Specifications are clear enough for humans and agents.
- Code generation is cheap and replaceable.
- Verification is automated and hard to bypass.
- Artifacts carry provenance and policy results.
- Registries become trusted distribution points.
- Kubernetes platforms run the production line.
- Humans spend more time designing systems and less time manually pushing code through fragile processes.

## The shift

Software has spent decades optimizing for writing code. The next phase is optimizing for manufacturing software.

That means the winners will not be the teams with the longest prompt libraries. They will be the teams with the best design artifacts, the strongest verification loops, the clearest interfaces, and the most reliable platforms.

When code becomes cheap, quality becomes the product.

And the platform becomes the factory.
