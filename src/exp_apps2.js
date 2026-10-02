'use strict';
/* ======== Induction stove — clear view of changing flux and eddy currents ======== */
(() => {
  const E = EXPS.find(e => e.id === 'app_stove'); if (!E) return;
  E.steps = ['شغّل الطباخ وراقب العرض البطيء: تيار الملف يتناوب (⊙ خارج الصفحة / ⊗ داخلها) فتنقلب خطوط المجال الزرقاء باستمرار.', 'لاحظ أن خطوط المجال تخترق قاعدة الإناء صعوداً ونزولاً؛ هذا هو الفيض المتغير.', 'راقب التيارات الدوامة (البرتقالية) في قاعدة الإناء وفي المنظر العلوي: تكون أكبر حين يتغير تيار الملف أسرع (عند مروره بالصفر).', 'بدّل إلى الإناء الزجاجي: تخترقه الخطوط نفسها لكن لا تنساب فيه تيارات دوامة لأنه عازل فلا يسخن.', 'زد التردد أو القدرة ولاحظ ازدياد معدل التسخين.'];
  E.controls = E.controls.concat([TG('slow', 'عرض بطيء للتيار المتناوب', true), TG('lines', 'خطوط المجال المغناطيسي', true), TG('eddy', 'التيارات الدوامة', true), TG('top', 'منظر علوي لقاعدة الإناء', true)]);
  const oldSetup = E.setup;
  E.setup = S => { oldSetup(S); S.ph = 0; S.hI = []; S.hE = []; };
  const oldUpdate = E.update;
  E.update = (S, dt) => {
    oldUpdate(S, dt); const p = S.p; const fv = p.slow !== false ? .35 : 4;
    S.ph = (S.ph || 0) + dt * TAU * fv * (p.f / 25);
    const A = p.P / 10; S.Ic = A * Math.sin(S.ph); S.Ie = p.pot === 'metal' ? -A * Math.cos(S.ph) * .8 : 0;
    hist(S, 'hI', S.Ic, 300); hist(S, 'hE', S.Ie, 300);
  };
  const sym = (ctx, x, y, r, out, col, al) => {
    ctx.globalAlpha = al; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
    ctx.fillStyle = col; if (out) { ctx.beginPath(); ctx.arc(x, y, r * .32, 0, TAU); ctx.fill(); } else { const k = r * .6; ctx.beginPath(); ctx.moveTo(x - k, y - k); ctx.lineTo(x + k, y + k); ctx.moveTo(x + k, y - k); ctx.lineTo(x - k, y + k); ctx.stroke(); }
    ctx.globalAlpha = 1;
  };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p; const showTop = p.top !== false && w > 620;
    const cx = showTop ? w * .4 : w * .5, top = h * .64, metal = p.pot === 'metal';
    const I = S.Ic || 0, Ie = S.Ie || 0, sI = Math.sign(I) || 1, aI = Math.abs(I);
    // stove body + glass top
    ctx.fillStyle = '#1f2937'; rr(ctx, cx - 230, top, 460, 84, 10); ctx.fill();
    ctx.fillStyle = 'rgba(148,163,184,.55)'; ctx.fillRect(cx - 225, top, 450, 7);
    ctx.fillStyle = '#374151'; ctx.fillRect(cx - 170, top + 52, 340, 10); // ferrite plate
    // pot
    const pw = 150, base = top - 2, bt = 14, ph = 150;
    const Tn = clamp((S.T - 25) / 75, 0, 1);
    if (metal) { ctx.fillStyle = '#9ca3af'; ctx.strokeStyle = '#6b7280'; } else { ctx.fillStyle = 'rgba(186,230,253,.35)'; ctx.strokeStyle = '#38bdf8'; }
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - pw, base - ph); ctx.lineTo(cx - pw, base); ctx.lineTo(cx + pw, base); ctx.lineTo(cx + pw, base - ph); ctx.stroke();
    const wc = `rgb(${Math.round(80 + (S.T - 25) * 2)},${Math.round(160 - (S.T - 25))},${Math.round(230 - (S.T - 25) * 1.8)})`;
    setRaw(ctx, 1); ctx.fillStyle = wc; ctx.globalAlpha = .75; ctx.fillRect(cx - pw + 3, base - ph + 30, 2 * pw - 6, ph - 30 - bt); ctx.globalAlpha = 1;
    // base (heated when metal)
    ctx.fillStyle = metal ? `rgb(${Math.round(156 + 90 * Tn)},${Math.round(163 - 70 * Tn)},${Math.round(175 - 120 * Tn)})` : 'rgba(186,230,253,.6)'; ctx.fillRect(cx - pw, base - bt, 2 * pw, bt); setRaw(ctx, 0);
    S.bub.forEach(b => { ctx.strokeStyle = '#e0f2fe'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx - pw + 15 + b.x * (2 * pw - 30), base - bt - 6 - b.y * (ph - 50), 4, 0, TAU); ctx.stroke(); });
    // field lines: loops around each half of the coil (up through the centre, out over the top, down outside)
    const yc = top + 30;
    if (p.lines !== false && p.P > 0) {
      const al = clamp(aI * 1.1, .08, .95);
      [-1, 1].forEach(side => {
        const xc = cx + side * 90;
        for (let k = 0; k < 4; k++) {
          const rx = 74 + k * 10, ry = 30 + k * 38;
          ctx.strokeStyle = `rgba(37,99,235,${al})`; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.ellipse(xc, yc, rx, ry, 0, 0, TAU); ctx.stroke();
          // arrow at top of loop: I>0 → field spreads outward at the top
          const dir = side * sI; const tx = xc, ty = yc - ry;
          G.arrow(ctx, tx - dir * 8, ty, tx + dir * 8, ty, `rgba(37,99,235,${al})`, 2, 8);
          // arrow on the inner side (vertical, through the centre)
          const ix = xc - side * rx; G.arrow(ctx, ix, yc + sI * 8, ix, yc - sI * 8, `rgba(37,99,235,${al})`, 2, 8);
        }
      });
      G.text(ctx, sI > 0 ? 'B ↑ نحو الأعلى خلال الإناء' : 'B ↓ نحو الأسفل خلال الإناء', cx, base - ph - 16, { s: 12, w: 800, c: '#fff', bg: `rgba(37,99,235,${clamp(.35 + aI, .35, 1)})`, raw: 1 });
    }
    // coil cross-section: left ⊙ / right ⊗ for I>0
    for (let k = 0; k < 6; k++) [-1, 1].forEach(side => {
      const x = cx + side * (36 + k * 22);
      ctx.fillStyle = '#c87533'; ctx.beginPath(); ctx.arc(x, yc, 8, 0, TAU); ctx.fill();
      if (aI > .03) sym(ctx, x, yc, 7, side < 0 ? sI > 0 : sI < 0, '#fff', clamp(aI * 1.4, .3, 1));
    });
    // eddy currents in the base (cross-section): opposite sense to coil current change
    if (metal && p.eddy !== false && p.P > 0) {
      const sE = Math.sign(Ie) || 1, aE = Math.abs(Ie);
      for (let k = 0; k < 5; k++) [-1, 1].forEach(side => { const x = cx + side * (30 + k * 26); if (aE > .03) sym(ctx, x, base - bt / 2, 5, side < 0 ? sE > 0 : sE < 0, '#f59e0b', clamp(aE * 1.3, .25, 1)); });
      if (aE > .1) G.text(ctx, '← تيارات دوامة في قاعدة الإناء', cx + pw + 92, base - 7, { s: 12, w: 800, c: '#fff', bg: 'rgba(217,119,6,.9)', raw: 1 });
    } else if (!metal) G.text(ctx, 'الزجاج عازل: لا تيارات فيه', cx + pw + 80, base - 7, { s: 12, w: 800, c: '#fff', bg: 'rgba(14,116,144,.9)', raw: 1 });
    G.text(ctx, 'ملف التسخين (مقطع عرضي) — تيار متناوب', cx, top + 76, { s: 12, c: '#f8fafc', raw: 1 });
    G.text(ctx, Math.round(S.T) + ' °C', cx + pw + 40, base - ph / 2, { s: 18, w: 900, c: S.T > 80 ? '#dc2626' : '#1d4ed8' });
    // AC phase indicator
    const gx = cx - pw - 90, gy = base - ph + 10;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(gx, gy + 30, 26, 0, TAU); ctx.stroke();
    G.arrow(ctx, gx, gy + 30, gx + 24 * Math.cos(S.ph || 0), gy + 30 - 24 * Math.sin(S.ph || 0), '#2563eb', 2.5, 8);
    G.text(ctx, 'طور التيار', gx, gy - 6, { s: 11, c: '#475569' });
    G.text(ctx, p.slow !== false ? 'عرض مُبطّأ جداً' : p.f + ' kHz', gx, gy + 72, { s: 11, c: '#64748b' });
    // top-view inset
    if (showTop) {
      const ix = w * .83, iy = h * .36, R = Math.min(96, h * .2);
      const cvb = ctx.canvas, rw = cvb.__raw; cvb.__raw = true;
      ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, ix - R - 18, iy - R - 38, 2 * R + 36, 2 * R + 84, 12); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.stroke();
      cvb.__raw = rw;
      G.text(ctx, 'منظر علوي لقاعدة الإناء', ix, iy - R - 20, { s: 12, w: 800, c: '#1e293b', raw: 1 }); setRaw(ctx, 1);
      ctx.fillStyle = metal ? '#cbd5e1' : 'rgba(186,230,253,.55)'; ctx.beginPath(); ctx.arc(ix, iy, R * .82, 0, TAU); ctx.fill();
      // coil (below, dashed)
      ctx.setLineDash([5, 4]); ctx.strokeStyle = '#c87533'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ix, iy, R * .95, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
      const circArrows = (r, ccw, col, n, wd, spd) => { for (let k = 0; k < n; k++) { const a = TAU * k / n + (ccw ? -1 : 1) * (S.t || 0) * spd; const d = (ccw ? -1 : 1) * .3; G.arrow(ctx, ix + r * Math.cos(a), iy + r * Math.sin(a), ix + r * Math.cos(a + d), iy + r * Math.sin(a + d), col, wd, 8); } };
      if (aI > .03) circArrows(R * .95, sI > 0, '#c87533', 4, 2, .6);
      // B through the base (top view: up = out of the page)
      if (p.lines !== false && aI > .03) for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if (a || b) sym(ctx, ix + a * R * .42, iy + b * R * .42, 6, sI > 0, '#2563eb', clamp(aI, .25, .9));
      if (aI > .03) sym(ctx, ix, iy, 11, sI > 0, '#2563eb', clamp(aI * 1.2, .3, 1));
      if (metal && p.eddy !== false) {
        const aE = Math.abs(Ie); ctx.globalAlpha = clamp(aE * 1.2, .1, 1);
        [.3, .52, .72].forEach(f => { ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ix, iy, R * f, 0, TAU); ctx.stroke(); });
        ctx.globalAlpha = 1;
        if (aE > .05) [.3, .52, .72].forEach(f => circArrows(R * f, Ie > 0, `rgba(217,119,6,${clamp(aE * 1.3, .3, 1)})`, 3, 2.4, 1.2));
      }
      setRaw(ctx, 0); G.text(ctx, '⊙ B خارج  ⊗ B داخل', ix, iy + R + 12, { s: 11, c: '#2563eb', w: 800, raw: 1 });
      G.text(ctx, metal ? 'البرتقالي: التيار الدوامي (يعاكس تغيّر تيار الملف)' : 'لا تيارات دوامة في الزجاج', ix, iy + R + 30, { s: 10.5, c: '#b45309', w: 700, raw: 1 });
    }
  };
  E.readings = S => { const p = S.p; const m = p.pot === 'metal'; return [rd('درجة حرارة الماء', fmt(S.T, 3, '°C')), rd('تيار الملف (نسبي)', fmt(S.Ic || 0, 2)), rd('التيار الدوامي (نسبي)', m ? fmt(S.Ie || 0, 2) : '0'), rd('اتجاه B خلال القاعدة', (S.Ic || 0) >= 0 ? 'نحو الأعلى ↑' : 'نحو الأسفل ↓'), rd('معدل التسخين', m ? fmt(p.P * p.f / 25 * 1.2, 3, '°C/s') : 'صفر', 1)]; };
  E.live = { title: 'تيار الملف والتيار الدوامي (عرض بطيء)', data: S => ({ series: [{ pts: S.hI || [], color: '#2563eb', name: 'تيار الملف' }, { pts: S.hE || [], color: '#d97706', name: 'التيار الدوامي' }], opts: { xl: 't', y0zero: false, ymin: -1.05, ymax: 1.05 } }) };
  E.explain = S => S.p.pot === 'metal' ? 'التيار المتناوب في الملف يقلب اتجاه المجال باستمرار، فالفيض الذي يخترق قاعدة الإناء <b>يتغير</b>، فتتولد فيها <b>تيارات دوامة</b> بعكس اتجاه التغير (لنز). لاحظ في الرسم البياني أن التيار الدوامي أكبر ما يكون حين يمر تيار الملف بالصفر (أسرع تغير) — وحرارتها I²R تسخن الماء.' : 'خطوط المجال تخترق الإناء الزجاجي كما تخترق المعدني، لكن الزجاج <b>عازل</b>: لا إلكترونات حرة لتنساب فيه تيارات دوامة، فلا يسخن.';
})();
