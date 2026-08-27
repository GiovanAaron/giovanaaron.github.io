# Avatar Animation Choreography

This document records the animation sequences currently coordinated by
`AnimatedAvatar`. Timings describe the implementation as it exists now and can
serve as a reference while the SVG naming and path structure are redesigned.

## Shared state and interruption rules

- `thinkingActive` blocks automatic expression changes while the command-menu
  request is running.
- `sleepingActive` is also used as the theme-reaction lock. It pauses automatic
  smiling, resting-expression changes, and ordinary blinking during either
  theme sequence.
- Starting dark mode cancels pending light-mode timers and light-mode head
  animations.
- Starting light mode cancels pending sleep timers and sleep/snore animations.
- If thinking or smiling is active when a theme reaction starts, that state is
  released before the theme choreography continues.
- Theme sequences finish with a two-phase SMIL cleanup: a 1 ms neutral reset,
  followed 20 ms later by an explicit end/removal pass. Ordinary blinking and
  warm-neutral scheduling resume afterward.
- With `prefers-reduced-motion: reduce`, the component does not initialize the
  continuous or interactive animation system.

## Continuous neutral choreography

### Breathing

Breathing runs continuously, including during thinking and theme states.

1. Start at rest.
2. Inhale until offset `0.24`.
3. Exhale more slowly until offset `0.62`.
4. Remain at rest until offset `1`.

- Total breath duration: random `7.2–8.2 s`.
- Inhale: 24% of the breath, approximately `1.73–1.97 s`.
- Exhale: 38%, approximately `2.74–3.12 s`.
- Rest: 38%, approximately `2.74–3.12 s`.
- A new amplitude multiplier of `0.85–1.15` is chosen for every breath.
- Peak transform is approximately `translateY(-1.125px)` with a subtle X/Y
  scale, multiplied by the randomized amplitude.
- Easing: `ease-in-out`.

### Head sway

The head continuously follows an 18-second loop:

`left/down → center/up → right/down → center/up → left/down`

- Horizontal range: `-2px` to `2px`.
- Vertical lift: up to `-3.5px`.
- Rotation range: `-0.35°` to `0.35°`.
- Easing: `ease-in-out`.

### Pointer gaze

`left-eye`, `right-eye`, `smile-left-eye`, and
`smile-right-eye` follow the pointer.

- Maximum gaze translation: approximately `7px` horizontally and `5px`
  vertically.
- Movement approaches its target by 16% per animation frame.
- Gaze returns to center when the pointer leaves the window or the window loses
  focus.

### Warm-neutral alternation

The resting expression alternates both `right-eyebrow` and
`moustach-mouth` together.

- Primary state, approximately 75% of resting time:
  `gio_mini-neutral-expression-warm.svg`.
- Secondary state, approximately 25%:
  `gio_mini-neutral-expression-warm-2.svg`.
- Morph duration: `900 ms`.
- Primary-warm dwell: random `9–15 s`.
- Warm-2 dwell: random `3–5 s`.
- The first transition toward primary warm starts after `900 ms`.
- The scheduler pauses during smiling, thinking, sleeping, and light reactions.

### Ordinary blinking

- Blink duration: `240 ms`.
- Shape sequence: `open → closed → held closed → open`.
- Key offsets: `0`, `.32`, `.68`, `1`.
- Neutral interval: random `4–7 s`.
- Thinking interval: random `2.4–7 s`.
- There is an 18% chance that the next blink becomes a quick double blink,
  scheduled after `420 ms`.

### Automatic smile

Expression changes happen only after the current complete breath finishes.

1. Wait a random `4–6` complete breaths.
2. Morph neutral/warm-neutral into smile over `1.4 s`.
3. Hold the smile for one complete breath.
4. Morph back over `1.4 s`.
5. Choose a new random `4–6` breath wait.

The resting-expression timer is stopped for the entire smile so the warm mouth
cannot take control midway through the smile morph.

## Thinking choreography

### Trigger

Submitting `PortfolioCommandMenu` dispatches
`portfolio-avatar-thinking` with `true`. The local answer currently resolves
after `7 s`; after `setAnswer(...)`, the event is dispatched with `false`.

### Neutral to thinking — 790 ms

The following happen together:

- Thinking facial paths morph into their authored shapes:
  - `glasses-fill`
  - `left-pupil`
  - `moustach-mouth`
  - `right-eyebrow`
  - `right-pupil`
- `right-hand-and-forearm` rotates from `0°` past `127°`, then settles
  at `125.869°`.
- `elbow-joint` starts from the neutral geometry baked into `gio_mini.svg`,
  slightly overshoots, then settles at `translate(10px, 33px)`.
- The head rotates past `11.18°`, then settles at `10.983°` around
  `(201.224, 270.292)`.
- `upper-arm-outline` morphs into the thinking-arm path.
- Entry uses a quick glide with a restrained overshoot near 90% progress.

### Thinking hand fidget

After the hand reaches the chin, a `2.6 s` repeating cycle begins.

- The active scratch/circular burst occupies the first 21%: approximately
  `546 ms`.
- The hand makes five fast circular translations with a radius up to roughly
  `1.65px`, plus very small rotation changes around `125.869°`.
- The remaining approximately `2.05 s` is a still pause.
- The cycle repeats until thinking ends.

### Thinking to neutral — 1.6 s

- Face, hand/forearm, elbow, head, and upper-arm outline transition together.
- Hand, elbow, and head include a small return overshoot before settling.
- The endpoint is the currently selected warm-neutral variant, not always the
  underlying warm-2 base.
- The resting-expression scheduler resumes after thinking ends.

## Dark-mode choreography

### Trigger

Selecting dark mode dispatches `portfolio-avatar-sleeping`.

### Timeline

| Cumulative time | Phase | Duration | Choreography |
|---:|---|---:|---|
| `0–440 ms` | Eye-roll lead-in | `440 ms` | Face enters `gio_mini-eyeroll-expression.svg`; head quickly lifts/tilts into the lead-in pose. |
| `440–1090 ms` | Enter sleep | `650 ms` | Head rotates to `-19.237°` around `(331.414, 470.816)`; eyes morph fully closed; mouth morphs to `gio_mini-sleeping.svg`; glasses move to their sleep offset. |
| `1090–4090 ms` | Snore | `3 s` | Four `750 ms` snore cycles subtly move, rotate, and scale the sleeping head. Eyes remain closed. |
| `4090–4990 ms` | Wake flutter | `900 ms` | A dedicated wake-blink layer performs four rapid blinks and ends closed. |
| `4990–5640 ms` | Sleep to huff | `650 ms` | Head and glasses return; mouth returns toward warm neutral; pupils/eyebrow enter `gio_mini-huff.svg`. |
| `5640–6140 ms` | Huff hold | `500 ms` | Huff expression vibrates in five aggressive `100 ms` shake cycles. |
| `6140–6640 ms` | Huff to neutral | `500 ms` | Huff paths morph back to neutral. |
| `6640–6660 ms` | Cleanup | `20 ms` | Transient SMIL layers complete their two-phase reset; normal scheduling resumes. |

### Sleep-specific transforms

- Complete head sleep rotation: `-19.237°`.
- `glasses` receives an additional local sleep offset of approximately
  `translate(-15.976px, 12.386px)` and returns during huff.
- Snore movement per cycle reaches approximately:
  - `translateY(1.4px)`
  - `rotate(-0.18°)`
  - `scale(1.003, 1.006)`
- Huff vibration reaches approximately `±4.5px` horizontally, `±0.9px`
  vertically, and `±0.6°` rotation.

## Light-mode choreography

### Trigger

Selecting light mode dispatches `portfolio-avatar-light-reaction`.

### Timeline

| Cumulative time | Phase | Duration | Choreography |
|---:|---|---:|---|
| `0–360 ms` | Light recoil | `360 ms` | Face enters `gio_mini-huff-recoil.svg`; the complete head moves exactly `38px` right and `39px` down. |
| `360–1000 ms` | Blinded flutter | `640 ms` | Four rapid blinks alternate between recoil pupils and closed-eye paths. |
| `1000–1420 ms` | Recoil to eye-roll | `420 ms` | Face morphs into `gio_mini-eyeroll-expression.svg`; head releases the recoil translation; recoil eyebrow/eyelid details return to their neutral layers. |
| `1420–2120 ms` | Eye-roll hold | `700 ms` | Eye-roll is held briefly. |
| `2120–2770 ms` | Return to neutral | `650 ms` | Eye-roll morphs into the currently active warm-neutral pose. |
| `2770–2790 ms` | Cleanup | `20 ms` | Transient SMIL layers complete their two-phase reset; normal scheduling resumes. |

### Recoil-specific structure

- Recoil facial paths are normalized by `(-38px, -39px)` before morphing so
  the group-level head translation is not applied twice.
- Morph-compatible recoil paths:
  - `chin-crease`
  - `right-pupil`
  - `left-pupil`
  - `chin-goatee`
  - `moustach-mouth`
  - `nose`
- The recoil eyebrow and right eyelid use isolated authored overlay paths
  because their path topology is not safely shared with every other state.

## Current SVG sources

The active refactored assets live under `public/assets/gio_mini/`. The original
alpha-version assets remain archived under `public/assets/alphaver/`.

| Purpose | Asset |
|---|---|
| Base avatar | `gio_mini.svg` |
| Smile | `gio_mini-animated.svg` |
| Thinking arm/posture | `gio_mini-animated-thinking.svg` |
| Thinking face | `gio_mini-thinking-expression.svg` |
| Closed eyes | `gio_mini-thinking-eyes-closed.svg` |
| Primary warm neutral | `gio_mini-neutral-expression-warm.svg` |
| Secondary warm neutral | `gio_mini-neutral-expression-warm-2.svg` |
| Sleeping | `gio_mini-sleeping.svg` |
| Huff | `gio_mini-huff.svg` |
| Light recoil | `gio_mini-huff-recoil.svg` |
| Eye-roll | `gio_mini-eyeroll-expression.svg` |
| Tired expression (still loaded) | `gio_mini-tired-expression.svg` |
| T-shirt logo reference | `gio_mini-thinking-expression-t-shirt-logo-reference.svg` |

## IDs currently relied on by choreography

### Structural groups

- `base-avatar`
- `elbow-joint`
- `body`
- `right-hand-and-forearm`
- `upper-arm-outline`
- `head`
- `chin-crease`, `right-eye`, `left-eye`, and `left-eyebrow`
- `face`
- `glasses`
- `left-eye`
- `right-eye`

### Facial paths

- `left-eyebrow`
- `chin-crease`
- `right-eyebrow`
- `right-pupil`
- `left-pupil`
- `chin-goatee`
- `moustach-mouth`
- `nose`
- `glasses-fill`
- `glasses-outline`

### Injected runtime wrappers and details

- `animated-avatar-breath`
- `animated-avatar-head-sway`
- `animated-avatar-head-tilt`
- `animated-avatar-sleep-motion`
- `GioAi-tshirt-logo`
- `huff-recoil-left-eyebrow`
- `huff-recoil-right-eyebrow`

## Path-structure constraints

For an SVG `d` attribute to morph smoothly, both endpoint paths must have the
same command sequence and the same number/order of numeric parameters. IDs alone
are not sufficient. In particular:

- Keep `M`, `L`, `H`, `V`, `C`, and `Z` commands consistent between states.
- Do not allow an editor to convert `H`/`V` commands into `L` in only one state.
- Preserve subpath count and order.
- Preserve compound-path winding and ordering for fills and masks.
- Keep the same semantic element under the same parent group in every state.
- Keep casing consistent; the current asset uses `face`, not
  `neutral-face`.
- Prefer group transforms for rigid movement and path changes only for actual
  deformation. Baking the same rigid transform into every path makes state
  composition and interpolation harder.
