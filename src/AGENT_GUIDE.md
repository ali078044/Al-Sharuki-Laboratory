# Upgrading experiments to "PhET-level" interactivity — brief for helpers

You are improving an existing single-file interactive physics lab (Arabic, RTL) for the Iraqi
6th-grade scientific physics book. The teacher's feedback: *"still too primitive — make EVERYTHING
100% interactive, every effect must have its own icon to show/hide it, look at PhET (Faraday's
Electromagnetic Lab / Faraday's Law) and do the same for every experiment. Each experiment must show
the physics mechanism very clearly (where the field lines are, how the flux changes, how currents
form, ...)."*

## Project layout (`/home/claude/lab`)
* `build.py` concatenates `core.js theme.js core3d.js circuit.js app.js interact.js laws.js freelab.js exp*.js examples.js features.js`
  into `shell.html` → an HTML file. **Build your own output only**:
  `python3 build.py --out out_<GROUP>.html --zz 'expzz_<GROUP>*'`
  (this includes all base files + only your `expzz_<GROUP>*.js`; other helpers' in-progress files are excluded).
* Experiments are registered with `X({...})` into the array `EXPS`. Find one with `const E = EXPS.find(e => e.id === 'lorentz')`.
* **You may only create/edit your own file(s) `expzz_<GROUP>.js`** (they load after every other experiment file,
  so you override fields of existing experiments: `E.draw = ...`, `E.update = ...`, `E.setup = ...`, `E.controls = ...`, `E.drags = ...`, `E.field = ...`, `E.howto = ...`, `E.steps = ...`).
  Never edit shared files (core.js, interact.js, app.js, styles.css, exp*.js of others …). If you need a framework
  feature, implement it locally inside your file, and mention it in your final report.
* Reference implementations to study first (quality bar):
  * `exp2b.js` — `Eddy3D` (3D pendulums with draggable plates, eddy loops, force arrows, legend) and the `faraday_magnet`
    block at the end (real dipole field lines, E.drags, E.field for the compass tools).
  * `exp_apps2.js` — induction stove (cross-section of coil ⊙/⊗, alternating field loops through the pot base, eddy currents, top-view inset, live graph).
  * `exp1b.js` + `core3d.js` — 3D capacitor with draggable handles (View3D mini engine: orbit camera, `box`, `quad`, `line`, `poly3`, `label`, `sym`, `handle`).
  * `interact.js` — the interaction framework described below.
* The original definition of each experiment is in `exp1.js … exp9.js`, `exp_apps.js` (read it before overriding!).
* Book pages are pre-rendered: `/tmp/claude-0/pg/p-NNN.png` (NNN = printed page number = `E.page`, low-res).
  For a sharper look: `pdftoppm -f N -l N -png -r 110 "/mnt/user-data/uploads/مختبر/كتاب الفيزياء السادس العلمي.pdf" /tmp/claude-0/<GROUP>_p`.
  Drawings should resemble the book's figures (same arrangement/symbols) so students are not confused.

## Experiment definition (canvas scenes)
```js
{ id, ch, title, desc, tools:[], steps:[], concl:[], laws:[],
  controls: [R(k,label,min,max,val,step,unit,on?,fmt?), SEL(k,label,[[v,label],...],val,on?), TG(k,label,val,on?,icon?), BT(label,[{t,cls,on:S=>...}])],
  setup(S){}, update(S,dt){}, draw(ctx,w,h,S){}, readings(S){ return [rd(label,valueString,wide?)] },
  live:{title, data:S=>({series:[{pts:[[t,v]...],color,name}], opts:{xl, ymin, ymax, y0zero:false}})},
  record, cols, graph, explain(S) (HTML string), howto (HTML string shown in the info panel) }
```
* `S.p[k]` holds control values; `S.t` sim time; `S.W, S.H` current canvas size (CSS px). `hist(S,key,v)` pushes `[S.t,v]` into `S[key]`.
* `draw(ctx,w,h,S)` must start with `G.bg(ctx,w,h[,grid])`. Helpers: `G.arrow(ctx,x1,y1,x2,y2,col,w,headSize)`, `G.text(ctx,s,x,y,{s,w,c,bg,a,b,mono,raw})`,
  `G.meter(...)`, `G.glow`, `G.magnet(ctx,x,y,w,h,flip)`, `G.coil`, `G.wire(ctx,pts,col,w)`, `G.dotsAlong(ctx,pts,phase,col,spacing)`, `rr(ctx,x,y,w,h,r)` (rounded rect path),
  `fmt(v,digits,unit)`, `fmtSI(v,unit)`, `clamp`, `lerp`, `TAU`, `deg`, `rad`, `wlColor(nm)`.
* **Theme:** by default the stage is in "book look" (white background). A prototype hook remaps *light* fill/stroke
  colours to darker ones so that dark-scene colours stay visible on white. When you really need a light colour
  (e.g. a pale fill, glow, white text on a coloured badge) wrap it: `setRaw(ctx,1); ...; setRaw(ctx,0);` or use `G.text(...,{raw:1})`.
  `'#fff'` is never remapped. Some scenes are dark-only (`E.dark = true`, e.g. spectra/fringes) — keep them dark.
  Check your scene in both looks: book (default) and dark (`THEME.book=false; Runner.applyBook();`).
* Stage layout: the canvas is ~820×780 px at 1440×900 (it shrinks when side panels are open). Keep important content
  away from: the left 64 px (tool rail), the bottom-center 70 px (play/step buttons), the bottom-right corner (orange reset),
  the top-right ~40 px (a "figure" pill). Scale everything from `w,h`.

## The interaction framework (`interact.js`) — what you get for free and how to use it
1. **Effects panel with icons.** Every `TG` toggle is rendered as a row with a coloured icon + switch, and in the
   compact mode as an icon-only button. The icon is chosen automatically from the label (field lines → `bfield`/`efield`,
   charges → `charges`, current → `current`, force → `force`, velocity → `velocity`, labels → `labels`, …) or explicitly with
   the 5th argument: `TG('vec','متجهات القوى',true,null,'force')`.
   Available icon names: `bfield efield charges electron current force velocity labels grid compass meter wave slow core flip eye light vector heat graph magnet stopwatch schematic real swap ray photon atom energy dot`.
   **Every visual layer in your scene should be an effect toggle** (field lines, vectors, charges, currents, labels/values,
   helper geometry, wavefronts, rays, energy levels, graphs-on-canvas …) and `draw` must honour it (`if (p.lines !== false) …`).
   Ranges (`R`) get −/+ step buttons and a click-to-type value; short `SEL`s become segmented buttons.
2. **Direct manipulation: `E.drags = S => [ ...objects ]`** (computed every frame from the current state and `S.W,S.H`,
   so share one geometry function between `draw` and `drags`). Each object:
   ```js
   { id:'magnet', x, y,               // centre in canvas px
     r:22  |  w:.., h:..  | hit:(x,y)=>bool,   // hit area (circle, rect, or custom)
     axis:'x'|'y'|'xy'  |  dir: angleRad  |  cx,cy (rotation about a centre),   // decides the green hint arrows
     tip:'اسحب ... لتغيير ...',        // hover tooltip (Arabic)
     idle:'اسحب المغناطيس ✋',          // optional text of the first-visit hint bubble
     hint:false,                       // optional: don't pulse this one before first interaction
     down:(S,x,y)=>{}, drag:(S,d)=>{}, up:(S)=>{}, click:(S,x,y)=>{}, wheel:(S,step /* +1|-1 */)=>{} }
   ```
   `d` = `{x,y, sx,sy (pointer start), ox,oy (object start), dx,dy (since last move), along (if dir), ang,dang (if cx,cy)}`.
   Typical: `drag:(S,d)=> setParam(S,'d', valueFromPixels(d.oy + d.y - d.sy))`.
   **Always change controlled quantities through `setParam(S,key,value)`** — it clamps/steps to the control's range,
   updates the slider, and calls the control's `on`. For free state (positions not bound to a control) just write `S.xxx`.
   The framework draws PhET-style green arrows on hover and pulses them (with an "اسحبني" bubble) until the student
   first interacts. Click-only objects (`click` without `drag`) get a pointer cursor — use them for on-canvas switches,
   buttons, source on/off, choosing a material, firing a particle, etc. `wheel` lets the mouse wheel adjust a value while hovering.
   If the experiment also has an old `E.pointer`, set `E.pointer = null` when you replace it with `drags`
   (or keep it for things like 3D orbiting — the framework tries `drags` first).
3. **Measuring tools.** If you define `E.field = (S,x,y) => [Bx,By] | null` (tesla, canvas axes: +y is DOWN; return null inside
   solid objects) the panel automatically offers: *compass grid* (PhET needles everywhere), a draggable *compass* and a
   draggable *field meter*. Optional `E.fieldRef = S => typicalMagnitude` for the grid opacity scale. Define it for every
   experiment that has a magnetic field region. A stopwatch tool exists for all experiments.
4. `View3D` (core3d.js) is available for genuinely 3D scenes (see exp1b/exp2b). Use it where 3D really helps understanding
   (orientation of B vs area, rotating loops, …) — it must stay readable; always offer a "front view (like the book)" button.

## What "done" means for each experiment you own
1. **Clarity of the mechanism** (the most important point): draw what physically happens — field lines/vectors with
   direction arrows, how flux through a loop changes (e.g. count of threading lines, shaded area), moving charges
   (electrons with − signs moving along wires/in the conductor), force vectors (F = qvB, F = BIL…), velocity vectors,
   phasors, wavefronts, rays, energy levels and transitions … with short Arabic labels, a compact legend when useful,
   and live numbers where they help. Animate causes → effects (e.g. motion → changing flux → emf → current → opposing force).
   Match the book figure arrangement and symbols (⊗ into page, ⊙ out of page, N red / S blue, + red / − blue).
2. **100 % interactive**: every object a student would touch in a real lab is draggable/clickable on the canvas
   (magnets, rods, coils, loops, slits, screens, polarizers (rotate), mirrors, light sources, lenses, sliders on apparatus,
   switches, knobs (rotate), particles to launch …) and changes the physics live. Keep the old controls (they stay synced).
3. **Every visual layer is an effect toggle with a fitting icon.**
4. Keep what other code relies on: state names used by `readings`, `record`, `explain` in `expz.js`, guided tours
   `GUIDES[id]` and predictions `PREDICT[id]` in `features.js` (`grep -n "<id>" features.js expz.js`). If you rename a
   control key or state variable, those break — don't. You may *add* controls (append to `E.controls` so existing
   indices stay the same: `E.controls = E.controls.concat([...])`) — never reorder/remove existing ones.
5. Physics must be correct and consistent with the book's laws and sign conventions (Lenz, right-hand rules, …).
6. Performance: keep per-frame work light (no huge loops; cache static geometry).
7. No `localStorage`/network. Arabic UI text. Numbers in Latin digits.

## Testing (mandatory, iterate until good)
```bash
cd /home/claude/lab
python3 build.py --out out_<GROUP>.html --zz 'expzz_<GROUP>*'
OUT=out_<GROUP>.html node t5.js <id> "<optional JS to run after opening, e.g. Runner.S.p.v=3>" 1500 <GROUP>_<id>   # → shots/<GROUP>_<id>.png
OUT=out_<GROUP>.html node t6.js <id1>,<id2>,...    # real mouse drags/clicks/wheel on every E.drags object + toggles every effect
```
Then **look at every screenshot with the Read tool** and fix anything unclear, overlapping, clipped, too small or ugly.
`t6.js` must print `ok` (no JS errors) and a ✓ for every draggable (state changed). Also screenshot the dark look once
(`THEME.book=false;Runner.applyBook()` in the action string) and a narrow viewport (`VW=1100 VH=800 OUT=... node t5.js ...`).
`t5.js` prints `ERR ...` lines for page errors — there must be none.

## Final report (your last message)
Short list per experiment: what is now draggable/clickable, which effects (icons) exist, what was made clearer,
plus anything you could not do and any framework change you would like. Don't paste code.
