---
title: "How to Run Github Actions Locally??"
date: 2025-10-15T10:06:34Z
description: "Run GitHub Actions locally with act instead of pushing commits just to debug workflows."
tags: ["github", "githubactions", "git"]
canonicalURL: "https://dev.to/bupd/how-to-run-github-actions-locally-398c"
aliases: ["/bupd/how-to-run-github-actions-locally-398c/", "/blog/how-to-run-github-actions-locally/", "/posts/how-to-run-github-actions-locally/"]
reading_time: 1
---

This blog is written to serve people who are looking to run github actions locally for faster developer workflows and not get into the "push and pray" hell. No more 50 commits to make the actions work -- simply run GitHub Actions locally!! with [act](https://nektosact.com/).

If you want to test GitHub Actions without constantly pushing commits, **[act](https://nektosact.com/)** is the tool you need. It runs your workflows locally, using the same environment GitHub provides, so you get instant feedback and can debug faster.

## Steps to Use Act

1. **Install Act**
   Follow instructions on [act's official repo](https://github.com/nektos/act) to install it on your system.

2. **Run Your Workflows**
   Inside your project, run:

```bash
act
```

This executes the workflows defined in `.github/workflows/` locally.

That's it. No pushing, no waiting -- just run your GitHub Actions locally and get faster feedback.

### Links

- [Act Official Site](https://nektosact.com/)
- [GitHub Repository](https://github.com/nektos/act)
