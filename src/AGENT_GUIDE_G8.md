# Building the grade-8 (الثاني المتوسط) experiments — brief for helpers

The lab now serves three grades. You add the activities of the Iraqi **second-intermediate physics book** (students 13–14).
**Read first:** `AGENT_GUIDE.md` (framework) and `AGENT_GUIDE_G7.md` (age-appropriate design, kit `K`, testing) — ALL rules there apply,
just replace g7 → g8. Then skim one polished g7 file for the quality bar: `expg7_c2x.js` (`g7_move`, galleries/scenes) and `expg7_c3x.js`.

## Differences for grade 8
* Register with `X8({...})` (same fields as `X7`: steps, concl, fact, quiz[3], explain, readings, record/cols/graph, laws, page, sec, fig, kind).
  Ids prefix `g8_`. Chapters (`ch`): `21` الحركة · `22` قوانين الحركة · `23` الشغل والقدرة والطاقة · `24` الآلات البسيطة · `25` الحركة الموجية والصوت · `26` الضوء.
* Your file only: `expg8_c<N>.js` (N = chapter number 1–6). Register in **book order**.
* Laws: define at top of your own file with `LW({ id:'g8_...', cat:<chapter id>, ... })` — copy the field format from `expg7_0laws.js`. Reference them in `laws:[]`.
* Book: `/mnt/user-data/uploads/مختبر/كتاب الفيزياء الثاني المتوسط.pdf` (88 pages, PDF page = book page). **The text layer is garbled** (font encoding) —
  read the pages as images: low-res `/tmp/claude-0/g8/pg-NN.png` (70 dpi), sharp: `pdftoppm -f N -l N -png -r 120 "<pdf>" /tmp/claude-0/<GROUP>_p`.
  Cover every «نشاط», every experiment, and every illustrative example/figure that can be made interactive (worked examples «مثال» → a scene where
  the student sets the values and sees the computation step by step).

## Lessons from the teacher's feedback on grade 7 (apply from the start)
* Every concept needs **several real-life examples/scenes** selectable by a "المثال/المشهد" control (e.g. car, runner, ball, bus…), drawn nicely, not one abstract box.
* Drag must be **precise and smooth**: big hit areas, snap/drop zones with glow (see `C1.zone`, `C1.ease` in `expg7_c1.js`), never let an object run away from the pointer
  (use `keep:true` and absolute positions from the pointer, not accumulated deltas). Each object individually controllable.
* Make cause→effect obvious: arrows labelled with their quantity, the law written above in the same colour as its arrow, live equation with the current numbers substituted.
* Show the invisible with effect toggles (icons): vectors, distance-vs-displacement path, speedometer, ticker-tape/stroboscopic dots, graphs (distance-time, velocity-time) drawing live.
* People must be drawn correctly (seated people sit, seatbelts across chest, no limbs through objects).
* Numbers: use Western digits with units exactly as the book (m, s, m/s, m/s², km/h, N, kg, J, W…). Brackets/mixed Arabic+numbers go through `G.text` (handles bidi).

## Testing (mandatory) — same as grade 7, with your GROUP name
python3 build.py --out out_<GROUP>.html ; OUT=out_<GROUP>.html node t5.js <id> "" 1500 <GROUP>_<id> (Read the png!) ; OUT=out_<GROUP>.html node t6.js id1,id2,... (must end "ok").
Finish with a short report (per experiment: book page, what the student does, effects, examples). No code in the report.

## Teacher's emphasis for batches 2–3 (VERY IMPORTANT)
* **Strict fidelity to the book**: build exactly the book's activities with the book's apparatus, numbers, figure layout, wording, titles,
  section names and page numbers. Worked examples use the book's exact values. Do not invent activities the book doesn't have
  (extra real-life example scenes are fine, but the book's version must come first and be the default).
* **Realism**: draw apparatus and scenes realistically (proportions, shading/gradients, shadows, real textures — wood, metal, rope, pulleys
  with grooves, real-looking people with correct anatomy and poses, real objects instead of abstract boxes). Physics motion must be physically
  correct (real g, friction, energy conservation), with smooth animation.
* **Mobile**: everything must work with touch on a phone (≥ 360 px wide): big hit areas, no hover-only interactions, text readable when the canvas is scaled down.

## Teacher's feedback after batch 1 (HIGHEST PRIORITY)
* "Most activities give ONE idea — this wastes lecture time." → **Merge related book activities into one richer experiment** that teaches
  several things, each with its own explanation. Think "one lesson = one or two strong experiments", not one micro-idea per experiment.
  Inside a merged experiment, use a «الجزء/الفكرة» selector (part 1, 2, 3…) or a sequence of stages; every part has its own explanation
  text (explain(S) changes per part), its own readings, and the book's page/figure for that part. Keep many varied real examples.
* Rough target: a book lesson → 1–3 experiments; a chapter → ~5–7 experiments total. Merge, don't drop content.
* Each idea must be **explained in words a 13-year-old understands**: what you see, why it happens, a daily-life example (short sentences).

## Teacher's feedback after batch 2 (also HIGHEST PRIORITY)
* **Coverage audit is mandatory**: before finishing, list every «نشاط», «مثال», figure, table, classification/type and review question
  on your pages, and confirm each one appears (official book activities reproduced exactly as in the book: same apparatus, steps, numbers, table).
  Put this checklist at the end of your report (page → item → where it is in the lab).
* **Comparisons**: where the book distinguishes similar concepts, build a comparison activity that shows them side by side on the same motion/object
  (e.g. distance vs displacement, speed «الانطلاق» vs velocity «السرعة» vs acceleration «التعجيل»; transverse vs longitudinal waves; regular vs diffuse reflection; convex vs concave…).
* **Same apparatus, many cases**: let the student change values (weight, force, distances…) on one apparatus to reproduce each book example on it.
