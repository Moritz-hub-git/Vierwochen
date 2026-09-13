# Opsrid showcase design

Four illustrative scenarios: invoice verification, management reporting, order handling and cross-team complaint resolution. None are customer references or promises of available integrations.

## Design references

- [Personio homepage](https://www.personio.de/), reviewed 13 September 2026, plus the owner's supplied screenshot: horizontal rounded category selectors, a generous soft-colour stage and a recognisable software interface.
- [OpenAI AgentKit introduction](https://openai.com/index/introducing-agentkit/), reviewed 13 September 2026: connected sources, processing and human decisions as a readable visual flow. Visual inspiration only, not a technology dependency.

## Implementation

`components/site/LandingProduct.tsx` owns the selector and scenario content. Its exported `ProcessScene` renders the shared source → process → decision composition. Each scenario has a distinct result visual and inspectable evidence. This is the basis for a later chat solution view; no runtime interface generation is claimed.

The carousel advances every ten seconds while visible, pauses on hover or interaction, supports keyboard navigation and respects reduced motion. Mobile pills scroll horizontally; source cards become a row above processing and results.

The contextual call to action sends the selected process description to the existing ChatDock via `opsrid:chat`. It does not request contact details or create a lead itself.
