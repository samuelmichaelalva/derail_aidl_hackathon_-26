# DERAIL

## Is This Forward True?

DERAIL is a Round-1 prototype for Hack on Track 2026 under the GenAI domain.

DERAIL is designed to demonstrate how forwarded information can be broken into individual claims, checked against evidence, and presented with a clear verdict and simple explanation.

### Core Concept

Forwarded content
→ Claim Extraction
→ Claim Verification
→ Evidence
→ Verdict
→ Simple Explanation

### Problem

Forwarded messages can contain misleading, false, outdated, or partly true information.

The problem becomes harder when the information is contained inside screenshots, voice notes, PDFs, or URLs.

A simple "True" or "False" answer is not enough. Users should be able to understand:

- What exactly was claimed
- What the evidence says
- Which part is supported or unsupported
- Why the verdict was given
- Where the information came from

### Round-1 Prototype

This repository contains only the visual and functional prototype for the Round-1 idea presentation.

The prototype will use controlled demonstration data to show the complete user journey:

1. User provides forwarded content.
2. DERAIL identifies individual claims.
3. Each claim enters a visual verification journey.
4. Evidence sources are shown.
5. Each claim receives a verdict.
6. DERAIL explains the result in simple language.

### Verdicts

The prototype demonstrates these possible outcomes:

- Verified
- False
- Partially Supported
- Outdated
- Cannot Confirm

### Prototype Scope

The Round-1 prototype focuses on:

- Visual storytelling
- Interactive user experience
- Claim-level verification demonstration
- Evidence presentation
- Clear verdicts
- Simple explanations
- Railway-inspired visual metaphor

The prototype uses demonstration data.

### Not Implemented in Round 1

The following are intentionally reserved for the 24-hour hackathon implementation:

- Real web search
- RAG
- OCR
- Speech-to-text
- PDF processing
- URL scraping
- Database
- Authentication
- Production backend
- Real-time fact checking
- Full multilingual processing

### Future Direction

During the 24-hour hackathon, the prototype can be extended into a working multimodal verification system capable of processing different forms of forwarded content and retrieving evidence from reliable sources.

### Project Principle

Evidence first. Generation second.

DERAIL should never present an unsupported conclusion as a verified fact.
