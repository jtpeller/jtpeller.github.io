---
title: OEIS
repo: OEIS
weight: 4
date: 2021-12-06
grabber: The ongoing quest to program the OEIS database.
image_count: 3
captions:
    - Generating the Fibonacci Numbers
    - Generating the Triangle Numbers
    - Generating Sequence A000225
tags:
    - CLI
    - featured
languages:
    - Go
libraries:
    - math/big
skills:
    - Algorithms
    - Big-O Analysis
    - Data Types
    - Mathematics
    - Memory Management
---

This is a console program that contains *over two hundred algorithms* to generate the sequences found in the **OEIS database**. The OEIS database is a massive set of integer sequences, some of which are trivial, but many are extremely complex, involving combinatorics, statistics, or other high-level mathematical concepts. Many will overflow a standard `int` or `float`, so overflow issues are overcome with **arbitrary precision**.
