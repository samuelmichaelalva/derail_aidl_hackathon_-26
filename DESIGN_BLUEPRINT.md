# DERAIL — Visual & Interaction Blueprint

## 1. Purpose

This document defines the visual experience and interaction flow for the DERAIL Round-1 prototype.

The prototype should communicate one idea clearly:

A forwarded message enters DERAIL, its claims are separated, the claims are investigated, evidence is examined, and each claim receives a clear verdict.

This is a prototype, not the final fact-checking system.

---

## 2. Core Story

The entire experience follows this journey:

FORWARD
↓
CLAIMS
↓
INVESTIGATION
↓
EVIDENCE
↓
VERDICT
↓
EXPLANATION

The railway metaphor represents the journey of information through verification.

A claim that is supported continues along the verification journey.

A claim that is false or unsupported is "derailed".

---

## 3. Visual Direction

### Overall Feel

The interface should feel:

- Cinematic
- Dark
- Modern
- Technical
- Trustworthy
- Minimal
- Immersive

The railway environment is a visual metaphor, not a literal railway application.

Avoid making the interface look like a generic dashboard.

Avoid excessive cards, excessive gradients, excessive neon effects, and unnecessary UI elements.

---

## 4. Opening Scene

The user should first encounter a dark railway environment.

A suspicious forwarded message appears as the starting point.

The scene should immediately communicate:

"Something has arrived. We need to verify it."

The opening should contain:

- DERAIL branding
- A short statement about verification
- One example forwarded message
- A clear action such as "Investigate"

The user should understand the purpose without reading a long paragraph.

---

## 5. Forward Input

The prototype should visually support the five input types mentioned in the problem statement:

- WhatsApp message / text
- Screenshot
- Voice note
- PDF
- URL

For Round 1, these can use controlled demonstration inputs.

The prototype does NOT need to actually process all five formats yet.

The user should be able to select an example input and start the demonstration.

---

## 6. Claim Extraction

After the user starts the investigation, the forwarded message should visually break into individual claims.

Example:

Forwarded message:

"From Monday, all ₹500 notes are invalid.
The RBI has announced this.
Forward this to everyone."

DERAIL should visually separate this into individual claims.

Example:

CLAIM 01
"₹500 notes will become invalid from Monday."

CLAIM 02
"RBI has announced this."

The purpose is to demonstrate that one forwarded message can contain multiple claims that must be checked separately.

---

## 7. Railway Verification Journey

Each claim becomes part of the railway journey.

Visual sequence:

Message
→ Claim
→ Investigation Track
→ Evidence Station
→ Verification
→ Verdict

The movement should feel like the information is travelling through an investigation system.

The user should be able to understand the process visually without needing technical knowledge.

---

## 8. Investigation Stage

During the investigation stage, show that DERAIL is checking the claim.

Use a short visual state such as:

"Investigating claim..."

Then show:

- Claim being checked
- Search/investigation activity
- Evidence being found

This is demonstration behaviour using predefined data.

Do not implement real search in the Round-1 prototype.

---

## 9. Evidence Station

The evidence stage is one of the most important parts of the prototype.

Show evidence associated with the specific claim.

Each evidence item should communicate:

- Source name
- Source type
- Relevant information
- Date where appropriate
- Whether the evidence supports or contradicts the claim

The evidence should be visually connected to the claim it verifies.

The prototype must make it obvious that the verdict is based on evidence.

---

## 10. Verdict

Each claim receives an explicit verdict.

Supported outcomes:

- VERIFIED
- FALSE
- PARTIALLY SUPPORTED
- OUTDATED
- CANNOT CONFIRM

The verdict should be visually prominent.

Example:

CLAIM
"₹500 notes will become invalid from Monday."

VERDICT
FALSE

WHY
"No official RBI announcement in the demonstration evidence supports this claim."

SOURCE
RBI — demonstration source

The exact demonstration content may be changed later.

---

## 11. Derail Moment

When a claim is false or unsupported, the railway metaphor should become meaningful.

The claim should visibly leave the main track or be stopped at a derailment point.

This should be a memorable visual moment.

For a verified claim, the claim should continue forward.

The interaction should communicate:

SUPPORTED → CONTINUE

FALSE / UNSUPPORTED → DERAIL

This is the central visual identity of DERAIL.

---

## 12. Final Result

After all claims have been processed, show a final summary.

Example:

FORWARD ANALYSIS COMPLETE

3 Claims Checked

2 Verified
1 False

Overall:
PARTIALLY SUPPORTED

Then allow the user to inspect individual claims.

The summary should not replace the claim-level evidence.

---

## 13. Explanation

The final explanation must be understandable to a normal user.

Avoid technical AI terminology.

Do not display only:

"TRUE"

or

"FALSE"

Instead show:

- What was claimed
- Verdict
- Why
- Supporting or contradicting evidence
- Source

The purpose is to answer:

"What is wrong or right, and how do we know?"

---

## 14. Interaction Style

The prototype should favour:

- Smooth transitions
- Scroll-driven movement where useful
- Parallax/depth
- Cinematic scene transitions
- Subtle motion
- Clear visual hierarchy
- Interactive claim inspection

Animation should support the story.

Do not animate everything.

---

## 15. Navigation

The experience should feel like one continuous investigation rather than a collection of unrelated dashboard pages.

The user should always understand:

1. Where they are
2. What is being checked
3. What happens next

Keep navigation minimal.

---

## 16. Visual Hierarchy

Priority order:

1. Claim
2. Verdict
3. Evidence
4. Explanation
5. Supporting interface elements

The interface must never make decorative elements more important than the claim and evidence.

---

## 17. Demonstration Data

Use realistic but clearly controlled demonstration data.

The prototype may contain predefined examples representing:

- Text/WhatsApp forward
- Screenshot
- Voice note
- PDF
- URL

The system should behave as though these examples are being processed, but no real multimodal processing is required in Round 1.

---

## 18. What This Prototype Must NOT Become

Do not turn this into:

- A production fact-checking platform
- A real search engine
- A complete RAG system
- A complete OCR system
- A complete speech recognition system
- A complete PDF parser
- A full URL crawler
- A database application
- An authentication system
- A complete multilingual platform
- A real-time misinformation monitoring system

Those capabilities belong to the 24-hour implementation phase.

---

## 19. Definition of Done

The Round-1 prototype is successful if a person can watch or interact with it and immediately understand:

1. A forwarded message enters DERAIL.
2. DERAIL identifies individual claims.
3. Claims are investigated.
4. Evidence is associated with each claim.
5. Each claim receives a clear verdict.
6. False/unsupported claims can be visually derailed.
7. The user receives a simple explanation of why the verdict was given.

The prototype should demonstrate the idea convincingly without attempting to implement the entire final system.
