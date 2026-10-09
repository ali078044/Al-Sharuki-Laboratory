# Building the grade-9 (الثالث المتوسط) experiments — brief for helpers

Students 14–15. Same framework and rules as grade 8: **read `AGENT_GUIDE_G8.md` completely first** (it links AGENT_GUIDE.md and
AGENT_GUIDE_G7.md) — every rule there applies, ESPECIALLY the teacher's feedback sections at its end: strict book fidelity (official activities
exactly as in the book), realism, mobile/touch, merge into fewer RICH experiments with parts (`M8.merge` from `expg8_0kit.js`, with `ch` set to
your chapter id — it works for any grade), each part with its own simple explanation, comparisons side by side, same apparatus with editable
values for every worked example, and a coverage audit checklist in your report. Look at `expg8_c4.js` / `expg8_c6.js` / `expg8_c1.js` (g8_compare) for the current quality bar.

* Register parts with `M8.P[D.id] = D` and experiments with `M8.merge({ id, ch, ... })`; plain single experiments may use `X9({...})`. Ids prefix `g9_`.
* Chapters: `31` الكهربائية الساكنة (PDF p5–30) · `32` المغناطيسية (PDF p31–46). Files: `expg9_c1.js`, `expg9_c2.js`. Laws: `LW({ id:'g9_...', cat:<chapter id>, ... })` in your file.
* Book: `/mnt/user-data/uploads/مختبر/كتاب الفيزياء الثالث متوسط.pdf` (PDF page = book page). Low-res pages `/tmp/claude-0/g9/pg-NNN.png` (3 digits, 70 dpi);
  sharp: `pdftoppm -f N -l N -png -r 120 "<pdf>" /tmp/claude-0/<GROUP>_p`. Try `pdftotext -f N -l N -layout` too — if the text is garbled, rely on images.

## Teacher's extra request for grade 9
"Look at the science labs on the internet — PhET and others, all levels — and build all the experiments and MANY examples found there
(static charges etc.), arranged in order inside the examples, very beautifully."
→ After covering every book activity exactly, enrich each experiment with the best ideas of the well-known simulations, as extra parts/scenes
(marked «➕ من المختبرات العالمية» so the book version stays first). Reference ideas (from memory; WebSearch/WebFetch allowed if available):
* PhET «Balloons and Static Electricity»: balloon rubbed on a sweater (electrons transfer, show all/none/difference charges), balloon sticks to a wall
  (wall molecules polarise), two balloons repel, neutral sweater.
* PhET «John Travoltage»: rub foot on carpet, charge accumulates, spark when the finger approaches the doorknob.
* PhET «Charges and Fields»: drag + / − charges, field vectors, equipotential lines, E-field sensor, voltmeter.
* PhET «Coulomb's Law»: two charges on a ruler, force arrows with values, F vs distance (inverse square), macro & atomic scale.
* «Electric Field Hockey» style challenge; Van de Graaff generator; gold-leaf electroscope (charging by contact & induction, earthing);
  lightning & lightning rod; photocopier; electrostatic paint spraying; dust precipitator; triboelectric series.
* PhET «Magnets and Electromagnets» / «Faraday's Electromagnetic Lab»: bar magnet with field lines & field meter, compass grid, flipping polarity,
  earth's magnetic field; iron filings pattern; attraction/repulsion of poles; magnetic vs non-magnetic materials; magnetic domains
  (random → aligned when stroked/induced, heating/hammering destroys magnetism); magnetising by stroking (single/double touch) and by induction;
  magnetic shielding; temporary vs permanent magnets (soft iron vs steel); uses (speaker, maglev, crane, fridge door).
* The user has PhET HTML files in the source folder (faradays-electromagnetic-lab_en.html etc.) — for inspiration only; never copy their code or assets.
Order inside each experiment: book activity → book examples/figures → extra lab scenes → challenge/quiz. Make the extras visually polished.
