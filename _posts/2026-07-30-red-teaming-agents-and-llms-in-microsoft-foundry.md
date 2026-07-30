---
layout: post
title: "Red teaming agents and LLMs in Microsoft Foundry"
date: 2026-07-30
tags:
  - microsoft-foundry
  - ai-red-teaming
  - llm-security
  - agent-safety
  - observability
image: "/assets/images/posts/foundry-redteaming-cover.png"
image_alt: "Abstract architecture diagram showing Microsoft Foundry red teaming for agents and LLMs"
---

# Red teaming agents and LLMs in Microsoft Foundry

When AI systems move from prototypes to production, the security conversation changes.

Teams are no longer asking only whether a model can answer a prompt. They need to know whether an LLM or agent can be safely approved by security teams before release, and whether it can keep being scanned continuously after deployment to detect new vulnerabilities and offboard risky systems fast.

That is where Microsoft Foundry red teaming fits.

Microsoft Foundry treats red teaming as a repeatable workflow. The platform’s AI Red Teaming Agent can run automated adversarial scans during design and development, then continue after deployment on a schedule. That matters because the failure modes of an agent are not the same as the failure modes of a plain language model. Agents can call tools, follow instructions across turns, ingest external content, and take actions on behalf of a user. Each of those steps creates a new attack surface.

## What red teaming is, in practical terms

In this context, red teaming is structured adversarial testing. A team defines the behavior it wants to pressure test, then runs targeted probes to see where the system breaks. The probes can be synthetic prompts, indirect prompt-injection payloads, harmful-content requests, policy-evasion attempts, or scenarios built around tool use and task completion.

The point is not to “break everything” for its own sake. The point is to map the boundary between acceptable and unsafe behavior, then use that boundary to tighten the product.

For LLMs, the obvious risks are familiar: unsafe content generation, leakage of protected material, hallucinated facts, and insecure code suggestions. For agents, the list gets longer. Foundry calls out risks such as task-adherence failures, sensitive-data leakage, prohibited actions, code-vulnerability generation, and indirect prompt-injection attacks. Those are the places where an agent can still sound competent while doing the wrong thing.

## Why it matters for agent and model safety

A model-only evaluation can look clean and still miss the real problem. Once a model is attached to tools, memory, retrieval, or workflow state, the system can fail in ways that are not obvious from a single prompt response.

That is why Foundry separates model-safety testing from agent-safety testing. An agent can produce a technically correct answer and still violate policy by calling the wrong tool, exposing data, or following malicious instructions from retrieved content. Red teaming needs to test both the answer and the action.

The cloud flow in Foundry is designed to support that split. It works best for Foundry-hosted prompt agents and container agents. Workflow agents and non-Foundry agents are not supported in the cloud red-teaming flow, which is worth knowing before a team plans its testing strategy.

## The main attack surfaces

Most AI incidents do not start with a dramatic exploit. They start with ordinary system behavior that was never pressure tested.

The main surfaces worth covering are:

- Direct prompt attacks that try to push the model out of policy
- Indirect prompt injection from web pages, files, tickets, or retrieved documents
- Tool abuse, where a model is coaxed into invoking a tool with unsafe parameters
- Sensitive-data exposure through logs, traces, outputs, or retrieval hits
- Code-generation issues, including vulnerable snippets and unsafe dependency choices
- Task drift, where an agent starts the right job and finishes a different one

The useful question is not whether the model can answer a tricky prompt. It is whether the full system still behaves under pressure when instructions, retrieval, and tool use are all in play.

## A workable red-teaming workflow in Foundry

Foundry’s red-teaming flow is straightforward.

1. Create a red-team target.
2. Define or update an evaluation taxonomy if the risk areas need adjustment.
3. Create a run with one or more attack strategies.
4. Poll for status.
5. Inspect the generated output items and results.
6. Turn the findings into fixes, then rerun the same tests.

That loop is the real value. A red-team run by itself is just a report. A red-team run that gets turned into a regression test becomes part of the release gate.

The cloud option also supports post-deployment continuous red teaming on scheduled intervals. That is important because a system can pass on Friday and fail on Monday after a retrieval change, prompt update, tool addition, or model swap.

## Evaluation harnesses that actually help

A good harness should do more than score one-off prompts.

It should capture:

- The attack strategy or scenario
- The target behavior being tested
- The model or agent version under test
- The expected safe behavior
- The observed output or tool action
- The severity of the failure

In Foundry, the observability stack helps close that loop. Observability combines evaluation, monitoring, and tracing. Tracing is built on OpenTelemetry and exposes LLM calls, tool invocations, agent decisions, and dependencies. That gives teams the raw material they need to understand why a run failed instead of just seeing that it failed.

Trace data also matters after deployment. Foundry can convert production traces into evaluation datasets using intelligent sampling and MinHash. That is a practical pattern. Real traces become test inputs. Real failures become regression cases. The test set stays close to production instead of drifting into synthetic trivia.

## A few practical examples

A few examples show the difference between model and agent testing.

A chat model might be tested for whether it refuses a request to generate malware. That is useful, but incomplete.

An agent that can call tools should also be tested for whether it refuses to fetch secrets, whether it avoids sending data to an unintended endpoint, and whether it resists an instruction hidden inside a retrieved document.

A workflow that summarizes support tickets should be tested for whether it can be tricked by malicious content embedded in a ticket body.

A code assistant should be tested for whether it introduces insecure patterns, whether it respects dependency constraints, and whether it leaks confidential repository context into a response.

These are all red-team questions. They simply live at different layers of the stack.

## How teams should run this in practice

The cleanest pattern is to treat red teaming as a release-validation step, not a one-time milestone.

That usually means:

- Run automated red-team scans during development
- Treat red teaming as a security approval gate before release
- Turn failures into regression tests
- Use trace data to build realistic evaluation datasets
- Keep scanning continuously after deployment to detect new vulnerabilities and offboard risky systems fast
- Track regressions when prompts, tools, or models change

This is where governance becomes useful. If an agent can call external tools, the blast radius is defined partly by policy. Microsoft Foundry supports governance for MCP tools through an AI gateway in Azure API Management. That adds policy control, routing rules, logging, metrics, rate limits, and IP filters. Red teaming and governance work better together than either one does alone.

## Where secure AI development fits in

Red teaming is one control in a wider secure-AI practice.

It works best when paired with:

- Versioned prompts and tool configurations
- Trace-level observability
- Clear policy boundaries for tool use and data access
- Automated evaluation before merge or release
- Production monitoring for drift and regressions
- Governance for external tools and integrations

Without those pieces, red teaming produces a list of issues and not much else. With them, it becomes part of the engineering system.

## The useful takeaway

Foundry’s red-teaming story is not about a single scanner. It is about a loop: attack the system, inspect the traces, turn failures into tests, and validate the next release against those tests.

That is the right shape for agent safety. Agents are stateful, tool-driven, and hard to reason about from a single response. They need adversarial testing that reaches past the prompt and into the workflow. Foundry provides enough structure to make that loop repeatable.

The teams that get value from it will not be the ones chasing a perfect score. They will be the ones turning every failure into a regression test and every trace into evidence.
