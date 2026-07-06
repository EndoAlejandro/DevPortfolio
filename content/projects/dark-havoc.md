---
title: "Dark Havoc"
slug: "dark-havoc"
year: 2024
genre: "Roguelite"
role: "Solo · Unity · Play free in browser"
summary: "A 2D action roguelite with procedurally generated levels, modular enemy AI driven by per-enemy 'brain' state machines, and Dead Cells-inspired combo combat with a parry system. Multi-stage bosses, controller-first design."
tags: ["Action", "Platformer", "Pixel Art", "Roguelite", "Procedural Generation", "Enemy AI", "Boss Design", "ShaderGraph", "Controller Support", "Game Feel"]
studio: false
featured: true
category: "selected"
cover: "/images/projects/dark-havoc.jpeg"
gallery:
  - "/images/projects/dark-havoc-01.jpeg"
  - "/images/projects/dark-havoc-02.jpeg"
  - "/images/projects/dark-havoc-03.jpeg"
links:
  play: "https://alejandroendo.itch.io/dark-havoc"
---

Dark Havoc is a 2D action roguelite where skill is the only progression
system. No leveling up health or damage, just getting better at reading and
countering what's in front of you. It's the project where I pulled together
everything from my earlier prototypes and pushed hard on game feel, juice,
and content scale for the first time.

**Architecture-wise**, every enemy shares one common Enemy component, but
each type plugs in its own "brain", a dedicated state machine that defines
how it moves, telegraphs, and attacks. That split let me add new enemy
variety by writing new brains instead of new enemies from scratch, and it's
the same modular-AI approach I'd carry into later, larger projects.

**Levels are procedurally generated**, using a room-graph approach inspired
by Spelunky's world generation, hand-authored room pieces stitched together
by rules, so runs stay different without feeling random or unfair.

**Combat** takes clear cues from Dead Cells: light/heavy combo strings, a
tightened parry window, and weightier jumps and animations, all backed by
custom VFX and 2D shaders built in Shader Graph to sell hits and impacts.
**Bosses** go multi-stage, each with its own attack patterns and phase
transitions, built on top of the same brain-state-machine framework as
regular enemies. The whole game was designed and tuned for **controller
play** first.

Working at this scale also meant learning to manage a much larger volume of
art and animation than my earlier projects, keeping a consistent pipeline as
the enemy and VFX count grew.

Art by [Penusbmic](https://penusbmic.itch.io/).

Play it free in your browser on [itch.io](https://alejandroendo.itch.io/dark-havoc).
