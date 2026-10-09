'use strict';
/* ======================= الفصل الأول: المتسعات ======================= */
const DIELS = [[1, 'الهواء / الفراغ (k≈1)'], [2.1, 'التفلون (2.1)'], [2.56, 'البوليسترين (2.56)'], [3.4, 'النايلون (3.4)'], [3.7, 'الورق (3.7)'], [5.6, 'زجاج البايركس (5.6)'], [6, 'المايكا (6)'], [6.7, 'المطاط (6.7)']];
function capPhys(S) {
  const p = S.p; const A = 0.02 * (p.A ?? 1), d = (p.d ?? 2) * 1e-3, x = p.ins ?? 0, k = p.k ?? 1;
  const C0 = PHY.e0 * A / d; const C = C0 * ((1 - x) + k * x);
  let V, Q; if (S.conn) { V = S.Vb; Q = C * V; S.Q = Q; } else { Q = S.Q; V = Q / C; }
  return { C0, C, V, Q, E: V / d, U: .5 * Q * V, A, d, x, k };
}
function capSetup(S) { S.Vb = 12; S.conn = true; S.anim = 0; const r = capPhys(S); S.Q = r.Q; S.conn = !!S.keepConn; }
function capDraw(ctx, w, h, S, mode) {
  G.bg(ctx, w, h);
  const r = capPhys(S); const p = S.p;
  const cx = w * .5, cy = h * .42; const ph = Math.min(h * .52, 250), pw = 16;
  const gap = clamp(p.d * 22, 24, w * .42); const ovl = p.A ?? 1;
  const lx = cx - gap / 2 - pw, rx = cx + gap / 2;
  const shift = (1 - ovl) * ph; // right plate slides down to reduce overlap
  // field region
  const top = cy - ph / 2 + shift, bot = cy + ph / 2; const nl = Math.round(clamp(r.E / 400, 2, 22));
  for (let i = 0; i < nl; i++) { const y = top + (bot - top) * (i + .5) / nl; G.arrow(ctx, lx + pw + 3, y, rx - 3, y, 'rgba(255,209,102,.55)', 1.4, 6); }
  // dielectric slab
  if ((p.ins ?? 0) > 0 && p.k > 1) {
    const sh = ph * p.ins; const sy = cy - ph / 2 - 40 + (1 - 0) * 0; const yy = cy + ph / 2 - sh;
    ctx.fillStyle = 'rgba(147,197,253,.22)'; ctx.strokeStyle = 'rgba(147,197,253,.7)'; ctx.lineWidth = 1.5;
    rr(ctx, lx + pw + 4, yy, gap - 8, sh, 4); ctx.fill(); ctx.stroke();
    for (let y = yy + 12; y < yy + sh - 6; y += 22) for (let x = lx + pw + 16; x < rx - 10; x += 26) { ctx.fillStyle = 'rgba(248,113,113,.9)'; ctx.beginPath(); ctx.arc(x + 5, y, 3.5, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(96,165,250,.95)'; ctx.beginPath(); ctx.arc(x - 5, y, 3.5, 0, TAU); ctx.fill(); }
    G.text(ctx, 'عازل k=' + p.k, cx, yy + sh + 12, { s: 11, c: '#bfdbfe' });
    void sy;
  }
  // plates (3D look)
  const plate = (x, y0, hh, col, sign) => {
    const g = ctx.createLinearGradient(x, 0, x + pw, 0); g.addColorStop(0, shade(col, 40)); g.addColorStop(1, shade(col, -40));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x + pw, y0 - 10); ctx.lineTo(x + pw, y0 + hh - 10); ctx.lineTo(x, y0 + hh); ctx.closePath(); ctx.fill();
    const nq = Math.round(clamp(Math.abs(r.Q) * 1e9 / 12, 1, 14));
    for (let i = 0; i < nq; i++) { const yy = y0 + hh * (i + .5) / nq - 5; G.text(ctx, sign, x + pw / 2, yy, { s: 14, w: 900, c: sign === '+' ? '#fecaca' : '#bfdbfe' }); }
  };
  plate(lx, cy - ph / 2, ph, '#b45309', '+'); plate(rx, cy - ph / 2 + shift, ph, '#475569', '−');
  // wires to voltmeter & battery
  const my = h * .86, vmx = cx;
  G.wire(ctx, [[lx, cy + ph / 2 - 20], [lx - 30, cy + ph / 2 - 20], [lx - 30, my], [vmx - 34, my]], '#e5484d');
  G.wire(ctx, [[rx + pw, cy + ph / 2 - 20 + shift * 0], [rx + pw + 30, cy + ph / 2 - 20], [rx + pw + 30, my], [vmx + 34, my]], '#222c3f', 3);
  G.meter(ctx, vmx, my - 8, 26, r.V, 15, 'V', fmt(r.V, 3) + ' V');
  // battery
  const bx = lx - 90, by = cy - ph / 2 - 6;
  ctx.fillStyle = S.conn ? '#1f2937' : '#1f2937'; rr(ctx, bx - 22, by - 30, 44, 60, 6); ctx.fill(); ctx.fillStyle = '#f5c542'; rr(ctx, bx - 22, by - 30, 44, 14, 6); ctx.fill();
  G.text(ctx, S.Vb + 'V', bx, by + 6, { s: 13, w: 900, c: '#fff' });
  G.text(ctx, S.conn ? 'موصولة' : 'مفصولة', bx, by + 44, { s: 11, c: S.conn ? '#86efac' : '#fca5a5' });
  if (S.conn) { G.wire(ctx, [[bx, by - 30], [bx, by - 44], [lx + pw / 2, by - 44], [lx + pw / 2, cy - ph / 2 - 4]], '#e5484d'); G.wire(ctx, [[bx + 22, by], [bx + 40, by], [bx + 40, cy - ph / 2 - 60], [rx + pw / 2, cy - ph / 2 - 60], [rx + pw / 2, cy - ph / 2 + shift - 12]], '#64748b'); }
  // labels
  G.text(ctx, 'd = ' + fmt(p.d, 2) + ' mm', cx, cy - ph / 2 - 20, { s: 12, c: '#cbd5e1', bg: 'rgba(15,23,42,.7)' });
  if (mode === 'area') G.text(ctx, 'المساحة المتقابلة A = ' + Math.round(ovl * 100) + '%', rx + pw + 60, cy, { s: 12, c: '#fde68a', a: 'left' });
}
const capReads = S => { const r = capPhys(S); return [rd('فرق الجهد ΔV', fmtSI(r.V, 'V')), rd('الشحنة Q', fmtSI(r.Q, 'C')), rd('السعة C', fmtSI(r.C, 'F')), rd('المجال E', fmt(r.E, 3, 'V/m')), rd('الطاقة المختزنة ½QΔV', fmtSI(r.U, 'J')), rd('ثابت العزل الفعّال C/C₀', fmt(r.C / r.C0, 3)), rd('حالة البطارية', S.conn ? 'موصولة (ΔV ثابت)' : 'مفصولة (Q ثابتة)', 1)]; };
const capBtns = BT('البطارية', [{ t: 'شحن ثم فصل البطارية', cls: 'primary', on: S => { S.conn = true; const r = capPhys(S); S.Q = r.Q; S.conn = false; } }, { t: 'إبقاء البطارية موصولة', on: S => { S.conn = true; } }]);

X({ id: 'c_dielectric', ch: 1, sec: '4-1', page: 12, kind: 'نشاط', title: 'تأثير إدخال العازل الكهربائي (تجربة فراداي)', desc: 'بيان تأثير إدخال العازل بين صفيحتي متسعة مشحونة ومفصولة عن البطارية في مقدار فرق الجهد بينهما، وتأثيره في السعة.',
  tools: ['متسعة ذات الصفيحتين المتوازيتين (العازل بينهما هواء) غير مشحونة', 'بطارية فولطيتها مناسبة', 'جهاز فولطميتر', 'أسلاك توصيل', 'لوح من مادة عازلة كهربائياً (ثابت عزلها k)'],
  steps: ['نربط أحد قطبي البطارية بإحدى الصفيحتين، ثم نربط القطب الآخر بالصفيحة الثانية؛ فتشحن إحدى الصفيحتين بالشحنة الموجبة (+Q) والأخرى بالسالبة (−Q).', 'نفصل البطارية عن الصفيحتين (اضغط «شحن ثم فصل البطارية»).', 'نربط الطرف الموجب للفولطميتر بالصفيحة الموجبة والطرف السالب بالسالبة؛ نلاحظ انحراف مؤشره عند قراءة معينة ΔV.', 'ندخل لوح العازل بين الصفيحتين (حرّك منزلق «نسبة إدخال العازل»)، ونلاحظ نقصان قراءة الفولطميتر إلى ΔVk.', 'غيّر نوع العازل وسجّل القراءات، ثم جرّب إبقاء البطارية موصولة ولاحظ الفرق.'],
  concl: ['إدخال لوح عازل ثابت عزله k بين صفيحتي المتسعة المشحونة المفصولة يسبب نقصاناً في فرق الجهد بنسبة k: ΔVk = ΔV/k.', 'لأن C = Q/ΔV والشحنة ثابتة، فإن سعة المتسعة تزداد بوجود العازل بالعامل k: Ck = kC.', 'السبب: استقطاب جزيئات العازل يولّد مجالاً Ed معاكساً للمجال الأصلي فيقل المجال المحصل Ek = E/k.', 'إذا بقيت البطارية موصولة يبقى ΔV ثابتاً وتزداد الشحنة المختزنة Qk = kQ.'],
  laws: ['capdef', 'diel', 'cplate', 'efield', 'capE'],
  theory: `<div class="note">يُعرّف ثابت العزل الكهربائي k بأنه النسبة بين سعة المتسعة بوجود العازل Ck وسعتها والفراغ أو الهواء عازل بين صفيحتيها C.</div>`,
  howto: 'اختر مادة العازل ثم اسحب منزلق الإدخال تدريجياً وراقب مؤشر الفولطميتر وعدد خطوط المجال.',
  controls: [SEL('k', 'نوع العازل', DIELS.slice(1), 6), R('ins', 'نسبة إدخال العازل', 0, 1, 0, .01, '', null, v => Math.round(v * 100) + '%'), R('d', 'البعد بين الصفيحتين d', 1, 6, 2, .1, 'mm'), capBtns],
  setup(S) { capSetup(S); S.conn = false; }, draw: (ctx, w, h, S) => capDraw(ctx, w, h, S, 'diel'), readings: capReads,
  record: S => { const r = capPhys(S); return { k: S.p.ins > .99 ? S.p.k : +(r.C / r.C0).toFixed(3), V: +r.V.toFixed(3), C: +(r.C * 1e12).toFixed(2) }; }, cols: [['k', 'k الفعّال'], ['V', 'ΔV (V)'], ['C', 'C (pF)']],
  graph: { x: 'k', y: 'V', xl: 'ثابت العزل k', yl: 'ΔV (V)', theory: (x, S) => (S.rows[0] ? S.rows[0].V * S.rows[0].k : 12) / Math.max(x, 1e-3), xmin: 1, xmax: 7 }
});

X({ id: 'c_area', ch: 1, sec: '5-1', page: 14, kind: 'تجربة', title: 'تغيّر السعة بتغيّر المساحة السطحية المتقابلة (A)', desc: 'متسعة مشحونة ومفصولة يربط بين صفيحتيها فولطميتر؛ نقلل المساحة المتقابلة بإزاحة إحدى الصفيحتين جانبياً مع بقاء الشحنة ثابتة.',
  tools: ['متسعة ذات صفيحتين متوازيتين مشحونة ومفصولة عن المصدر', 'فولطميتر', 'حامل عازل لتحريك إحدى الصفيحتين جانبياً'],
  steps: ['نشحن المتسعة ونفصلها عن البطارية ونربط الفولطميتر بين صفيحتيها فتكون قراءته ΔV.', 'نقلل المساحة المتقابلة إلى النصف (½A) بإزاحة إحدى الصفيحتين جانبياً مع المحافظة على بقاء مقدار الشحنة ثابتاً.', 'نلاحظ ازدياد قراءة الفولطميتر إلى الضعف (2ΔV).', 'سجّل القراءات لمساحات مختلفة وارسم العلاقة بين C و A.'],
  concl: ['وفق العلاقة C = Q/ΔV تقل سعة المتسعة بازدياد فرق الجهد بثبوت الشحنة.', 'سعة المتسعة ذات الصفيحتين المتوازيتين تتناسب طردياً مع المساحة السطحية المتقابلة للصفيحتين: C ∝ A.'],
  laws: ['cplate', 'capdef'],
  controls: [R('A', 'المساحة المتقابلة (نسبة إلى الكاملة)', .1, 1, 1, .01, '', null, v => Math.round(v * 100) + '%'), R('d', 'البعد d', 1, 6, 2, .1, 'mm'), capBtns],
  setup(S) { S.p.k = 1; S.p.ins = 0; capSetup(S); S.conn = false; }, draw: (ctx, w, h, S) => capDraw(ctx, w, h, S, 'area'), readings: capReads,
  record: S => { const r = capPhys(S); return { A: +(r.A * 1e4).toFixed(1), V: +r.V.toFixed(3), C: +(r.C * 1e12).toFixed(2) }; }, cols: [['A', 'A (cm²)'], ['V', 'ΔV (V)'], ['C', 'C (pF)']],
  graph: { x: 'A', y: 'C', xl: 'المساحة A (cm²)', yl: 'السعة C (pF)', theory: (x, S) => PHY.e0 * x * 1e-4 / (S.p.d * 1e-3) * 1e12, xmin: 0, xmax: 220 }
});

X({ id: 'c_dist', ch: 1, sec: '5-1', page: 15, kind: 'تجربة', title: 'تغيّر السعة بتغيّر البعد بين الصفيحتين (d)', desc: 'نقرّب الصفيحتين من بعضهما مع بقاء الشحنة ثابتة ونراقب قراءة الفولطميتر.',
  tools: ['متسعة ذات صفيحتين متوازيتين مشحونة ومفصولة', 'فولطميتر', 'مسطرة مدرجة'],
  steps: ['نشحن المتسعة ونفصلها عن المصدر ونربط الفولطميتر بين صفيحتيها؛ البعد الابتدائي d والقراءة ΔV.', 'نقرّب الصفيحتين إلى نصف البعد (½d) مع بقاء الشحنة ثابتة.', 'نلاحظ أن قراءة الفولطميتر تقل إلى النصف (½ΔV).', 'سجّل القراءات لأبعاد مختلفة وارسم C مقابل d.'],
  concl: ['بثبوت الشحنة يقل فرق الجهد بنقصان البعد، أي تزداد السعة.', 'سعة المتسعة تتناسب عكسياً مع البعد بين صفيحتيها: C ∝ 1/d.'],
  laws: ['cplate', 'efield', 'capdef'],
  controls: [R('d', 'البعد بين الصفيحتين d', .5, 8, 4, .1, 'mm'), capBtns],
  setup(S) { S.p.k = 1; S.p.ins = 0; S.p.A = 1; capSetup(S); S.conn = false; }, draw: (ctx, w, h, S) => capDraw(ctx, w, h, S, 'dist'), readings: capReads,
  record: S => { const r = capPhys(S); return { d: S.p.d, V: +r.V.toFixed(3), C: +(r.C * 1e12).toFixed(2) }; }, cols: [['d', 'd (mm)'], ['V', 'ΔV (V)'], ['C', 'C (pF)']],
  graph: { x: 'd', y: 'C', xl: 'البعد d (mm)', yl: 'السعة C (pF)', theory: x => PHY.e0 * .02 / (x * 1e-3) * 1e12, xmin: .4, xmax: 8.5, ymax: () => 450 }
});

/* ---- parallel & series (circuit) ---- */
X({ id: 'c_parallel', ch: 1, sec: '6-1', page: 19, kind: 'تجربة', title: 'ربط المتسعات على التوازي', desc: 'ثلاث متسعات مربوطة على التوازي بين قطبي بطارية؛ نقيس فرق الجهد والشحنة لكل متسعة ونتحقق من السعة المكافئة.', circuit: true, method: 'be', fixedDt: 1e-3, probeDt: .002,
  tools: ['بطارية', 'ثلاث متسعات مختلفة السعة', 'مفتاح', 'مقاومة حماية', 'فولطميتر', 'أسلاك'],
  steps: ['اربط المتسعات الثلاث على التوازي ثم اربط المجموعة بين قطبي البطارية عبر المفتاح.', 'أغلق المفتاح (انقر عليه) وانتظر اكتمال الشحن.', 'لاحظ أن فرق الجهد متساوٍ على جميع المتسعات ويساوي فرق جهد البطارية.', 'قارن الشحنة الكلية بمجموع شحنات المتسعات، والسعة المكافئة بمجموع السعات.'],
  concl: ['ΔV₁ = ΔV₂ = ΔV₃ = ΔV البطارية.', 'Q_total = Q₁ + Q₂ + Q₃ (الشحنة الكلية = مجموع الشحنات).', 'Ceq = C₁ + C₂ + C₃: يزداد مقدار السعة المكافئة وتكون أكبر من أكبر سعة في المجموعة؛ لأن الربط على التوازي يعني زيادة المساحة المتقابلة.'],
  laws: ['cpar', 'capdef', 'kcl'],
  build(C) {
    C.add('battery', 2, 4, 2, 12, { val: 12, id: 'B' }); C.add('switch', 2, 4, 6, 4, { id: 'S' }); C.add('resistor', 6, 4, 10, 4, { val: 1000, id: 'R', label: 'حماية' });
    C.add('wire', 10, 4, 14, 4); C.add('wire', 14, 4, 18, 4); C.add('wire', 18, 4, 22, 4);
    C.add('capacitor', 10, 4, 10, 12, { val: 4, id: 'C1', label: 'C1', vmax: 12 }); C.add('capacitor', 14, 4, 14, 12, { val: 8, id: 'C2', label: 'C2', vmax: 12 }); C.add('capacitor', 18, 4, 18, 12, { val: 12, id: 'C3', label: 'C3', vmax: 12 });
    C.add('voltmeter', 22, 4, 22, 12, { id: 'V' }); C.add('wire', 22, 12, 18, 12); C.add('wire', 18, 12, 14, 12); C.add('wire', 14, 12, 10, 12); C.add('wire', 10, 12, 2, 12);
  },
  controls: [R('V', 'فرق جهد البطارية', 1, 24, 12, .5, 'V', (v, S) => { S.C.get('B').val = v; }), R('c1', 'C1', 1, 20, 4, 1, 'µF', (v, S) => S.C.get('C1').val = v), R('c2', 'C2', 1, 20, 8, 1, 'µF', (v, S) => S.C.get('C2').val = v), R('c3', 'C3', 1, 20, 12, 1, 'µF', (v, S) => S.C.get('C3').val = v), BT('المفتاح', [{ t: 'غلق / فتح المفتاح', cls: 'primary', on: S => { const s = S.C.get('S'); s.closed = !s.closed; S.C.beSteps = 2; } }, { t: 'تفريغ المتسعات', on: S => { S.C.resetState(); } }])],
  readings(S) { const C = S.C; const q = id => C.get(id).val * 1e-6 * C.get(id).v; const Q = q('C1') + q('C2') + q('C3'); const V = C.get('C1').v; const ceq = C.get('C1').val + C.get('C2').val + C.get('C3').val;
    return [rd('ΔV على C1', fmtSI(C.get('C1').v, 'V')), rd('ΔV على C2', fmtSI(C.get('C2').v, 'V')), rd('ΔV على C3', fmtSI(C.get('C3').v, 'V')), rd('Q1 = C1ΔV', fmtSI(q('C1'), 'C')), rd('Q2', fmtSI(q('C2'), 'C')), rd('Q3', fmtSI(q('C3'), 'C')), rd('Q الكلية (المقيسة)', fmtSI(Q, 'C')), rd('Ceq = C1+C2+C3', fmt(ceq, 3, 'µF')), rd('Q الكلية = Ceq × ΔV', fmtSI(ceq * 1e-6 * V, 'C'), 1)]; },
  record(S) { const C = S.C; const ceq = C.get('C1').val + C.get('C2').val + C.get('C3').val; const V = C.get('C1').v; return { ceq, V: +V.toFixed(2), Q: +(ceq * V).toFixed(1) }; }, cols: [['ceq', 'Ceq (µF)'], ['V', 'ΔV (V)'], ['Q', 'Q (µC)']],
  scope: [{ id: 'C1', q: 'v', name: 'V_C1' }, { id: 'R', q: 'i', name: 'I×1000', k: 1000 }]
});

X({ id: 'c_series', ch: 1, sec: '6-1', page: 21, kind: 'تجربة', title: 'ربط المتسعات على التوالي', desc: 'ثلاث متسعات على التوالي بين قطبي بطارية؛ نتحقق من تساوي الشحنات وتوزع فرق الجهد.', circuit: true, method: 'be', fixedDt: 1e-3, probeDt: .002,
  tools: ['بطارية', 'ثلاث متسعات', 'مفتاح', 'مقاومة حماية', 'ثلاثة فولطميترات', 'أسلاك'],
  steps: ['اربط المتسعات على التوالي ثم اربطها بين قطبي البطارية عبر المفتاح.', 'اربط فولطميتراً على التوازي مع كل متسعة.', 'أغلق المفتاح وانتظر اكتمال الشحن.', 'لاحظ أن مجموع قراءات الفولطميترات يساوي فرق جهد البطارية وأن الشحنة على كل متسعة متساوية.'],
  concl: ['Q₁ = Q₂ = Q₃ = Q_total (الشحنة متساوية لأن الصفائح الوسطى تُشحن بالحث).', 'ΔV_total = ΔV₁ + ΔV₂ + ΔV₃ (قانون كيرشوف الثاني).', '1/Ceq = 1/C₁ + 1/C₂ + 1/C₃: تقل السعة المكافئة وتكون أصغر من أصغر سعة؛ لأن الربط على التوالي يعني زيادة البعد بين صفيحتي المتسعة المكافئة.', 'فرق الجهد الأكبر يكون على المتسعة الأصغر سعة.'],
  laws: ['cser', 'kvl', 'capdef'],
  build(C) {
    C.add('battery', 2, 4, 2, 13, { val: 12, id: 'B' }); C.add('switch', 2, 4, 6, 4, { id: 'S' }); C.add('resistor', 6, 4, 9, 4, { val: 1000, id: 'R', label: 'حماية' });
    C.add('capacitor', 9, 4, 14, 4, { val: 6, id: 'C1', label: 'C1', vmax: 8 }); C.add('capacitor', 14, 4, 19, 4, { val: 9, id: 'C2', label: 'C2', vmax: 8 }); C.add('capacitor', 19, 4, 24, 4, { val: 18, id: 'C3', label: 'C3', vmax: 8 });
    C.add('wire', 24, 4, 24, 13); C.add('wire', 24, 13, 2, 13);
    C.add('voltmeter', 9, 9, 14, 9, { id: 'V1' }); C.add('wire', 9, 4, 9, 9); C.add('wire', 14, 4, 14, 9);
    C.add('voltmeter', 15, 10, 19, 10, { id: 'V2' }); C.add('wire', 14, 9, 14, 10); C.add('wire', 14, 10, 15, 10); C.add('wire', 19, 4, 19, 10);
    C.add('voltmeter', 19, 11, 24, 11, { id: 'V3' }); C.add('wire', 19, 10, 19, 11);
  },
  controls: [R('V', 'فرق جهد البطارية', 1, 24, 12, .5, 'V', (v, S) => { S.C.get('B').val = v; }), R('c1', 'C1', 1, 30, 6, 1, 'µF', (v, S) => S.C.get('C1').val = v), R('c2', 'C2', 1, 30, 9, 1, 'µF', (v, S) => S.C.get('C2').val = v), R('c3', 'C3', 1, 30, 18, 1, 'µF', (v, S) => S.C.get('C3').val = v), BT('المفتاح', [{ t: 'غلق / فتح المفتاح', cls: 'primary', on: S => { const s = S.C.get('S'); s.closed = !s.closed; S.C.beSteps = 2; } }, { t: 'تفريغ المتسعات', on: S => S.C.resetState() }])],
  readings(S) { const C = S.C; const g = id => C.get(id); const q = id => g(id).val * 1e-6 * g(id).v; const ceq = 1 / (1 / g('C1').val + 1 / g('C2').val + 1 / g('C3').val);
    return [rd('ΔV1', fmtSI(g('C1').v, 'V')), rd('ΔV2', fmtSI(g('C2').v, 'V')), rd('ΔV3', fmtSI(g('C3').v, 'V')), rd('ΔV1+ΔV2+ΔV3', fmtSI(g('C1').v + g('C2').v + g('C3').v, 'V')), rd('Q1', fmtSI(q('C1'), 'C')), rd('Q2', fmtSI(q('C2'), 'C')), rd('Q3', fmtSI(q('C3'), 'C')), rd('Ceq', fmt(ceq, 3, 'µF')), rd('Q = Ceq × ΔV', fmtSI(ceq * 1e-6 * g('B').val, 'C'), 1)]; },
  scope: [{ id: 'C1', q: 'v', name: 'V1' }, { id: 'C2', q: 'v', name: 'V2' }, { id: 'C3', q: 'v', name: 'V3' }]
});

/* ---- charging / discharging (book fig 27, 29) ---- */
function rcBuild(C) {
  C.add('battery', 2, 4, 2, 13, { val: 12, id: 'B' });
  C.add('wire', 2, 4, 4, 4); C.add('bulb', 4, 4, 8, 4, { val: 20, rated: .5, id: 'L1', label: 'L1' }); C.add('resistor', 8, 4, 12, 4, { val: 100, id: 'R', label: 'R' });
  C.add('switch', 12, 4, 16, 4, { id: 'K1', label: 'K(1)' });
  C.add('galvanometer', 16, 4, 21, 4, { id: 'G' }); C.add('capacitor', 21, 4, 21, 13, { val: 10000, id: 'C', vmax: 12 });
  C.add('switch', 16, 4, 16, 8, { id: 'K2', label: 'K(2)' }); C.add('bulb', 16, 8, 16, 13, { val: 100, rated: 1.2, id: 'L2', label: 'L2' });
  C.add('wire', 21, 13, 16, 13); C.add('wire', 16, 13, 2, 13);
  C.add('voltmeter', 27, 4, 27, 13, { id: 'VC' }); C.add('wire', 21, 4, 27, 4); C.add('wire', 21, 13, 27, 13);
}
function rcPos(S, k) { const C = S.C; C.get('K1').closed = k === 1; C.get('K2').closed = k === 2; C.beSteps = 2; S.pos = k; C.get('C').buf = []; C.get('G').buf = []; }
const rcCommon = {
  circuit: true, method: 'be', fixedDt: 2e-3, probeDt: .01, laws: ['rcI', 'capdef', 'capE'],
  controls: [BT('المفتاح المزدوج K', [{ t: 'الموضع (1): شحن', cls: 'primary', on: S => rcPos(S, 1) }, { t: 'الموضع (2): تفريغ', cls: 'warn', on: S => rcPos(S, 2) }, { t: 'فتح (وسط)', on: S => rcPos(S, 0) }]),
    R('E', 'فرق جهد البطارية', 1, 24, 12, .5, 'V', (v, S) => { S.C.get('B').val = v; S.C.get('C').vmax = v; }), R('R', 'المقاومة R', 10, 1000, 100, 10, 'Ω', (v, S) => S.C.get('R').val = v), R('Cap', 'السعة C', 1000, 30000, 10000, 500, 'µF', (v, S) => S.C.get('C').val = v)],
  readings(S) { const C = S.C, c = C.get('C'); const Rt = S.pos === 2 ? C.get('L2').val : C.get('R').val + C.get('L1').val; const tau = Rt * c.val * 1e-6; const Vb = C.get('B').val;
    return [rd('فرق الجهد بين الصفيحتين', fmtSI(c.v, 'V')), rd('التيار (الكلفانوميتر)', fmtSI(C.get('G').i, 'A')), rd('الشحنة Q = CΔV', fmtSI(c.val * 1e-6 * c.v, 'C')), rd('الطاقة ½CΔV²', fmtSI(.5 * c.val * 1e-6 * c.v * c.v, 'J')), rd('ثابت الزمن τ = RC', fmt(tau, 3, 's')), rd('نسبة الشحن', Math.round(100 * c.v / Vb) + ' %'), rd('موضع المفتاح', S.pos === 1 ? '(1) شحن' : S.pos === 2 ? '(2) تفريغ' : 'مفتوح', 1)]; },
  scope: [{ id: 'C', q: 'v', name: 'ΔV_C (V)', color: '#1f5eff' }, { id: 'G', q: 'i', name: 'I × 100 (A)', color: '#e11d48', k: 100 }],
  scopeWin: () => 8,
  record(S) { const c = S.C.get('C'); return { t: +(S.C.t).toFixed(2), V: +c.v.toFixed(3), I: +(S.C.get('G').i * 1000).toFixed(2) }; }, cols: [['t', 't (s)'], ['V', 'ΔV_C (V)'], ['I', 'I (mA)']]
};
X(Object.assign({}, rcCommon, { id: 'rc_charge', ch: 1, sec: '9-1', page: 31, kind: 'نشاط', title: 'أولاً: كيفية شحن المتسعة', desc: 'دائرة تيار مستمر تحتوي على متسعة ومقاومة (RC)؛ نراقب تيار الشحن بالكلفانوميتر وتوهج المصباح L1.',
  tools: ['بطارية فولطيتها مناسبة', 'كلفانوميتر (G) صفره في وسط التدريجة', 'متسعة ذات الصفيحتين المتوازيتين (A و B)', 'مفتاح مزدوج (K)', 'مقاومة ثابتة R', 'مصباحان متماثلان (L1 و L2)', 'أسلاك توصيل'],
  steps: ['نربط الدائرة الكهربائية كما في الشكل بحيث نجعل المفتاح K في الموضع (1)؛ أي ربط صفيحتي المتسعة بين قطبي البطارية.', 'نلاحظ انحراف مؤشر الكلفانوميتر لحظياً على أحد جانبي صفر التدريجة ثم يعود إلى الصفر، ونلاحظ في الوقت نفسه توهج المصباح L1 بضوء ساطع لبرهة من الزمن ثم ينطفئ.', 'راقب منحني التيار والجهد في راسم الإشارة، وسجّل قراءات في أزمان مختلفة.'],
  concl: ['تيار الشحن يبدأ بمقدار كبير لحظة إغلاق الدائرة I = ΔV/R ثم يتناقص إلى الصفر عند اكتمال الشحن.', 'تنتهي عملية الشحن عندما يتساوى فرق الجهد بين صفيحتي المتسعة مع فرق جهد البطارية.', 'تشحن الصفيحة المربوطة بالقطب الموجب بالشحنة (+Q) والأخرى بالشحنة (−Q) بالمقدار نفسه.', 'المتسعة المشحونة تعمل عمل مفتاح مفتوح في دائرة التيار المستمر بعد اكتمال شحنها.'],
  onReset: S => { S.pos = 0; }, build(C, S) { rcBuild(C); S.pos = 0; }
}));
X(Object.assign({}, rcCommon, { id: 'rc_discharge', ch: 1, sec: '9-1', page: 32, kind: 'نشاط', title: 'ثانياً: كيفية تفريغ المتسعة', desc: 'بعد شحن المتسعة ننقل المفتاح إلى الموضع (2) فنربط صفيحتيها بسلك موصل عبر المصباح L2.',
  tools: ['الدائرة الكهربائية نفسها المستعملة في نشاط الشحن'],
  steps: ['نستعمل الدائرة المربوطة في النشاط السابق (المتسعة مشحونة).', 'نجعل المفتاح K في الموضع (2)؛ أي ربط صفيحتي المتسعة ببعضهما بسلك موصل.', 'نلاحظ انحراف مؤشر الكلفانوميتر لحظياً إلى الجانب الآخر من صفر التدريجة ثم يعود للصفر، ونلاحظ توهج المصباح L2 بضوء ساطع ثم ينطفئ.'],
  concl: ['تيار التفريغ يبدأ بمقدار كبير لحظة ربط الصفيحتين I = ΔV_AB/R ثم يتلاشى بسرعة إلى الصفر عندما يصبح فرق الجهد بين الصفيحتين صفراً.', 'اتجاه تيار التفريغ معاكس لاتجاه تيار الشحن (انحراف الكلفانوميتر إلى الجهة الأخرى).', 'تبقى المتسعة محتفظة بشحنتها مدة طويلة إذا لم يتم ربط صفيحتيها بموصل.'],
  build(C, S) { rcBuild(C); S.pos = 0; const c = C.get('C'); c.q0 = 12; },
  onReset: S => { S.pos = 0; S.C.get('C').vPrev = S.C.get('B').val; }
}));

X({ id: 'cap_dc', ch: 1, sec: '9-1', page: 33, kind: 'تجربة', title: 'متسعة ومصباح في دائرة تيار مستمر (مثال 8)', desc: 'مقارنة ربط المتسعة على التوازي مع المصباح (الشكل 31-a) وعلى التوالي معه (الشكل 31-b).', circuit: true, method: 'be', fixedDt: 1e-3,
  tools: ['بطارية 6V', 'مصباح مقاومته 10Ω', 'مقاومة 20Ω', 'متسعة 5µF', 'أسلاك'],
  steps: ['في الدائرة الأولى المتسعة مربوطة على التوازي مع المصباح: لاحظ توهج المصباح واحسب الشحنة على المتسعة.', 'اختر الدائرة الثانية (المتسعة على التوالي): لاحظ أن المصباح لا يتوهج بعد اكتمال الشحن.'],
  concl: ['الدائرة (a): I = ΔV/(r+R) = 0.2A والمتسعة تحمل فرق جهد المصباح 2V فتكون Q = 10µC و PE = 10µJ.', 'الدائرة (b): بعد اكتمال الشحن تعمل المتسعة كمفتاح مفتوح فينقطع التيار ويكون فرق جهد المتسعة = فرق جهد البطارية 6V فتكون Q = 30µC و PE = 90µJ.'],
  laws: ['capdef', 'capE', 'ohm'],
  build(C, S) { S.cfg = 'a'; capdcBuild(C, 'a'); },
  controls: [SEL('cfg', 'طريقة الربط', [['a', '(a) المتسعة على التوازي مع المصباح'], ['b', '(b) المتسعة على التوالي']], 'a', (v, S, init) => { if (init) return; S.C.clear(); capdcBuild(S.C, v); S.C.resetState(); Runner.stage.fit(60); })],
  readings(S) { const C = S.C, c = C.get('C'); return [rd('تيار الدائرة', fmtSI(C.get('A').i, 'A')), rd('فرق جهد المصباح', fmtSI(C.get('L').v, 'V')), rd('فرق جهد المتسعة', fmtSI(c.v, 'V')), rd('Q = CΔV', fmtSI(c.val * 1e-6 * c.v, 'C')), rd('PE = ½CΔV²', fmtSI(.5 * c.val * 1e-6 * c.v * c.v, 'J'), 1)]; }
});
function capdcBuild(C, cfg) {
  C.add('battery', 2, 4, 2, 12, { val: 6, id: 'B' }); C.add('ammeter', 2, 4, 6, 4, { id: 'A' }); C.add('resistor', 6, 4, 11, 4, { val: 20, id: 'R' });
  if (cfg === 'a') { C.add('bulb', 11, 4, 11, 12, { val: 10, rated: .4, id: 'L' }); C.add('wire', 11, 4, 16, 4); C.add('capacitor', 16, 4, 16, 12, { val: 5, id: 'C', vmax: 6 }); C.add('wire', 16, 12, 11, 12); C.add('wire', 11, 12, 2, 12); }
  else { C.add('bulb', 11, 4, 11, 12, { val: 10, rated: .4, id: 'L' }); C.add('capacitor', 11, 12, 2, 12, { val: 5, id: 'C', vmax: 6 }); }
}
