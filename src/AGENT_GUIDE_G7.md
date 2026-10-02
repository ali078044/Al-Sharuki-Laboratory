# Building the grade-7 (الأول المتوسط) experiments — brief for helpers

The lab (`/home/claude/lab`, one HTML file built from JS modules) now serves two grades. You are adding the
activities of the Iraqi **first-intermediate physics book** (students aged 12–13). The teacher's words:
*"make all the activities and experiments and beautiful things for first-intermediate students, suited to their age."*

**Read `/home/claude/lab/AGENT_GUIDE.md` first** — everything there about the framework (`E.drags`, `setParam`,
effect toggles with icons, `E.field`, testing with `t5.js`/`t6.js`, look/theme rules) applies here too.
Then read the reference grade-7 experiment `expg7_c1.js` (`g7_density`) and the kit `expg7_0kit.js` (object `K`).

## Where things go
* Register experiments with `X7({...})` (same fields as `X`, plus optional `fact`, `quiz`, `tags`). Chapters (field `ch`):
  `11` خواص المادة · `12` القوة · `13` الضغط · `14` الحرارة · `15` أثر الحرارة في المواد.
  **Book order matters**: within your file register experiments in the order they appear in the book (the index number shown to students is the registration order inside the chapter).
* Your file only: `expg7_c<N>.js` as assigned (chapter 1 already contains `g7_density`; the ch1 helper appends to
  that same file, keeping `g7_density` in its right place in book order — move the block if needed).
  Build only your chapter: `python3 build.py --out out_<GROUP>.html` (all g7 files are included; that's fine as long as each file is syntactically valid — never leave your file broken between builds; write complete blocks).
* Laws for grade 7 are in `expg7_0laws.js` (ids `g7_rho, g7_vcube, g7_vbox, g7_vdisp, g7_units, g7_boyle, g7_weight, g7_fsame, g7_fopp, g7_fperp, g7_p, g7_pliq, g7_atm, g7_buoy, g7_kelvin, g7_heat, g7_expand, g7_states`). Reference them in `laws:[]`. Don't edit that file; if you need another law, define it at the top of your own file with `LW({ id:'g7_...', cat: <chapter id>, ... })`.
* Book text (already extracted, one line per page, `@@P<page>`): `/tmp/claude-0/g7/clean.txt`. Page images: `/tmp/claude-0/g7/pg-NN.png` (low-res);
  for a sharp page: `pdftoppm -f N -l N -png -r 110 "/mnt/user-data/uploads/مختبر/كتاب الفيزياء اول متوسط.pdf" /tmp/claude-0/<GROUP>_p` — **look at the figures** of every activity you build and make the drawing resemble them.

## Age-appropriate design (very important)
* Friendly, colourful, clean "school lab" scenes: use `K.bg(ctx,w,h,{benchY})` (pale wall + wooden bench, always light),
  big clear objects, rounded shapes, soft gradients. Real apparatus drawn nicely: beakers, graduated cylinders (`K.cylinder` with
  meniscus + `K.lens` magnifier), digital balance (`K.balance`), spring balance (`K.springBalance`), thermometer (`K.thermo`),
  burner (`K.burner`), materials (`K.box` with `K.MAT`), particles (`K.ball`), rulers (`K.ruler`), force arrows (`K.force`), labels (`K.tag`),
  speech bubbles + mascot (`K.bubble`, `K.mascot`) and confetti (`K.cheer(S,x,y)` once + `K.party(ctx,S)` every frame) when the student discovers the result.
* Simple Arabic (the book's wording and terms), short labels, big numbers. Units exactly as the book (cm³, mL, g, N, Pa, °C, K).
* **Hands-on**: the student does what the book says with the mouse — pour, drop, drag, heat (drag the burner), add salt (click), shake the box, push the cart, hang masses, blow… Every object they'd touch is draggable/clickable via `E.drags`. Show «اسحبني ✋» hints (automatic) and friendly `idle` texts.
* Show the **invisible**: particles (molecules) moving faster when hot, spacing in solid/liquid/gas, force arrows, pressure arrows, heat flow arrows, convection currents, air molecules… as effect toggles with icons (`TG(k,label,val,null,icon)`).
* Every experiment has: `steps` (from the book, rephrased as instructions for the simulation), `concl` (book conclusions),
  `fact` (1–3 «هل تعلم؟» facts, from the book's «حقيقة علمية»/applications when possible), and a `quiz` of **3 questions** from the book's review
  questions: `quiz:[{q, o:[3 options], a:index, why}]` (stars are awarded automatically). Add `explain(S)` («ماذا يحدث الآن؟»), `readings`, and where
  the book has a table, `record`+`cols` (and `graph` if a relation is studied).
* Correct physics at their level (no advanced formulas beyond the book), but real numbers (e.g. densities from the book's table, g = 9.8 N/kg).
* Performance: light per-frame work; particle counts ≲ 200.

## Testing (mandatory)
```bash
cd /home/claude/lab
python3 build.py --out out_<GROUP>.html
OUT=out_<GROUP>.html node t5.js <id> "" 1500 <GROUP>_<id>      # look at shots/<GROUP>_<id>.png with Read!
OUT=out_<GROUP>.html node t6.js id1,id2,...                     # every drag/click must print ✓ and the line must end with "ok"
```
Also check a narrow viewport once (`VW=1100 VH=800`). Fix everything that looks cramped, clipped or unclear.
Finish with a short report: per experiment — book page, what the student can do, effects, quiz. No code.
