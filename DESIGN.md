# Design

This document defines the visual system for YardBros’ marketing site surfaces (home, quote flow, embedded chat).

## Theme

- Default: light theme optimized for outdoor/daytime viewing on mobile.
- Dark theme: supported for evening browsing, but never at the expense of contrast.

## Color

### Strategy

Restrained and premium: warm neutrals as the canvas, with a subtle “living green” cue used intentionally (not as a loud gradient wash).

### Roles (conceptual)

- Background / Surface: warm, slightly tinted neutrals
- Primary: deep, grounded green (used sparingly for emphasis and navigation anchors)
- Accent: brighter green used for interactive states and success cues
- Highlight: earthy mineral/clay note for secondary emphasis
- Text: charcoal neutrals with high readability

## Typography

### Intent

Premium modern, not rustic, not ornamental. Headings should feel engineered and confident; body copy should be highly legible and calm.

### Guidance

- Keep body line length under ~75ch on wide screens
- Prefer weight + scale contrast over decorative effects
- No all-caps as the default reading mode for headings; reserve for short labels only

## Layout

- Build with strong hierarchy and deliberate whitespace.
- Avoid nested card stacks as a default structure; use surfaces only when they add clarity.
- Make CTAs feel inevitable: one primary action per section.

## Components

- Buttons: clear primary/secondary/ghost hierarchy, consistent sizing, visible focus ring
- Inputs: generous hit targets, obvious error states, helpful microcopy
- Chat: launcher is calm but present; panel behaves like a first-class UI surface with proper focus handling

## Motion

- Use motion to clarify state changes (open/close, submit feedback), not decoration.
- Respect `prefers-reduced-motion`.

## Iconography

- Use a single consistent icon set (Lucide is already in use).
- No emoji as UI icons.

