---
title: "Understanding Closures"
date: 2023-08-29T10:03:00Z
description: "A short JavaScript closure explanation with a simple outer and inner function example."
tags: ["webdev", "javascript", "beginners", "tutorial"]
canonicalURL: "https://dev.to/bupd/understanding-closures-1mm9"
aliases: ["/bupd/understanding-closures-1mm9/", "/blog/understanding-closures/", "/posts/understanding-closures/"]
reading_time: 2
---

## What is Closures?

Closures are a foundational concept in JavaScript that allows inner functions to access variables from their parent function's scope, even after the parent function has finished executing. This makes closures a powerful tool for data privacy, callbacks, and functional programming.

## Why do I need it?

A closure is created when an inner function captures references to variables from an outer function's scope. For example:

```js
function outer() {
    let outerVar = 10;

    function inner() {
        console.log(outerVar);
    }

    return inner; // We're returning the inner function itself
}

// Execution:

const closureFunction = outer(); // `inner` captures `outerVar`
closureFunction(); // Output: 10
```

In this example, inner is a closure because it references `outerVar`. Even after outer completes execution, inner maintains access to `outerVar`.

It is because, When a function is defined within another function and it captures (references) variables from the outer function, a closure is created. The inner function holds a reference to these variables, even if the outer function has completed execution and its variables should normally be garbage-collected. But that does not happen in the case of closures.

## Access Beyond Execution:

This means that even when you call `inner()` later, long after `outer` has finished running, inner can still access and use `outerVar`. This is not how typical variables work, as they are usually disposed of after their parent function completes execution.

Closures offer a way to maintain a connection to variables that would otherwise be gone. They keep the spirit of the enclosing context alive, allowing for powerful programming techniques like private variables, callbacks, and more.

---

### Data privacy:

Closures are used to create private variables and encapsulate data. They allow you to expose only necessary functionality to the outer world while keeping internal state hidden.

### Callbacks:

Closures are frequently used in asynchronous programming, such as event handlers and callback functions, to maintain context across time gaps.

### Functional programming:

Closures enable functional programming techniques like `currying` and `memoization` by preserving data between function calls.

## Caution:

While closures are powerful, they also require careful consideration of memory management. Since a closure retains references to its enclosing variables, those variables won't be garbage-collected until the closure is no longer accessible. This can lead to memory leaks if closures are not used judiciously.

## In a Nutshell

> Closures are a powerful tool that can be used for data privacy, callbacks, and functional programming. However, it is important to use closures carefully to avoid memory leaks.
