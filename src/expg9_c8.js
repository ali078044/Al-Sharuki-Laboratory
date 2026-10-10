'use strict';
/* ====================== الثالث المتوسط — الفصل الثامن: تكنولوجيا مصادر الطاقة (ch 38, ص 147–160) ======================
   Merged experiments (book order): g9_c8_life (1-8، 2-8) · g9_c8_current (1-2-8، 2-2-8، 3-2-8) · g9_c8_solar (3-8، 1-3-8)
   · g9_c8_renew (2-3-8، 3-3-8، 4-3-8) · g9_c8_review (أسئلة الفصل).
   Kit Q38 (green theme) extends Q35/Q34/Q33: sky, sun, clouds, flames, pipes with flowing water/steam, turbines, generators,
   pylons, houses, dial gauges, thermometers, level bars. Every moving thing eases toward its target in update(S, dt). */
LW({ id: 'g9_l8_energy', cat: 38, name: 'الطاقة وتحولاتها', fx: 'الطاقة = المقدرة على إنجاز شغل ، <i>E</i> = <i>P</i> × <i>t</i> (J)', sym: 'الطاقة هي المقدرة على إنجاز شغل، ويمكن تحويلها من صورة إلى أخرى: ضوئية، حرارية، صوتية، ميكانيكية، كيميائية، نووية، كهربائية. أهم وحدات قياسها الجول (Joule). الطاقة التي يستهلكها جهاز = قدرته × زمن تشغيله.', calc: { in: [['P', 'قدرة الجهاز P', 'W', 60], ['t', 'زمن التشغيل t', 's', 600]], out: 'الطاقة E', u: 'J', f: v => v.P * v.t } });
LW({ id: 'g9_l8_hydro', cat: 38, name: 'قدرة المحطة الكهرومائية', fx: '<i>P</i> = <i>η</i> <i>ρ</i> <i>g</i> <i>Q</i> <i>h</i>', sym: 'طاقة الوضع المخزونة في الماء خلف السد (m g h) تتحول إلى طاقة حركية عند سقوطه ثم إلى طاقة كهربائية بالتوربين والمولد. القدرة تزداد بزيادة ارتفاع الماء h وكمية الماء المتدفقة في الثانية Q. (ρ كثافة الماء 1000 kg/m³ ، η كفاءة المحطة).', calc: { in: [['Q', 'تدفق الماء Q', 'm³/s', 100], ['h', 'ارتفاع الماء h', 'm', 60], ['e', 'الكفاءة η', '', .9]], out: 'القدرة P', u: 'MW', f: v => v.e * 1000 * 9.8 * v.Q * v.h / 1e6 } });
LW({ id: 'g9_l8_fission', cat: 38, name: 'الانشطار النووي والتفاعل المتسلسل', fx: 'U-235 + n → نواتان + 2–3 n + طاقة', sym: 'في المفاعل النووي يصطدم نيوترون بنواة اليورانيوم 235 فتنشطر إلى نواتين أصغر وتتحرر طاقة حرارية هائلة ونيوترونان أو ثلاثة تشطر نوى أخرى (تفاعل متسلسل). قضبان التحكم (من الكادميوم) تمتص النيوترونات الزائدة فتبقي التفاعل تحت السيطرة. انشطار نواة واحدة يحرر نحو 200 MeV ≈ 3.2×10⁻¹¹ J.', calc: { in: [['N', 'عدد النوى المنشطرة', '', 1e20]], out: 'الطاقة المتحررة', u: 'J', f: v => v.N * 3.2e-11 } });
LW({ id: 'g9_l8_solar', cat: 38, name: 'قدرة اللوح الشمسي', fx: '<i>P</i> = <i>η</i> × <i>I</i> × <i>A</i> × cos<i>θ</i>', sym: 'الخلية الشمسية تحول طاقة ضوء الشمس إلى طاقة كهربائية. القدرة تعتمد على شدة الإشعاع الشمسي I (W/m²) ومساحة اللوح A وكفاءة الخلايا η وزاوية سقوط الأشعة θ على اللوح: أكبر قدرة عندما تسقط الأشعة عمودية على اللوح (θ = 0).', calc: { in: [['I', 'شدة الإشعاع I', 'W/m²', 1000], ['A', 'مساحة اللوح A', 'm²', 1.6], ['e', 'الكفاءة η', '', .18], ['th', 'زاوية السقوط θ', '°', 0]], out: 'القدرة الكهربائية P', u: 'W', f: v => v.e * v.I * v.A * Math.cos(v.th * Math.PI / 180) } });
LW({ id: 'g9_l8_wind', cat: 38, name: 'قدرة توربين الرياح', fx: '<i>P</i> = ½ <i>C</i> <i>ρ</i> <i>A</i> <i>v</i><sup>3</sup>', sym: 'الرياح تدير ريش المروحة المتصلة بمولد كهربائي. القدرة تتناسب مع مكعب سرعة الرياح v³ ومع مساحة دوران الريش A؛ لذلك يجب ألا تقل سرعة الرياح عن 5.4 m/s وأن تهب لساعات طويلة. (ρ كثافة الهواء ≈ 1.2 kg/m³ ، C معامل الاستفادة ≈ 0.4).', calc: { in: [['v', 'سرعة الرياح v', 'm/s', 10], ['r', 'طول الريشة r', 'm', 40]], out: 'القدرة P', u: 'kW', f: v => .5 * .4 * 1.2 * Math.PI * v.r * v.r * v.v ** 3 / 1000 } });

const Q38 = Object.assign(Object.create(Q35), {
  C: '#047857',
  card(ctx, S, L, o) { return Q31.card(ctx, S, L, Object.assign({ bd: '#059669' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#047857', y); },
  chips(S, id, list, y, cur, click, o = {}) { return Q33.chips(S, id, list, y, cur, click, Object.assign({ col: '#047857' }, o)); },
  drawChips(ctx, list) { list.forEach(b => Q33.drawBtn(ctx, b, b._lab, b._on ? (b._col || '#047857') : '#64748b', b._on)); },
  /* ease S[k] toward v */
  ez(S, k, v, dt, r = 6) { S[k] = (S[k] == null ? v : S[k]) + (v - (S[k] == null ? v : S[k])) * Math.min(1, dt * r); return S[k]; },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ecfdf5'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* rounded scene panel with sky + ground; returns ground y */
  scene(ctx, x, y, w, h, o = {}) { const gy = y + h * (o.gf || .78), day = o.day == null ? 1 : o.day;
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.18)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 4; ctx.fillStyle = '#fff'; rr(ctx, x, y, w, h, 16); ctx.fill(); ctx.restore();
      ctx.save(); rr(ctx, x, y, w, h, 16); ctx.clip();
      const s = ctx.createLinearGradient(0, y, 0, gy); s.addColorStop(0, day > .5 ? '#38bdf8' : '#1e3a8a'); s.addColorStop(1, day > .5 ? '#e0f2fe' : '#64748b'); ctx.fillStyle = s; ctx.fillRect(x, y, w, gy - y);
      if (day < 1) { ctx.fillStyle = 'rgba(15,23,42,' + (.45 * (1 - day)) + ')'; ctx.fillRect(x, y, w, gy - y); }
      const g = ctx.createLinearGradient(0, gy, 0, y + h); g.addColorStop(0, o.gc || '#65a30d'); g.addColorStop(.12, o.gc2 || '#4d7c0f'); g.addColorStop(1, o.gc3 || '#78350f'); ctx.fillStyle = g; ctx.fillRect(x, gy, w, y + h - gy);
      ctx.restore(); ctx.strokeStyle = 'rgba(100,116,139,.5)'; ctx.lineWidth = 1.5; rr(ctx, x, y, w, h, 16); ctx.stroke(); });
    return gy; },
  sun(ctx, x, y, r, a = 1, ph = 0) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; let g = ctx.createRadialGradient(x, y, r * .2, x, y, r * 3); g.addColorStop(0, 'rgba(254,240,138,.9)'); g.addColorStop(.35, 'rgba(253,224,71,.35)'); g.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 3, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(250,204,21,.85)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let k = 0; k < 12; k++) { const q = k / 12 * TAU + ph * .3, l = r * (1.35 + .15 * Math.sin(ph * 3 + k)); ctx.beginPath(); ctx.moveTo(x + Math.cos(q) * r * 1.15, y + Math.sin(q) * r * 1.15); ctx.lineTo(x + Math.cos(q) * l, y + Math.sin(q) * l); ctx.stroke(); }
    g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); g.addColorStop(0, '#fffbeb'); g.addColorStop(.5, '#fde047'); g.addColorStop(1, '#f59e0b'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore(); }); },
  cloud(ctx, x, y, s = 1, a = 1, dark) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; const g = ctx.createLinearGradient(0, y - 30 * s, 0, y + 16 * s); g.addColorStop(0, dark ? '#cbd5e1' : '#fff'); g.addColorStop(1, dark ? '#64748b' : '#cbd5e1'); ctx.fillStyle = g;
    ctx.beginPath(); [[-30, 4, 18], [-10, -10, 24], [16, -6, 20], [34, 6, 15], [0, 8, 20]].forEach(([dx, dy, r]) => { ctx.moveTo(x + dx * s + r * s, y + dy * s); ctx.arc(x + dx * s, y + dy * s, r * s, 0, TAU); }); ctx.fill(); ctx.restore(); }); },
  flame(ctx, x, y, s, ph, o = {}) { if (s < .03) return; K.raw(ctx, () => { ctx.save(); const n = o.n || 5, sp = o.sp || 14;
    for (let k = 0; k < n; k++) { const xx = x + (k - (n - 1) / 2) * sp, hh = (26 + 8 * Math.sin(ph * 9 + k * 1.7)) * s, ww = 8 * Math.max(.5, s);
      const g = ctx.createLinearGradient(0, y, 0, y - hh); g.addColorStop(0, o.blue ? '#1d4ed8' : '#dc2626'); g.addColorStop(.35, o.blue ? '#60a5fa' : '#f97316'); g.addColorStop(1, 'rgba(254,240,138,.1)'); ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(xx - ww, y); ctx.quadraticCurveTo(xx - ww, y - hh * .5, xx + Math.sin(ph * 7 + k) * 3, y - hh); ctx.quadraticCurveTo(xx + ww, y - hh * .5, xx + ww, y); ctx.closePath(); ctx.fill(); } ctx.restore(); }); },
  /* thick pipe along points */
  pipe(ctx, pts, o = {}) { const w = o.w || 12; K.raw(ctx, () => { ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; const P = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); };
    P(); ctx.strokeStyle = '#334155'; ctx.lineWidth = w + 4; ctx.stroke(); P(); ctx.strokeStyle = o.col || '#94a3b8'; ctx.lineWidth = w; ctx.stroke(); P(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = w * .25; ctx.stroke(); ctx.restore(); }); },
  /* moving blobs along a path; ph = distance travelled (px) */
  stream(ctx, pts, ph, col, o = {}) { const L = Q33.plen(pts); if (L < 4) return; const sp = o.sp || 22, n = Math.floor(L / sp), off = (ph % sp + sp) % sp;
    K.raw(ctx, () => { ctx.save(); ctx.fillStyle = col; ctx.globalAlpha = o.a == null ? .9 : o.a; for (let k = 0; k <= n; k++) { const d = k * sp + off; if (d > L) continue; const [x, y] = Q33.at(pts, d); ctx.beginPath(); ctx.arc(x, y, o.r || 3.2, 0, TAU); ctx.fill(); } ctx.restore(); }); },
  /* turbine wheel seen from the side */
  turb(ctx, x, y, r, rot, o = {}) { const n = o.n || 10; K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    for (let k = 0; k < n; k++) { ctx.rotate(TAU / n); const g = ctx.createLinearGradient(0, 0, r, 0); g.addColorStop(0, '#64748b'); g.addColorStop(1, o.col || '#cbd5e1'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(r * .2, -3); ctx.quadraticCurveTo(r * .7, -r * .32, r, -r * .1); ctx.lineTo(r, r * .08); ctx.quadraticCurveTo(r * .6, -r * .05, r * .2, 4); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.4)'; ctx.lineWidth = 1; ctx.stroke(); }
    const g = ctx.createRadialGradient(-r * .06, -r * .06, 1, 0, 0, r * .24); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#334155'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r * .22, 0, TAU); ctx.fill(); ctx.restore(); }); },
  /* casing box with a round window around a turbine */
  casing(ctx, x, y, w, h, lab, col) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2); g.addColorStop(0, shade(col || '#64748b', 50)); g.addColorStop(.5, col || '#64748b'); g.addColorStop(1, shade(col || '#64748b', -40)); ctx.fillStyle = g; rr(ctx, x - w / 2, y - h / 2, w, h, 12); ctx.fill(); ctx.restore(); });
    if (lab) Q33.T(ctx, lab, x, y + h / 2 + 14, { s: 11.5, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.85)' }); },
  /* generator: drum with a rotating coil seen through a window; on = glowing output */
  gen(ctx, x, y, s, rot, on, o = {}) { const w = 70 * s, h = 58 * s;
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; let g = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2); g.addColorStop(0, '#6ee7b7'); g.addColorStop(.45, '#059669'); g.addColorStop(1, '#064e3b'); ctx.fillStyle = g; rr(ctx, x - w / 2, y - h / 2, w, h, 14 * s); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(x, y, h * .34, 0, TAU); ctx.fill(); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 4 * s; ctx.strokeRect(-h * .22, -h * .12, h * .44, h * .24); ctx.fillStyle = '#ef4444'; ctx.fillRect(-h * .3, -h * .3, h * .1, h * .6); ctx.fillStyle = '#3b82f6'; ctx.fillRect(h * .2, -h * .3, h * .1, h * .6); ctx.restore();
      if (on > .05) { ctx.strokeStyle = 'rgba(250,204,21,' + Math.min(1, on) + ')'; ctx.lineWidth = 2.5; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x, y, h * .4 + k * 5, -1.2 + rot % .4, -.4 + rot % .4); ctx.stroke(); } } });
    if (o.lab !== '') Q33.T(ctx, o.lab || 'مولد', x, y + h / 2 + 13, { s: 11.5, w: 900, c: '#fff', bg: '#047857' });
    return { x: x + w / 2, y }; },
  /* steel lattice pylon, base at (x, yb) */
  pylon(ctx, x, yb, h) { K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; const t = yb - h; ctx.beginPath(); ctx.moveTo(x - 16, yb); ctx.lineTo(x - 4, t); ctx.lineTo(x + 4, t); ctx.lineTo(x + 16, yb); for (let k = 1; k < 6; k++) { const y1 = yb - h * k / 6, y0 = yb - h * (k - 1) / 6, a = 16 - 12 * k / 6, b = 16 - 12 * (k - 1) / 6; ctx.moveTo(x - b, y0); ctx.lineTo(x + a, y1); ctx.moveTo(x + b, y0); ctx.lineTo(x - a, y1); }
    ctx.moveTo(x - 22, t + 12); ctx.lineTo(x + 22, t + 12); ctx.moveTo(x - 16, t + 26); ctx.lineTo(x + 16, t + 26); ctx.stroke(); ctx.restore(); }); return [[x - 22, yb - h + 12], [x + 22, yb - h + 12]]; },
  /* small house, base centre (x, yb); b = light 0..1 */
  house(ctx, x, yb, s, b) { K.raw(ctx, () => { ctx.save(); const w = 46 * s, h = 34 * s; ctx.fillStyle = '#fde68a'; ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1.5; ctx.fillRect(x - w / 2, yb - h, w, h); ctx.strokeRect(x - w / 2, yb - h, w, h); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(x - w / 2 - 6 * s, yb - h); ctx.lineTo(x, yb - h - 24 * s); ctx.lineTo(x + w / 2 + 6 * s, yb - h); ctx.closePath(); ctx.fill();
    [-1, 1].forEach(d => { const wx = x + d * w * .24 - 7 * s, wy = yb - h * .72; if (b > .05) { ctx.save(); ctx.shadowColor = 'rgba(250,204,21,.9)'; ctx.shadowBlur = 14 * b; ctx.fillStyle = 'rgba(254,240,138,' + (.4 + .6 * b) + ')'; ctx.fillRect(wx, wy, 14 * s, 12 * s); ctx.restore(); } else { ctx.fillStyle = '#334155'; ctx.fillRect(wx, wy, 14 * s, 12 * s); } }); ctx.restore(); }); },
  /* dial gauge: f 0..1 (eased by caller) */
  gauge(ctx, x, y, r, f, lab, val, col) { col = col || '#047857'; K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r + 6); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#cbd5e1'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r + 6, 0, TAU); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); const a0 = Math.PI * .75, a1 = Math.PI * 2.25; ctx.lineWidth = 6; ctx.strokeStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x, y, r - 7, a0, a1); ctx.stroke(); ctx.strokeStyle = '#ef4444'; ctx.beginPath(); ctx.arc(x, y, r - 7, a0 + (a1 - a0) * .85, a1); ctx.stroke(); ctx.strokeStyle = col; ctx.beginPath(); ctx.arc(x, y, r - 7, a0, a0 + (a1 - a0) * clamp(f, 0, 1)); ctx.stroke();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; for (let k = 0; k <= 10; k++) { const a = a0 + (a1 - a0) * k / 10; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * (r - 12), y + Math.sin(a) * (r - 12)); ctx.lineTo(x + Math.cos(a) * (r - (k % 5 ? 16 : 20)), y + Math.sin(a) * (r - (k % 5 ? 16 : 20))); ctx.stroke(); }
    const a = a0 + (a1 - a0) * clamp(f, -.02, 1.04); ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * 6, y - Math.sin(a) * 6); ctx.lineTo(x + Math.cos(a) * (r - 12), y + Math.sin(a) * (r - 12)); ctx.stroke(); ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill(); });
    if (val != null) Q33.T(ctx, val, x, y + r + 15, { s: 11.5, w: 900, c: '#0f172a' }); if (lab) Q33.T(ctx, lab, x, y + r + (val != null ? 33 : 16), { s: 11, w: 900, c: col }); },
  /* thermometer: bulb at bottom (x, yb), height h, f 0..1 */
  thermo(ctx, x, yb, h, f, lab) { K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; rr(ctx, x - 7, yb - h, 14, h, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(x, yb + 6, 11, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(x, yb + 6, 8, 0, TAU); ctx.fill(); const t = (h - 12) * clamp(f, 0, 1); ctx.fillRect(x - 3, yb - t - 4, 6, t + 6); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; for (let k = 1; k < 10; k++) { const y = yb - 4 - (h - 12) * k / 10; ctx.beginPath(); ctx.moveTo(x + 7, y); ctx.lineTo(x + (k % 5 ? 11 : 14), y); ctx.stroke(); } ctx.restore(); });
    if (lab) Q33.T(ctx, lab, x, yb + 30, { s: 11, w: 900, c: '#fff', bg: '#dc2626' }); },
  /* vertical level bar */
  bar(ctx, x, y, w, h, f, col, lab, val) { K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; rr(ctx, x - w / 2, y, w, h, 6); ctx.fill(); ctx.stroke(); const hh = (h - 6) * clamp(f, 0, 1); const g = ctx.createLinearGradient(0, y + h - hh, 0, y + h); g.addColorStop(0, shade(col, 40)); g.addColorStop(1, col); ctx.fillStyle = g; rr(ctx, x - w / 2 + 3, y + h - 3 - hh, w - 6, hh, 4); ctx.fill(); });
    if (val != null) Q33.T(ctx, val, x, y - 11, { s: 11, w: 900, c: '#0f172a' }); if (lab) Q33.T(ctx, lab, x, y + h + 13, { s: 10.5, w: 900, c: '#334155' }); },
  arrow(ctx, x1, y1, x2, y2, col, w = 3, hs = 10) { K.raw(ctx, () => { G.arrow(ctx, x1, y1, x2, y2, col, w, hs); }); },
  /* energy chain row of pills joined by arrows (right → left reading order); items [label, colour, on] */
  chain(ctx, x1, x0, y, items, o = {}) { const n = items.length, sp = (x1 - x0) / n;
    items.forEach((it, i) => { const cx = x1 - sp * (i + .5); Q33.T(ctx, it[0], cx, y, { s: o.s || 11.5, w: 900, c: '#fff', bg: it[2] === 0 ? '#94a3b8' : it[1] });
      if (i < n - 1) Q38.arrow(ctx, cx - sp * .5 + 14, y, cx - sp * .5 - 2, y, it[2] === 0 ? '#94a3b8' : '#334155', 2.4, 7); }); },
  /* stacked labelled readout box under the card */
  panel(ctx, x1, y, wd, rows, o = {}) { const lh = o.lh || 24, h = rows.length * lh + 12, x0 = x1 - wd;
    K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.94)'; ctx.strokeStyle = o.bd || '#059669'; ctx.lineWidth = 2; rr(ctx, x0, y, wd, h, 12); ctx.fill(); ctx.stroke(); });
    rows.forEach((r, i) => { const yy = y + 6 + lh * (i + .5); Q33.T(ctx, r[0], x1 - 12, yy, { s: 12, w: 800, c: '#334155', a: 'right' }); Q33.T(ctx, /[\u0600-\u06FF]/.test(r[1]) ? r[1] : '\u2066' + r[1] + '\u2069', x0 + 12, yy, { s: 12.5, w: 900, c: r[2] || '#047857', a: 'left' }); });
    return h; }
});

/* =============== A1 — الطاقة في حياتنا: أجهزة تستهلك الطاقة وصور الطاقة وتحولاتها (1-8، ص 149–150، الشكلان 1 و 2) =============== */
(() => {
  const FM = { l: ['ضوئية', '#ca8a04', '💡'], h: ['حرارية', '#dc2626', '🔥'], s: ['صوتية', '#7c3aed', '🔊'], k: ['ميكانيكية', '#2563eb', '⚙️'], c: ['كيميائية', '#16a34a', '🔋'], n: ['نووية', '#0891b2', '☢️'], e: ['كهربائية', '#f59e0b', '⚡'] };
  const DV = [['lamp', 'مصباح', '💡', 60, [['l', .1, 1], ['h', .9, 0]]], ['heat', 'مدفأة', '♨️', 1000, [['h', 1, 1]]], ['fan', 'مروحة', '🌀', 80, [['k', .7, 1], ['h', .2, 0], ['s', .1, 0]]],
    ['radio', 'مذياع', '📻', 20, [['s', .3, 1], ['h', .7, 0]]], ['phone', 'شاحن هاتف', '📱', 10, [['c', .8, 1], ['h', .2, 0]]], ['tv', 'تلفاز', '📺', 100, [['l', .3, 1], ['s', .1, 1], ['h', .6, 0]]]];
  const D = { id: 'g9_en_forms', page: 149, fig: 'الشكلان 1 و 2',
    desc: 'الطاقة إحدى المقومات الرئيسة للمجتمعات المتحضرة، نحتاج إليها في تشغيل المصانع وتحريك وسائط النقل وتشغيل الأدوات المنزلية (الشكل 1). للطاقة صور متعددة: الضوء والحرارة والصوت والطاقة الميكانيكية التي تحرك الآلات والطاقة الكيميائية المخزونة في أواصر الذرات والجزيئات والطاقة النووية، ويمكن تحويلها إلى طاقة كهربائية (الشكل 2). الطاقة هي المقدرة على إنجاز شغل، وتتحول من صورة إلى أخرى، وأهم وحداتها الجول (Joule).',
    tags: 'الطاقة في حياتنا صور الطاقة ضوئية حرارية صوتية ميكانيكية كيميائية نووية كهربائية تحويل الطاقة الجول أجهزة منزلية',
    tools: ['مصباح', 'مدفأة', 'مروحة', 'مذياع', 'شاحن هاتف', 'تلفاز', 'عداد طاقة'],
    steps: ['اضغط على أي جهاز لتشغيله: إلى أي صور تتحول الطاقة الكهربائية فيه؟', 'اختر صورة من صور الطاقة في الصف العلوي من الأزرار: أي الأجهزة تنتجها؟', 'راقب عداد الطاقة بالجول، وغيّر «تسريع الزمن» من اللوحة.'],
    concl: ['الطاقة هي المقدرة على إنجاز شغل، وأهم وحداتها الجول J.', 'للطاقة صور متعددة: ضوئية، حرارية، صوتية، ميكانيكية، كيميائية، نووية، كهربائية.', 'الطاقة تتحول من صورة إلى أخرى، وجزء منها يضيع غالباً بشكل حرارة.'],
    laws: ['g9_l8_energy'],
    controls: [R('k', 'تسريع الزمن', 1, 60, 1, 1, '×'), TG('sk', 'مخطط الطاقة المفيدة والضائعة', true, null, 'energy')],
    setup(S) { S.on = { lamp: 1 }; S.sel = 'lamp'; S.fm = ''; S.E = 0; S.ph = 0; S.lv = {}; DV.forEach(d => { S.lv[d[0]] = d[0] === 'lamp' ? 1 : 0; }); },
    P(S) { return DV.reduce((s, d) => s + (S.on[d[0]] ? d[3] : 0), 0); },
    update(S, dt) { S.ph += dt; DV.forEach(d => { S.lv[d[0]] += ((S.on[d[0]] ? 1 : 0) - S.lv[d[0]]) * Math.min(1, dt * 5); }); S.E += D.P(S) * dt * S.p.k; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), cw = (x1 - x0) / 3, ch = 150; return { w, h, L, x0, x1, cw, ch, y0: 66 }; },
    cell(g, i) { return { x: g.x0 + g.cw * ((2 - i % 3) + .5), y: g.y0 + g.ch * (Math.floor(i / 3) + .5) + Math.floor(i / 3) * 8 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.P(S); Q38.bg(ctx, w, h);
      DV.forEach((d, i) => { const c = D.cell(g, i), lv = S.lv[d[0]], on = S.on[d[0]], hl = S.fm && d[4].some(o => o[0] === S.fm), sel = S.sel === d[0];
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.18)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3; ctx.fillStyle = on ? '#f0fdf4' : '#fff'; ctx.strokeStyle = hl ? FM[S.fm][1] : sel ? '#047857' : '#cbd5e1'; ctx.lineWidth = hl || sel ? 3.5 : 1.5; rr(ctx, c.x - g.cw / 2 + 6, c.y - g.ch / 2 + 4, g.cw - 12, g.ch - 8, 14); ctx.fill(); ctx.restore(); ctx.stroke();
          if (lv > .03) { const gr = ctx.createRadialGradient(c.x, c.y - 14, 4, c.x, c.y - 14, 56); gr.addColorStop(0, 'rgba(254,240,138,' + (.7 * lv) + ')'); gr.addColorStop(1, 'rgba(254,240,138,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(c.x, c.y - 14, 56, 0, TAU); ctx.fill(); } });
        // output effects
        d[4].forEach(o => { const a = lv, k = o[0]; if (a < .05) return; K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
          if (k === 'l') { ctx.strokeStyle = '#eab308'; for (let j = 0; j < 8; j++) { const q = j / 8 * TAU + S.ph * .4, r1 = 30, r2 = 38 + 4 * Math.sin(S.ph * 6 + j); ctx.beginPath(); ctx.moveTo(c.x + Math.cos(q) * r1, c.y - 14 + Math.sin(q) * r1); ctx.lineTo(c.x + Math.cos(q) * r2, c.y - 14 + Math.sin(q) * r2); ctx.stroke(); } }
          if (k === 'h') { ctx.strokeStyle = 'rgba(220,38,38,.75)'; for (let j = -1; j <= 1; j++) { const xx = c.x + j * 16, off = (S.ph * 26) % 18; ctx.beginPath(); for (let y = 0; y < 28; y++) { const yy = c.y - 44 - y - off; y ? ctx.lineTo(xx + Math.sin(y * .45 + S.ph * 5) * 3.5, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } }
          if (k === 's') { ctx.strokeStyle = '#7c3aed'; for (let j = 0; j < 3; j++) { const r = 14 + ((S.ph * 30 + j * 12) % 36); ctx.globalAlpha = a * (1 - r / 52); ctx.beginPath(); ctx.arc(c.x + 22, c.y - 14, r, -.6, .6); ctx.stroke(); } }
          if (k === 'k') { ctx.translate(c.x, c.y - 14); ctx.rotate(S.ph * 9 * a); ctx.fillStyle = 'rgba(37,99,235,.55)'; for (let j = 0; j < 3; j++) { ctx.rotate(TAU / 3); ctx.beginPath(); ctx.ellipse(18, 0, 18, 6, 0, 0, TAU); ctx.fill(); } }
          if (k === 'c') { const f = (S.ph * .25) % 1; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#166534'; rr(ctx, c.x + 26, c.y - 40, 14, 30, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#22c55e'; ctx.fillRect(c.x + 28, c.y - 12 - 26 * f, 10, 26 * f); }
          ctx.restore(); }); });
        Q33.T(ctx, d[2], c.x, c.y - 14, { s: 38 });
        Q33.T(ctx, d[1], c.x, c.y + 30, { s: 13, w: 900, c: on ? '#047857' : '#334155' });
        Q33.T(ctx, d[3] + ' W', c.x, c.y + 52, { s: 11.5, w: 900, c: '#fff', bg: on ? '#047857' : '#94a3b8' }); });
      // lower band: energy conversion of the selected device
      const dv = DV.find(d => d[0] === S.sel), by = g.y0 + g.ch * 2 + 34, bx0 = g.x0, bx1 = w - 24;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2; rr(ctx, bx0, by, bx1 - bx0, 196, 14); ctx.fill(); ctx.stroke(); });
      Q33.T(ctx, 'تحولات الطاقة في: ' + dv[1], (bx0 + bx1) / 2, by + 18, { s: 13, w: 900, c: '#047857' });
      const ex = bx1 - 70, mx = bx1 - 220, oy = by + 104;
      Q33.T(ctx, '⚡', ex, oy - 18, { s: 34 }); Q33.T(ctx, 'كهربائية', ex, oy + 20, { s: 12, w: 900, c: '#fff', bg: FM.e[1] });
      Q38.arrow(ctx, ex - 40, oy, mx + 46, oy, '#334155', 3.5, 11);
      Q33.T(ctx, dv[2], mx, oy - 16, { s: 34 }); Q33.T(ctx, dv[1], mx, oy + 20, { s: 12, w: 900, c: '#fff', bg: '#334155' });
      const n = dv[4].length, bw = mx - 76 - (bx0 + 160);
      dv[4].forEach((o, j) => { const yy = by + 52 + j * 46 + (3 - n) * 18, f = FM[o[0]], ww = Math.max(14, bw * o[1] * S.lv[dv[0]]);
        Q38.arrow(ctx, mx - 44, oy, mx - 70, yy + 10, f[1], 2.2, 8);
        K.raw(ctx, () => { ctx.fillStyle = f[1]; ctx.globalAlpha = .85; rr(ctx, mx - 76 - ww, yy, ww, 20, 6); ctx.fill(); ctx.globalAlpha = 1; });
        Q33.T(ctx, f[0] + ' ' + Math.round(o[1] * 100) + '%', mx - 82 - ww, yy + 10, { s: 12, w: 900, c: f[1], a: 'right' });
        if (S.p.sk) Q33.T(ctx, o[2] ? 'مفيدة' : 'ضائعة', bx0 + 34, yy + 10, { s: 11, w: 900, c: '#fff', bg: o[2] ? '#16a34a' : '#64748b' }); });
      const hc = Q38.card(ctx, S, [{ t: 'الطاقة: المقدرة على إنجاز شغل.', c: '#047857', w: 900 }, { t: 'تتحول الطاقة من صورة إلى أخرى.', c: '#0f172a' }, { t: 'أهم وحداتها الجول J.', c: '#0f172a' }], { title: 'الطاقة في حياتنا', wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 10, 300, [['الأجهزة العاملة', DV.filter(d => S.on[d[0]]).length + ''], ['القدرة الكلية', P + ' W'], ['الطاقة المستهلكة', Q33.f(S.E, 0) + ' J'], ['بالكيلو واط ساعة', Q31.sci(S.E / 3.6e6, 3) + ' kW·h']]);
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'اضغط على الأجهزة لتشغيلها، واختر صورة من صور الطاقة');
    },
    chips(S, g) { const A = Q38.chips(S, 'fm', Object.keys(FM).map(k => [k, FM[k][0]]), g.h - 128, S.fm, (S2, k) => { S2.fm = S2.fm === k ? '' : k; }, { bw: 96 });
      const B = Q38.chips(S, 'al', [['all', 'تشغيل الكل'], ['none', 'إطفاء الكل'], ['rs', '↺ تصفير العداد']], g.h - 84, '', (S2, k) => { if (k === 'rs') { S2.E = 0; return; } const O = {}; if (k === 'all') DV.forEach(d => { O[d[0]] = 1; }); S2.on = O; }, { bw: 150 }); return A.concat(B); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return DV.map((d, i) => { const c = D.cell(g, i); return { id: 'dv_' + d[0], x: c.x, y: c.y, w: g.cw - 12, h: g.ch - 8, tip: 'اضغط لتشغيل/إطفاء ' + d[1], idle: i ? undefined : 'اضغط على جهاز ✋', hint: i ? false : undefined, click: S2 => { const O = Object.assign({}, S2.on); O[d[0]] = O[d[0]] ? 0 : 1; S2.on = O; S2.sel = d[0]; } }; }).concat(D.chips(S, g)); },
    readings(S) { return [rd('القدرة الكلية', D.P(S) + ' W'), rd('الطاقة المستهلكة', Q33.f(S.E, 0) + ' J'), rd('الجهاز المختار', DV.find(d => d[0] === S.sel)[1])]; },
    explain(S) { const dv = DV.find(d => d[0] === S.sel); return Q26.ex('الطاقة الكهربائية تتحول في ' + dv[1] + ' إلى: ' + dv[4].map(o => FM[o[0]][0]).join(' و ') + '.', 'الطاقة هي المقدرة على إنجاز شغل، ولا تفنى بل تتحول من صورة إلى أخرى. الجزء المفيد هو ما صُمم الجهاز من أجله، والباقي يضيع غالباً بشكل حرارة. الطاقة المستهلكة = القدرة × الزمن، وتقاس بالجول.', 'نحتاج إلى الطاقة في تشغيل المصانع وتحريك وسائط النقل وتشغيل الأدوات المنزلية.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== A2 — المصادر الحالية للطاقة: مخطط الأقسام الثلاثة (2-8، ص 150) =============== */
(() => {
  const TK = [['oil', 'النفط', 'f', '🛢️'], ['coal', 'الفحم', 'f', '🪨'], ['gas', 'الغاز الطبيعي', 'f', '🔥'], ['dam', 'مياه السدود', 'h', '🌊'], ['fall', 'مساقط المياه', 'h', '💧'], ['u', 'اليورانيوم 235', 'n', '☢️'], ['sun', 'الشمس', 'a', '☀️'], ['wind', 'الرياح', 'a', '🌬️']];
  const BR = { f: ['مصادر الطاقة الأحفورية', '#92400e', .776], h: ['مصادر الطاقة المائية', '#0369a1', .4], n: ['مصادر الطاقة النووية', '#7c3aed', .125] };
  const D = { id: 'g9_en_tree', page: 150, fig: 'مخطط ص 150',
    desc: 'لم يدخر الإنسان جهداً منذ فجر التاريخ في استثمار مصادر الطاقة المحيطة به: مساقط المياه وحركة الرياح والطاقة الشمسية، وما يزال بعض الناس يستعملون أخشاب الأشجار. تقسم مصادر الطاقة الحالية في العالم إلى ثلاثة أقسام رئيسة: 1- المصادر الأحفورية (النفط، الفحم، الغاز الطبيعي) 2- مصادر الطاقة المائية 3- مصادر الطاقة النووية.',
    tags: 'المصادر الحالية للطاقة مخطط أحفورية مائية نووية النفط الفحم الغاز الطبيعي اليورانيوم السدود تصنيف',
    tools: ['بطاقات مصادر الطاقة', 'مخطط المصادر الحالية'],
    steps: ['اسحب كل بطاقة من الأعلى إلى القسم الصحيح في المخطط.', 'ماذا يحدث إذا سحبت الشمس أو الرياح إلى المخطط؟ ولماذا؟', 'فعّل «إظهار الحل» أو «لمحة تاريخية» من اللوحة.'],
    concl: ['تقسم مصادر الطاقة الحالية إلى: أحفورية، مائية، نووية.', 'المصادر الأحفورية هي النفط والفحم والغاز الطبيعي.', 'الشمس والرياح من المصادر البديلة (المتجددة) وتدرس في البند 3-8.'],
    laws: ['g9_l8_energy'],
    controls: [TG('ans', 'إظهار الحل', false, (v, S) => { if (v) TK.forEach(t => { if (t[2] !== 'a') S.done[t[0]] = 1; }); }, 'eye'), TG('hist', 'لمحة تاريخية', false, null, 'graph')],
    setup(S) { S.done = {}; S.drag = ''; S.dx = 0; S.dy = 0; S.px = {}; S.py = {}; S.msg = 'اسحب البطاقات إلى المخطط'; S.ok = 0; S.ph = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), bx0 = x0, bx1 = w - 24; return { w, h, L, x0, x1, bx0, bx1, ry: 352, by: 446, sy: 548, tw: 88, th: 54 }; },
    bx(g, k) { return g.bx0 + (g.bx1 - g.bx0) * BR[k][2]; },
    tray(g, i) { const cw = (g.x1 - g.x0) / 4; return [g.x1 - cw * (i % 4 + .5), 130 + Math.floor(i / 4) * 76]; },
    slot(g, id) { const t = TK.find(q => q[0] === id), c = D.bx(g, t[2]); if (t[2] === 'f') return [c + (['oil', 'coal', 'gas'].indexOf(id) - 1) * -110, g.sy]; if (t[2] === 'h') return [c + (id === 'dam' ? 50 : -50), g.sy]; return [c, g.sy]; },
    tgt(S, g, i) { const t = TK[i]; if (S.drag === t[0]) return [S.dx, S.dy]; if (S.done[t[0]]) return D.slot(g, t[0]); return D.tray(g, i); },
    update(S, dt) { S.ph += dt; if (!S.W) return; const g = D.geo(S); TK.forEach((t, i) => { const [x, y] = D.tgt(S, g, i); if (S.px[t[0]] == null) { S.px[t[0]] = x; S.py[t[0]] = y; } const r = S.drag === t[0] ? 18 : 9; S.px[t[0]] += (x - S.px[t[0]]) * Math.min(1, dt * r); S.py[t[0]] += (y - S.py[t[0]]) * Math.min(1, dt * r); }); },
    tok(ctx, g, t, x, y, on) { const col = t[2] === 'a' ? '#ca8a04' : BR[t[2]][1];
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.28)'; ctx.shadowBlur = on ? 14 : 7; ctx.shadowOffsetY = 3; ctx.fillStyle = '#fff'; rr(ctx, x - g.tw / 2, y - g.th / 2, g.tw, g.th, 10); ctx.fill(); ctx.restore(); ctx.fillStyle = col; rr(ctx, x + g.tw / 2 - 7, y - g.th / 2, 7, g.th, 3); ctx.fill(); ctx.strokeStyle = on ? col : '#cbd5e1'; ctx.lineWidth = on ? 2.5 : 1.2; rr(ctx, x - g.tw / 2, y - g.th / 2, g.tw, g.th, 10); ctx.stroke(); });
      Q33.T(ctx, t[3], x - 2, y - 10, { s: 20 }); Q33.T(ctx, t[1], x - 2, y + 14, { s: 11, w: 900, c: col }); },
    box(ctx, x, y, wd, ht, txt, col, lit) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.2)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createLinearGradient(0, y - ht / 2, 0, y + ht / 2); g.addColorStop(0, lit ? shade(col, 60) : '#f1f5f9'); g.addColorStop(1, lit ? col : '#cbd5e1'); ctx.fillStyle = g; rr(ctx, x - wd / 2, y - ht / 2, wd, ht, 10); ctx.fill(); ctx.restore(); });
      Q33.T(ctx, txt, x, y, { s: 12, w: 900, c: lit ? '#fff' : '#334155' }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), all = TK.filter(t => t[2] !== 'a').every(t => S.done[t[0]]); Q38.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.5; rr(ctx, g.x0, 72, g.x1 - g.x0, 172, 14); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); });
      Q33.T(ctx, 'بطاقات المصادر', (g.x0 + g.x1) / 2, 86, { s: 11.5, w: 900, c: '#64748b' });
      // tree
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2; rr(ctx, g.bx0, g.ry - 34, g.bx1 - g.bx0, 268, 16); ctx.fill(); ctx.stroke(); });
      const rx = (g.bx0 + g.bx1) / 2;
      K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(rx, g.ry + 18); ctx.lineTo(rx, g.ry + 44); ['f', 'h', 'n'].forEach(k => { const x = D.bx(g, k); ctx.moveTo(x, g.ry + 44); ctx.lineTo(rx, g.ry + 44); ctx.moveTo(x, g.ry + 44); ctx.lineTo(x, g.by - 26); }); const fx = D.bx(g, 'f'); ctx.moveTo(fx, g.by + 26); ctx.lineTo(fx, g.by + 46); ctx.moveTo(fx - 110, g.by + 46); ctx.lineTo(fx + 110, g.by + 46); [-110, 0, 110].forEach(d => { ctx.moveTo(fx + d, g.by + 46); ctx.lineTo(fx + d, g.sy - 28); }); ctx.stroke(); ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); const hx = D.bx(g, 'h'), nx = D.bx(g, 'n'); [-50, 50].forEach(d => { ctx.moveTo(hx, g.by + 26); ctx.lineTo(hx + d, g.sy - 28); }); ctx.moveTo(nx, g.by + 26); ctx.lineTo(nx, g.sy - 28); ctx.stroke(); ctx.setLineDash([]); });
      D.box(ctx, rx, g.ry, 200, 38, 'مصادر الطاقة الحالية', '#047857', 1);
      ['f', 'h', 'n'].forEach(k => { const lit = TK.filter(t => t[2] === k).every(t => S.done[t[0]]); D.box(ctx, D.bx(g, k), g.by, 160, 48, BR[k][0], BR[k][1], lit); });
      TK.forEach(t => { if (t[2] === 'a') return; const [x, y] = D.slot(g, t[0]); if (!S.done[t[0]]) K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; rr(ctx, x - g.tw / 2, y - g.th / 2, g.tw, g.th, 10); ctx.stroke(); ctx.setLineDash([]); }); if (!S.done[t[0]]) Q33.T(ctx, '؟', x, y, { s: 18, w: 900, c: '#cbd5e1' }); });
      TK.forEach((t, i) => { if (S.drag !== t[0]) D.tok(ctx, g, t, S.px[t[0]] || D.tray(g, i)[0], S.py[t[0]] || D.tray(g, i)[1], S.done[t[0]]); });
      const dt = TK.find(t => t[0] === S.drag); if (dt) D.tok(ctx, g, dt, S.px[dt[0]], S.py[dt[0]], 1);
      const L = [{ t: S.msg, c: S.ok > 0 ? '#047857' : S.ok < 0 ? '#b91c1c' : '#334155', w: 900 }, { t: 'تقسم مصادر الطاقة الحالية إلى ثلاثة أقسام: أحفورية، مائية، نووية.', c: '#0f172a' }];
      if (all) L.push({ t: '✔ أحسنت! اكتمل المخطط.', c: '#047857', w: 900 });
      if (S.p.hist) L.push({ t: 'لمحة تاريخية: الخشب ← مساقط المياه والرياح ← الفحم ← النفط والغاز ← الطاقة النووية.', c: '#7c2d12' });
      Q38.card(ctx, S, L, { title: 'المصادر الحالية للطاقة', wd: 300, y: 64 });
      Q38.banner(ctx, w, 'اسحب كل بطاقة إلى مكانها في مخطط مصادر الطاقة الحالية');
    },
    drop(S2, id) { const g = D.geo(S2), t = TK.find(q => q[0] === id), x = S2.dx, y = S2.dy; S2.drag = '';
      if (y < g.ry - 40) return; let hit = ''; ['f', 'h', 'n'].forEach(k => { const c = D.bx(g, k), lo = k === 'f' ? c - 170 : c - 95, hi = k === 'f' ? c + 170 : c + 95; if (x > lo && x < hi && y > g.by - 40) hit = k; });
      if (t[2] === 'a') { S2.ok = -1; S2.msg = t[1] + ' من المصادر البديلة المتجددة وليست ضمن المصادر الحالية في هذا المخطط.'; return; }
      if (!hit) { S2.ok = 0; S2.msg = 'ضع البطاقة داخل أحد الأقسام الثلاثة.'; return; }
      if (hit === t[2]) { S2.done = Object.assign({}, S2.done, { [id]: 1 }); S2.ok = 1; S2.msg = '✔ ' + t[1] + ': ' + BR[hit][0] + '.'; }
      else { S2.ok = -1; S2.msg = '✘ ' + t[1] + ' ليس من ' + BR[hit][0] + '. حاول مرة أخرى.'; } },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return TK.map((t, i) => { const x = S.px[t[0]] != null ? S.px[t[0]] : D.tray(g, i)[0], y = S.py[t[0]] != null ? S.py[t[0]] : D.tray(g, i)[1];
        return { id: 'tk_' + t[0], x, y, w: g.tw, h: g.th, axis: 'xy', keep: true, tip: 'اسحب البطاقة إلى المخطط', idle: i ? undefined : 'اسحب البطاقة ✋', hint: i ? false : undefined,
          down: () => { S.drag = t[0]; S.dx = x; S.dy = y; }, drag: (S2, d) => { S2.drag = t[0]; S2.dx = d.x; S2.dy = d.y; }, up: S2 => { D.drop(S2, t[0]); } }; }); },
    readings(S) { const n = TK.filter(t => t[2] !== 'a' && S.done[t[0]]).length; return [rd('البطاقات الصحيحة', n + ' من 6'), rd('آخر نتيجة', S.msg)]; },
    explain(S) { return Q26.ex('مصادر الطاقة الحالية ثلاثة أقسام: أحفورية (النفط والفحم والغاز الطبيعي)، ومائية، ونووية.', 'هذه المصادر تزود الإنسان بالجزء الأساس والأكبر من احتياجاته من الطاقة اليوم. أما الشمس والرياح والوقود الحيوي والمد والجزر فهي مصادر بديلة متجددة نتعرف عليها في البند 3-8.', 'ما يزال بعض الناس يستعملون أخشاب الأشجار لتلبية جزء من حاجتهم إلى الطاقة.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== B1 — مصادر الطاقة الأحفورية: محطة توليد حرارية، وسائل النقل، الطهي (1-2-8، ص 151، الشكل 3) =============== */
(() => {
  const FU = { oil: ['النفط', .8, .5, '#dc2626'], coal: ['الفحم', 1, 1, '#dc2626'], gas: ['الغاز الطبيعي', .45, .2, 'blue'] }; // name, CO2 t/MWh, smoke, flame
  const MD = [['plant', 'توليد الكهرباء'], ['car', 'وسائل النقل'], ['cook', 'الطهي والتسخين']];
  const D = { id: 'g9_en_plant', page: 151, fig: 'الشكل 3',
    desc: 'مصادر الطاقة الأحفورية (النفط والفحم والغاز الطبيعي) تتكون من عنصري الكاربون والهيدروجين (مواد هيدروكاربونية) إضافة إلى نسب مختلفة من الماء والكبريت والأوكسجين والنتروجين وأكاسيد الكاربون. وهي مصادر غير متجددة لأن احتياطي العالم منها يتناقص باستمرار، فمعدل تكونها أقل بكثير من معدل استهلاكها. من أهم استعمالاتها: a- توليد الكهرباء: تستعمل حرارة حرق الوقود في تسخين الماء لإنتاج البخار الذي يدير التوربينات الموصلة بمولدات الكهرباء. b- تشغيل وسائل النقل. c- وقود مباشر لأغراض الطهي والتسخين.',
    tags: 'الطاقة الأحفورية النفط الفحم الغاز الطبيعي هيدروكاربونية غير متجددة محطة حرارية مرجل بخار توربين مولد وسائل النقل الطهي التلوث الاحتياطي',
    tools: ['خزان الوقود', 'المرجل (الغلاية)', 'التوربين البخاري', 'المولد الكهربائي', 'المدخنة', 'برج نقل الكهرباء'],
    steps: ['أدر صمام الوقود (العجلة الحمراء) وراقب: اللهب ← حرارة الماء ← البخار ← دوران التوربين ← الكهرباء.', 'اضغط على المولد لتوصيل الكهرباء إلى البيوت.', 'غيّر نوع الوقود وقارن الدخان وانبعاث CO₂.', 'جرّب الاستعمالين الآخرين: وسائل النقل والطهي، وراقب الاحتياطي يتناقص.'],
    concl: ['في المحطة الحرارية: كيميائية ← حرارية ← حركية ← كهربائية.', 'الوقود الأحفوري غير متجدد: احتياطيه يتناقص لأن معدل تكونه أقل بكثير من معدل استهلاكه.', 'حرقه يطلق غازات وأدخنة تلوث البيئة.', 'يستعمل في توليد الكهرباء ووسائل النقل والطهي والتسخين.'],
    laws: ['g9_l8_energy'],
    controls: [R('fuel', 'صمام الوقود', 0, 100, 60, 1, '%'), TG('smk', 'الدخان والتلوث', true, null, 'particles'), TG('lbl', 'أسماء الأجزاء', true, null, 'eye')],
    setup(S) { S.md = 'plant'; S.fk = 'oil'; S.fu = 0; S.T = 20; S.om = 0; S.rot = 0; S.sw = 1; S.res = 100; S.ph = 0; S.puff = []; S.co2 = 0; S.MWh = 0; S.cx = 0; S.sp = 0; S.wt = 20; S.dist = 0; },
    update(S, dt) { const out = S.res <= 0, tf = out ? 0 : S.p.fuel / 100; S.ph += dt; Q38.ez(S, 'fu', tf, dt, 2.5);
      S.res = Math.max(0, S.res - S.fu * dt * .5); const sm = FU[S.fk][2];
      if (S.md === 'plant') { Q38.ez(S, 'T', 20 + 520 * S.fu, dt, .7); const st = clamp((S.T - 100) / 440, 0, 1); Q38.ez(S, 'om', st, dt, 1.2); S.rot += S.om * dt * 16; const P = 600 * S.om * (S.sw ? 1 : .15); S.MWh += P * dt / 3600 * 60; S.co2 += P * dt / 3600 * 60 * FU[S.fk][1]; }
      if (S.md === 'car') { Q38.ez(S, 'sp', 120 * S.fu, dt, 1.2); S.dist += S.sp * dt / 3.6; S.cx += S.sp * dt * 2.2; }
      if (S.md === 'cook') { Q38.ez(S, 'wt', Math.min(100, 20 + 160 * S.fu), dt, .35); }
      if (S.p.smk && Math.random() < dt * 14 * S.fu * (S.md === 'plant' ? (.4 + sm) : 1)) S.puff.push({ a: 0, s: .5 + Math.random() * .5, d: (Math.random() - .5) * 14 });
      S.puff.forEach(q => { q.a += dt * .45; }); S.puff = S.puff.filter(q => q.a < 1).slice(-60); },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), sy = 314, sh = h - 150 - sy - 8; return { w, h, L, x0, x1, sy, sh, sx1: w - 24, vx: x0 + 52, vy: 168, vr: 42 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), f = FU[S.fk], st = clamp((S.T - 100) / 440, 0, 1), P = 600 * S.om * (S.sw ? 1 : .15); Q38.bg(ctx, w, h);
      // ---- top-left: valve + gauges ----
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2; rr(ctx, g.x0, 70, g.x1 - g.x0, 228, 14); ctx.fill(); ctx.stroke(); });
      D.valve(ctx, g.vx, g.vy, g.vr, S.p.fuel); Q33.T(ctx, 'صمام الوقود ' + S.p.fuel + '%', g.vx, g.vy + g.vr + 18, { s: 11, w: 900, c: '#b91c1c' });
      const gx = i => g.x0 + 116 + (g.x1 - g.x0 - 124) * (i + .5) / 3;
      if (S.md === 'plant') { Q38.gauge(ctx, gx(2), 128, 31, (S.T - 20) / 560, 'حرارة الماء', Math.round(S.T) + ' °C', '#dc2626'); Q38.gauge(ctx, gx(1), 128, 31, S.om, 'سرعة التوربين', Math.round(3000 * S.om) + ' rpm', '#2563eb'); Q38.gauge(ctx, gx(0), 128, 31, P / 600, 'القدرة', Math.round(P) + ' MW', '#047857'); }
      if (S.md === 'car') { Q38.gauge(ctx, gx(2), 128, 31, S.sp / 140, 'السرعة', Math.round(S.sp) + ' km/h', '#2563eb'); Q38.gauge(ctx, gx(1), 128, 31, S.fu, 'المحرك', Math.round(S.fu * 100) + '%', '#dc2626'); Q38.bar(ctx, gx(0), 104, 26, 70, S.res / 100, '#f59e0b', 'خزان الوقود', Math.round(S.res) + '%'); }
      if (S.md === 'cook') { Q38.thermo(ctx, gx(1.5), 168, 100, (S.wt - 0) / 110, Math.round(S.wt) + ' °C'); Q38.gauge(ctx, gx(.2), 128, 31, S.fu, 'اللهب', Math.round(S.fu * 100) + '%', '#ea580c'); }
      const ch = S.md === 'plant' ? [['كيميائية', '#16a34a', S.fu > .05 ? 1 : 0], ['حرارية', '#dc2626', st > .02 ? 1 : 0], ['حركية', '#2563eb', S.om > .05 ? 1 : 0], ['كهربائية', '#f59e0b', S.om > .05 ? 1 : 0]] : S.md === 'car' ? [['كيميائية', '#16a34a', S.fu > .05 ? 1 : 0], ['حرارية', '#dc2626', S.fu > .05 ? 1 : 0], ['حركية', '#2563eb', S.sp > 2 ? 1 : 0]] : [['كيميائية', '#16a34a', S.fu > .05 ? 1 : 0], ['حرارية', '#dc2626', S.fu > .05 ? 1 : 0]];
      Q38.chain(ctx, g.x1 - 6, g.x0 + 6, 274, ch);
      // ---- scene ----
      const gy = Q38.scene(ctx, g.x0, g.sy, g.sx1 - g.x0, g.sh, { gf: .86 });
      if (S.md === 'plant') D.plant(ctx, g, S, gy, f, st, P); else if (S.md === 'car') D.car(ctx, g, S, gy); else D.cook(ctx, g, S, gy);
      // smoke
      if (S.p.smk) S.puff.forEach(q => { const sx = S.md === 'plant' ? g.sx1 - 130 : S.md === 'car' ? (g.x0 + 40 + (S.cx % (g.sx1 - g.x0 - 80))) - 64 : 0; if (!sx) return; const sy0 = S.md === 'plant' ? g.sy + 40 : gy - 16, dir = S.md === 'car' ? -1 : 0;
        K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = (1 - q.a) * .55 * (S.md === 'plant' ? .35 + f[2] : .6); ctx.fillStyle = S.fk === 'coal' && S.md === 'plant' ? '#374151' : '#6b7280'; ctx.beginPath(); ctx.arc(sx + q.d * q.a + dir * q.a * 50 - (S.md === 'plant' ? q.a * 70 : 0), sy0 - q.a * (S.md === 'plant' ? 30 : 26), 6 + 20 * q.a * q.s, 0, TAU); ctx.fill(); ctx.restore(); }); });
      if (S.res <= 0) Q33.T(ctx, 'نفد الوقود! الوقود الأحفوري لا يتجدد', (g.x0 + g.sx1) / 2, g.sy + 26, { s: 14, w: 900, c: '#fff', bg: '#b91c1c' });
      const hc = Q38.card(ctx, S, [{ t: 'الوقود الأحفوري: مواد هيدروكاربونية من الكاربون والهيدروجين.', c: '#0f172a' }, { t: 'غير متجدد: معدل تكونه أقل بكثير من معدل استهلاكه.', c: '#b91c1c', w: 900 }], { title: 'مصادر الطاقة الأحفورية', wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['الوقود', f[0]], ['الاحتياطي المتبقي', Math.round(S.res) + '%', S.res < 25 ? '#b91c1c' : '#047857'], S.md === 'plant' ? ['انبعاث CO₂', Q33.f(S.co2, 1) + ' t', '#7c2d12'] : S.md === 'car' ? ['المسافة', Q33.f(S.dist / 1000, 2) + ' km'] : ['حرارة الماء', Math.round(S.wt) + ' °C']], { lh: 22 });
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'أدر صمام الوقود وتتبع تحولات الطاقة');
    },
    valve(ctx, x, y, r, v) { const a = -Math.PI / 2 + v / 100 * Math.PI * 1.5; K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.restore();
      ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 5; for (let k = 0; k < 4; k++) { const q = a + k * Math.PI / 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(q) * r, y + Math.sin(q) * r); ctx.stroke(); } ctx.fillStyle = '#7f1d1d'; ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.fill(); ctx.fillStyle = '#fca5a5'; ctx.beginPath(); ctx.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 2; ctx.stroke(); }); },
    plant(ctx, g, S, gy, f, st, P) {
      const W = g.sx1 - g.x0, X = fr => g.x0 + W * fr, bx = X(.69), by0 = g.sy + 96, by1 = gy - 34, tx = X(.47), ty = gy - 92, gx = X(.3), px = X(.16), lb = S.p.lbl;
      // fuel store
      const fx = X(.9);
      K.raw(ctx, () => { ctx.save(); if (S.fk === 'coal') { ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.moveTo(fx - 44, gy); ctx.quadraticCurveTo(fx, gy - 70, fx + 44, gy); ctx.fill(); ctx.fillStyle = '#4b5563'; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.arc(fx - 30 + (k * 37) % 60, gy - 6 - (k * 13) % 34, 4, 0, TAU); ctx.fill(); } }
        else if (S.fk === 'gas') { const g2 = ctx.createRadialGradient(fx - 12, gy - 62, 4, fx, gy - 48, 40); g2.addColorStop(0, '#f8fafc'); g2.addColorStop(1, '#64748b'); ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(fx, gy - 48, 36, 0, TAU); ctx.fill(); ctx.fillStyle = '#475569'; ctx.fillRect(fx - 26, gy - 18, 6, 18); ctx.fillRect(fx + 20, gy - 18, 6, 18); }
        else { const g2 = ctx.createLinearGradient(fx - 34, 0, fx + 34, 0); g2.addColorStop(0, '#7f1d1d'); g2.addColorStop(.5, '#ef4444'); g2.addColorStop(1, '#7f1d1d'); ctx.fillStyle = g2; rr(ctx, fx - 34, gy - 84, 68, 84, 10); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(fx - 34, gy - 60, 68, 4); ctx.fillRect(fx - 34, gy - 30, 68, 4); }
        ctx.restore(); });
      if (lb) Q33.T(ctx, f[0], fx, gy + 14, { s: 11, w: 900, c: '#fff', bg: '#78350f' });
      Q38.pipe(ctx, [[fx - 40, gy - 16], [bx + 20, gy - 16], [bx + 20, by1 + 14]], { w: 7, col: '#a16207' }); if (S.fu > .03) Q38.stream(ctx, [[fx - 40, gy - 16], [bx + 20, gy - 16]], S.ph * 60 * S.fu, '#fde68a', { sp: 18, r: 2.5 });
      // chimney
      const cx = bx + 66; K.raw(ctx, () => { const g2 = ctx.createLinearGradient(cx - 14, 0, cx + 14, 0); g2.addColorStop(0, '#7f1d1d'); g2.addColorStop(.5, '#b91c1c'); g2.addColorStop(1, '#7f1d1d'); ctx.fillStyle = g2; ctx.fillRect(cx - 12, g.sy + 46, 24, gy - g.sy - 46); ctx.fillStyle = '#f8fafc'; ctx.fillRect(cx - 12, g.sy + 66, 24, 8); ctx.fillRect(cx - 12, g.sy + 96, 24, 8); });
      if (lb) Q33.T(ctx, 'المدخنة', cx + 46, g.sy + 70, { s: 10.5, w: 900, c: '#fff', bg: '#7f1d1d' });
      // boiler
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 10; const g2 = ctx.createLinearGradient(bx - 40, 0, bx + 40, 0); g2.addColorStop(0, '#475569'); g2.addColorStop(.4, '#cbd5e1'); g2.addColorStop(1, '#334155'); ctx.fillStyle = g2; rr(ctx, bx - 40, by0, 80, by1 - by0, 18); ctx.fill(); ctx.restore();
        const wl = by0 + (by1 - by0) * .45; ctx.fillStyle = 'rgba(59,130,246,.75)'; rr(ctx, bx - 32, wl, 64, by1 - wl - 8, 10); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,' + (.25 + .5 * st) + ')'; for (let k = 0; k < 10 * st + 1; k++) { const yy = by1 - 14 - ((S.ph * 40 + k * 23) % (by1 - wl - 20)); ctx.beginPath(); ctx.arc(bx - 24 + (k * 17) % 48, yy, 3, 0, TAU); ctx.fill(); }
        ctx.fillStyle = 'rgba(241,245,249,' + (.2 + .6 * st) + ')'; rr(ctx, bx - 32, by0 + 8, 64, wl - by0 - 10, 10); ctx.fill(); });
      Q38.flame(ctx, bx, by1 + 26, .3 + .9 * S.fu, S.ph, { blue: f[3] === 'blue', n: 4, sp: 16 });
      if (lb) Q33.T(ctx, 'المرجل', bx, by0 + 22, { s: 11, w: 900, c: '#fff', bg: '#334155' });
      // steam pipe → turbine
      const sp = [[bx, by0], [bx, by0 - 26], [tx + 40, by0 - 26], [tx + 40, ty - 30]]; Q38.pipe(ctx, sp, { w: 9, col: '#e2e8f0' }); if (st > .02) Q38.stream(ctx, sp, S.ph * 120 * st, 'rgba(255,255,255,.95)', { sp: 16, r: 3 });
      const rp = [[tx, ty + 40], [tx, gy - 12], [bx - 50, gy - 12], [bx - 50, by1 - 30], [bx - 40, by1 - 30]]; Q38.pipe(ctx, rp, { w: 6, col: '#60a5fa' }); if (st > .02) Q38.stream(ctx, rp, S.ph * 50 * st, '#1d4ed8', { sp: 18, r: 2.2 });
      Q38.casing(ctx, tx, ty, 92, 80, lb ? 'التوربين' : '', '#64748b'); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(tx, ty, 32, 0, TAU); ctx.fill(); }); Q38.turb(ctx, tx, ty, 30, S.rot, { n: 12 });
      K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.fillRect(gx + 30, ty - 4, tx - 46 - gx - 30, 8); });
      Q38.gen(ctx, gx, ty, 1, S.rot, S.om * (S.sw ? 1 : 0), { lab: lb ? 'المولد' : '' });
      // switch + pylon + houses
      const pw = Q38.pylon(ctx, px, gy, 120); Q33.wire(ctx, [[gx - 30, ty - 10], [gx - 50, ty - 10], [gx - 50, gy - 120 + 12], [pw[1][0], pw[1][1]]], { col: '#334155' });
      Q33.T(ctx, S.sw ? 'متصل' : 'مفصول', gx, ty - 48, { s: 10.5, w: 900, c: '#fff', bg: S.sw ? '#16a34a' : '#64748b' });
      const lit = S.sw ? clamp(S.om * 1.3, 0, 1) : 0; K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(pw[0][0], pw[0][1]); ctx.quadraticCurveTo(px - 50, gy - 70, g.x0 + 40, gy - 50); ctx.stroke(); });
      Q38.house(ctx, g.x0 + 40, gy, .9, lit); Q38.house(ctx, px - 40, gy, .7, lit);
      if (lb) Q33.T(ctx, 'نقل الكهرباء', px, gy + 14, { s: 10.5, w: 900, c: '#fff', bg: '#334155' });
    },
    car(ctx, g, S, gy) { const W = g.sx1 - g.x0, x = g.x0 + 40 + (S.cx % (W - 80)), y = gy - 10, sp = S.sp;
      K.raw(ctx, () => { ctx.fillStyle = '#374151'; ctx.fillRect(g.x0 + 2, gy - 6, W - 4, 30); ctx.strokeStyle = '#fde047'; ctx.lineWidth = 3; ctx.setLineDash([22, 18]); ctx.lineDashOffset = -S.cx * .2; ctx.beginPath(); ctx.moveTo(g.x0 + 4, gy + 10); ctx.lineTo(g.sx1 - 4, gy + 10); ctx.stroke(); ctx.setLineDash([]);
        ctx.save(); ctx.translate(x, y); const g2 = ctx.createLinearGradient(0, -46, 0, 0); g2.addColorStop(0, '#60a5fa'); g2.addColorStop(1, '#1d4ed8'); ctx.fillStyle = g2; ctx.beginPath(); ctx.moveTo(-64, -10); ctx.lineTo(-60, -30); ctx.lineTo(-30, -32); ctx.lineTo(-16, -52); ctx.lineTo(30, -52); ctx.lineTo(46, -32); ctx.lineTo(66, -28); ctx.lineTo(68, -10); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#e0f2fe'; ctx.beginPath(); ctx.moveTo(-10, -48); ctx.lineTo(12, -48); ctx.lineTo(12, -33); ctx.lineTo(-22, -33); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(18, -48); ctx.lineTo(28, -48); ctx.lineTo(40, -33); ctx.lineTo(18, -33); ctx.closePath(); ctx.fill();
        [-38, 40].forEach(wx => { ctx.save(); ctx.translate(wx, -8); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(0, 0, 13, 0, TAU); ctx.fill(); ctx.rotate(S.cx * .08); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.rotate(TAU / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(8, 0); ctx.stroke(); } ctx.restore(); });
        ctx.fillStyle = '#fef08a'; ctx.fillRect(62, -26, 6, 6); ctx.restore(); });
      Q33.T(ctx, 'محرك يحرق الوقود: ' + Math.round(sp) + ' km/h', (g.x0 + g.sx1) / 2, g.sy + 30, { s: 12, w: 900, c: '#fff', bg: '#1d4ed8' });
    },
    cook(ctx, g, S, gy) { const cx = (g.x0 + g.sx1) / 2, ty = gy - 40, f = S.fu, boil = S.wt >= 99;
      K.raw(ctx, () => { const g2 = ctx.createLinearGradient(0, ty, 0, gy); g2.addColorStop(0, '#e5e7eb'); g2.addColorStop(1, '#6b7280'); ctx.fillStyle = g2; rr(ctx, cx - 130, ty, 260, gy - ty, 8); ctx.fill(); ctx.fillStyle = '#111827'; ctx.fillRect(cx - 70, ty - 6, 140, 8); });
      Q38.flame(ctx, cx, ty - 6, .2 + .6 * f, S.ph, { blue: 1, n: 7, sp: 14 });
      K.raw(ctx, () => { const py = ty - 40; const g2 = ctx.createLinearGradient(cx - 80, 0, cx + 80, 0); g2.addColorStop(0, '#6b7280'); g2.addColorStop(.5, '#e5e7eb'); g2.addColorStop(1, '#4b5563'); ctx.fillStyle = g2; rr(ctx, cx - 76, py - 76, 152, 84, 10); ctx.fill(); ctx.fillStyle = '#374151'; ctx.fillRect(cx - 98, py - 70, 24, 8); ctx.fillRect(cx + 74, py - 70, 24, 8);
        ctx.fillStyle = 'rgba(59,130,246,.75)'; ctx.fillRect(cx - 70, py - 56, 140, 58); ctx.fillStyle = 'rgba(255,255,255,.8)'; const nb = boil ? 14 : Math.round((S.wt - 20) / 10); for (let k = 0; k < nb; k++) { ctx.beginPath(); ctx.arc(cx - 60 + (k * 29) % 120, py - 4 - ((S.ph * 50 + k * 17) % 50), 3, 0, TAU); ctx.fill(); }
        if (S.wt > 60) { ctx.strokeStyle = 'rgba(203,213,225,' + (S.wt - 60) / 50 + ')'; ctx.lineWidth = 3; for (let k = -1; k <= 1; k++) { ctx.beginPath(); for (let y = 0; y < 40; y++) { const yy = py - 80 - y - (S.ph * 20) % 10; y ? ctx.lineTo(cx + k * 30 + Math.sin(y * .3 + S.ph * 4) * 5, yy) : ctx.moveTo(cx + k * 30, yy); } ctx.stroke(); } } });
      Q33.T(ctx, boil ? 'الماء يغلي' : 'تسخين الماء بالغاز', cx, g.sy + 30, { s: 12, w: 900, c: '#fff', bg: '#ea580c' });
    },
    chips(S, g) { const A = Q38.chips(S, 'md', MD, g.h - 128, S.md, (S2, k) => { S2.md = k; S2.puff = []; }, { bw: 170 });
      const B = S.md === 'plant' ? Q38.chips(S, 'fk', [['oil', 'النفط'], ['coal', 'الفحم'], ['gas', 'الغاز الطبيعي']], g.h - 84, S.fk, (S2, k) => { S2.fk = k; }, { bw: 150 }) : []; return A.concat(B); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), a = -Math.PI / 2 + S.p.fuel / 100 * Math.PI * 1.5, W = g.sx1 - g.x0;
      const L = [{ id: 'valve', x: g.vx + Math.cos(a) * g.vr, y: g.vy + Math.sin(a) * g.vr, r: 20, cx: g.vx, cy: g.vy, keep: true, tip: 'أدر صمام الوقود', idle: 'أدر الصمام ✋', drag: (S2, d) => { let q = Math.atan2(d.y - g.vy, d.x - g.vx) + Math.PI / 2; if (q < 0) q += TAU; if (q > Math.PI * 1.75) q = 0; setParam(S2, 'fuel', Math.round(clamp(q / (Math.PI * 1.5), 0, 1) * 100)); } }];
      if (S.md === 'plant') L.push({ id: 'gen', x: g.x0 + W * .3, y: g.sy + g.sh * .86 - 92, w: 80, h: 70, axis: 'none', hint: false, tip: 'اضغط لتوصيل/فصل البيوت', click: S2 => { S2.sw = S2.sw ? 0 : 1; } });
      return L.concat(D.chips(S, g)); },
    readings(S) { const P = 600 * S.om * (S.sw ? 1 : .15); return [rd('صمام الوقود', S.p.fuel + ' %'), rd('الوقود', FU[S.fk][0]), rd('حرارة الماء في المرجل', Math.round(S.T) + ' °C'), rd('القدرة الكهربائية', Math.round(P) + ' MW'), rd('الاحتياطي المتبقي', Math.round(S.res) + ' %')]; },
    explain(S) { return Q26.ex(S.md === 'plant' ? 'حرارة اللهب تغلي الماء في المرجل فيندفع البخار ويدير التوربين، والتوربين يدير المولد فتتولد الكهرباء.' : S.md === 'car' ? 'المحرك يحرق الوقود فيحول طاقته الكيميائية إلى حرارية ثم حركية تحرك السيارة.' : 'حرق الغاز يحول طاقته الكيميائية إلى حرارية تسخن الماء.', 'الوقود الأحفوري مواد هيدروكاربونية تختزن طاقة كيميائية، وعند حرقها تتحرر حرارة. لكنه غير متجدد: احتياطيه يتناقص لأن معدل تكونه أقل بكثير من معدل استهلاكه، وحرقه يطلق غازات ملوثة مثل CO₂.', 'أغلب محطات الكهرباء والسيارات والمواقد تعتمد على النفط والفحم والغاز الطبيعي.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== B2 — مصادر الطاقة المائية: المحطة الكهرومائية والسد (2-2-8، ص 152، الشكل 4) =============== */
(() => {
  const QM = 150; // m³/s at a fully open gate
  const D = { id: 'g9_en_dam', page: 152, fig: 'الشكل 4',
    desc: 'يعتمد مفهوم مصادر الطاقة المائية على تحويل طاقة الوضع (Potential energy) المختزنة (الكامنة) في المياه المحفوظة خلف السدود أو في أماكن مرتفعة إلى طاقة ميكانيكية (حركية) في أثناء سقوط الماء، إذ يتدفق الماء خلال مجرى أو أنبوب إلى التوربينات (الشكل 4)، وعندما يندفع الماء خلال التوربين يدور محوره الذي بدوره يدير المولدات الكهربائية الكبيرة المرتبطة به فتنتج الطاقة الكهربائية.',
    tags: 'الطاقة المائية سد خزان طاقة الوضع طاقة حركية أنبوب التوربين المولد محطة كهرومائية ارتفاع الماء بوابة',
    tools: ['خزان الماء خلف السد', 'بوابة المأخذ', 'أنبوب الماء', 'التوربين', 'المولد', 'خطوط نقل الكهرباء'],
    steps: ['اسحب سطح الماء خلف السد إلى الأعلى أو الأسفل: كيف تتغير سرعة الماء والقدرة؟', 'اسحب البوابة لفتحها أو غلقها وراقب التوربين.', 'فعّل «الأمطار» من اللوحة، أو اترك البوابة مفتوحة وراقب الخزان يفرغ.'],
    concl: ['طاقة الوضع للماء خلف السد ← طاقة حركية للماء الساقط ← حركية للتوربين ← كهربائية.', 'كلما زاد ارتفاع الماء خلف السد زادت سرعة اندفاعه والقدرة المتولدة.', 'كلما زادت كمية الماء المتدفقة زادت القدرة.'],
    laws: ['g9_l8_hydro'],
    controls: [R('h', 'ارتفاع الماء خلف السد', 10, 100, 70, 1, 'm'), R('q', 'فتحة البوابة', 0, 100, 60, 1, '%'), TG('rain', 'أمطار تملأ الخزان', false, null, 'particles'), TG('lbl', 'أسماء الأجزاء', true, null, 'eye')],
    setup(S) { S.hh = 70; S.qq = .6; S.om = 0; S.rot = 0; S.ph = 0; S.lvl = 70; S.drop = []; },
    pw(S) { return .9 * 1000 * 9.8 * S.qq * QM * S.hh / 1e6; },
    update(S, dt) { S.ph += dt; if (Math.abs(S.lvl - S.p.h) > 1.2) S.lvl = S.p.h;
      S.lvl = clamp(S.lvl + (S.p.rain ? 2.2 : 0) * dt - S.qq * .9 * dt, 10, 100); const r = Math.round(S.lvl); if (r !== S.p.h) setParam(S, 'h', r);
      Q38.ez(S, 'hh', S.lvl, dt, 4); Q38.ez(S, 'qq', S.p.q / 100, dt, 3); Q38.ez(S, 'om', S.qq > .01 ? Math.sqrt(S.hh / 100) * Math.min(1, S.qq * 2) : 0, dt, 1.5); S.rot += S.om * dt * 14;
      if (S.p.rain && Math.random() < dt * 40) S.drop.push({ x: Math.random(), y: 0 }); S.drop.forEach(d => { d.y += dt * 1.6; }); S.drop = S.drop.filter(d => d.y < 1); },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), sy = 314, sh = h - 150 - sy - 8, bot = sy + sh, W = w - 24 - x0;
      const rb = bot - 54, dx = x0 + W * .33, surf = y => rb - 14 - 196 * (y - 10) / 90; return { w, h, L, x0, x1, sy, sh, bot, W, sx1: w - 24, rb, dx, surf, tx: x0 + W * .55, ty: bot - 40, gy: bot - 22 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.pw(S), v = Math.sqrt(2 * 9.8 * S.hh), lb = S.p.lbl, sy2 = g.surf(S.hh); Q38.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2; rr(ctx, g.x0, 70, g.x1 - g.x0, 228, 14); ctx.fill(); ctx.stroke(); });
      const gx = i => g.x0 + (g.x1 - g.x0) * (i + .5) / 3;
      Q38.gauge(ctx, gx(2), 126, 34, (S.hh - 10) / 90, 'ارتفاع الماء h', Math.round(S.hh) + ' m', '#0369a1'); Q38.gauge(ctx, gx(1), 126, 34, v / 44.3, 'سرعة الماء v', Q33.f(v, 1) + ' m/s', '#2563eb'); Q38.gauge(ctx, gx(0), 126, 34, P / 133, 'القدرة P', Q33.f(P, 1) + ' MW', '#047857');
      Q38.chain(ctx, g.x1 - 6, g.x0 + 6, 254, [['طاقة الوضع', '#0369a1', 1], ['حركية', '#2563eb', S.qq > .02 ? 1 : 0], ['كهربائية', '#f59e0b', S.om > .05 ? 1 : 0]]);
      Q33.T(ctx, 'v = √(2 g h) = ' + Q33.f(v, 1) + ' m/s', (g.x0 + g.x1) / 2, 284, { s: 11.5, w: 800, c: '#334155' });
      // scene
      K.raw(ctx, () => { ctx.save(); rr(ctx, g.x0, g.sy, g.W, g.sh, 16); ctx.clip(); const s = ctx.createLinearGradient(0, g.sy, 0, g.bot); s.addColorStop(0, '#7dd3fc'); s.addColorStop(1, '#e0f2fe'); ctx.fillStyle = s; ctx.fillRect(g.x0, g.sy, g.W, g.sh);
        // hills / valley
        ctx.fillStyle = 'rgba(77,124,15,.45)'; ctx.beginPath(); ctx.moveTo(g.x0, g.rb); ctx.lineTo(g.x0, g.sy + 70); ctx.quadraticCurveTo(g.x0 + 70, g.sy + 20, g.x0 + 150, g.sy + 60); ctx.quadraticCurveTo(g.x0 + 220, g.sy + 30, g.dx + 30, g.sy + 90); ctx.lineTo(g.dx + 30, g.rb); ctx.closePath(); ctx.fill();
        const gr = ctx.createLinearGradient(0, g.rb, 0, g.bot); gr.addColorStop(0, '#a16207'); gr.addColorStop(1, '#78350f'); ctx.fillStyle = gr; ctx.fillRect(g.x0, g.rb, g.dx - g.x0, g.bot - g.rb); ctx.fillRect(g.dx, g.gy, g.sx1 - g.dx, g.bot - g.gy);
        // reservoir water
        const wg = ctx.createLinearGradient(0, sy2, 0, g.rb); wg.addColorStop(0, '#38bdf8'); wg.addColorStop(1, '#0c4a6e'); ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(g.x0, sy2); for (let x = g.x0; x <= g.dx; x += 8) ctx.lineTo(x, sy2 + Math.sin(x * .08 + S.ph * 2) * 1.6); ctx.lineTo(g.dx, g.rb); ctx.lineTo(g.x0, g.rb); ctx.closePath(); ctx.fill();
        // downstream river
        ctx.fillStyle = 'rgba(14,116,144,.85)'; ctx.fillRect(g.tx + 20, g.gy - 10, g.sx1 - g.tx - 20, 12);
        // rain
        ctx.strokeStyle = 'rgba(30,64,175,.55)'; ctx.lineWidth = 1.5; S.drop.forEach(d => { const x = g.x0 + 10 + d.x * (g.W - 20), y = g.sy + d.y * (g.sh - 40); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 3, y + 10); ctx.stroke(); });
        ctx.restore(); });
      if (S.p.rain) Q38.cloud(ctx, g.x0 + 120, g.sy + 30, 1, .95, 1);
      // dam wall
      const dt = g.surf(100) - 14; K.raw(ctx, () => { const cg = ctx.createLinearGradient(g.dx - 10, 0, g.dx + 50, 0); cg.addColorStop(0, '#d6d3d1'); cg.addColorStop(1, '#78716c'); ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(g.dx - 8, dt); ctx.lineTo(g.dx + 14, dt); ctx.lineTo(g.dx + 54, g.gy); ctx.lineTo(g.dx - 8, g.gy); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#57534e'; ctx.lineWidth = 1.5; ctx.stroke(); });
      if (lb) Q33.T(ctx, 'السد', g.dx + 4, dt - 14, { s: 11, w: 900, c: '#fff', bg: '#57534e' });
      // penstock: intake → turbine
      const iy = g.rb - 26, pen = [[g.dx - 8, iy], [g.dx + 26, iy + 4], [g.tx - 30, g.ty], [g.tx, g.ty]];
      Q38.pipe(ctx, pen, { w: 14, col: '#64748b' }); if (S.qq > .02) Q38.stream(ctx, pen, S.ph * 9 * v * Math.min(1, S.qq * 2), 'rgba(186,230,253,.95)', { sp: 15, r: 3.6 });
      // gate
      const gh = 40, gt = iy - 8 - gh * (S.qq) - 6; K.raw(ctx, () => { ctx.fillStyle = '#b91c1c'; rr(ctx, g.dx - 20, gt, 10, gh, 3); ctx.fill(); ctx.fillStyle = '#7f1d1d'; ctx.fillRect(g.dx - 17, dt - 4, 4, gt - dt + 4); });
      if (lb) Q33.T(ctx, 'البوابة ' + S.p.q + '%', g.dx - 54, gt + 6, { s: 10.5, w: 900, c: '#fff', bg: '#b91c1c' });
      // powerhouse + turbine + generator
      K.raw(ctx, () => { const bg2 = ctx.createLinearGradient(0, g.ty - 64, 0, g.gy); bg2.addColorStop(0, '#f1f5f9'); bg2.addColorStop(1, '#94a3b8'); ctx.fillStyle = bg2; rr(ctx, g.tx - 44, g.ty - 66, 88, g.gy - g.ty + 66, 6); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(g.tx, g.ty, 22, 0, TAU); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.tx - 3, g.ty - 64, 6, 44); });
      Q38.turb(ctx, g.tx, g.ty, 20, S.rot, { n: 9, col: '#bae6fd' });
      if (S.qq > .02) Q38.stream(ctx, [[g.tx + 18, g.ty + 6], [g.tx + 40, g.gy - 4], [g.sx1, g.gy - 4]], S.ph * 70 * S.qq, 'rgba(255,255,255,.8)', { sp: 20, r: 2.6 });
      Q38.gen(ctx, g.tx, g.ty - 92, .8, S.rot, S.om, { lab: lb ? 'المولد' : '' }); if (lb) Q33.T(ctx, 'التوربين', g.tx + 74, g.ty + 2, { s: 10.5, w: 900, c: '#fff', bg: '#334155' });
      const px = g.x0 + g.W * .78, pw = Q38.pylon(ctx, px, g.gy, 112); Q33.wire(ctx, [[g.tx + 28, g.ty - 92], [px - 30, g.ty - 92], [pw[0][0], pw[0][1]]], { col: '#334155' });
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(pw[1][0], pw[1][1]); ctx.quadraticCurveTo(px + 50, g.gy - 70, g.sx1 - 36, g.gy - 48); ctx.stroke(); });
      Q38.house(ctx, g.sx1 - 36, g.gy - 8, .85, clamp(S.om * 1.4, 0, 1));
      // level handle
      K.raw(ctx, () => { ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(g.x0 + 40, sy2); ctx.lineTo(g.x0 + 40, g.rb); ctx.stroke(); ctx.setLineDash([]); });
      Q33.T(ctx, 'h = ' + Math.round(S.hh) + ' m', g.x0 + 92, (sy2 + g.rb) / 2, { s: 12, w: 900, c: '#fff', bg: '#0c4a6e' });
      if (lb) Q33.T(ctx, 'خزان الماء', g.x0 + 92, sy2 + 22, { s: 10.5, w: 900, c: '#fff', bg: '#0369a1' });
      const hc = Q38.card(ctx, S, [{ t: 'طاقة الوضع المختزنة في الماء خلف السد تتحول إلى طاقة حركية عند سقوطه.', c: '#0f172a' }, { t: 'الماء يدير التوربين، والتوربين يدير المولد فتتولد الكهرباء.', c: '#047857', w: 900 }], { title: 'المحطة الكهرومائية', wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['تدفق الماء Q', Math.round(S.qq * QM) + ' m³/s'], ['P = η ρ g Q h', Q33.f(P, 1) + ' MW']], { lh: 22 });
      Q38.banner(ctx, w, 'اسحب سطح الماء خلف السد واسحب البوابة');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sy2 = g.surf(S.hh), iy = g.rb - 26, gt = iy - 8 - 40 * S.qq - 6;
      return [{ id: 'lvl', x: g.x0 + 92, y: sy2, w: 120, h: 30, axis: 'y', keep: true, tip: 'اسحب سطح الماء', idle: 'اسحب سطح الماء ✋', drag: (S2, d) => { const hv = 10 + (g.rb - 14 - d.y) / 196 * 90; S2.lvl = clamp(hv, 10, 100); setParam(S2, 'h', Math.round(S2.lvl)); } },
        { id: 'gate', x: g.dx - 15, y: gt + 20, w: 34, h: 48, axis: 'y', keep: true, hint: false, tip: 'اسحب البوابة للأعلى لفتحها', drag: (S2, d) => { setParam(S2, 'q', Math.round(clamp((iy - 14 - d.y - 20) / 40, 0, 1) * 100)); } }]; },
    readings(S) { const v = Math.sqrt(2 * 9.8 * S.hh); return [rd('ارتفاع الماء h', Math.round(S.hh) + ' m'), rd('سرعة الماء v', Q33.f(v, 1) + ' m/s'), rd('تدفق الماء Q', Math.round(S.qq * QM) + ' m³/s'), rd('القدرة P', Q33.f(D.pw(S), 1) + ' MW')]; },
    record(S) { return { h: Math.round(S.hh), P: +D.pw(S).toFixed(1) }; },
    cols: [['h', 'h (m)'], ['P', 'P (MW)']],
    graph: { x: 'h', y: 'P', xl: 'ارتفاع الماء h (m)', yl: 'القدرة P (MW)' },
    explain(S) { return Q26.ex('الماء الساقط من ارتفاع ' + Math.round(S.hh) + ' m يندفع بسرعة ' + Q33.f(Math.sqrt(2 * 9.8 * S.hh), 1) + ' m/s ويدير التوربين، فتتولد قدرة ' + Q33.f(D.pw(S), 1) + ' MW.', 'الماء المحفوظ خلف السد يختزن طاقة وضع، وعند سقوطه خلال الأنبوب تتحول إلى طاقة حركية تدير التوربين، والتوربين يدير المولد الكهربائي فيحولها إلى طاقة كهربائية. القدرة تزداد بزيادة ارتفاع الماء وكمية الماء المتدفقة.', 'سدود مثل سد الموصل وسد حديثة تولد الكهرباء من طاقة الماء.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== B3 — مصادر الطاقة النووية: الانشطار والتفاعل المتسلسل وقضبان التحكم (3-2-8، ص 152) =============== */
(() => {
  const NC = 7, NR = 10, NRODS = 4, BALLS = [[0, 0, 1], [-5, -4, 0], [5, -4, 1], [-6, 3, 1], [6, 3, 0], [0, 6, 0], [0, -7, 1], [-3, 1, 0], [3, 1, 1]];
  const D = { id: 'g9_en_fission', page: 152, fig: 'ص 152',
    desc: 'تنتج محطات الطاقة النووية الطاقة الكهربائية باستعمال منظومة تسمى المفاعل النووي (nuclear reactor)، إذ ينتج المفاعل طاقة حرارية هائلة جداً عن طريق انشطار (fission) نوى ذرات عنصر ثقيل مثل اليورانيوم (235) الذي يستعمل وقوداً نووياً للمفاعل. عندما يصطدم نيوترون بنواة اليورانيوم 235 تنشطر إلى نواتين أصغر وتتحرر طاقة ونيوترونان أو ثلاثة تشطر نوى أخرى، فيحدث تفاعل متسلسل. قضبان التحكم تمتص النيوترونات الزائدة فتبقي التفاعل تحت السيطرة.',
    tags: 'الطاقة النووية المفاعل النووي الانشطار النووي اليورانيوم 235 نيوترون تفاعل متسلسل قضبان التحكم الكادميوم وقود نووي حرارة',
    tools: ['نوى اليورانيوم 235', 'نيوترونات', 'قضبان التحكم'],
    steps: ['اضغط «أطلق نيوتروناً» أو اضغط داخل قلب المفاعل: ماذا يحدث للنواة؟', 'اسحب قضبان التحكم إلى الأعلى (إخراجها): هل يزداد عدد النيوترونات؟', 'أدخل القضبان أكثر: متى يتوقف التفاعل؟ ومتى يبقى مستقراً؟'],
    concl: ['النيوترون يشطر نواة اليورانيوم 235 إلى نواتين أصغر مع طاقة حرارية ونيوترونين أو ثلاثة.', 'النيوترونات الجديدة تشطر نوى أخرى: تفاعل متسلسل.', 'قضبان التحكم تمتص النيوترونات فتتحكم في سرعة التفاعل وكمية الحرارة.'],
    laws: ['g9_l8_fission'],
    controls: [R('rods', 'إدخال قضبان التحكم', 0, 100, 45, 1, '%'), R('nn', 'النيوترونات الناتجة من كل انشطار', 2, 3, 3, 1, ''), TG('slow', 'حركة بطيئة', false, null, 'slow'), TG('fuel', 'تجديد الوقود باستمرار', true, null, 'atom')],
    setup(S) { S.nuc = []; for (let i = 0; i < NC * NR; i++) S.nuc.push(1); S.dead = {}; S.nt = []; S.fr = []; S.fl = []; S.nf = 0; S.rl = .45; S.hist = []; S.hk = 0; S.heat = 0; S.over = 0; S.fire0 = .6; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), y0 = 112, y1 = h - 178; return { w, h, L, x0, x1, y0, y1, cw: (x1 - x0) / NC, ch: (y1 - y0) / NR }; },
    np(g, i) { return [g.x0 + g.cw * (i % NC + .5), g.y0 + g.ch * (Math.floor(i / NC) + .5)]; },
    rx(g, k) { return g.x0 + g.cw * [1, 3, 4, 6][k]; },
    fire(S, y) { if (!S.W) return; const g = D.geo(S), yy = y == null ? g.y0 + (g.y1 - g.y0) * (.2 + Math.random() * .6) : y, r = clamp(Math.floor((yy - g.y0) / g.ch), 0, NR - 1), [tx, ty] = D.np(g, r * NC + 1); S.nt.push({ x: g.x0 + 4, y: yy, vx: tx - g.x0 - 4, vy: ty - yy }); },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), sp = (S.p.slow ? 55 : 150) * dt; Q38.ez(S, 'rl', S.p.rods / 100, dt, 5);
      if (S.fire0 > 0) { S.fire0 -= dt; if (S.fire0 <= 0) D.fire(S); }
      const rl = g.y0 + (g.y1 - g.y0) * S.rl, nn = [];
      S.nt.forEach(n => { const l = Math.hypot(n.vx, n.vy) || 1; n.x += n.vx / l * sp; n.y += n.vy / l * sp;
        if (n.x < g.x0 || n.x > g.x1 || n.y < g.y0 || n.y > g.y1) return;
        for (let k = 0; k < NRODS; k++) { const x = D.rx(g, k); if (Math.abs(n.x - x) < 7 && n.y < rl) { S.fl.push({ x: n.x, y: n.y, a: 0, c: 'abs' }); return; } }
        for (let i = 0; i < S.nuc.length; i++) { if (!S.nuc[i]) continue; const [x, y] = D.np(g, i); if (Math.hypot(n.x - x, n.y - y) < 13) { S.nuc[i] = 0; S.dead[i] = 0; S.nf++; S.heat += 1; const a = Math.random() * TAU;
            S.fr.push({ x, y, vx: Math.cos(a), vy: Math.sin(a), a: 0 }); S.fl.push({ x, y, a: 0, c: 'f' });
            for (let j = 0; j < S.p.nn; j++) { const b = Math.random() * TAU; nn.push({ x: x + Math.cos(b) * 13, y: y + Math.sin(b) * 13, vx: Math.cos(b), vy: Math.sin(b) }); } return; } }
        nn.push(n); });
      S.over = nn.length > 140 ? 1 : Math.max(0, S.over - dt * .3); S.nt = nn.slice(0, 160);
      S.fr.forEach(f => { f.a += dt * .9; }); S.fr = S.fr.filter(f => f.a < 1); S.fl.forEach(f => { f.a += dt * 2.2; }); S.fl = S.fl.filter(f => f.a < 1);
      if (S.p.fuel) for (const i in S.dead) { S.dead[i] += dt; if (S.dead[i] > 3.5) { S.nuc[i] = 1; delete S.dead[i]; } }
      S.heat *= Math.exp(-dt * .6); S.hk += dt; if (S.hk > .1) { S.hk = 0; S.hist.push(S.nt.length); if (S.hist.length > 120) S.hist.shift(); } },
    trend(S) { const H = S.hist, n = H.length; if (n < 20) return 0; const a = H.slice(n - 10).reduce((s, v) => s + v, 0), b = H.slice(n - 20, n - 10).reduce((s, v) => s + v, 0); if (a === 0 && b === 0) return -2; return a > b * 1.25 + 2 ? 1 : a < b * .8 - 1 ? -1 : 0; },
    nucleus(ctx, x, y, a = 1) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; BALLS.forEach(b => { const g = ctx.createRadialGradient(x + b[0] - 1.5, y + b[1] - 1.5, .5, x + b[0], y + b[1], 4.6); g.addColorStop(0, '#fff'); g.addColorStop(.35, b[2] ? '#ef4444' : '#3b82f6'); g.addColorStop(1, b[2] ? '#7f1d1d' : '#1e3a8a'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x + b[0], y + b[1], 4.4, 0, TAU); ctx.fill(); }); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), rl = g.y0 + (g.y1 - g.y0) * S.rl, tr = D.trend(S); Q38.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 14; const bg = ctx.createRadialGradient((g.x0 + g.x1) / 2, (g.y0 + g.y1) / 2, 20, (g.x0 + g.x1) / 2, (g.y0 + g.y1) / 2, 380); bg.addColorStop(0, 'rgba(56,189,248,' + (.25 + Math.min(.5, S.heat * .02)) + ')'); bg.addColorStop(1, '#0c4a6e'); ctx.fillStyle = bg; rr(ctx, g.x0 - 6, g.y0 - 6, g.x1 - g.x0 + 12, g.y1 - g.y0 + 12, 14); ctx.fill(); ctx.restore();
        if (S.heat > .5) { ctx.fillStyle = 'rgba(249,115,22,' + Math.min(.35, S.heat * .012) + ')'; rr(ctx, g.x0 - 6, g.y0 - 6, g.x1 - g.x0 + 12, g.y1 - g.y0 + 12, 14); ctx.fill(); } });
      Q33.T(ctx, 'قلب المفاعل: ماء ووقود اليورانيوم 235', (g.x0 + g.x1) / 2, g.y1 + 18, { s: 12, w: 900, c: '#fff', bg: '#0c4a6e' });
      S.nuc.forEach((on, i) => { const [x, y] = D.np(g, i); if (on) D.nucleus(ctx, x, y); else if (S.dead[i] > 2.5) D.nucleus(ctx, x, y, (S.dead[i] - 2.5)); });
      S.fl.forEach(f => K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = 1 - f.a; const r = f.c === 'f' ? 8 + 34 * f.a : 6 + 10 * f.a; const gr = ctx.createRadialGradient(f.x, f.y, 1, f.x, f.y, r); gr.addColorStop(0, f.c === 'f' ? '#fff7ed' : '#e5e7eb'); gr.addColorStop(.4, f.c === 'f' ? 'rgba(249,115,22,.9)' : 'rgba(100,116,139,.6)'); gr.addColorStop(1, 'rgba(249,115,22,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, TAU); ctx.fill(); ctx.restore(); }));
      S.fr.forEach(f => { const d = 8 + 40 * f.a; K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = 1 - f.a; [[1, '#a855f7'], [-1, '#22c55e']].forEach(([sg, c]) => { const x = f.x + f.vx * d * sg, y = f.y + f.vy * d * sg; const gr = ctx.createRadialGradient(x - 2, y - 2, .5, x, y, 7); gr.addColorStop(0, '#fff'); gr.addColorStop(.4, c); gr.addColorStop(1, shade(c, -60)); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, 6.5, 0, TAU); ctx.fill(); }); ctx.restore(); }); });
      K.raw(ctx, () => { S.nt.forEach(n => { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(n.x - n.vx * 6, n.y - n.vy * 6, 3, 0, TAU); ctx.fill(); ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, TAU); ctx.fill(); ctx.stroke(); }); });
      // control rods
      K.raw(ctx, () => { for (let k = 0; k < NRODS; k++) { const x = D.rx(g, k), gr = ctx.createLinearGradient(x - 6, 0, x + 6, 0); gr.addColorStop(0, '#374151'); gr.addColorStop(.5, '#d1d5db'); gr.addColorStop(1, '#1f2937'); ctx.fillStyle = gr; ctx.fillRect(x - 6, g.y0 - 34, 12, rl - g.y0 + 34); }
        ctx.fillStyle = '#1f2937'; rr(ctx, D.rx(g, 0) - 16, g.y0 - 44, D.rx(g, NRODS - 1) - D.rx(g, 0) + 32, 12, 4); ctx.fill(); });
      Q33.T(ctx, 'قضبان التحكم ' + Math.round(S.rl * 100) + '%', (D.rx(g, 1) + D.rx(g, 2)) / 2, g.y0 - 56, { s: 11, w: 900, c: '#fff', bg: '#374151' });
      if (S.over) Q33.T(ctx, 'تفاعل غير مسيطر عليه!', (g.x0 + g.x1) / 2, (g.y0 + g.y1) / 2, { s: 18, w: 900, c: '#fff', bg: 'rgba(185,28,28,' + (.6 + .4 * S.over) + ')' });
      const st = S.nt.length === 0 ? ['التفاعل متوقف', '#64748b'] : tr > 0 ? ['التفاعل يتزايد', '#b91c1c'] : tr < 0 ? ['التفاعل يتناقص', '#2563eb'] : ['التفاعل مستقر ومتحكم به', '#047857'];
      const hc = Q38.card(ctx, S, [{ t: 'انشطار نواة اليورانيوم 235:', c: '#0f172a', w: 900 }, { t: 'U-235 + n → X + Y + ' + S.p.nn + 'n + Energy', c: '#7c2d12', w: 900, mono: 1 }, { t: 'قضبان التحكم تمتص النيوترونات الزائدة.', c: '#334155' }], { title: 'التفاعل المتسلسل', wd: 300, y: 64 });
      const ph = Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['النيوترونات الحرة', S.nt.length + ''], ['عدد الانشطارات', S.nf + ''], ['الطاقة المتحررة', Q31.sci(S.nf * 3.2e-11, 2) + ' J'], ['الحالة', st[0], st[1]]], { lh: 22 });
      // population graph
      const gy0 = 64 + hc + ph + 18, gx1 = w - 12, gx0 = gx1 - 300, gh = Math.min(150, h - 172 - gy0);
      if (gh > 60) { K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.94)'; ctx.strokeStyle = '#059669'; ctx.lineWidth = 2; rr(ctx, gx0, gy0, 300, gh, 12); ctx.fill(); ctx.stroke(); const H = S.hist, mx = Math.max(10, ...H); ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 2.2; ctx.beginPath(); H.forEach((v, i) => { const x = gx0 + 14 + (272) * i / 119, y = gy0 + gh - 12 - (gh - 40) * v / mx; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); });
        Q33.T(ctx, 'عدد النيوترونات مع الزمن', gx0 + 150, gy0 + 14, { s: 11, w: 900, c: '#047857' }); }
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'أطلق نيوتروناً، واسحب قضبان التحكم للسيطرة على التفاعل');
    },
    chips(S, g) { return Q38.chips(S, 'act', [['fire', '⚛ أطلق نيوتروناً'], ['rs', '↺ إعادة']], g.h - 84, '', (S2, k) => { if (k === 'fire') D.fire(S2); else { D.setup(S2); S2.fire0 = 0; } }, { bw: 170 }).concat(Q38.chips(S, 'rd', [['0', 'إخراج القضبان'], ['45', 'إدخال جزئي'], ['100', 'إدخال كامل']], g.h - 128, String(S.p.rods), (S2, k) => { setParam(S2, 'rods', +k); }, { bw: 150 })); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), rl = g.y0 + (g.y1 - g.y0) * S.rl, cx = (D.rx(g, 1) + D.rx(g, 2)) / 2;
      return [{ id: 'rods', x: cx, y: rl - 10, w: D.rx(g, NRODS - 1) - D.rx(g, 0) + 30, h: 34, axis: 'y', keep: true, tip: 'اسحب قضبان التحكم للأعلى أو للأسفل', idle: 'اسحب القضبان ✋', drag: (S2, d) => { setParam(S2, 'rods', Math.round(clamp((d.y + 10 - g.y0) / (g.y1 - g.y0), 0, 1) * 100)); } },
        { id: 'core', x: (g.x0 + g.x1) / 2, y: g.y1 - 40, w: g.x1 - g.x0 - 20, h: 60, axis: 'none', hint: false, tip: 'اضغط لإطلاق نيوترون', click: S2 => { D.fire(S2, g.y1 - 40); } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('قضبان التحكم', S.p.rods + ' %'), rd('النيوترونات الحرة', S.nt.length), rd('عدد الانشطارات', S.nf), rd('الطاقة المتحررة', Q31.sci(S.nf * 3.2e-11, 2) + ' J')]; },
    explain(S) { return Q26.ex('حدث ' + S.nf + ' انشطاراً، وكل انشطار يحرر طاقة حرارية ونيوترونات جديدة.', 'النيوترون يصطدم بنواة اليورانيوم 235 فتنشطر إلى نواتين أصغر وتتحرر طاقة حرارية هائلة مع نيوترونين أو ثلاثة، وهذه تشطر نوى أخرى فيستمر التفاعل (تفاعل متسلسل). قضبان التحكم (من الكادميوم) تمتص النيوترونات: إخراجها يزيد التفاعل، وإدخالها يبطئه أو يوقفه.', 'في المفاعل النووي تستعمل حرارة الانشطار لتحويل الماء إلى بخار يدير التوربين.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== B4 — محطة الطاقة النووية: المفاعل، مولد البخار، التوربين، المولد، برج التبريد (3-2-8، ص 152، الشكل 5) =============== */
(() => {
  const D = { id: 'g9_en_reactor', page: 152, fig: 'الشكل 5',
    desc: 'يستفاد من الحرارة الناجمة عن الانشطار النووي في المفاعل لتحويل الماء إلى بخار، ويدير البخار التوربين البخاري (الشكل 5) الذي بدوره يدير المولد الكهربائي فيولد الكهرباء. قضبان التحكم تنظم سرعة الانشطار، والماء يبرد قلب المفاعل وينقل حرارته إلى مولد البخار.',
    tags: 'محطة الطاقة النووية المفاعل النووي قضبان التحكم قلب المفاعل مولد البخار التوربين البخاري المولد الكهربائي برج التبريد مضخة التبريد',
    tools: ['المفاعل النووي (قلب المفاعل وقضبان التحكم)', 'مولد البخار', 'التوربين البخاري', 'المولد الكهربائي', 'برج التبريد', 'مضخة التبريد'],
    steps: ['اسحب قضبان التحكم إلى الأعلى ببطء: راقب حرارة قلب المفاعل والقدرة الكهربائية.', 'اضغط على مضخة التبريد لإيقافها: ماذا يحدث لحرارة القلب؟', 'جرّب إيقاف «نظام الأمان التلقائي» من اللوحة ثم أخرج القضبان كلياً (بحذر!).'],
    concl: ['في المحطة النووية: نووية ← حرارية ← حركية ← كهربائية.', 'حرارة الانشطار تحول الماء إلى بخار يدير التوربين والمولد.', 'إدخال قضبان التحكم يبطئ الانشطار ويقلل الحرارة، والتبريد ضروري لسلامة المفاعل.'],
    laws: ['g9_l8_fission'],
    controls: [R('rods', 'إدخال قضبان التحكم', 0, 100, 60, 1, '%'), R('pump', 'مضخة التبريد', 0, 100, 80, 1, '%'), TG('auto', 'نظام الأمان التلقائي', true, null, 'eye'), TG('lbl', 'أسماء الأجزاء', true, null, 'eye')],
    setup(S) { S.rl = .6; S.pw = 0; S.T = 40; S.om = 0; S.rot = 0; S.ph = 0; S.scram = 0; S.MWh = 0; },
    update(S, dt) { S.ph += dt; Q38.ez(S, 'rl', S.p.rods / 100, dt, 3); const pt = clamp((1 - S.rl) * 1.6, 0, 1.6); Q38.ez(S, 'pw', pt, dt, .8);
      const cool = .35 + .65 * S.p.pump / 100; Q38.ez(S, 'T', 40 + 300 * S.pw / cool, dt, .6);
      if (S.p.auto && S.T > 360 && !S.scram) { S.scram = 3; setParam(S, 'rods', 100); } if (S.scram) S.scram = Math.max(0, S.scram - dt);
      const st = clamp((S.T - 100) / 220, 0, 1) * Math.min(1, S.p.pump / 40 + .2); Q38.ez(S, 'om', st, dt, 1.2); S.rot += S.om * dt * 16; S.MWh += 1000 * S.om * dt / 3600 * 60; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), sy = 314, sh = h - 150 - sy - 8; return { w, h, L, x0, x1, sy, sh, W: w - 24 - x0, sx1: w - 24 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), X = f => g.x0 + g.W * f, lb = S.p.lbl, P = 1000 * S.om, hot = clamp((S.T - 40) / 340, 0, 1), dz = S.T > 330; Q38.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = dz ? '#ef4444' : '#a7f3d0'; ctx.lineWidth = dz ? 3 : 2; rr(ctx, g.x0, 70, g.x1 - g.x0, 228, 14); ctx.fill(); ctx.stroke(); });
      const gx = i => g.x0 + (g.x1 - g.x0) * (i + .5) / 3;
      Q38.gauge(ctx, gx(2), 126, 34, (S.T - 20) / 380, 'حرارة قلب المفاعل', Math.round(S.T) + ' °C', '#dc2626'); Q38.gauge(ctx, gx(1), 126, 34, S.om, 'سرعة التوربين', Math.round(3000 * S.om) + ' rpm', '#2563eb'); Q38.gauge(ctx, gx(0), 126, 34, S.om, 'القدرة', Math.round(P) + ' MW', '#047857');
      Q38.chain(ctx, g.x1 - 6, g.x0 + 6, 256, [['نووية', '#7c3aed', S.pw > .03 ? 1 : 0], ['حرارية', '#dc2626', S.pw > .03 ? 1 : 0], ['حركية', '#2563eb', S.om > .05 ? 1 : 0], ['كهربائية', '#f59e0b', S.om > .05 ? 1 : 0]]);
      if (dz) Q33.T(ctx, 'خطر: ارتفاع حرارة قلب المفاعل!', (g.x0 + g.x1) / 2, 284, { s: 12, w: 900, c: '#fff', bg: (S.ph * 3 % 1) < .5 ? '#b91c1c' : '#ef4444' }); else if (S.scram) Q33.T(ctx, 'نظام الأمان أدخل القضبان كلياً', (g.x0 + g.x1) / 2, 284, { s: 12, w: 900, c: '#fff', bg: '#2563eb' });
      const gy = Q38.scene(ctx, g.x0, g.sy, g.W, g.sh, { gf: .9 });
      // containment dome + vessel
      const dx = X(.15), vw = 76, vt = g.sy + 120, vb = gy - 26;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(226,232,240,.92)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(dx - 82, gy); ctx.lineTo(dx - 82, g.sy + 110); ctx.arc(dx, g.sy + 110, 82, Math.PI, 0); ctx.lineTo(dx + 82, gy); ctx.closePath(); ctx.fill(); ctx.stroke();
        const vg = ctx.createLinearGradient(dx - vw / 2, 0, dx + vw / 2, 0); vg.addColorStop(0, '#475569'); vg.addColorStop(.5, '#cbd5e1'); vg.addColorStop(1, '#334155'); ctx.fillStyle = vg; rr(ctx, dx - vw / 2, vt, vw, vb - vt, 20); ctx.fill();
        ctx.fillStyle = 'rgba(56,189,248,.85)'; rr(ctx, dx - vw / 2 + 7, vt + 14, vw - 14, vb - vt - 22, 12); ctx.fill();
        const cy0 = vt + 50, cy1 = vb - 18; for (let k = 0; k < 5; k++) { const x = dx - 24 + k * 12, gl = ctx.createLinearGradient(x - 3, 0, x + 3, 0); gl.addColorStop(0, '#f97316'); gl.addColorStop(.5, hot > .05 ? '#fde68a' : '#fdba74'); gl.addColorStop(1, '#c2410c'); ctx.save(); if (hot > .05) { ctx.shadowColor = 'rgba(56,189,248,.95)'; ctx.shadowBlur = 16 * hot; } ctx.fillStyle = gl; ctx.fillRect(x - 3, cy0, 6, cy1 - cy0); ctx.restore(); }
        const rl = cy0 - 40 + (cy1 - cy0 + 30) * S.rl; ctx.fillStyle = '#1f2937'; for (let k = 0; k < 4; k++) { const x = dx - 18 + k * 12; ctx.fillRect(x - 2.5, vt - 30, 5, rl - vt + 30); } ctx.fillRect(dx - 26, vt - 34, 52, 7); });
      if (lb) { Q33.T(ctx, 'المفاعل', dx, g.sy + 46, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' }); Q33.T(ctx, 'قضبان التحكم', dx, vt - 48, { s: 10, w: 900, c: '#fff', bg: '#1f2937' }); }
      // primary loop → steam generator
      const sx = X(.36), st = g.sy + 130, sb = gy - 30; const hotc = 'rgb(' + Math.round(59 + 180 * hot) + ',' + Math.round(130 - 80 * hot) + ',' + Math.round(246 - 200 * hot) + ')';
      const p1 = [[dx + vw / 2, vt + 30], [sx - 24, vt + 30], [sx - 24, st + 20]], p2 = [[sx - 24, sb - 14], [sx - 24, vb - 10], [dx + vw / 2, vb - 10]];
      Q38.pipe(ctx, p1, { w: 9, col: hotc }); Q38.pipe(ctx, p2, { w: 9, col: '#60a5fa' }); const fl = S.p.pump / 100;
      if (fl > .02) { Q38.stream(ctx, p1, S.ph * 70 * fl, '#fff7ed', { sp: 16, r: 2.4 }); Q38.stream(ctx, p2, S.ph * 70 * fl, '#dbeafe', { sp: 16, r: 2.4 }); }
      const pmx = (sx - 24 + dx + vw / 2) / 2; K.raw(ctx, () => { ctx.fillStyle = '#0f766e'; ctx.beginPath(); ctx.arc(pmx, vb - 10, 13, 0, TAU); ctx.fill(); ctx.save(); ctx.translate(pmx, vb - 10); ctx.rotate(S.ph * 12 * fl); ctx.strokeStyle = '#ccfbf1'; ctx.lineWidth = 2.5; for (let k = 0; k < 3; k++) { ctx.rotate(TAU / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(9, 0); ctx.stroke(); } ctx.restore(); });
      if (lb) Q33.T(ctx, 'المضخة', pmx, vb + 14, { s: 10, w: 900, c: '#fff', bg: '#0f766e' });
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(sx - 26, 0, sx + 26, 0); sg.addColorStop(0, '#64748b'); sg.addColorStop(.5, '#e2e8f0'); sg.addColorStop(1, '#475569'); ctx.fillStyle = sg; rr(ctx, sx - 26, st, 52, sb - st, 22); ctx.fill(); ctx.strokeStyle = hotc; ctx.lineWidth = 3; ctx.beginPath(); for (let y = st + 26; y < sb - 14; y += 12) { ctx.moveTo(sx - 16, y); ctx.lineTo(sx + 16, y + 6); } ctx.stroke(); });
      if (lb) Q33.T(ctx, 'مولد البخار', sx, (st + sb) / 2, { s: 10.5, w: 900, c: '#fff', bg: '#475569' });
      // steam → turbine → generator
      const tx = X(.56), ty = gy - 78, s2 = clamp((S.T - 100) / 220, 0, 1); const sp = [[sx, st], [sx, st - 34], [tx + 30, st - 34], [tx + 30, ty - 34]]; Q38.pipe(ctx, sp, { w: 9, col: '#e2e8f0' }); if (s2 > .02) Q38.stream(ctx, sp, S.ph * 120 * s2, '#fff', { sp: 15, r: 3 });
      const rp = [[tx, ty + 38], [tx, gy - 8], [sx + 26, gy - 8], [sx + 26, sb - 24]]; Q38.pipe(ctx, rp, { w: 6, col: '#60a5fa' });
      Q38.casing(ctx, tx, ty, 82, 70, lb ? 'التوربين' : '', '#64748b'); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(tx, ty, 28, 0, TAU); ctx.fill(); }); Q38.turb(ctx, tx, ty, 26, S.rot, { n: 12 });
      const gx2 = X(.71); K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.fillRect(tx + 41, ty - 4, gx2 - tx - 70, 8); }); Q38.gen(ctx, gx2, ty, .9, S.rot, S.om, { lab: lb ? 'المولد' : '' });
      // cooling tower + pylon
      const cx = X(.9); K.raw(ctx, () => { const tg = ctx.createLinearGradient(cx - 40, 0, cx + 40, 0); tg.addColorStop(0, '#a8a29e'); tg.addColorStop(.5, '#f5f5f4'); tg.addColorStop(1, '#78716c'); ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(cx - 44, gy); ctx.quadraticCurveTo(cx - 20, gy - 70, cx - 30, gy - 130); ctx.lineTo(cx + 30, gy - 130); ctx.quadraticCurveTo(cx + 20, gy - 70, cx + 44, gy); ctx.closePath(); ctx.fill();
        for (let k = 0; k < 5; k++) { const a = ((S.ph * .4 + k / 5) % 1); ctx.fillStyle = 'rgba(255,255,255,' + (.75 * (1 - a) * (.2 + S.om)) + ')'; ctx.beginPath(); ctx.arc(cx + Math.sin(k * 2) * 10, gy - 140 - a * 60, 14 + 20 * a, 0, TAU); ctx.fill(); } });
      if (lb) Q33.T(ctx, 'برج التبريد', cx, gy + 12, { s: 10.5, w: 900, c: '#fff', bg: '#57534e' });
      const pw = Q38.pylon(ctx, X(.8), gy, 96); Q33.wire(ctx, [[gx2 + 30, ty - 12], [X(.8) - 30, ty - 12], [pw[0][0], pw[0][1]]], { col: '#334155' });
      const hc = Q38.card(ctx, S, [{ t: 'حرارة الانشطار في المفاعل تحول الماء إلى بخار.', c: '#0f172a' }, { t: 'البخار يدير التوربين، والتوربين يدير المولد.', c: '#047857', w: 900 }], { title: 'توليد الكهرباء من الطاقة النووية', wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['قضبان التحكم', Math.round(S.rl * 100) + '%'], ['مضخة التبريد', S.p.pump + '%'], ['القدرة الكهربائية', Math.round(P) + ' MW']], { lh: 22 });
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'اسحب قضبان التحكم، واضغط على مضخة التبريد');
    },
    chips(S, g) { return Q38.chips(S, 'op', [['n', 'تشغيل عادي'], ['scram', 'إيقاف طارئ'], ['cool', 'إيقاف التبريد']], g.h - 84, '', (S2, k) => { if (k === 'n') { setParam(S2, 'rods', 60); setParam(S2, 'pump', 80); } else if (k === 'scram') setParam(S2, 'rods', 100); else setParam(S2, 'pump', 0); }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), dx = g.x0 + g.W * .15, gy = g.sy + g.sh * .9, vt = g.sy + 120, vb = gy - 26, cy0 = vt + 50, cy1 = vb - 18, rl = cy0 - 40 + (cy1 - cy0 + 30) * S.rl, sx = g.x0 + g.W * .36;
      return [{ id: 'rods', x: dx, y: rl, w: 60, h: 34, axis: 'y', keep: true, tip: 'اسحب قضبان التحكم', idle: 'اسحب القضبان ✋', drag: (S2, d) => { setParam(S2, 'rods', Math.round(clamp((d.y - cy0 + 40) / (cy1 - cy0 + 30), 0, 1) * 100)); } },
        { id: 'pump', x: (sx - 24 + dx + 38) / 2, y: vb - 10, r: 22, axis: 'none', hint: false, tip: 'اضغط لتشغيل/إيقاف مضخة التبريد', click: S2 => { setParam(S2, 'pump', S2.p.pump > 0 ? 0 : 80); } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('قضبان التحكم', Math.round(S.rl * 100) + ' %'), rd('حرارة قلب المفاعل', Math.round(S.T) + ' °C'), rd('القدرة الكهربائية', Math.round(1000 * S.om) + ' MW')]; },
    record(S) { return { r: Math.round(S.rl * 100), T: Math.round(S.T), P: Math.round(1000 * S.om) }; },
    cols: [['r', 'القضبان (%)'], ['T', 'T (°C)'], ['P', 'P (MW)']],
    explain(S) { return Q26.ex('حرارة قلب المفاعل ' + Math.round(S.T) + ' °C والقدرة المتولدة ' + Math.round(1000 * S.om) + ' MW.', 'الانشطار النووي في قلب المفاعل يولد حرارة هائلة ينقلها ماء التبريد إلى مولد البخار فيتحول الماء إلى بخار يدير التوربين البخاري، والتوربين يدير المولد فيولد الكهرباء. إخراج قضبان التحكم يزيد الانشطار والحرارة، وإدخالها يقللهما؛ ولا بد من التبريد المستمر لمنع ارتفاع حرارة القلب.', 'برج التبريد يطلق بخار ماء وليس دخاناً.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== C1 — الخلية الشمسية: ضوء الشمس ← كهرباء، ميل اللوح، الغيوم، لوح الزجاج، ضخ مياه الآبار (1-3-8، ص 154–156، الأشكال 6 و 7 وهل تعلم) =============== */
(() => {
  const PM = 300, LD = [['lamp', 'مصباح'], ['pump', 'مضخة مياه بئر'], ['bat', 'شحن بطارية']];
  const D = { id: 'g9_en_solarcell', page: 155, fig: 'الشكلان 6 و 7 + هل تعلم ص 156',
    desc: 'الطاقة الشمسية التي تستقبلها الأرض هي مصدر الحياة على سطحها والمصدر المباشر وغير المباشر لمختلف أنواع الطاقات المتوافرة عليها (الشكل 6). تتميز بسهولة توفرها في الكثير من بقاع العالم وخلوها من أي تأثيرات سلبية على البيئة. مبدأ عمل الخلية الشمسية يقوم على تحويل طاقة ضوء الشمس إلى طاقة كهربائية (الشكل 7)، وتغطى الخلية الشمسية بلوح زجاجي لحمايتها من التأثيرات الجوية. هل تعلم: تستعمل الخلايا الشمسية لتوليد الطاقة الكهربائية وتستثمر الطاقة المتولدة لرفع مياه الآبار.',
    tags: 'الطاقة الشمسية الخلية الشمسية الخلايا الضوئية ضوء كهرباء لوح زجاجي ميل اللوح زاوية سقوط الأشعة الغيوم مضخة مياه الآبار توليد الكهرباء',
    tools: ['لوح خلايا شمسية', 'لوح زجاجي حامٍ', 'مصباح', 'مضخة مياه', 'بطارية', 'أسلاك'],
    steps: ['اسحب الشمس على مسارها من الشروق إلى الغروب وراقب القدرة الكهربائية.', 'أدر اللوح (المقبض الأحمر) حتى تسقط الأشعة عمودية عليه: متى تكون القدرة أكبر؟', 'زد الغيوم من اللوحة، ثم أزل «لوح الزجاج الحامي» وراقب ما يحدث للخلايا بمرور الزمن.', 'اختر الحمل: مصباح أو مضخة مياه بئر أو شحن بطارية.'],
    concl: ['الخلية الشمسية تحول طاقة ضوء الشمس إلى طاقة كهربائية.', 'تكون القدرة أكبر عندما تسقط الأشعة عمودية على اللوح، وتقل مع الغيوم.', 'يغطى اللوح بطبقة زجاجية لحماية الخلايا من التأثيرات الجوية (المطر والغبار والرياح).', 'الطاقة الشمسية نظيفة ومتوفرة، وتستعمل في رفع مياه الآبار.'],
    laws: ['g9_l8_solar'],
    controls: [R('hr', 'وقت النهار', 6, 18, 11, .1, 'h'), R('tilt', 'ميل اللوح', -70, 70, -25, 1, '°'), R('cl', 'الغيوم', 0, 100, 0, 1, '%'), TG('glass', 'لوح الزجاج الحامي', true, null, 'eye')],
    setup(S) { S.ld = 'pump'; S.hh = 11; S.tl = -25; S.P = 0; S.dmg = 0; S.ph = 0; S.wl = .2; S.bat = .3; S.ep = 0; S.wx = []; S.cx = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), sy = 314, sh = h - 150 - sy - 8, W = w - 24 - x0, gy = sy + sh * .84; return { w, h, L, x0, x1, sy, sh, W, gy, sx1: w - 24, pcx: x0 + W * .36, pcy: gy - 92, acx: x0 + W * .5, arx: W * .44, ary: gy - sy - 42 }; },
    sunp(g, hr) { const q = Math.PI * (hr - 6) / 12; return [g.acx - g.arx * Math.cos(q), g.gy - g.ary * Math.sin(q), q]; },
    calc(S, g) { const [sx, sy, q] = D.sunp(g, S.hh), b = S.tl * Math.PI / 180, n = [Math.sin(b), -Math.cos(b)], d = Q26.nrm([sx - g.pcx, sy - g.pcy]), c = Math.max(0, n[0] * d[0] + n[1] * d[1]), el = Math.sin(q);
      const I = el > 0 ? 1000 * Math.pow(el, .35) * (1 - .85 * S.p.cl / 100) : 0; return { c, I, P: PM * c * (I / 1000) * (1 - S.dmg), th: Math.acos(clamp(c, -1, 1)) * 180 / Math.PI }; },
    update(S, dt) { S.ph += dt; Q38.ez(S, 'hh', S.p.hr, dt, 4); Q38.ez(S, 'tl', S.p.tilt, dt, 5); S.cx += dt * 14;
      if (!S.W) return; const g = D.geo(S), r = D.calc(S, g); Q38.ez(S, 'P', r.P, dt, 4); S.ep += S.P * 9 * dt;
      if (!S.p.glass) { S.dmg = Math.min(.75, S.dmg + dt * .025); if (Math.random() < dt * 18) S.wx.push({ x: Math.random(), y: 0, d: Math.random() < .5 }); }
      S.wx.forEach(q => { q.y += dt * 1.4; }); S.wx = S.wx.filter(q => q.y < 1);
      if (S.ld === 'pump') S.wl = Math.min(1, S.wl + S.P / PM * dt * .05); if (S.ld === 'bat') S.bat = Math.min(1, S.bat + S.P / PM * dt * .04); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), r = D.calc(S, g), [sx, sy, q] = D.sunp(g, S.hh), day = clamp(Math.sin(q) * 3, .15, 1), I = S.P / 18; Q38.bg(ctx, w, h);
      // top-left: inside the cell + gauges
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2; rr(ctx, g.x0, 70, g.x1 - g.x0, 228, 14); ctx.fill(); ctx.stroke(); });
      D.zoom(ctx, g.x0 + 12, 84, 196, 168, S, r);
      Q38.gauge(ctx, g.x1 - 132, 126, 30, S.P / PM, 'القدرة', Q33.f(S.P, 0) + ' W', '#047857'); Q38.gauge(ctx, g.x1 - 52, 126, 30, I / (PM / 18), 'التيار', Q33.f(I, 1) + ' A', '#ca8a04');
      Q38.chain(ctx, g.x1 - 6, g.x1 - 190, 262, [['ضوئية', '#ca8a04', r.I > 5 ? 1 : 0], ['كهربائية', '#f59e0b', S.P > 1 ? 1 : 0]]);
      Q33.T(ctx, 'زاوية السقوط θ = ' + Math.round(r.th) + '°', g.x1 - 96, 288, { s: 11, w: 900, c: '#334155' });
      // scene
      const gy = Q38.scene(ctx, g.x0, g.sy, g.W, g.sh, { gf: .84, day });
      K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.setLineDash([5, 6]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(g.acx, g.gy, g.arx, g.ary, 0, Math.PI, TAU); ctx.stroke(); ctx.restore(); });
      if (q > 0 && q < Math.PI) { Q38.sun(ctx, sx, sy, 20, 1, S.ph);
        if (r.I > 5) K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = 'rgba(250,204,21,' + (.25 + .5 * r.I / 1000) + ')'; ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.lineDashOffset = -S.ph * 40; for (let k = -2; k <= 2; k++) { const b = S.tl * Math.PI / 180, ox = Math.cos(b) * k * 28, oy = Math.sin(b) * k * 28; ctx.beginPath(); ctx.moveTo(sx + ox * .3, sy + oy * .3); ctx.lineTo(g.pcx + ox, g.pcy + oy); ctx.stroke(); } ctx.restore(); }); }
      const cov = S.p.cl / 100; if (cov > .02) for (let k = 0; k < 4; k++) Q38.cloud(ctx, g.x0 + ((k * 190 + S.cx) % (g.W + 120)) - 40, g.sy + 50 + (k % 2) * 34, .9 + .5 * cov, Math.min(1, cov * 1.6), cov > .5);
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.lineWidth = 1.2; S.wx.forEach(p => { const x = g.pcx - 90 + p.x * 180, y = g.sy + p.y * (g.pcy - g.sy); if (p.d) { ctx.fillStyle = 'rgba(161,98,7,.6)'; ctx.fillRect(x, y, 3, 3); } else { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 3, y + 9); ctx.stroke(); } }); });
      // stand + panel
      K.raw(ctx, () => { ctx.fillStyle = '#64748b'; ctx.fillRect(g.pcx - 5, g.pcy, 10, gy - g.pcy); ctx.fillStyle = '#334155'; rr(ctx, g.pcx - 26, gy - 6, 52, 10, 3); ctx.fill();
        ctx.save(); ctx.translate(g.pcx, g.pcy); ctx.rotate(S.tl * Math.PI / 180); const L = 170; ctx.fillStyle = '#cbd5e1'; rr(ctx, -L / 2 - 4, -6, L + 8, 14, 3); ctx.fill();
        for (let k = 0; k < 8; k++) { const x = -L / 2 + k * L / 8, gr = ctx.createLinearGradient(x, -6, x + L / 8, 6); gr.addColorStop(0, '#1e3a8a'); gr.addColorStop(.5, '#2563eb'); gr.addColorStop(1, '#1e40af'); ctx.fillStyle = gr; ctx.fillRect(x + 1.5, -5, L / 8 - 3, 9); ctx.strokeStyle = 'rgba(191,219,254,.5)'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(x + L / 16, -5); ctx.lineTo(x + L / 16, 4); ctx.stroke();
          if (S.dmg > .05 && (k * 37) % 7 < S.dmg * 9) { ctx.strokeStyle = 'rgba(15,23,42,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 3, -4); ctx.lineTo(x + 9, 0); ctx.lineTo(x + 6, 3); ctx.stroke(); ctx.fillStyle = 'rgba(146,64,14,' + S.dmg * .6 + ')'; ctx.fillRect(x + 2, -5, L / 8 - 4, 9); } }
        if (S.p.glass) { ctx.fillStyle = 'rgba(224,242,254,.45)'; ctx.fillRect(-L / 2 - 2, -10, L + 4, 5); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-L / 2 + 10, -8); ctx.lineTo(-L / 2 + 50, -8); ctx.stroke(); }
        ctx.restore(); const b = S.tl * Math.PI / 180, hx = g.pcx + Math.cos(b) * 92, hy = g.pcy + Math.sin(b) * 92; ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(hx, hy, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 2; ctx.stroke();
        const n = [Math.sin(b), -Math.cos(b)]; ctx.setLineDash([4, 4]); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.pcx, g.pcy); ctx.lineTo(g.pcx + n[0] * 70, g.pcy + n[1] * 70); ctx.stroke(); ctx.setLineDash([]); });
      Q33.T(ctx, S.p.glass ? 'مغطى بلوح زجاجي' : 'بدون زجاج: تلف ' + Math.round(S.dmg * 100) + '%', g.pcx, gy + 18, { s: 10.5, w: 900, c: '#fff', bg: S.p.glass ? '#0369a1' : '#b91c1c' });
      // load
      const lx = g.x0 + g.W * .74; const wp = [[g.pcx + 6, gy - 20], [g.pcx + 60, gy - 20], [g.pcx + 60, gy - 2], [lx - 40, gy - 2]]; Q33.wire(ctx, wp, { col: '#dc2626' }); if (I > .2) Q33.flow(ctx, wp, S.ph * 30 * I, 'e');
      if (S.ld === 'lamp') { K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(lx - 4, gy - 150, 8, 150); ctx.fillRect(lx - 4, gy - 150, 40, 6); }); Q33.bulb(ctx, lx + 34, gy - 116, S.P / PM * 1.3, { s: 1.1 }); K.raw(ctx, () => { ctx.save(); ctx.translate(lx + 34, gy - 132); ctx.rotate(Math.PI); ctx.restore(); }); }
      if (S.ld === 'pump') { const wx = lx, tx = lx + 110, ty = gy - 120;
        K.raw(ctx, () => { ctx.fillStyle = '#78716c'; rr(ctx, wx - 30, gy - 30, 60, 30, 4); ctx.fill(); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(wx - 24, gy - 4, 48, 10);
          ctx.fillStyle = '#0f766e'; rr(ctx, wx - 16, gy - 62, 32, 32, 6); ctx.fill(); ctx.save(); ctx.translate(wx, gy - 46); ctx.rotate(S.ph * 10 * S.P / PM); ctx.strokeStyle = '#ccfbf1'; ctx.lineWidth = 2.5; for (let k = 0; k < 3; k++) { ctx.rotate(TAU / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(10, 0); ctx.stroke(); } ctx.restore();
          ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; rr(ctx, tx - 34, ty - 40, 68, 80, 6); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(37,99,235,.8)'; ctx.fillRect(tx - 31, ty + 37 - 74 * S.wl, 62, 74 * S.wl); ctx.fillStyle = '#64748b'; ctx.fillRect(tx - 24, ty + 40, 6, gy - ty - 40); ctx.fillRect(tx + 18, ty + 40, 6, gy - ty - 40); });
        const pp = [[wx, gy - 62], [wx, ty - 52], [tx, ty - 52], [tx, ty - 40]]; Q38.pipe(ctx, pp, { w: 6, col: '#94a3b8' }); if (S.P > 8) Q38.stream(ctx, pp, S.ph * 60 * S.P / PM, '#2563eb', { sp: 14, r: 2.4 });
        Q33.T(ctx, 'خزان ' + Math.round(S.wl * 100) + '%', tx, ty, { s: 10.5, w: 900, c: '#fff', bg: '#1d4ed8' }); Q33.T(ctx, 'بئر', wx, gy + 18, { s: 10.5, w: 900, c: '#fff', bg: '#57534e' }); }
      if (S.ld === 'bat') { Q33.bat(ctx, lx + 30, gy - 40, { V: 12, label: 'بطارية' }); Q38.bar(ctx, lx + 110, gy - 120, 30, 100, S.bat, '#16a34a', 'الشحن', Math.round(S.bat * 100) + '%'); }
      const hc = Q38.card(ctx, S, [{ t: 'الخلية الشمسية تحول طاقة ضوء الشمس إلى طاقة كهربائية.', c: '#047857', w: 900 }, { t: 'تغطى بلوح زجاجي لحمايتها من التأثيرات الجوية.', c: '#0f172a' }], { title: 'الخلية الشمسية', wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['شدة الإشعاع', Math.round(r.I) + ' W/m²'], ['القدرة الكهربائية', Q33.f(S.P, 0) + ' W'], ['الطاقة المنتجة', Q33.f(S.ep / 3.6e6, 3) + ' kW·h']], { lh: 22 });
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'اسحب الشمس، وأدر اللوح ليواجه أشعتها');
    },
    zoom(ctx, x, y, wd, ht, S, r) { const lv = r.I / 1000, cy = y + 64;
      K.raw(ctx, () => { ctx.save(); rr(ctx, x, y, wd, ht, 10); ctx.clip(); ctx.fillStyle = '#e0f2fe'; ctx.fillRect(x, y, wd, ht);
        if (S.p.glass) { ctx.fillStyle = 'rgba(186,230,253,.9)'; ctx.fillRect(x, cy - 12, wd, 10); }
        ctx.fillStyle = '#3b82f6'; ctx.fillRect(x, cy, wd, 30); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(x, cy + 30, wd, 40); ctx.fillStyle = '#9ca3af'; ctx.fillRect(x, cy + 70, wd, 8);
        for (let k = 0; k < 4; k++) { const ph = (S.ph * .9 + k / 4) % 1, px = x + 24 + k * 44; if (lv < .02) continue; ctx.strokeStyle = 'rgba(234,179,8,' + (.4 + .6 * lv) + ')'; ctx.lineWidth = 2; ctx.beginPath(); for (let j = 0; j < 20; j++) { const yy = y + 4 + j * 2.6 * ph * 2, xx = px + Math.sin(j * 1.2) * 4; if (yy > cy + 20) break; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
          if (ph > .55) { const ey = cy + 20 - (ph - .55) * 60; ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(px, ey, 4, 0, TAU); ctx.fill(); ctx.fillStyle = '#1e293b'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('−', px, ey + 3); } }
        ctx.restore(); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; rr(ctx, x, y, wd, ht, 10); ctx.stroke(); });
      Q33.T(ctx, 'داخل الخلية: ضوء ← إلكترونات', x + wd / 2, y + ht - 12, { s: 10.5, w: 900, c: '#0369a1' }); },
    chips(S, g) { return Q38.chips(S, 'ld', LD, g.h - 84, S.ld, (S2, k) => { S2.ld = k; }, { bw: 160 }).concat(Q38.chips(S, 'ac', [['new', '↺ لوح جديد'], ['best', 'وجّه اللوح نحو الشمس']], g.h - 128, '', (S2, k) => { if (k === 'new') { S2.dmg = 0; S2.wl = .2; S2.bat = .3; } else { const g2 = D.geo(S2), [sx, sy] = D.sunp(g2, S2.p.hr); const a = Math.atan2(sx - g2.pcx, -(sy - g2.pcy)) * 180 / Math.PI; setParam(S2, 'tilt', Math.round(clamp(a, -70, 70))); } }, { bw: 190 })); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), [sx, sy] = D.sunp(g, S.hh), b = S.tl * Math.PI / 180;
      return [{ id: 'sun', x: sx, y: sy, r: 26, axis: 'xy', keep: true, tip: 'اسحب الشمس على مسارها', idle: 'اسحب الشمس ✋', drag: (S2, d) => { const q = Math.atan2(g.gy - d.y, (g.acx - d.x) * g.ary / g.arx); setParam(S2, 'hr', +clamp(6 + 12 * q / Math.PI, 6, 18).toFixed(1)); } },
        { id: 'tilt', x: g.pcx + Math.cos(b) * 92, y: g.pcy + Math.sin(b) * 92, r: 18, cx: g.pcx, cy: g.pcy, keep: true, hint: false, tip: 'أدر اللوح الشمسي', drag: (S2, d) => { setParam(S2, 'tilt', Math.round(clamp(Math.atan2(d.y - g.pcy, d.x - g.pcx) * 180 / Math.PI, -70, 70))); } }].concat(D.chips(S, g)); },
    readings(S) { const r = S.W ? D.calc(S, D.geo(S)) : { I: 0, th: 0 }; return [rd('وقت النهار', Q33.f(S.p.hr, 1) + ' h'), rd('زاوية السقوط', Math.round(r.th) + '°'), rd('شدة الإشعاع', Math.round(r.I) + ' W/m²'), rd('القدرة الكهربائية', Q33.f(S.P, 0) + ' W')]; },
    record(S) { const r = D.calc(S, D.geo(S)); return { th: Math.round(r.th), P: Math.round(S.P) }; },
    cols: [['th', 'θ (°)'], ['P', 'P (W)']],
    graph: { x: 'th', y: 'P', xl: 'زاوية السقوط θ (°)', yl: 'القدرة P (W)' },
    explain(S) { return Q26.ex('اللوح ينتج ' + Q33.f(S.P, 0) + ' W.', 'الخلية الشمسية تحول طاقة ضوء الشمس مباشرة إلى طاقة كهربائية. تكون القدرة أكبر ما يمكن عندما تسقط الأشعة عمودية على اللوح، وتقل عند الشروق والغروب ومع الغيوم. يغطى اللوح بطبقة زجاجية لحماية الخلايا من المطر والغبار والتأثيرات الجوية، فبدونها تتلف الخلايا وتقل قدرتها.', 'تستعمل الألواح الشمسية لرفع مياه الآبار في المزارع والإنارة في الطرق.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== C2 — السخان الشمسي: صفيحة سوداء مقابل صفيحة لامعة (التطبيقات الحرارية، ص 155، الشكل 8) =============== */
(() => {
  const SY = [['blk', 'مطلية بالأسود', .95, '#111827'], ['shn', 'لامعة غير مطلية', .3, '#cbd5e1']], TA = 20;
  const D = { id: 'g9_en_heater', page: 155, fig: 'الشكل 8',
    desc: 'تشكل الطاقة الحرارية جزءاً كبيراً من استعمالات الإنسان للطاقة، لذلك شاعت التطبيقات الحرارية للطاقة الشمسية. السخان الشمسي منظومة متكاملة تتكون من أجزاء عدة تستعمل في تجميع الأشعة الشمسية الساقطة واستثمار طاقتها الحرارية في تسخين المياه خلال فترة سطوع الشمس (الشكل 8) وكذلك في تدفئة المنازل. تستعمل فيها معادن غير قابلة للصدأ مطلية باللون الأسود لغرض امتصاص أكبر كمية ممكنة من الأشعة الشمسية مثل أكاسيد الكروم والكوبلت.',
    tags: 'السخان الشمسي تسخين الماء التدفئة التطبيقات الحرارية للطاقة الشمسية اللون الأسود امتصاص الأشعة أكاسيد الكروم والكوبلت خزان مجمع شمسي مقارنة',
    tools: ['مجمع شمسي مطلي بالأسود', 'مجمع شمسي لامع غير مطلي', 'خزانا ماء', 'محرار'],
    steps: ['اسحب الشمس للأعلى أو للأسفل لتغيير شدة الأشعة وراقب المحرارين.', 'قارن: أي السخانين ترتفع درجة حرارة مائه أسرع؟ ولماذا؟', 'اضغط على صنبور أي خزان لسحب الماء الحار ولاحظ نزول درجة حرارته ثم ارتفاعها من جديد.'],
    concl: ['السخان الشمسي يجمع أشعة الشمس ويستثمر طاقتها الحرارية في تسخين المياه والتدفئة.', 'السطح الأسود يمتص أكبر كمية من الأشعة الشمسية فيسخن الماء أسرع وإلى درجة أعلى.', 'تطلى صفائح المجمعات بأكاسيد الكروم والكوبلت السوداء وتكون من معادن لا تصدأ.', 'الماء الساخن يصعد إلى الخزان والبارد ينزل إلى المجمع.'],
    laws: ['g9_l8_energy'],
    controls: [R('I', 'شدة أشعة الشمس', 0, 1000, 800, 10, 'W/m²'), R('k', 'تسريع الزمن', 1, 20, 6, 1, '×'), TG('cmp', 'مقارنة جنباً إلى جنب', true, null, 'vector')],
    setup(S) { S.T = [TA, TA]; S.ii = 800; S.ph = 0; S.min = 0; S.hist = [[TA, TA]]; S.hk = 0; S.fp = [0, 0]; },
    update(S, dt) { S.ph += dt; Q38.ez(S, 'ii', S.p.I, dt, 4); const dm = dt * S.p.k; S.min += dm;
      SY.forEach((q, i) => { S.T[i] += dm * (q[2] * S.ii / 1000 * 1.2 - .02 * (S.T[i] - TA)); S.fp[i] += dt * 40 * clamp((S.T[i] - TA) / 30, 0, 1.4); });
      S.T = S.T.slice(); S.hk += dm; if (S.hk > 1.5) { S.hk = 0; S.hist.push(S.T.slice()); if (S.hist.length > 90) S.hist.shift(); } },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), sy = 314, sh = h - 150 - sy - 8, W = w - 24 - x0, gy = sy + sh * .88; return { w, h, L, x0, x1, sy, sh, W, gy, sx1: w - 24, sunx: x0 + W * .5, suny: sy + 34 + (1 - S.ii / 1000) * 90 }; },
    hx(g, S, i) { return S.p.cmp ? g.x0 + g.W * (i ? .27 : .73) : g.x0 + g.W * .5; },
    heater(ctx, g, S, i, cx) { const q = SY[i], T = S.T[i], gy = g.gy, ang = -.6, L = 150, ccx = cx - 50, ccy = gy - 54, ca = Math.cos(ang), sa = Math.sin(ang), bot = [ccx - ca * L / 2, ccy - sa * L / 2], top = [ccx + ca * L / 2, ccy + sa * L / 2], tx = cx + 70, ty = top[1] - 34, hf = clamp((T - TA) / 50, 0, 1);
      // supports
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(top[0], gy); ctx.moveTo(tx - 40, ty + 20); ctx.lineTo(tx - 40, gy); ctx.moveTo(tx + 40, ty + 20); ctx.lineTo(tx + 40, gy); ctx.stroke(); });
      const hot = 'rgb(' + Math.round(96 + 150 * hf) + ',' + Math.round(165 - 120 * hf) + ',' + Math.round(250 - 210 * hf) + ')';
      const up = [[top[0], top[1]], [top[0] + 10, top[1] - 10], [tx - 56, ty - 6], [tx - 50, ty - 6]], dn = [[tx - 50, ty + 14], [tx - 66, ty + 14], [tx - 66, gy - 8], [bot[0] - 14, gy - 8], [bot[0] - 14, bot[1]], [bot[0], bot[1]]];
      Q38.pipe(ctx, dn, { w: 6, col: '#60a5fa' }); Q38.pipe(ctx, up, { w: 6, col: hot }); if (T > TA + 1) { Q38.stream(ctx, up, S.fp[i], '#fef2f2', { sp: 14, r: 2.2 }); Q38.stream(ctx, dn, S.fp[i], '#dbeafe', { sp: 14, r: 2.2 }); }
      // collector
      K.raw(ctx, () => { ctx.save(); ctx.translate(ccx, ccy); ctx.rotate(ang); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 8; ctx.fillStyle = '#475569'; rr(ctx, -L / 2 - 5, -12, L + 10, 24, 4); ctx.fill(); ctx.shadowColor = 'transparent';
        const gr = ctx.createLinearGradient(-L / 2, -8, L / 2, 8); if (i === 0) { gr.addColorStop(0, '#030712'); gr.addColorStop(.5, '#1f2937'); gr.addColorStop(1, '#030712'); } else { gr.addColorStop(0, '#94a3b8'); gr.addColorStop(.45, '#f8fafc'); gr.addColorStop(1, '#94a3b8'); } ctx.fillStyle = gr; ctx.fillRect(-L / 2, -8, L, 16);
        ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; for (let k = 1; k < 8; k++) { ctx.beginPath(); ctx.moveTo(-L / 2 + k * L / 8, -7); ctx.lineTo(-L / 2 + k * L / 8, 7); ctx.stroke(); } ctx.fillStyle = 'rgba(224,242,254,.35)'; ctx.fillRect(-L / 2, -11, L, 4); ctx.restore(); });
      // reflected rays for the shiny plate
      if (S.ii > 50) K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = 'rgba(250,204,21,' + (.3 + .5 * S.ii / 1000) + ')'; ctx.lineWidth = 2; ctx.setLineDash([7, 6]); ctx.lineDashOffset = -S.ph * 40; for (let k = -1; k <= 1; k++) { const px = ccx + ca * k * 45, py = ccy + sa * k * 45; ctx.beginPath(); ctx.moveTo(g.sunx + (px - g.sunx) * .15, g.suny + (py - g.suny) * .15); ctx.lineTo(px, py); if (i === 1) { ctx.lineTo(px + (px - g.sunx) * -.1 + (cx < g.sunx ? -60 : 60), py - 70); } ctx.stroke(); } ctx.restore(); });
      // tank
      K.raw(ctx, () => { const tg = ctx.createLinearGradient(0, ty - 22, 0, ty + 22); tg.addColorStop(0, '#f1f5f9'); tg.addColorStop(.5, '#cbd5e1'); tg.addColorStop(1, '#64748b'); ctx.fillStyle = tg; rr(ctx, tx - 56, ty - 24, 112, 48, 22); ctx.fill(); ctx.fillStyle = hot; ctx.globalAlpha = .55; rr(ctx, tx - 44, ty - 12, 88, 24, 10); ctx.fill(); ctx.globalAlpha = 1;
        ctx.fillStyle = '#64748b'; ctx.fillRect(tx + 52, ty + 6, 18, 6); ctx.fillRect(tx + 64, ty + 6, 6, 16); });
      Q38.thermo(ctx, tx, ty - 36, 50, (T - 0) / 80); Q33.T(ctx, Q33.f(T, 1) + ' °C', tx + 40, ty - 62, { s: 12.5, w: 900, c: '#fff', bg: '#dc2626' });
      Q33.T(ctx, q[1], cx - 20, gy + 18, { s: 11.5, w: 900, c: '#fff', bg: i ? '#64748b' : '#111827' });
      return { tap: [tx + 67, ty + 26] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q38.bg(ctx, w, h);
      // graph T–t
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2; rr(ctx, g.x0, 70, g.x1 - g.x0, 228, 14); ctx.fill(); ctx.stroke(); });
      const ax0 = g.x0 + 46, ax1 = g.x1 - 16, ay0 = 262, ay1 = 98; K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(ax0, ay1); ctx.lineTo(ax0, ay0); ctx.lineTo(ax1, ay0); ctx.stroke(); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; for (let t = 20; t <= 80; t += 20) { const y = ay0 - (ay0 - ay1) * (t - 10) / 70; ctx.beginPath(); ctx.moveTo(ax0, y); ctx.lineTo(ax1, y); ctx.stroke(); }
        [0, 1].forEach(i => { if (i === 1 && !S.p.cmp) return; ctx.strokeStyle = i ? '#94a3b8' : '#111827'; ctx.lineWidth = 2.6; ctx.beginPath(); S.hist.forEach((v, j) => { const x = ax0 + (ax1 - ax0) * j / 89, y = ay0 - (ay0 - ay1) * (v[i] - 10) / 70; j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); }); });
      const lv = S.hist[S.hist.length - 1], lx = Math.min(ax1 - 14, ax0 + (ax1 - ax0) * (S.hist.length - 1) / 89 + 22); Q33.T(ctx, 'أسود', lx, ay0 - (ay0 - ay1) * (lv[0] - 10) / 70, { s: 10.5, w: 900, c: '#111827' }); if (S.p.cmp) Q33.T(ctx, 'لامع', lx, ay0 - (ay0 - ay1) * (lv[1] - 10) / 70 + 4, { s: 10.5, w: 900, c: '#64748b' });
      for (let t = 20; t <= 80; t += 20) Q33.T(ctx, t + '', ax0 - 12, ay0 - (ay0 - ay1) * (t - 10) / 70, { s: 10, w: 800, c: '#64748b' });
      Q33.T(ctx, 'درجة حرارة الماء °C مع الزمن', (ax0 + ax1) / 2, 84, { s: 11.5, w: 900, c: '#047857' }); Q33.T(ctx, 'الزمن: ' + Math.round(S.min) + ' دقيقة', (ax0 + ax1) / 2, 282, { s: 11, w: 800, c: '#334155' });
      // scene
      Q38.scene(ctx, g.x0, g.sy, g.W, g.sh, { gf: .88, gc: '#a3a3a3', gc2: '#737373', gc3: '#525252' });
      if (S.ii > 10) Q38.sun(ctx, g.sunx, g.suny, 14 + 10 * S.ii / 1000, .4 + .6 * S.ii / 1000, S.ph);
      Q33.T(ctx, Math.round(S.ii) + ' W/m²', g.sunx, g.suny + 40, { s: 11, w: 900, c: '#fff', bg: '#ca8a04' });
      (S.p.cmp ? [0, 1] : [0]).forEach(i => D.heater(ctx, g, S, i, D.hx(g, S, i)));
      const L = [{ t: 'السطح الأسود يمتص أكبر كمية', c: '#0f172a', w: 900 }, { t: 'من أشعة الشمس، والسطح اللامع يعكسها.', c: '#0f172a', w: 900 }, { t: 'تطلى الصفائح بأكاسيد الكروم والكوبلت، ومعادنها لا تصدأ.', c: '#334155' }];
      const hc = Q38.card(ctx, S, L, { title: 'السخان الشمسي', wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['الصفيحة السوداء', Q33.f(S.T[0], 1) + ' °C', '#111827']].concat(S.p.cmp ? [['الصفيحة اللامعة', Q33.f(S.T[1], 1) + ' °C', '#64748b'], ['الفرق', Q33.f(S.T[0] - S.T[1], 1) + ' °C', '#b91c1c']] : []), { lh: 22 });
      Q38.banner(ctx, w, 'اسحب الشمس لتغيير شدة الأشعة، وقارن السخانين');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); const L = [{ id: 'sun', x: g.sunx, y: g.suny, r: 28, axis: 'y', keep: true, tip: 'اسحب الشمس للأعلى لأشعة أقوى', idle: 'اسحب الشمس ✋', drag: (S2, d) => { setParam(S2, 'I', Math.round(clamp(1 - (d.y - g.sy - 34) / 90, 0, 1) * 100) * 10); } }];
      (S.p.cmp ? [0, 1] : [0]).forEach(i => { const cx = D.hx(g, S, i), ty = g.gy - 54 + Math.sin(-.6) * 75 - 34; L.push({ id: 'tap' + i, x: cx + 137, y: ty + 26, r: 18, axis: 'none', hint: false, tip: 'اضغط لسحب ماء حار', click: S2 => { const T = S2.T.slice(); T[i] = TA + (T[i] - TA) * .55; S2.T = T; } }); });
      return L; },
    readings(S) { return [rd('شدة الأشعة', Math.round(S.ii) + ' W/m²'), rd('الزمن', Math.round(S.min) + ' min'), rd('ماء الصفيحة السوداء', Q33.f(S.T[0], 1) + ' °C'), rd('ماء الصفيحة اللامعة', Q33.f(S.T[1], 1) + ' °C')]; },
    record(S) { return { t: Math.round(S.min), Tb: +S.T[0].toFixed(1), Ts: +S.T[1].toFixed(1) }; },
    cols: [['t', 't (min)'], ['Tb', 'T الأسود (°C)'], ['Ts', 'T اللامع (°C)']],
    graph: { x: 't', y: 'Tb', xl: 'الزمن (min)', yl: 'درجة الحرارة (°C)' },
    explain(S) { return Q26.ex('ماء السخان ذي الصفيحة السوداء أسخن بـ ' + Q33.f(S.T[0] - S.T[1], 1) + ' °C من ماء السخان ذي الصفيحة اللامعة.', 'السطح الأسود يمتص معظم الأشعة الشمسية الساقطة عليه ويحولها إلى حرارة تنتقل إلى الماء، أما السطح اللامع فيعكس معظمها. لذلك تطلى صفائح السخانات الشمسية بمواد سوداء مثل أكاسيد الكروم والكوبلت. الماء الساخن أقل كثافة فيصعد إلى الخزان، والماء البارد ينزل إلى المجمع.', 'تستعمل السخانات الشمسية على أسطح المنازل لتسخين المياه والتدفئة.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== C3 — المرايا على شكل قطع مكافئ: تجميع الأشعة في البؤرة (ص 156، الشكل 9) =============== */
(() => {
  const NRAY = 15, FP = 120;
  const D = { id: 'g9_en_mirror', page: 156, fig: 'الشكل 9',
    desc: 'هناك أنواع أخرى من التطبيقات الحرارية للطاقة الشمسية تستعمل فيها المرايا بشكل قطع مكافئ للحصول على حرارة التسخين (الشكل 9): الأشعة الشمسية الساقطة موازية لمحور المرآة تنعكس وتتجمع في نقطة البؤرة فترتفع درجة حرارة الجسم الموضوع فيها كثيراً.',
    tags: 'مرآة قطع مكافئ المركزات الشمسية البؤرة تجميع الأشعة انعكاس حرارة التسخين الطباخ الشمسي تتبع الشمس',
    tools: ['مرآة على شكل قطع مكافئ', 'وعاء ماء أسود', 'محرار'],
    steps: ['اسحب الوعاء الأسود وضعه في نقاط مختلفة أمام المرآة: أين ترتفع حرارته أسرع؟', 'غيّر ميل الأشعة عن محور المرآة: ماذا يحدث لنقطة التجمع؟', 'كبّر فتحة المرآة من اللوحة وقارن درجة الحرارة القصوى.'],
    concl: ['المرآة المقعرة بشكل قطع مكافئ تعكس الأشعة الموازية لمحورها فتتجمع في البؤرة.', 'الجسم الموضوع في البؤرة يسخن إلى درجات حرارة عالية.', 'كلما كبرت فتحة المرآة جمعت أشعة أكثر، ويجب توجيهها نحو الشمس (تتبع الشمس).'],
    laws: ['g9_l8_energy'],
    controls: [R('D', 'فتحة المرآة', 1, 4, 3, .1, 'm'), R('ang', 'ميل الأشعة عن محور المرآة', -20, 20, 0, 1, '°'), TG('trk', 'تتبع الشمس تلقائياً', false, null, 'eye'), TG('rays', 'إظهار الأشعة', true, null, 'ray')],
    setup(S) { S.px = null; S.py = null; S.tx = null; S.ty = null; S.T = 20; S.aa = 0; S.dd = 3; S.hit = 0; S.ph = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), cx = (x0 + x1) / 2, vy = h - 186; return { w, h, L, x0, x1, cx, vy, fy: vy - FP, top: 92 }; },
    half(S, g) { return (g.x1 - g.x0 - 40) / 2 * S.dd / 4; },
    trace(S, g) { const a = S.aa * Math.PI / 180, d = [Math.sin(a), Math.cos(a)], hw = D.half(S, g), out = []; let hits = 0;
      const rx0 = S.px - 26, rx1 = S.px + 26, ry0 = S.py - 18, ry1 = S.py + 18, box = [[[rx0, ry0], [rx1, ry0]], [[rx1, ry0], [rx1, ry1]], [[rx1, ry1], [rx0, ry1]], [[rx0, ry1], [rx0, ry0]]];
      for (let k = 0; k < NRAY; k++) { const xm = g.cx - hw + 2 * hw * (k + .5) / NRAY, ym = g.vy - (xm - g.cx) ** 2 / (4 * FP), t0 = (ym - g.top) / d[1], p0 = [xm - d[0] * t0, g.top];
        // hit the receiver on the way down?
        let hb = null; box.forEach(e => { const r = Q26.seg(p0, d, e[0], e[1]); if (r && (!hb || r.t < hb.t)) hb = r; }); if (hb && hb.t < t0) { out.push([p0, hb.pt, null]); hits += .3; continue; }
        const n = Q26.nrm([2 * (xm - g.cx), 4 * FP]), rf = Q26.refl(d, n); let hr = null; box.forEach(e => { const r = Q26.seg([xm, ym], rf, e[0], e[1]); if (r && (!hr || r.t < hr.t)) hr = r; });
        if (hr) { hits++; out.push([p0, [xm, ym], hr.pt, 1]); } else out.push([p0, [xm, ym], [xm + rf[0] * 700, ym + rf[1] * 700], 0]); }
      return { rays: out, hits }; },
    update(S, dt) { S.ph += dt; if (!S.W) return; const g = D.geo(S); if (S.px == null) { S.px = S.tx = g.cx + 70; S.py = S.ty = g.fy - 60; }
      S.px += (S.tx - S.px) * Math.min(1, dt * 12); S.py += (S.ty - S.py) * Math.min(1, dt * 12); if (S.p.trk && Math.abs(S.p.ang) > 0 && (S.ph * 4 | 0) !== (S._tk | 0)) { S._tk = S.ph * 4; setParam(S, 'ang', S.p.ang - Math.sign(S.p.ang)); }
      Q38.ez(S, 'aa', S.p.ang, dt, 4); Q38.ez(S, 'dd', S.p.D, dt, 4); const r = D.trace(S, g); S.hit = r.hits; const Tt = 20 + 520 * (r.hits / NRAY) * (S.dd / 4) ** 2 * 1.4; S.T += (Tt - S.T) * Math.min(1, dt * .5); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q38.bg(ctx, w, h); if (S.px == null) D.update(S, 0);
      K.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 70, 0, g.vy + 30); sk.addColorStop(0, '#7dd3fc'); sk.addColorStop(1, '#f0f9ff'); ctx.fillStyle = sk; rr(ctx, g.x0, 70, g.x1 - g.x0, g.vy - 30, 14); ctx.fill(); });
      const tr = D.trace(S, g), hw = D.half(S, g);
      if (S.p.rays) K.raw(ctx, () => { ctx.save(); rr(ctx, g.x0, 70, g.x1 - g.x0, g.vy - 30, 14); ctx.clip(); ctx.lineWidth = 1.6; tr.rays.forEach(r => { ctx.strokeStyle = 'rgba(234,179,8,.85)'; ctx.beginPath(); ctx.moveTo(r[0][0], r[0][1]); ctx.lineTo(r[1][0], r[1][1]); ctx.stroke(); if (r[2]) { ctx.strokeStyle = r[3] ? 'rgba(234,88,12,.95)' : 'rgba(234,179,8,.45)'; ctx.beginPath(); ctx.moveTo(r[1][0], r[1][1]); ctx.lineTo(r[2][0], r[2][1]); ctx.stroke(); } }); ctx.restore(); });
      // mirror
      K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; const P = () => { ctx.beginPath(); for (let x = -hw; x <= hw; x += 4) { const y = g.vy - x * x / (4 * FP); x === -hw ? ctx.moveTo(g.cx + x, y) : ctx.lineTo(g.cx + x, y); } }; P(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 12; ctx.stroke(); P(); const mg = ctx.createLinearGradient(g.cx - hw, 0, g.cx + hw, 0); mg.addColorStop(0, '#94a3b8'); mg.addColorStop(.5, '#f8fafc'); mg.addColorStop(1, '#94a3b8'); ctx.strokeStyle = mg; ctx.lineWidth = 7; ctx.stroke();
        ctx.fillStyle = '#475569'; ctx.fillRect(g.cx - 6, g.vy + 4, 12, 40); rr(ctx, g.cx - 50, g.vy + 40, 100, 10, 4); ctx.fill();
        ctx.setLineDash([5, 5]); ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(g.cx, g.vy); ctx.lineTo(g.cx, g.top); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.arc(g.cx, g.fy, 5, 0, TAU); ctx.fill(); ctx.restore(); });
      Q33.T(ctx, 'البؤرة F', g.cx - 40, g.fy, { s: 11, w: 900, c: '#b91c1c' }); Q33.T(ctx, 'محور المرآة', g.cx, g.top + 12, { s: 10.5, w: 800, c: '#334155' });
      // receiver pot
      const hot = clamp((S.T - 20) / 400, 0, 1); K.raw(ctx, () => { ctx.save(); if (hot > .1) { ctx.shadowColor = 'rgba(249,115,22,.9)'; ctx.shadowBlur = 30 * hot; } ctx.fillStyle = '#111827'; rr(ctx, S.px - 26, S.py - 18, 52, 36, 7); ctx.fill(); ctx.restore(); ctx.fillStyle = '#374151'; ctx.fillRect(S.px - 32, S.py - 20, 64, 6);
        if (S.T > 100) { ctx.strokeStyle = 'rgba(203,213,225,.85)'; ctx.lineWidth = 3; for (let k = -1; k <= 1; k++) { ctx.beginPath(); for (let y = 0; y < 34; y++) { const yy = S.py - 24 - y - (S.ph * 20) % 8; y ? ctx.lineTo(S.px + k * 14 + Math.sin(y * .35 + S.ph * 5) * 4, yy) : ctx.moveTo(S.px + k * 14, yy); } ctx.stroke(); } } });
      Q33.T(ctx, Math.round(S.T) + ' °C', S.px, S.py + 1, { s: 11.5, w: 900, c: '#fff' });
      const dist = Math.hypot(S.px - g.cx, S.py - g.fy) * .8;
      const hc = Q38.card(ctx, S, [{ t: 'المرآة بشكل قطع مكافئ تعكس الأشعة الموازية لمحورها إلى البؤرة.', c: '#0f172a' }, { t: 'الجسم في البؤرة يسخن كثيراً.', c: '#b91c1c', w: 900 }], { title: 'المركزات الشمسية', wd: 300, y: 64 });
      const ph2 = Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['الأشعة المجمعة', Math.round(S.hit) + ' من ' + NRAY], ['البعد عن البؤرة', Math.round(dist) + ' cm'], ['حرارة الوعاء', Math.round(S.T) + ' °C', '#b91c1c']], { lh: 22 });
      Q38.thermo(ctx, w - 162, 64 + hc + ph2 + 150, 110, (S.T - 0) / 450, S.T > 100 ? 'الماء يغلي' : 'المحرار');
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'اسحب الوعاء الأسود إلى بؤرة المرآة');
    },
    chips(S, g) { return Q38.chips(S, 'pt', [['f', 'ضع الوعاء في البؤرة'], ['far', 'أبعد الوعاء']], g.h - 84, '', (S2, k) => { if (k === 'f') { S2.tx = g.cx; S2.ty = g.fy; } else { S2.tx = g.cx + 90; S2.ty = g.fy - 110; } }, { bw: 190 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); if (S.px == null) D.update(S, 0);
      return [{ id: 'pot', x: S.px, y: S.py, w: 70, h: 46, axis: 'xy', keep: true, tip: 'اسحب الوعاء', idle: 'اسحب الوعاء ✋', drag: (S2, d) => { S2.tx = clamp(d.x, g.x0 + 30, g.x1 - 30); S2.ty = clamp(d.y, g.top + 20, g.vy - 30); } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('فتحة المرآة', Q33.f(S.p.D, 1) + ' m'), rd('ميل الأشعة', S.p.ang + '°'), rd('الأشعة المجمعة', Math.round(S.hit) + ' من ' + NRAY), rd('حرارة الوعاء', Math.round(S.T) + ' °C')]; },
    explain(S) { return Q26.ex('الوعاء يستقبل ' + Math.round(S.hit) + ' من ' + NRAY + ' شعاعاً ودرجة حرارته ' + Math.round(S.T) + ' °C.', 'المرآة المقعرة بشكل قطع مكافئ تعكس جميع الأشعة الساقطة موازية لمحورها فتتجمع في نقطة واحدة هي البؤرة، فتتركز الطاقة الشمسية في مساحة صغيرة وترتفع درجة الحرارة كثيراً. إذا مالت الأشعة عن المحور تبتعد نقطة التجمع عن البؤرة، لذلك تُدار المرآة لتتبع الشمس.', 'الطباخات الشمسية ومحطات المرايا الكبيرة تستعمل هذا المبدأ.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== C4 — تحلية المياه المالحة بالطاقة الشمسية: المقطر الشمسي (ص 156، الشكل 10) =============== */
(() => {
  const LB = [['A', 'دخول الماء المالح'], ['B', 'المرآة'], ['C', 'غطاء زجاجي'], ['D', 'خروج الماء المقطر'], ['E', 'ماء مالح'], ['F', 'طبقة خاصة عازلة'], ['G', 'صفيحة سوداء']];
  const D = { id: 'g9_en_still', page: 156, fig: 'الشكل 10',
    desc: 'تكنولوجيا تحلية المياه المالحة باستعمال الطاقة الشمسية (Water Purification by Solar Technology): تستعمل أشعة الشمس مصدراً حرارياً لرفع درجة حرارة الماء غير النقي ومن ثم تبخيره وتحويله إلى ماء نقي باستعمال المقطر الشمسي (الشكل 10). أجزاؤه: A دخول الماء المالح، B المرآة، C غطاء زجاجي، D خروج الماء المقطر، E ماء مالح، F طبقة خاصة، G صفيحة سوداء.',
    tags: 'تحلية المياه المالحة المقطر الشمسي تبخير تكثيف ماء مقطر غطاء زجاجي مرآة صفيحة سوداء ملوحة الطاقة الشمسية',
    tools: ['حوض بصفيحة سوداء G', 'طبقة عازلة F', 'ماء مالح E', 'غطاء زجاجي مائل C', 'مرآة B', 'قنينة لجمع الماء المقطر D'],
    steps: ['اسحب الشمس لتغيير شدة الأشعة وراقب تبخر الماء وتكثفه على الغطاء الزجاجي.', 'أدر المرآة B حتى تعكس الأشعة إلى داخل الحوض: هل يزداد الماء المقطر؟', 'اضغط على صنبور الدخول A لإضافة ماء مالح، وراقب ملوحة الماء المتبقي.'],
    concl: ['أشعة الشمس تسخن الماء المالح فيتبخر، ويتكثف البخار على الغطاء الزجاجي البارد.', 'قطرات الماء النقي تنساب على الزجاج المائل إلى المجرى ثم إلى خارج المقطر.', 'الأملاح لا تتبخر فتبقى في الحوض وتزداد ملوحته.', 'الصفيحة السوداء تمتص الأشعة، والمرآة تزيد الأشعة الداخلة، والطبقة الخاصة تمنع تسرب الحرارة.'],
    laws: ['g9_l8_energy'],
    controls: [R('I', 'شدة الإشعاع الشمسي', 0, 1000, 850, 10, 'W/m²'), R('k', 'تسريع الزمن', 1, 20, 8, 1, '×'), TG('mir', 'المرآة العاكسة B', true, null, 'ray'), TG('lbl', 'رموز الأجزاء A–G', true, null, 'eye')],
    setup(S) { S.ii = 850; S.T = 25; S.vol = 20; S.salt = 35 * 20; S.dist = 0; S.ph = 0; S.ma = -.55; S.mt = -.55; S.vp = []; S.dr = []; S.out = 0; S.rate = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), bx0 = x0 + 28, bx1 = x1 - 46, bb = h - 196, bt = bb - 92; return { w, h, L, x0, x1, bx0, bx1, bb, bt, gl: [bx0, bt - 96], gr: [bx1, bt - 6], sun: [x1 - 70, 100 + (1 - S.ii / 1000) * 80], mx: x0 + 52, my: bt - 170 }; },
    mirF(S, g) { if (!S.p.mir) return 0; const s = Q26.nrm([g.mx - g.sun[0], g.my - g.sun[1]]), n = [Math.cos(S.ma + Math.PI / 2), Math.sin(S.ma + Math.PI / 2)], r = Q26.refl(s, n), tg = Q26.nrm([(g.bx0 + g.bx1) / 2 - g.mx, g.bb - 20 - g.my]); const e = Math.acos(clamp(r[0] * tg[0] + r[1] * tg[1], -1, 1)); return { f: clamp(1 - e / .45, 0, 1), r }; },
    update(S, dt) { S.ph += dt; Q38.ez(S, 'ii', S.p.I, dt, 4); S.ma += (S.mt - S.ma) * Math.min(1, dt * 10); if (!S.W) return; const g = D.geo(S), mf = S.p.mir ? D.mirF(S, g).f : 0, dm = dt * S.p.k, Ieff = S.ii * (1 + .6 * mf);
      S.T += dm * (Ieff / 1000 * 1.6 - .035 * (S.T - 25)) * (S.vol > .5 ? 1 : 3); S.T = clamp(S.T, 20, 95); const rate = S.vol > .2 ? Math.max(0, S.T - 32) * Ieff / 1000 * .004 : 0; S.rate = rate; const dv = Math.min(S.vol, rate * dm); S.vol -= dv; S.dist += dv;
      if (Math.random() < dt * 60 * rate * 4) S.vp.push({ x: Math.random(), y: 0 }); S.vp.forEach(v => { v.y += dt * .9; }); S.vp = S.vp.filter(v => { if (v.y >= 1) { S.dr.push({ u: v.x, s: 0 }); return false; } return true; });
      S.dr.forEach(d => { d.s += dt * .12 * (1 + d.s * 3); }); S.dr = S.dr.filter(d => d.u + d.s < 1).slice(-80); S.out += dt * 60 * Math.min(1, rate * 8); },
    gy(g, u) { return g.gl[1] + (g.gr[1] - g.gl[1]) * u; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), mf = D.mirF(S, g), lb = S.p.lbl, wf = clamp(S.vol / 26, 0, 1), wy = g.bb - 14 - 52 * wf; Q38.bg(ctx, w, h);
      K.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 70, 0, g.bb); sk.addColorStop(0, '#bae6fd'); sk.addColorStop(1, '#f0f9ff'); ctx.fillStyle = sk; rr(ctx, g.x0, 70, g.x1 - g.x0, g.bb + 30 - 70, 14); ctx.fill(); ctx.fillStyle = '#d6d3d1'; ctx.fillRect(g.x0, g.bb + 6, g.x1 - g.x0, 24); });
      if (S.ii > 10) Q38.sun(ctx, g.sun[0], g.sun[1], 14 + 10 * S.ii / 1000, .4 + .6 * S.ii / 1000, S.ph);
      // direct rays
      K.raw(ctx, () => { ctx.save(); rr(ctx, g.x0, 70, g.x1 - g.x0, g.bb + 30 - 70, 14); ctx.clip(); ctx.strokeStyle = 'rgba(234,179,8,' + (.2 + .55 * S.ii / 1000) + ')'; ctx.lineWidth = 1.8; ctx.setLineDash([8, 6]); ctx.lineDashOffset = -S.ph * 40; for (let k = 0; k < 5; k++) { const tx = g.bx0 + 60 + k * (g.bx1 - g.bx0 - 90) / 4; ctx.beginPath(); ctx.moveTo(g.sun[0] + (tx - g.sun[0]) * .12, g.sun[1] + (g.bb - g.sun[1]) * .12); ctx.lineTo(tx, wy); ctx.stroke(); }
        if (S.p.mir) { ctx.strokeStyle = 'rgba(234,179,8,.6)'; ctx.beginPath(); ctx.moveTo(g.sun[0] - 20, g.sun[1] + 6); ctx.lineTo(g.mx, g.my); ctx.lineTo(g.mx + mf.r[0] * 260, g.my + mf.r[1] * 260); ctx.stroke(); } ctx.restore(); });
      // basin: F, G, E
      K.raw(ctx, () => { ctx.fillStyle = '#a16207'; ctx.fillRect(g.bx0 - 10, g.bb - 6, g.bx1 - g.bx0 + 20, 16); ctx.strokeStyle = 'rgba(120,53,15,.6)'; ctx.lineWidth = 1; for (let x = g.bx0 - 6; x < g.bx1 + 8; x += 10) { ctx.beginPath(); ctx.moveTo(x, g.bb - 6); ctx.lineTo(x + 8, g.bb + 10); ctx.stroke(); }
        ctx.fillStyle = '#111827'; ctx.fillRect(g.bx0, g.bb - 14, g.bx1 - g.bx0, 8); ctx.fillStyle = '#475569'; ctx.fillRect(g.bx0 - 10, g.gl[1] - 4, 10, g.bb - g.gl[1] + 10); ctx.fillRect(g.bx1, g.gr[1] - 4, 10, g.bb - g.gr[1] + 10);
        const sal = S.salt / Math.max(S.vol, .5); const wg = ctx.createLinearGradient(0, wy, 0, g.bb - 14); wg.addColorStop(0, 'rgba(56,189,248,.85)'); wg.addColorStop(1, 'rgba(14,116,144,' + clamp(.6 + sal / 400, .6, 1) + ')'); ctx.fillStyle = wg; ctx.fillRect(g.bx0, wy, g.bx1 - g.bx0, g.bb - 14 - wy);
        if (S.vol < 3) { ctx.fillStyle = 'rgba(255,255,255,.85)'; for (let x = g.bx0 + 4; x < g.bx1 - 4; x += 7) ctx.fillRect(x, g.bb - 17 - ((x * 7) % 3), 4, 3); }
        // vapour
        ctx.fillStyle = 'rgba(255,255,255,.75)'; S.vp.forEach(v => { const x = g.bx0 + 10 + v.x * (g.bx1 - g.bx0 - 20), yt = D.gy(g, (x - g.bx0) / (g.bx1 - g.bx0)), y = wy + (yt - wy) * v.y; ctx.beginPath(); ctx.arc(x + Math.sin(v.y * 9 + v.x * 20) * 3, y, 2.4, 0, TAU); ctx.fill(); });
        // glass
        ctx.fillStyle = 'rgba(224,242,254,.55)'; ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.gl[0] - 10, g.gl[1] - 4); ctx.lineTo(g.gr[0] + 10, g.gr[1] - 4); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(g.gl[0] + 20, g.gl[1] - 6); ctx.lineTo(g.gl[0] + 100, D.gy(g, 100 / (g.bx1 - g.bx0)) - 6); ctx.stroke();
        // droplets under the glass
        ctx.fillStyle = 'rgba(37,99,235,.85)'; S.dr.forEach(d => { const u = d.u + d.s, x = g.bx0 + u * (g.bx1 - g.bx0), y = D.gy(g, u) + 3; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, TAU); ctx.fill(); });
        // gutter + outlet D
        ctx.fillStyle = '#64748b'; ctx.fillRect(g.bx1 - 24, g.gr[1] + 2, 24, 7); });
      const op = [[g.bx1 + 4, g.gr[1] + 6], [g.bx1 + 26, g.gr[1] + 6], [g.bx1 + 26, g.bb - 40]]; Q38.pipe(ctx, op, { w: 5, col: '#cbd5e1' }); if (S.rate > .003) Q38.stream(ctx, op, S.out, '#2563eb', { sp: 16, r: 2.4 });
      const fx = g.bx1 + 26, fy = g.bb - 2, fl = clamp(S.dist / 12, 0, 1); K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(fx - 7, fy - 40); ctx.lineTo(fx - 7, fy - 28); ctx.lineTo(fx - 20, fy); ctx.lineTo(fx + 20, fy); ctx.lineTo(fx + 7, fy - 28); ctx.lineTo(fx + 7, fy - 40); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(37,99,235,.75)'; ctx.fillRect(fx - 22, fy - 40 * fl, 44, 40 * fl); ctx.restore(); });
      // inlet A tap
      K.raw(ctx, () => { ctx.fillStyle = '#0f766e'; ctx.fillRect(g.bx0 - 34, g.gl[1] + 30, 26, 8); ctx.fillRect(g.bx0 - 30, g.gl[1] + 18, 6, 14); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(g.bx0 - 27, g.gl[1] + 16, 7, 0, TAU); ctx.fill(); });
      // mirror B
      if (S.p.mir) K.raw(ctx, () => { ctx.save(); ctx.translate(g.mx, g.my); ctx.rotate(S.ma); ctx.fillStyle = '#334155'; ctx.fillRect(-36, 2, 72, 5); const mg = ctx.createLinearGradient(-36, 0, 36, 0); mg.addColorStop(0, '#94a3b8'); mg.addColorStop(.5, '#f8fafc'); mg.addColorStop(1, '#94a3b8'); ctx.fillStyle = mg; ctx.fillRect(-36, -2, 72, 5); ctx.restore(); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(g.mx + Math.cos(S.ma) * 44, g.my + Math.sin(S.ma) * 44, 7, 0, TAU); ctx.fill(); });
      if (lb) { const tag = (k, x, y) => Q33.T(ctx, k, x, y, { s: 12, w: 900, c: '#fff', bg: '#047857' });
        tag('A', g.bx0 - 27, g.gl[1] - 4); if (S.p.mir) tag('B', g.mx, g.my - 22); tag('C', (g.gl[0] + g.gr[0]) / 2, (g.gl[1] + g.gr[1]) / 2 - 18); tag('D', g.bx1 + 44, g.gr[1] + 6); tag('E', (g.bx0 + g.bx1) / 2, (wy + g.bb - 14) / 2); tag('F', g.bx0 + 40, g.bb + 20); tag('G', g.bx1 - 40, g.bb + 20); }
      const L = LB.map(q => ({ t: 'الجزء ' + q[0] + ': ' + q[1], c: '#0f172a' })); L.unshift({ t: 'الشمس تبخر الماء المالح، والبخار يتكثف على الزجاج ماءً نقياً.', c: '#047857', w: 900 });
      const hc = Q38.card(ctx, S, L, { title: 'المقطر الشمسي', wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['حرارة الماء المالح', Math.round(S.T) + ' °C'], ['الماء المقطر', Q33.f(S.dist, 2) + ' L', '#1d4ed8'], ['ملوحة الماء المتبقي', Math.round(S.salt / Math.max(S.vol, .5)) + ' g/L', '#7c2d12'], ['المرآة', !S.p.mir ? 'مرفوعة' : mf.f > .5 ? 'تعكس إلى الحوض' : 'أدرها نحو الحوض']], { lh: 22 });
      Q38.banner(ctx, w, 'اسحب الشمس وأدر المرآة، واضغط على صنبور الماء المالح A');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); const L = [{ id: 'sun', x: g.sun[0], y: g.sun[1], r: 26, axis: 'y', keep: true, tip: 'اسحب الشمس للأعلى لأشعة أقوى', idle: 'اسحب الشمس ✋', drag: (S2, d) => { setParam(S2, 'I', Math.round(clamp(1 - (d.y - 100) / 80, 0, 1) * 100) * 10); } }];
      if (S.p.mir) L.push({ id: 'mir', x: g.mx + Math.cos(S.ma) * 44, y: g.my + Math.sin(S.ma) * 44, r: 16, cx: g.mx, cy: g.my, keep: true, hint: false, tip: 'أدر المرآة', drag: (S2, d) => { S2.mt = clamp(Math.atan2(d.y - g.my, d.x - g.mx), -1.4, 1.4); } });
      L.push({ id: 'tapA', x: g.bx0 - 24, y: g.gl[1] + 24, r: 20, axis: 'none', hint: false, tip: 'اضغط لإضافة ماء مالح', click: S2 => { const a = Math.min(5, 26 - S2.vol); S2.vol += a; S2.salt += 35 * a; S2.T = Math.max(25, S2.T - a * 2); } });
      return L; },
    readings(S) { return [rd('حرارة الماء', Math.round(S.T) + ' °C'), rd('الماء المقطر', Q33.f(S.dist, 2) + ' L'), rd('الماء المالح المتبقي', Q33.f(S.vol, 1) + ' L'), rd('الملوحة', Math.round(S.salt / Math.max(S.vol, .5)) + ' g/L')]; },
    explain(S) { return Q26.ex('جُمع ' + Q33.f(S.dist, 2) + ' L من الماء المقطر، وزادت ملوحة الماء المتبقي.', 'أشعة الشمس تنفذ من الغطاء الزجاجي وتمتصها الصفيحة السوداء فتسخن الماء المالح ويتبخر. البخار يلامس الغطاء الزجاجي الأبرد فيتكثف قطرات ماء نقي تنساب على الزجاج المائل إلى المجرى ثم تخرج عند D. الأملاح لا تتبخر فتبقى في الحوض. المرآة تزيد الأشعة الداخلة والطبقة الخاصة تمنع تسرب الحرارة.', 'تستعمل المقطرات الشمسية لتوفير ماء الشرب في المناطق الساحلية والصحراوية.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== D1 — تكنولوجيا طاقة الرياح: التوربين الهوائي والطاحونة (2-3-8، ص 157، الشكلان 11 و 12) =============== */
(() => {
  const LOC = { sea: ['منطقة ساحلية', 9], des: ['منطقة صحراوية', 8], city: ['مدينة', 3.5] }, VMIN = 5.4;
  const pw = v => v < 3 || v > 24 ? 0 : Math.min(2, .5 * .4 * 1.2 * Math.PI * 40 * 40 * v ** 3 / 1e6);
  const D = { id: 'g9_en_wind', page: 157, fig: 'الشكلان 11 و 12',
    desc: 'مبدأ عمل تقنية الرياح يعتمد على استثمار قوة الرياح في تدوير المروحة الهوائية، إذ تؤثر الرياح بقوة وتحرك ريش المراوح وتجعلها تدور، وتتصل المروحة مع مولد كهربائي فتدور نواة المولد وتتولد الطاقة الكهربائية (الشكل 11). حركة الهواء متغيرة حسب المواقع فتكون سريعة في المناطق الساحلية والصحراوية. مصدر طاقة الرياح يعتمد على سرعة الرياح التي يجب ألا تقل عن 5.4 m/s وعلى أن يجري هبوبها لساعات طويلة خلال اليوم. الشكل (12): طاقة الرياح لطواحين هوائية.',
    tags: 'طاقة الرياح الطاقة الهوائية المروحة الهوائية توربين الرياح المولد الكهربائي سرعة الرياح 5.4 m/s ساعات الهبوب المناطق الساحلية الصحراوية طاحونة هوائية',
    tools: ['توربين رياح (مروحة ومولد)', 'طاحونة هوائية', 'مقياس سرعة الرياح'],
    steps: ['اسحب مقبض سرعة الرياح أعلى المشهد (أو استعمل اللوحة) وراقب دوران الريش والقدرة.', 'قلل السرعة إلى أقل من 5.4 m/s: هل يبقى التوليد مجدياً؟', 'اختر الموقع: ساحلي، صحراوي، مدينة، وغيّر ساعات الهبوب واحسب الطاقة اليومية.', 'جرّب الطاحونة الهوائية (الشكل 12) وفعّل «داخل المروحة» لترى المولد.'],
    concl: ['الرياح تدير ريش المروحة المتصلة بمولد كهربائي فتتولد الكهرباء: حركية ← كهربائية.', 'الرياح أسرع في المناطق الساحلية والصحراوية.', 'يجب ألا تقل سرعة الرياح عن 5.4 m/s وأن تهب لساعات طويلة.', 'القدرة تزداد كثيراً بزيادة سرعة الرياح.'],
    laws: ['g9_l8_wind'],
    controls: [R('v', 'سرعة الرياح', 0, 25, 9, .1, 'm/s'), R('hrs', 'ساعات الهبوب يومياً', 0, 24, 12, 1, 'h'), TG('gust', 'رياح متقلبة', false, null, 'wave'), TG('in', 'داخل المروحة: المولد', true, null, 'eye')],
    setup(S) { S.loc = 'sea'; S.md = 'tur'; S.vv = 9; S.om = 0; S.rot = 0; S.ph = 0; S.pt = []; S.wl = .1; for (let k = 0; k < 40; k++) S.pt.push({ x: Math.random(), y: Math.random() }); },
    veff(S) { return Math.max(0, S.vv * (S.p.gust ? 1 + .3 * Math.sin(S.ph * 1.3) * Math.sin(S.ph * .37 + 1) : 1)); },
    update(S, dt) { S.ph += dt; Q38.ez(S, 'vv', S.p.v, dt, 3); const v = D.veff(S), tgt = S.md === 'tur' ? (v < 3 || v > 24 ? 0 : Math.min(1, v / 13)) : Math.min(1.4, v / 9); Q38.ez(S, 'om', tgt, dt, 1.4); S.rot += S.om * dt * (S.md === 'tur' ? 4.5 : 6);
      S.pt.forEach(q => { q.x += dt * v * .045; if (q.x > 1) { q.x -= 1; q.y = Math.random(); } }); if (S.md === 'mill') S.wl = Math.min(1, S.wl + S.om * dt * .02); },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), sy = 314, sh = h - 150 - sy - 8, W = w - 24 - x0; return { w, h, L, x0, x1, sy, sh, W, sx1: w - 24, gy: sy + sh * .86, tx: x0 + W * .56, kx0: x0 + 40, kx1: x0 + W * .36, ky: sy + 24 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), v = D.veff(S), P = S.md === 'tur' ? pw(v) * (S.om > .02 ? 1 : 0) : 0; Q38.bg(ctx, w, h);
      // P–v graph
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2; rr(ctx, g.x0, 70, g.x1 - g.x0, 228, 14); ctx.fill(); ctx.stroke(); });
      const ax0 = g.x0 + 44, ax1 = g.x1 - 14, ay0 = 258, ay1 = 102, X = u => ax0 + (ax1 - ax0) * u / 25, Y = p => ay0 - (ay0 - ay1) * p / 2.2;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(239,68,68,.12)'; ctx.fillRect(ax0, ay1, X(VMIN) - ax0, ay0 - ay1); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(ax0, ay1 - 6); ctx.lineTo(ax0, ay0); ctx.lineTo(ax1, ay0); ctx.stroke();
        ctx.strokeStyle = '#047857'; ctx.lineWidth = 2.6; ctx.beginPath(); for (let u = 0; u <= 25; u += .1) { const y = Y(pw(u)); u ? ctx.lineTo(X(u), y) : ctx.moveTo(X(u), y); } ctx.stroke(); ctx.setLineDash([5, 4]); ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(VMIN), ay1); ctx.lineTo(X(VMIN), ay0); ctx.stroke(); ctx.setLineDash([]);
        if (S.md === 'tur') { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(X(Math.min(25, v)), Y(pw(v)), 6, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); } });
      [0, 5, 10, 15, 20, 25].forEach(u => Q33.T(ctx, u + '', X(u), ay0 + 11, { s: 10, w: 800, c: '#64748b' })); [0, 1, 2].forEach(p => Q33.T(ctx, p + '', ax0 - 10, Y(p), { s: 10, w: 800, c: '#64748b' }));
      Q33.T(ctx, 'القدرة MW مع سرعة الرياح m/s', (ax0 + ax1) / 2, 84, { s: 11.5, w: 900, c: '#047857' }); Q33.T(ctx, '5.4 m/s', X(VMIN) + 26, ay1 + 8, { s: 10, w: 900, c: '#b91c1c' }); Q33.T(ctx, 'غير مجدية', (ax0 + X(VMIN)) / 2 + 2, ay0 - 14, { s: 9.5, w: 900, c: '#b91c1c' });
      Q38.chain(ctx, g.x1 - 10, g.x1 - 200, 284, [['حركية', '#2563eb', S.om > .05 ? 1 : 0], [S.md === 'tur' ? 'كهربائية' : 'ضخ الماء', '#f59e0b', S.om > .05 ? 1 : 0]], { s: 10.5 });
      // scene
      const sea = S.loc === 'sea', des = S.loc === 'des'; const gy = Q38.scene(ctx, g.x0, g.sy, g.W, g.sh, { gf: .86, gc: des ? '#fcd34d' : '#65a30d', gc2: des ? '#f59e0b' : '#4d7c0f', gc3: des ? '#b45309' : '#78350f' });
      if (sea) K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, gy - 30, 0, gy); sg.addColorStop(0, '#0ea5e9'); sg.addColorStop(1, '#0369a1'); ctx.fillStyle = sg; ctx.fillRect(g.x0 + 1, gy - 26, g.W * .3, 26); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.5; for (let k = 0; k < 5; k++) { const x = g.x0 + 10 + ((k * 47 + S.ph * 20 * (1 + v / 10)) % (g.W * .28)); ctx.beginPath(); ctx.arc(x, gy - 16 + (k % 2) * 8, 6, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); } });
      if (des) K.raw(ctx, () => { ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.moveTo(g.x0 + 1, gy); ctx.quadraticCurveTo(g.x0 + 90, gy - 40, g.x0 + 200, gy); ctx.fill(); });
      if (S.loc === 'city') K.raw(ctx, () => { [[.05, 90], [.12, 140], [.2, 110], [.84, 120], [.92, 80]].forEach(([f, hh]) => { const x = g.x0 + g.W * f; ctx.fillStyle = '#94a3b8'; ctx.fillRect(x - 22, gy - hh, 44, hh); ctx.fillStyle = '#e2e8f0'; for (let y = gy - hh + 10; y < gy - 10; y += 18) { ctx.fillRect(x - 14, y, 8, 8); ctx.fillRect(x + 6, y, 8, 8); } }); });
      // wind streaks
      K.raw(ctx, () => { ctx.save(); rr(ctx, g.x0, g.sy, g.W, g.sh, 16); ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,' + Math.min(.85, .2 + v / 15) + ')'; ctx.lineWidth = 2; ctx.lineCap = 'round'; S.pt.forEach(q => { const x = g.x0 + q.x * g.W, y = g.sy + 50 + q.y * (gy - g.sy - 70), l = 6 + v * 2.6; if (v < .3) return; ctx.beginPath(); ctx.moveTo(x - l, y); ctx.quadraticCurveTo(x - l / 2, y - 3, x, y); ctx.stroke(); }); ctx.restore(); });
      if (S.md === 'tur') D.tur(ctx, g, S, gy, P); else D.mill(ctx, g, S, gy);
      // wind-speed knob
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.35)'; rr(ctx, g.kx0, g.ky - 4, g.kx1 - g.kx0, 8, 4); ctx.fill(); ctx.fillStyle = '#0284c7'; rr(ctx, g.kx0, g.ky - 4, (g.kx1 - g.kx0) * S.p.v / 25, 8, 4); ctx.fill(); });
      const kx = g.kx0 + (g.kx1 - g.kx0) * S.p.v / 25; Q33.T(ctx, '🌬️', kx, g.ky, { s: 22 }); Q33.T(ctx, 'v = ' + Q33.f(v, 1) + ' m/s', g.kx1 + 54, g.ky, { s: 12, w: 900, c: '#fff', bg: v < VMIN ? '#b91c1c' : '#0369a1' });
      const hc = Q38.card(ctx, S, [{ t: 'الرياح تدير ريش المروحة المتصلة بمولد كهربائي فتتولد الكهرباء.', c: '#0f172a' }, { t: 'يجب ألا تقل سرعة الرياح عن 5.4 m/s وأن تهب لساعات طويلة.', c: '#b91c1c', w: 900 }], { title: 'طاقة الرياح', wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 8, 300, S.md === 'tur' ? [['الموقع', LOC[S.loc][0]], ['سرعة دوران الريش', Math.round(S.om * 16) + ' rpm'], ['القدرة', Q33.f(P * 1000, 0) + ' kW'], ['الطاقة اليومية', Q33.f(P * S.p.hrs, 1) + ' MW·h']] : [['الموقع', LOC[S.loc][0]], ['خزان الماء', Math.round(S.wl * 100) + '%']], { lh: 22 });
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'اسحب مقبض سرعة الرياح 🌬️ واختر الموقع');
    },
    tur(ctx, g, S, gy, P) { const tx = g.tx, hub = [tx, g.sy + 112], R = 92;
      K.raw(ctx, () => { const tg = ctx.createLinearGradient(tx - 9, 0, tx + 9, 0); tg.addColorStop(0, '#cbd5e1'); tg.addColorStop(.5, '#fff'); tg.addColorStop(1, '#94a3b8'); ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(tx - 6, hub[1]); ctx.lineTo(tx + 6, hub[1]); ctx.lineTo(tx + 11, gy); ctx.lineTo(tx - 11, gy); ctx.closePath(); ctx.fill();
        // nacelle
        ctx.fillStyle = '#f1f5f9'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; rr(ctx, tx - 6, hub[1] - 16, 70, 30, 10); ctx.fill(); ctx.stroke();
        if (S.p.in) { ctx.fillStyle = 'rgba(15,23,42,.85)'; rr(ctx, tx + 2, hub[1] - 11, 58, 20, 6); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(tx + 4, hub[1] - 2, 18, 3); ctx.fillStyle = '#f59e0b'; ctx.save(); ctx.translate(tx + 26, hub[1]); ctx.rotate(S.rot * 3); ctx.fillRect(-6, -6, 12, 12); ctx.restore(); ctx.fillStyle = '#059669'; rr(ctx, tx + 36, hub[1] - 8, 20, 16, 3); ctx.fill(); if (S.om > .05) { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(tx + 46, hub[1], 2 + 2 * Math.abs(Math.sin(S.ph * 20)), 0, TAU); ctx.fill(); } }
        // blades (rotor plane faces the viewer)
        ctx.save(); ctx.translate(hub[0] - 8, hub[1]); ctx.rotate(S.rot); for (let k = 0; k < 3; k++) { ctx.rotate(TAU / 3); const bg = ctx.createLinearGradient(0, -6, 0, 6); bg.addColorStop(0, '#fff'); bg.addColorStop(1, '#cbd5e1'); ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(4, -6); ctx.quadraticCurveTo(R * .4, -12, R, -2); ctx.lineTo(R, 2); ctx.quadraticCurveTo(R * .4, 6, 4, 6); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.lineWidth = 1; ctx.stroke(); }
        ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(0, 0, 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.stroke(); ctx.restore(); });
      if (S.p.in) Q33.T(ctx, 'المولد', tx + 46, hub[1] - 26, { s: 10.5, w: 900, c: '#fff', bg: '#047857' });
      const px = g.x0 + g.W * .82, pp = Q38.pylon(ctx, px, gy, 80); Q33.wire(ctx, [[tx + 11, gy - 30], [px - 20, gy - 30], [pp[0][0], pp[0][1]]], { col: '#334155' });
      Q38.house(ctx, g.x0 + g.W * .94, gy, .8, clamp(P * 1.5, 0, 1)); K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(pp[1][0], pp[1][1]); ctx.quadraticCurveTo(px + 40, gy - 50, g.x0 + g.W * .94, gy - 40); ctx.stroke(); }); },
    mill(ctx, g, S, gy) { const tx = g.tx, hy = g.sy + 120, R = 58;
      K.raw(ctx, () => { ctx.strokeStyle = '#78716c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx - 34, gy); ctx.lineTo(tx - 5, hy); ctx.lineTo(tx + 5, hy); ctx.lineTo(tx + 34, gy); for (let k = 1; k < 6; k++) { const y = hy + (gy - hy) * k / 6, a = 5 + 29 * k / 6; ctx.moveTo(tx - a, y); ctx.lineTo(tx + a, y); } ctx.stroke();
        ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(tx + 8, hy - 4); ctx.lineTo(tx + 64, hy - 22); ctx.lineTo(tx + 64, hy + 14); ctx.closePath(); ctx.fill();
        ctx.save(); ctx.translate(tx, hy); ctx.rotate(S.rot); for (let k = 0; k < 18; k++) { ctx.rotate(TAU / 18); ctx.fillStyle = k % 2 ? '#e5e7eb' : '#cbd5e1'; ctx.beginPath(); ctx.moveTo(14, -3); ctx.lineTo(R, -9); ctx.lineTo(R, 7); ctx.lineTo(14, 3); ctx.closePath(); ctx.fill(); } ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(0, 0, 12, 0, TAU); ctx.fill(); ctx.restore();
        const rod = Math.sin(S.rot * 2) * 10 * Math.min(1, S.om); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx, hy + 14); ctx.lineTo(tx, gy - 30 + rod); ctx.stroke();
        const trx = tx + 90; ctx.fillStyle = '#78716c'; rr(ctx, trx - 50, gy - 34, 100, 34, 4); ctx.fill(); ctx.fillStyle = 'rgba(37,99,235,.85)'; ctx.fillRect(trx - 46, gy - 4 - 26 * S.wl, 92, 26 * S.wl); });
      if (S.om > .1) Q38.stream(ctx, [[tx + 6, gy - 34], [tx + 30, gy - 34], [tx + 46, gy - 26]], S.ph * 60 * S.om, '#2563eb', { sp: 9, r: 2.4 });
      Q38.pipe(ctx, [[tx, gy - 30], [tx, gy - 36], [tx + 30, gy - 36]], { w: 5, col: '#64748b' }); Q33.T(ctx, 'طاحونة هوائية لضخ الماء', tx, gy + 16, { s: 11, w: 900, c: '#fff', bg: '#7c2d12' }); },
    chips(S, g) { return Q38.chips(S, 'loc', Object.keys(LOC).map(k => [k, LOC[k][0]]), g.h - 84, S.loc, (S2, k) => { S2.loc = k; setParam(S2, 'v', LOC[k][1]); }, { bw: 160 }).concat(Q38.chips(S, 'md', [['tur', 'توربين رياح — الشكل 11'], ['mill', 'طاحونة هوائية — الشكل 12']], g.h - 128, S.md, (S2, k) => { S2.md = k; }, { bw: 220 })); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), kx = g.kx0 + (g.kx1 - g.kx0) * S.p.v / 25;
      return [{ id: 'wind', x: kx, y: g.ky, r: 20, axis: 'x', keep: true, tip: 'اسحب لتغيير سرعة الرياح', idle: 'اسحب سرعة الرياح ✋', drag: (S2, d) => { setParam(S2, 'v', +(clamp((d.x - g.kx0) / (g.kx1 - g.kx0), 0, 1) * 25).toFixed(1)); } }].concat(D.chips(S, g)); },
    readings(S) { const v = D.veff(S), P = pw(v); return [rd('سرعة الرياح', Q33.f(v, 1) + ' m/s'), rd('القدرة', Q33.f(P * 1000, 0) + ' kW'), rd('الطاقة اليومية', Q33.f(P * S.p.hrs, 1) + ' MW·h'), rd('الحكم', v < VMIN ? 'سرعة غير كافية' : 'مناسبة للتوليد')]; },
    record(S) { return { v: +S.p.v.toFixed(1), P: Math.round(pw(S.p.v) * 1000) }; },
    cols: [['v', 'v (m/s)'], ['P', 'P (kW)']],
    graph: { x: 'v', y: 'P', xl: 'سرعة الرياح v (m/s)', yl: 'القدرة P (kW)' },
    explain(S) { const v = D.veff(S); return Q26.ex(v < VMIN ? 'سرعة الرياح ' + Q33.f(v, 1) + ' m/s أقل من 5.4 m/s فالتوليد غير مجدٍ.' : 'الرياح بسرعة ' + Q33.f(v, 1) + ' m/s تدير الريش وتولد ' + Q33.f(pw(v) * 1000, 0) + ' kW.', 'تؤثر الرياح بقوة في ريش المروحة فتدور، والمروحة متصلة بمولد كهربائي تدور نواته فتتولد الكهرباء. القدرة تزداد كثيراً بزيادة سرعة الرياح، لذلك تنصب المراوح في المناطق الساحلية والصحراوية حيث الرياح سريعة وتهب لساعات طويلة.', 'الطواحين الهوائية القديمة استعملت قوة الرياح لضخ الماء وطحن الحبوب.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== D2 — تكنولوجيا طاقة الوقود الحيوي: الإيثانول، الديزل الحيوي، غاز الميثان (3-3-8، ص 157–158، الشكلان 13 و 14 وهل تعلم) =============== */
(() => {
  const FT = { eth: ['وقود الإيثانول', 'Ethanol', [['cane', 'قصب السكر', '🎋', .08], ['corn', 'الذرة', '🌽', .4], ['date', 'التمر', '🌴', .3], ['pot', 'البطاطا الحلوة', '🍠', .15]], ['تخمير', 'تقطير'], 'L', '#ca8a04'],
    bio: ['وقود الديزل الحيوي', 'Biodiesel', [['soy', 'فول الصويا', '🫘', .2], ['palm', 'زيت النخيل', '🌴', .25], ['sun', 'عباد الشمس', '🌻', .4]], ['عصر الزيت', 'معالجة كيميائية'], 'L', '#65a30d'],
    gas: ['غاز الميثان', 'Methane', [['dung', 'مخلفات الحيوانات', '🐄', .05], ['food', 'مخلفات الأغذية', '🍎', .1], ['crop', 'مخلفات المزروعات', '🌾', .07], ['waste', 'النفايات والمجاري', '🗑️', .04]], ['هضم لا هوائي', 'تجميع الغاز'], 'm³', '#0891b2'] };
  const D = { id: 'g9_en_bio', page: 157, fig: 'الشكلان 13 و 14 + هل تعلم ص 158',
    desc: 'الوقود الحيوي هو الطاقة المستثمرة من الكائنات الحية سواء النباتية أو الحيوانية منها، وهو من أهم مصادر الطاقة المتجددة، ويتصدر الوقود الحيوي السائل مصادر إنتاجه. ينتج الوقود السائل بنوعين: 1- وقود الإيثانول (Ethanol fuel): يستخرج من قصب السكر والبطاطا الحلوة والذرة والتمر، ثم يعالج بعمليات ونسب محددة (الشكل 13)، ويستعمل في تشغيل بعض أنواع السيارات. 2- وقود الديزل الحيوي (Biodiesel fuel): يستخرج من النباتات الحاوية على الزيوت مثل فول الصويا وزيت النخيل وعباد الشمس بعد معالجتها كيميائياً (الشكل 14). هل تعلم: يمكن الحصول على الوقود الحيوي الغازي (غاز الميثان) من التحلل الكيميائي للمزروعات والفضلات ومخلفات الحيوانات وتحلل النفايات والمجاري ومخلفات الأغذية عن طريق الهضم اللاهوائي.',
    tags: 'الوقود الحيوي الطاقة المتجددة الإيثانول قصب السكر الذرة التمر البطاطا الحلوة الديزل الحيوي فول الصويا زيت النخيل عباد الشمس غاز الميثان الهضم اللاهوائي تخمير',
    tools: ['محاصيل زراعية', 'خزان تخمير', 'جهاز تقطير', 'معصرة زيت', 'مفاعل معالجة', 'هاضم لا هوائي'],
    steps: ['اختر نوع الوقود من الأزرار السفلية.', 'اسحب بطاقة مادة خام من الأعلى وأسقطها في القمع.', 'راقب مراحل الإنتاج حتى يمتلئ خزان الوقود، ثم اضغط على الخزان لاستعماله.', 'غيّر درجة حرارة التخمير من اللوحة: متى تكون المعالجة أسرع؟'],
    concl: ['الوقود الحيوي طاقة مستثمرة من الكائنات الحية النباتية أو الحيوانية، وهو متجدد.', 'الإيثانول من قصب السكر والذرة والتمر والبطاطا الحلوة، ويشغل بعض السيارات.', 'الديزل الحيوي من النباتات الزيتية: فول الصويا وزيت النخيل وعباد الشمس.', 'غاز الميثان ينتج من الهضم اللاهوائي للمخلفات والنفايات.'],
    laws: ['g9_l8_energy'],
    controls: [R('T', 'درجة حرارة المعالجة', 15, 50, 35, 1, '°C'), R('k', 'تسريع الزمن', 1, 10, 4, 1, '×'), TG('lbl', 'أسماء مراحل الإنتاج', true, null, 'eye')],
    setup(S) { S.ft = 'eth'; S.feed = 0; S.yld = 0; S.prod = 0; S.used = 0; S.drag = ''; S.dx = 0; S.dy = 0; S.ph = 0; S.run = 0; S.cx = 0; S.fp = {}; S.msg = ''; S.mass = 0; },
    rate(S) { return Math.exp(-Math.pow((S.p.T - 35) / 10, 2)); },
    update(S, dt) { S.ph += dt; const r = Math.min(S.feed, dt * S.p.k * 12 * D.rate(S)); if (r > 0) { S.feed -= r; S.prod += r * S.yld; } if (S.ft === 'gas' && S.prod > 0) { const u = Math.min(S.prod, dt * .06); S.prod -= u; S.used += u; } if (S.run > 0) { const u = Math.min(S.prod, dt * .8); S.prod -= u; S.used += u; S.cx += dt * 160; S.run = u > 0 ? S.run : 0; } },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), sy = 314, sh = h - 150 - sy - 8, W = w - 24 - x0; return { w, h, L, x0, x1, sy, sh, W, sx1: w - 24, gy: sy + sh * .88, hx: x0 + 70, hy: sy + 70, cw: 86, chh: 64 }; },
    tray(g, i, n) { const sp = (g.x1 - g.x0) / n; return [g.x1 - sp * (i + .5), 150]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), F = FT[S.ft], lb = S.p.lbl, X = f => g.x0 + g.W * f, act = S.feed > .5, gy = g.gy; Q38.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2; rr(ctx, g.x0, 70, g.x1 - g.x0, 228, 14); ctx.fill(); ctx.stroke(); });
      Q33.T(ctx, 'المواد الخام: اسحب بطاقة إلى القمع', (g.x0 + g.x1) / 2, 88, { s: 12, w: 900, c: '#047857' });
      Q38.chain(ctx, g.x1 - 6, g.x0 + 6, 262, [['كيميائية في النبات', '#16a34a', 1], ['وقود ' + F[1], F[5], S.prod > .01 || S.used > 0 ? 1 : 0], [S.ft === 'gas' ? 'حرارية' : 'حركية', S.ft === 'gas' ? '#dc2626' : '#2563eb', S.run || (S.ft === 'gas' && S.prod > .01) ? 1 : 0]], { s: 10.5 });
      Q38.scene(ctx, g.x0, g.sy, g.W, g.sh, { gf: .88 });
      // hopper
      K.raw(ctx, () => { const hg = ctx.createLinearGradient(g.hx - 50, 0, g.hx + 50, 0); hg.addColorStop(0, '#64748b'); hg.addColorStop(.5, '#e2e8f0'); hg.addColorStop(1, '#475569'); ctx.fillStyle = hg; ctx.beginPath(); ctx.moveTo(g.hx - 50, g.hy - 30); ctx.lineTo(g.hx + 50, g.hy - 30); ctx.lineTo(g.hx + 12, g.hy + 30); ctx.lineTo(g.hx - 12, g.hy + 30); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#475569'; ctx.fillRect(g.hx - 12, g.hy + 30, 24, gy - g.hy - 30);
        if (act) { ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.moveTo(g.hx - 40 * Math.min(1, S.feed / 100), g.hy - 26 + 40 * (1 - Math.min(1, S.feed / 100))); ctx.lineTo(g.hx + 40 * Math.min(1, S.feed / 100), g.hy - 26 + 40 * (1 - Math.min(1, S.feed / 100))); ctx.lineTo(g.hx + 12, g.hy + 28); ctx.lineTo(g.hx - 12, g.hy + 28); ctx.closePath(); ctx.fill(); } });
      Q33.T(ctx, 'القمع ' + Math.round(S.feed) + ' kg', g.hx, g.hy - 44, { s: 11, w: 900, c: '#fff', bg: '#334155' });
      const s1 = X(.33), s2 = X(.52), st = X(.7), us = X(.88);
      const p1 = [[g.hx + 12, gy - 20], [s1 - 40, gy - 20]], p2 = [[s1 + 40, gy - 30], [s2 - 30, gy - 30]], p3 = [[s2 + 30, gy - 24], [st - 34, gy - 24]];
      [p1, p2, p3].forEach(pp => { Q38.pipe(ctx, pp, { w: 7, col: '#94a3b8' }); if (act) Q38.stream(ctx, pp, S.ph * 40, F[5], { sp: 16, r: 2.4 }); });
      // stage 1
      K.raw(ctx, () => { if (S.ft === 'bio') { ctx.fillStyle = '#57534e'; rr(ctx, s1 - 40, gy - 110, 80, 110, 8); ctx.fill(); const pr = act ? Math.abs(Math.sin(S.ph * 3)) * 26 : 0; ctx.fillStyle = '#a8a29e'; ctx.fillRect(s1 - 32, gy - 100 + pr, 64, 14); ctx.fillStyle = '#78716c'; ctx.fillRect(s1 - 4, gy - 140, 8, 40 + pr); ctx.fillStyle = 'rgba(202,138,4,.8)'; ctx.fillRect(s1 - 32, gy - 40, 64, 30); }
        else if (S.ft === 'gas') { const dg = ctx.createLinearGradient(0, gy - 120, 0, gy); dg.addColorStop(0, '#a3e635'); dg.addColorStop(1, '#3f6212'); ctx.fillStyle = dg; ctx.beginPath(); ctx.moveTo(s1 - 50, gy); ctx.lineTo(s1 - 50, gy - 60); ctx.arc(s1, gy - 60, 50, Math.PI, 0); ctx.lineTo(s1 + 50, gy); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(120,53,15,.85)'; ctx.fillRect(s1 - 46, gy - 50, 92, 46); }
        else { const tg = ctx.createLinearGradient(s1 - 40, 0, s1 + 40, 0); tg.addColorStop(0, '#78716c'); tg.addColorStop(.5, '#e7e5e4'); tg.addColorStop(1, '#57534e'); ctx.fillStyle = tg; rr(ctx, s1 - 40, gy - 120, 80, 120, 14); ctx.fill(); ctx.fillStyle = 'rgba(234,179,8,.75)'; rr(ctx, s1 - 32, gy - 90, 64, 82, 8); ctx.fill(); }
        if (act) { ctx.fillStyle = 'rgba(255,255,255,.85)'; for (let k = 0; k < 8; k++) { const yy = gy - 10 - ((S.ph * 30 + k * 13) % 70); ctx.beginPath(); ctx.arc(s1 - 26 + (k * 19) % 52, yy, 2.6, 0, TAU); ctx.fill(); } } });
      // stage 2
      K.raw(ctx, () => { if (S.ft === 'eth') { const cg = ctx.createLinearGradient(s2 - 18, 0, s2 + 18, 0); cg.addColorStop(0, '#94a3b8'); cg.addColorStop(.5, '#f8fafc'); cg.addColorStop(1, '#64748b'); ctx.fillStyle = cg; rr(ctx, s2 - 18, gy - 170, 36, 170, 10); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; for (let y = gy - 150; y < gy - 10; y += 20) { ctx.beginPath(); ctx.moveTo(s2 - 18, y); ctx.lineTo(s2 + 18, y); ctx.stroke(); } Q38.flame(ctx, s2, gy + 2, act ? .5 : 0, S.ph, { n: 2, sp: 12 }); }
        else if (S.ft === 'bio') { ctx.fillStyle = '#0f766e'; rr(ctx, s2 - 30, gy - 90, 60, 90, 22); ctx.fill(); ctx.save(); ctx.translate(s2, gy - 50); ctx.rotate(S.ph * (act ? 6 : 0)); ctx.strokeStyle = '#ccfbf1'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(18, 0); ctx.moveTo(0, -18); ctx.lineTo(0, 18); ctx.stroke(); ctx.restore(); }
        else { ctx.fillStyle = '#cbd5e1'; rr(ctx, s2 - 34, gy - 50 - 50 * clamp(S.prod / 4, 0, 1), 68, 50 + 50 * clamp(S.prod / 4, 0, 1), 6); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke(); } });
      if (lb) { Q33.T(ctx, F[3][0], s1, gy + 14, { s: 10.5, w: 900, c: '#fff', bg: '#334155' }); Q33.T(ctx, F[3][1], s2, gy + 14, { s: 10.5, w: 900, c: '#fff', bg: '#334155' }); }
      // storage
      const fl = clamp(S.prod / 6, 0, 1); K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; rr(ctx, st - 34, gy - 100, 68, 100, 8); ctx.fill(); ctx.stroke(); ctx.save(); rr(ctx, st - 32, gy - 98, 64, 96, 7); ctx.clip(); ctx.fillStyle = S.ft === 'gas' ? 'rgba(8,145,178,.45)' : F[5]; ctx.globalAlpha = .85; ctx.fillRect(st - 32, gy - 2 - 96 * fl, 64, 96 * fl); ctx.restore(); });
      Q33.T(ctx, Q33.f(S.prod, 2) + ' ' + F[4], st, gy - 50, { s: 12, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.85)' }); Q33.T(ctx, F[0], st, gy + 14, { s: 10.5, w: 900, c: '#fff', bg: F[5] });
      // usage
      if (S.ft === 'gas') { const on = S.prod > .01; K.raw(ctx, () => { ctx.fillStyle = '#6b7280'; rr(ctx, us - 44, gy - 40, 88, 40, 6); ctx.fill(); ctx.fillStyle = '#111827'; ctx.fillRect(us - 30, gy - 46, 60, 6); }); Q38.flame(ctx, us, gy - 46, on ? .55 : 0, S.ph, { blue: 1, n: 5, sp: 11 }); Q33.T(ctx, on ? 'طباخ يعمل بالغاز الحيوي' : 'لا يوجد غاز', us, g.sy + 30, { s: 11, w: 900, c: '#fff', bg: on ? '#0891b2' : '#64748b' }); }
      else { const cx = us - 40 + (S.cx % 120); K.raw(ctx, () => { ctx.fillStyle = '#374151'; ctx.fillRect(us - 70, gy - 4, 150, 8); ctx.save(); ctx.translate(cx, gy - 8); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.moveTo(-32, 0); ctx.lineTo(-30, -18); ctx.lineTo(-12, -20); ctx.lineTo(-4, -32); ctx.lineTo(18, -32); ctx.lineTo(26, -18); ctx.lineTo(34, -16); ctx.lineTo(34, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#dcfce7'; ctx.fillRect(-2, -29, 16, 10); ctx.fillStyle = '#111827'; [-18, 20].forEach(x => { ctx.beginPath(); ctx.arc(x, 0, 7, 0, TAU); ctx.fill(); }); ctx.restore(); });
        Q33.T(ctx, S.run ? 'سيارة تعمل بالوقود الحيوي' : 'اضغط الخزان لتشغيل السيارة', us, g.sy + 30, { s: 11, w: 900, c: '#fff', bg: S.run ? '#16a34a' : '#64748b' }); }
      // tray cards
      F[2].forEach((c, i) => { if (S.drag === c[0]) return; const [x, y] = D.tray(g, i, F[2].length); D.card(ctx, g, c, x, y, 0); });
      const dc = F[2].find(c => c[0] === S.drag); if (dc) D.card(ctx, g, dc, S.dx, S.dy, 1);
      const hc = Q38.card(ctx, S, [{ t: 'الوقود الحيوي: طاقة مستثمرة من الكائنات الحية النباتية أو الحيوانية.', c: '#0f172a' }, { t: 'وهو من مصادر الطاقة المتجددة.', c: '#047857', w: 900 }], { title: F[0], wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['المواد الخام المضافة', Math.round(S.mass) + ' kg'], ['الوقود المنتج', Q33.f(S.prod + S.used, 2) + ' ' + F[4]], ['سرعة المعالجة', Math.round(D.rate(S) * 100) + '%']].concat(S.msg ? [['آخر إضافة', S.msg]] : []), { lh: 22 });
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'اسحب المادة الخام إلى القمع وتابع إنتاج الوقود الحيوي');
    },
    card(ctx, g, c, x, y, on) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = on ? 14 : 6; ctx.shadowOffsetY = 3; ctx.fillStyle = '#fff'; rr(ctx, x - g.cw / 2, y - g.chh / 2, g.cw, g.chh, 10); ctx.fill(); ctx.restore(); ctx.strokeStyle = on ? '#047857' : '#cbd5e1'; ctx.lineWidth = on ? 2.5 : 1.2; rr(ctx, x - g.cw / 2, y - g.chh / 2, g.cw, g.chh, 10); ctx.stroke(); });
      Q33.T(ctx, c[2], x, y - 10, { s: 24 }); Q33.T(ctx, c[1], x, y + 18, { s: 10.5, w: 900, c: '#334155' }); },
    chips(S, g) { return Q38.chips(S, 'ft', Object.keys(FT).map(k => [k, FT[k][0]]), g.h - 84, S.ft, (S2, k) => { S2.ft = k; S2.feed = 0; S2.prod = 0; S2.used = 0; S2.mass = 0; S2.run = 0; S2.msg = ''; }, { bw: 180 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), F = FT[S.ft], X = f => g.x0 + g.W * f;
      const L = F[2].map((c, i) => { const [x, y] = S.drag === c[0] ? [S.dx, S.dy] : D.tray(g, i, F[2].length); return { id: 'cr_' + c[0], x, y, w: g.cw, h: g.chh, axis: 'xy', keep: true, tip: 'اسحب المادة إلى القمع', idle: i ? undefined : 'اسحب إلى القمع ✋', hint: i ? false : undefined,
        down: () => { S.drag = c[0]; S.dx = x; S.dy = y; }, drag: (S2, d) => { S2.drag = c[0]; S2.dx = d.x; S2.dy = d.y; }, up: S2 => { S2.drag = ''; if (Math.abs(S2.dx - g.hx) < 80 && S2.dy > g.sy - 10 && S2.dy < g.hy + 60) { S2.yld = c[3]; S2.feed += 50; S2.mass += 50; S2.msg = c[1] + ' 50 kg'; } } }; });
      L.push({ id: 'tank', x: X(.7), y: g.gy - 50, w: 70, h: 100, axis: 'none', hint: false, tip: 'اضغط لاستعمال الوقود', click: S2 => { S2.run = S2.prod > .01 ? 1 : 0; } });
      return L.concat(D.chips(S, g)); },
    readings(S) { const F = FT[S.ft]; return [rd('نوع الوقود', F[0]), rd('المواد الخام', Math.round(S.mass) + ' kg'), rd('الوقود المنتج', Q33.f(S.prod + S.used, 2) + ' ' + F[4]), rd('درجة الحرارة', S.p.T + ' °C')]; },
    explain(S) { const F = FT[S.ft]; return Q26.ex('أنتجنا ' + Q33.f(S.prod + S.used, 2) + ' ' + F[4] + ' من ' + F[0] + '.', S.ft === 'eth' ? 'الإيثانول يستخرج من النباتات السكرية والنشوية (قصب السكر، الذرة، التمر، البطاطا الحلوة) بالتخمير ثم التقطير، ويستعمل في تشغيل بعض أنواع السيارات.' : S.ft === 'bio' ? 'الديزل الحيوي يستخرج من النباتات الحاوية على الزيوت (فول الصويا، زيت النخيل، عباد الشمس) بعصرها ثم معالجة الزيت كيميائياً.' : 'غاز الميثان ينتج من التحلل الكيميائي للمخلفات والنفايات في غياب الهواء (الهضم اللاهوائي)، ويستعمل وقوداً للطهي والتسخين.', 'الوقود الحيوي متجدد لأن النباتات تنمو من جديد كل موسم.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== D3 — تكنولوجيا طاقة المد والجزر: السد والتوربين ذو الاتجاهين والمولد الطافي (4-3-8، ص 159، الشكل 15) =============== */
(() => {
  const PER = 12.4, PX = 10;
  const D = { id: 'g9_en_tide', page: 159, fig: 'الشكل 15',
    desc: 'تكنولوجيا طاقة المد والجزر (Tidal energy) هي عملية استثمار حركة المد والجزر في توليد الطاقة الكهربائية، وتقوم الفكرة على أن منسوب الماء يرتفع وقت المد (الشكل 15-a) وينخفض وقت الجزر (الشكل 15-b) في البحار والمحيطات، فيشكل فارق ارتفاع وانخفاض منسوب المياه وحركته مصدراً كبيراً للطاقة إذا أخذنا بنظر الاعتبار ملايين الأمتار المكعبة التي تتعرض لهذه الحركة، حيث يمكن الإفادة منها في تشغيل التوربينات لتوليد الطاقة الكهربائية. وتستعمل المولدات الطافية في البحر لتوليد الكهرباء من حركة الماء.',
    tags: 'طاقة المد والجزر المد الجزر منسوب الماء فارق الارتفاع سد التوربين المولد الطافي البحر المحيط طاقة متجددة',
    tools: ['سد على مدخل خليج', 'توربين يدور في الاتجاهين', 'بوابة', 'مولد كهربائي', 'مولد طافٍ'],
    steps: ['شغّل الزمن وراقب ارتفاع منسوب البحر وقت المد وانخفاضه وقت الجزر.', 'اضغط على البوابة لإغلاقها حتى يتكون فرق كبير في المنسوب، ثم افتحها: متى تكون القدرة أكبر؟', 'اختر «المد» أو «الجزر» من الأزرار ولاحظ اتجاه جريان الماء خلال التوربين.', 'زد مدى المد والجزر من اللوحة وقارن القدرة.'],
    concl: ['يرتفع منسوب ماء البحر وقت المد وينخفض وقت الجزر مرتين تقريباً كل يوم.', 'فرق المنسوب يجعل الماء يجري خلال التوربين فيديره ويولد الكهرباء.', 'كلما زاد فرق المنسوب زادت القدرة المتولدة.', 'المولدات الطافية في البحر تولد الكهرباء من حركة الماء.'],
    laws: ['g9_l8_hydro'],
    controls: [R('rng', 'مدى المد والجزر', 1, 10, 6, .5, 'm'), R('k', 'تسريع الزمن', 1, 20, 6, 1, '×'), TG('gate', 'بوابة التوربين مفتوحة', true, null, 'eye'), TG('buoy', 'مولد طافٍ على الأمواج', true, null, 'wave')],
    setup(S) { S.tt = 2; S.B = 0; S.om = 0; S.rot = 0; S.ph = 0; S.hist = []; S.hk = 0; S.E = 0; S.q = 0; },
    sea(S, t) { return S.p.rng / 2 * Math.sin(TAU * (t == null ? S.tt : t) / PER); },
    update(S, dt) { S.ph += dt; const dh = dt * S.p.k * .25; S.tt += dh; const sl = D.sea(S), d = sl - S.B; let q = 0;
      if (S.p.gate) { q = Math.sign(d) * Math.sqrt(Math.abs(d)) * 1.1; S.B += q * dh; if (Math.abs(sl - S.B) < 1e-3) S.B = sl; }
      Q38.ez(S, 'q', q, dt, 3); Q38.ez(S, 'om', S.p.gate ? clamp(Math.abs(d) / 3, 0, 1.3) * Math.sign(d) : 0, dt, 2); S.rot += S.om * dt * 10; S.E += D.P(S) * dh;
      S.hk += dh; if (S.hk > .25) { S.hk = 0; S.hist.push([sl, S.B]); if (S.hist.length > 100) S.hist.shift(); } },
    P(S) { return S.p.gate ? 8 * Math.abs(S.q) * Math.abs(D.sea(S) - S.B) : 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), sy = 314, sh = h - 150 - sy - 8, W = w - 24 - x0; return { w, h, L, x0, x1, sy, sh, W, sx1: w - 24, bot: sy + sh, ym: sy + sh * .6, bx: x0 + W * .42 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), sl = D.sea(S), P = D.P(S), high = Math.sin(TAU * S.tt / PER) > 0, rising = Math.cos(TAU * S.tt / PER) > 0; Q38.bg(ctx, w, h);
      // graph
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 2; rr(ctx, g.x0, 70, g.x1 - g.x0, 228, 14); ctx.fill(); ctx.stroke(); });
      const ax0 = g.x0 + 40, ax1 = g.x1 - 14, my = 176, sc = 72 / 5; K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(ax0, my - 80); ctx.lineTo(ax0, my + 80); ctx.moveTo(ax0, my); ctx.lineTo(ax1, my); ctx.stroke();
        [[0, '#0284c7'], [1, '#0d9488']].forEach(([k, c]) => { ctx.strokeStyle = c; ctx.lineWidth = k ? 2 : 2.6; if (k) ctx.setLineDash([6, 4]); ctx.beginPath(); S.hist.forEach((v, j) => { const x = ax0 + (ax1 - ax0) * j / 99, y = my - v[k] * sc; j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); ctx.setLineDash([]); }); });
      Q33.T(ctx, 'منسوب الماء مع الزمن', (ax0 + ax1) / 2, 84, { s: 11.5, w: 900, c: '#047857' }); Q33.T(ctx, '+5 m', ax0 - 18, my - 72, { s: 9.5, w: 800, c: '#64748b' }); Q33.T(ctx, '−5 m', ax0 - 18, my + 72, { s: 9.5, w: 800, c: '#64748b' });
      Q33.T(ctx, '━ البحر', ax1 - 30, 104, { s: 11, w: 900, c: '#0284c7' }); Q33.T(ctx, '┅ الخليج', ax1 - 30, 122, { s: 11, w: 900, c: '#0d9488' }); Q33.T(ctx, (high ? 'مد' : 'جزر') + (rising ? ' — المنسوب يرتفع' : ' — المنسوب ينخفض'), (ax0 + ax1) / 2, 274, { s: 11, w: 900, c: '#fff', bg: high ? '#0369a1' : '#a16207' });
      // scene
      K.raw(ctx, () => { ctx.save(); rr(ctx, g.x0, g.sy, g.W, g.sh, 16); ctx.clip(); const sk = ctx.createLinearGradient(0, g.sy, 0, g.bot); sk.addColorStop(0, '#7dd3fc'); sk.addColorStop(1, '#e0f2fe'); ctx.fillStyle = sk; ctx.fillRect(g.x0, g.sy, g.W, g.sh);
        const yS = g.ym - sl * PX, yB = g.ym - S.B * PX; let wg = ctx.createLinearGradient(0, yS, 0, g.bot); wg.addColorStop(0, '#0ea5e9'); wg.addColorStop(1, '#075985'); ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(g.bx + 30, g.bot); for (let x = g.bx + 30; x <= g.sx1; x += 6) ctx.lineTo(x, yS + Math.sin(x * .05 - S.ph * 2.5) * 3); ctx.lineTo(g.sx1, g.bot); ctx.closePath(); ctx.fill();
        wg = ctx.createLinearGradient(0, yB, 0, g.bot); wg.addColorStop(0, '#2dd4bf'); wg.addColorStop(1, '#115e59'); ctx.fillStyle = wg; ctx.fillRect(g.x0, yB, g.bx - 30 - g.x0, g.bot - yB);
        ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.moveTo(g.x0, g.bot); ctx.lineTo(g.x0, g.bot - 26); ctx.quadraticCurveTo(g.x0 + 140, g.bot - 40, g.bx, g.bot - 22); ctx.lineTo(g.sx1, g.bot - 14); ctx.lineTo(g.sx1, g.bot); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.moveTo(g.x0, g.ym - 74); ctx.lineTo(g.x0 + 40, g.ym - 74); ctx.quadraticCurveTo(g.x0 + 60, g.ym - 30, g.x0 + 60, g.bot); ctx.lineTo(g.x0, g.bot); ctx.closePath(); ctx.fill(); ctx.restore();
        // barrage
        const cg = ctx.createLinearGradient(g.bx - 30, 0, g.bx + 30, 0); cg.addColorStop(0, '#a8a29e'); cg.addColorStop(.5, '#e7e5e4'); cg.addColorStop(1, '#78716c'); ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(g.bx - 20, g.ym - 78); ctx.lineTo(g.bx + 20, g.ym - 78); ctx.lineTo(g.bx + 32, g.bot); ctx.lineTo(g.bx - 32, g.bot); ctx.closePath(); ctx.fill();
        const ty = g.bot - 46; ctx.fillStyle = '#0c4a6e'; ctx.fillRect(g.bx - 32, ty - 18, 64, 36); });
      const ty = g.bot - 46; Q38.turb(ctx, g.bx, ty, 16, S.rot, { n: 8, col: '#bae6fd' });
      if (Math.abs(S.q) > .03) { const dir = Math.sign(S.q), pts = dir > 0 ? [[g.bx + 90, ty], [g.bx - 90, ty]] : [[g.bx - 90, ty], [g.bx + 90, ty]]; Q38.stream(ctx, pts, S.ph * 60 * Math.abs(S.q), 'rgba(255,255,255,.9)', { sp: 14, r: 2.6 }); Q38.arrow(ctx, pts[0][0], ty - 28, pts[1][0], ty - 28, '#fff', 3, 10); }
      // gate
      K.raw(ctx, () => { ctx.fillStyle = S.p.gate ? 'rgba(185,28,28,.35)' : '#b91c1c'; ctx.fillRect(g.bx + 22, ty - 22, 8, S.p.gate ? 10 : 44); });
      Q33.T(ctx, S.p.gate ? 'البوابة مفتوحة' : 'البوابة مغلقة', g.bx, g.ym - 92, { s: 10.5, w: 900, c: '#fff', bg: S.p.gate ? '#16a34a' : '#b91c1c' });
      Q38.gen(ctx, g.bx, g.ym - 124, .6, S.rot, Math.abs(S.om), { lab: '' }); Q33.T(ctx, Q33.f(P, 1) + ' MW', g.bx + 52, g.ym - 124, { s: 11, w: 900, c: '#fff', bg: '#047857' });
      Q33.T(ctx, 'الخليج', g.x0 + 120, g.ym - S.B * PX - 16, { s: 11, w: 900, c: '#fff', bg: '#0d9488' }); Q33.T(ctx, 'البحر', g.sx1 - 60, g.ym - sl * PX - 16, { s: 11, w: 900, c: '#fff', bg: '#0369a1' });
      Q33.T(ctx, 'Δh = ' + Q33.f(Math.abs(sl - S.B), 2) + ' m', g.bx + 110, g.bot - 90, { s: 11.5, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.85)' });
      // floating generator
      if (S.p.buoy) { const bx2 = g.sx1 - 120, by = g.ym - sl * PX + Math.sin(bx2 * .05 - S.ph * 2.5) * 3 + Math.sin(S.ph * 2.2) * 4; K.raw(ctx, () => { ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.ellipse(bx2, by, 26, 9, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(bx2 - 4, by - 30, 8, 22); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(bx2, by - 32, 4 + 2 * Math.abs(Math.sin(S.ph * 2.2)), 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bx2, by + 8); ctx.lineTo(bx2, g.bot - 14); ctx.stroke(); });
        Q33.T(ctx, 'مولد طافٍ', bx2, by - 50, { s: 10.5, w: 900, c: '#fff', bg: '#b45309' }); }
      const hc = Q38.card(ctx, S, [{ t: 'يرتفع منسوب البحر وقت المد وينخفض وقت الجزر.', c: '#0f172a' }, { t: 'فرق المنسوب يدير التوربين فيولد الكهرباء.', c: '#047857', w: 900 }], { title: 'طاقة المد والجزر', wd: 300, y: 64 });
      Q38.panel(ctx, w - 12, 64 + hc + 8, 300, [['الحالة', high ? 'مد' : 'جزر'], ['منسوب البحر', Q33.f(sl, 2) + ' m'], ['فرق المنسوب', Q33.f(Math.abs(sl - S.B), 2) + ' m'], ['القدرة', Q33.f(P, 1) + ' MW'], ['الطاقة المتولدة', Q33.f(S.E, 1) + ' MW·h']], { lh: 22 });
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'راقب المد والجزر، واضغط على البوابة لإغلاقها أو فتحها');
    },
    chips(S, g) { const ph = ((S.tt % PER) + PER) % PER; return Q38.chips(S, 'td', [['hi', 'المد — الشكل 15-a'], ['lo', 'الجزر — الشكل 15-b']], g.h - 84, ph < PER / 2 ? 'hi' : 'lo', (S2, k) => { const n = Math.floor(S2.tt / PER); S2.tt = n * PER + (k === 'hi' ? PER / 4 : PER * .75); S2.B = 0; }, { bw: 200 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'gate', x: g.bx, y: g.bot - 46, w: 70, h: 50, axis: 'none', tip: 'اضغط لفتح/إغلاق البوابة', idle: 'اضغط على البوابة ✋', click: S2 => { setParam(S2, 'gate', !S2.p.gate); } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('منسوب البحر', Q33.f(D.sea(S), 2) + ' m'), rd('منسوب الخليج', Q33.f(S.B, 2) + ' m'), rd('القدرة', Q33.f(D.P(S), 1) + ' MW'), rd('الطاقة المتولدة', Q33.f(S.E, 1) + ' MW·h')]; },
    explain(S) { return Q26.ex('فرق المنسوب بين البحر والخليج ' + Q33.f(Math.abs(D.sea(S) - S.B), 2) + ' m يولد ' + Q33.f(D.P(S), 1) + ' MW.', 'وقت المد يرتفع ماء البحر فيجري إلى الخليج خلال التوربين، ووقت الجزر ينخفض فيعود الماء من الخليج إلى البحر خلال التوربين نفسه بالاتجاه المعاكس. ملايين الأمتار المكعبة من الماء المتحرك تشكل مصدراً كبيراً للطاقة، وكلما زاد فرق المنسوب زادت القدرة.', 'المد والجزر يحدثان مرتين تقريباً كل يوم، لذلك فهي طاقة متجددة يمكن التنبؤ بها.'); }
  };
  M8.P[D.id] = D;
})();
/* =============== E1 — أسئلة الفصل: متجددة أم غير متجددة؟ وأسباب تفضيل الطاقة المتجددة (3-8 ص 153 + أسئلة ص 160) =============== */
(() => {
  const TK = [['coal', 'الفحم الحجري', 'n', '🪨', [0, 3, 1, 1]], ['oil', 'النفط', 'n', '🛢️', [0, 3, 1, 1]], ['gas', 'الغاز الطبيعي', 'n', '🔥', [0, 2, 1, 1]], ['u', 'اليورانيوم', 'n', '☢️', [0, 1, 1, 0]],
    ['sun', 'الخلايا الشمسية', 'r', '☀️', [1, 0, 3, 2]], ['wind', 'الرياح', 'r', '🌬️', [1, 0, 2, 2]], ['tide', 'المد والجزر', 'r', '🌊', [1, 0, 1, 2]], ['bio', 'الوقود الحيوي', 'r', '🌽', [1, 1, 2, 2]]];
  const BN = { n: ['مصادر غير متجددة', '#b91c1c', .73], r: ['مصادر متجددة (بديلة)', '#047857', .27] };
  const QA = { q2: ['س2: لوح الزجاج على الخلية الشمسية', ['يوضع لوح زجاجي على الخلية الشمسية لحمايتها من التأثيرات الجوية مثل المطر والغبار والرياح، وهو شفاف فيسمح بنفاذ ضوء الشمس إلى الخلايا.']],
    q3: ['س3: لماذا تفضل الطاقة المتجددة؟', ['1- لأنها طاقة لا تستنفد.', '2- لأنها نظيفة غير ملوثة، على عكس الوقود الأحفوري الذي ينبعث منه عند احتراقه مواد تؤثر في البيئة.', '3- يمكن أن تكون متاحة محلياً خلافاً للوقود الأحفوري.', '4- قلة تكاليف إنتاج الطاقة منها.']],
    q4: ['س4: مبدأ العمل', ['1- الخلايا الشمسية: تحول طاقة ضوء الشمس إلى طاقة كهربائية.', '2- طاقة الرياح: الرياح تدير ريش المروحة المتصلة بمولد كهربائي فتدور نواته وتتولد الكهرباء.']] };
  const D = { id: 'g9_en_sort', page: 160, fig: 'أسئلة الفصل ص 160',
    desc: 'نعيش الآن مرحلة العد التنازلي لمصادر الطاقة الأحفورية من فحم وغاز ونفط، فضلاً عن مشكلات التلوث المرافقة لاستعمالها. الأسباب التي جعلت الطاقة المتجددة تفضل على غير المتجددة: 1- لأنها طاقة لا تستنفد. 2- لأنها نظيفة غير ملوثة. 3- يمكن أن تكون متاحة محلياً. 4- قلة تكاليف إنتاج الطاقة منها. أهم مصادر الطاقة المتجددة: الطاقة الشمسية، طاقة الرياح، طاقة الوقود الحيوي، طاقة المد والجزر. أسئلة الفصل: س1 اختيارات، س2 فائدة لوح الزجاج على الخلية الشمسية، س3 تفضيل الطاقة المتجددة، س4 مبدأ عمل الخلايا الشمسية وطاقة الرياح.',
    tags: 'أسئلة الفصل الثامن مصادر متجددة غير متجددة بديلة الفحم النفط الغاز اليورانيوم الشمس الرياح المد والجزر الوقود الحيوي تصنيف لوح الزجاج مبدأ العمل',
    tools: ['بطاقات مصادر الطاقة', 'صندوقا التصنيف'],
    steps: ['اسحب كل بطاقة إلى الصندوق الصحيح: متجددة أو غير متجددة.', 'اضغط على أي بطاقة لترى مقارنتها: هل تتجدد؟ التلوث؟ متاحة محلياً؟ الكلفة؟', 'اضغط أزرار الأسئلة س2 و س3 و س4 لترى الإجابات.'],
    concl: ['غير المتجددة: الفحم والنفط والغاز الطبيعي واليورانيوم، احتياطيها يتناقص.', 'المتجددة: الشمس والرياح والمد والجزر والوقود الحيوي.', 'تفضل المتجددة لأنها لا تستنفد، ونظيفة، ومتاحة محلياً، وكلفة إنتاجها قليلة.'],
    laws: ['g9_l8_energy'],
    controls: [TG('ans', 'إظهار الحل', false, (v, S) => { if (v) { const O = {}; TK.forEach(t => { O[t[0]] = 1; }); S.done = O; } }, 'eye'), TG('cmp', 'بطاقة المقارنة', true, null, 'vector')],
    setup(S) { S.done = {}; S.drag = ''; S.dx = 0; S.dy = 0; S.px = {}; S.py = {}; S.sel = 'coal'; S.qa = ''; S.msg = 'اسحب البطاقات إلى الصندوقين'; S.ok = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = Math.max(x0 + 360, w - 340), bx0 = x0, bx1 = w - 24; return { w, h, L, x0, x1, bx0, bx1, by: 356, sy: 448, tw: 86, th: 56 }; },
    tray(g, i) { const cw = (g.x1 - g.x0) / 4; return [g.x1 - cw * (i % 4 + .5), 134 + Math.floor(i / 4) * 74]; },
    bc(g, k) { return g.bx0 + (g.bx1 - g.bx0) * BN[k][2]; },
    slot(g, id) { const t = TK.find(q => q[0] === id), list = TK.filter(q => q[2] === t[2]), j = list.indexOf(t), c = D.bc(g, t[2]); return [c + (j % 2 ? -50 : 50), g.by + 56 + Math.floor(j / 2) * 64]; },
    tgt(S, g, i) { const t = TK[i]; if (S.drag === t[0]) return [S.dx, S.dy]; if (S.done[t[0]]) return D.slot(g, t[0]); return D.tray(g, i); },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); TK.forEach((t, i) => { const [x, y] = D.tgt(S, g, i); if (S.px[t[0]] == null) { S.px[t[0]] = x; S.py[t[0]] = y; } const r = S.drag === t[0] ? 18 : 9; S.px[t[0]] += (x - S.px[t[0]]) * Math.min(1, dt * r); S.py[t[0]] += (y - S.py[t[0]]) * Math.min(1, dt * r); }); },
    tok(ctx, g, t, x, y, on, sel) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.28)'; ctx.shadowBlur = on ? 14 : 7; ctx.shadowOffsetY = 3; ctx.fillStyle = '#fff'; rr(ctx, x - g.tw / 2, y - g.th / 2, g.tw, g.th, 10); ctx.fill(); ctx.restore(); ctx.strokeStyle = sel ? '#2563eb' : on ? '#047857' : '#cbd5e1'; ctx.lineWidth = sel || on ? 2.5 : 1.2; rr(ctx, x - g.tw / 2, y - g.th / 2, g.tw, g.th, 10); ctx.stroke(); });
      Q33.T(ctx, t[3], x, y - 10, { s: 20 }); Q33.T(ctx, t[1], x, y + 15, { s: 10.5, w: 900, c: '#334155' }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), nd = TK.filter(t => S.done[t[0]]).length; Q38.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.5; rr(ctx, g.x0, 72, g.x1 - g.x0, 210, 14); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); });
      Q33.T(ctx, 'بطاقات مصادر الطاقة', (g.x0 + g.x1) / 2, 88, { s: 11.5, w: 900, c: '#64748b' });
      ['n', 'r'].forEach(k => { const c = D.bc(g, k), wd = (g.bx1 - g.bx0) * .45, full = TK.filter(t => t[2] === k).every(t => S.done[t[0]]);
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.15)'; ctx.shadowBlur = 10; ctx.fillStyle = full ? shade(BN[k][1], 170) : 'rgba(255,255,255,.9)'; rr(ctx, c - wd / 2, g.by - 26, wd, 186, 16); ctx.fill(); ctx.restore(); ctx.strokeStyle = BN[k][1]; ctx.lineWidth = 2.5; rr(ctx, c - wd / 2, g.by - 26, wd, 186, 16); ctx.stroke(); });
        Q33.T(ctx, BN[k][0], c, g.by, { s: 13, w: 900, c: '#fff', bg: BN[k][1] });
        TK.filter(t => t[2] === k).forEach(t => { if (S.done[t[0]]) return; const [x, y] = D.slot(g, t[0]); K.raw(ctx, () => { ctx.strokeStyle = '#cbd5e1'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; rr(ctx, x - g.tw / 2, y - g.th / 2, g.tw, g.th, 10); ctx.stroke(); ctx.setLineDash([]); }); }); });
      TK.forEach((t, i) => { if (S.drag !== t[0]) D.tok(ctx, g, t, S.px[t[0]] || D.tray(g, i)[0], S.py[t[0]] || D.tray(g, i)[1], S.done[t[0]], S.sel === t[0]); });
      const dt = TK.find(t => t[0] === S.drag); if (dt) D.tok(ctx, g, dt, S.px[dt[0]], S.py[dt[0]], 1, 0);
      Q33.T(ctx, S.msg, (g.bx0 + g.bx1) / 2, g.by + 182, { s: 12.5, w: 900, c: '#fff', bg: S.ok > 0 ? '#047857' : S.ok < 0 ? '#b91c1c' : '#475569' });
      if (S.qa) { const q = QA[S.qa]; Q38.card(ctx, S, q[1].map(t => ({ t, c: '#0f172a' })), { title: q[0], wd: 310, y: 64 }); }
      else { const t = TK.find(q => q[0] === S.sel), m = t[4], lv = ['لا', 'قليل', 'متوسط', 'كثير'];
        const hc = Q38.card(ctx, S, [{ t: 'صنّف المصادر: ' + nd + ' من 8', c: '#047857', w: 900 }, { t: 'الأسباب: لا تستنفد، نظيفة، متاحة محلياً، كلفتها قليلة.', c: '#334155' }], { title: 'متجددة أم غير متجددة؟', wd: 310, y: 64 });
        if (S.p.cmp) Q38.panel(ctx, w - 12, 64 + hc + 8, 310, [['المصدر', t[1]], ['يتجدد؟', m[0] ? 'نعم' : 'لا، يستنفد', m[0] ? '#047857' : '#b91c1c'], ['التلوث', lv[m[1]], m[1] > 1 ? '#b91c1c' : '#047857'], ['متاح محلياً', lv[m[2]]], ['كلفة إنتاج الطاقة', m[3] > 1 ? 'قليلة' : 'أعلى', m[3] > 1 ? '#047857' : '#b91c1c']], { lh: 22 }); }
      Q38.drawChips(ctx, D.chips(S, g)); Q38.banner(ctx, w, 'اسحب البطاقات إلى الصندوق الصحيح، واضغط بطاقة للمقارنة');
    },
    drop(S2, id) { const g = D.geo(S2), t = TK.find(q => q[0] === id), x = S2.dx, y = S2.dy; S2.drag = ''; S2.sel = id; if (y < g.by - 40) return;
      const k = x > (g.bx0 + g.bx1) / 2 ? 'n' : 'r'; if (k === t[2]) { S2.done = Object.assign({}, S2.done, { [id]: 1 }); S2.ok = 1; S2.msg = '✔ ' + t[1] + ': ' + BN[k][0]; } else { S2.ok = -1; S2.msg = '✘ ' + t[1] + ' ليس من ' + BN[k][0]; } },
    chips(S, g) { return Q38.chips(S, 'qa', [['q2', 'س2: لوح الزجاج'], ['q3', 'س3: لماذا المتجددة؟'], ['q4', 'س4: مبدأ العمل']], g.h - 84, S.qa, (S2, k) => { S2.qa = S2.qa === k ? '' : k; }, { bw: 190 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return TK.map((t, i) => { const x = S.px[t[0]] != null ? S.px[t[0]] : D.tray(g, i)[0], y = S.py[t[0]] != null ? S.py[t[0]] : D.tray(g, i)[1];
        return { id: 'tk_' + t[0], x, y, w: g.tw, h: g.th, axis: 'xy', keep: true, tip: 'اسحب البطاقة أو اضغطها للمقارنة', idle: i ? undefined : 'اسحب البطاقة ✋', hint: i ? false : undefined,
          down: () => { S.drag = t[0]; S.dx = x; S.dy = y; S.sel = t[0]; S.qa = ''; }, drag: (S2, d) => { S2.drag = t[0]; S2.dx = d.x; S2.dy = d.y; }, up: S2 => { D.drop(S2, t[0]); } }; }).concat(D.chips(S, g)); },
    readings(S) { return [rd('البطاقات الصحيحة', TK.filter(t => S.done[t[0]]).length + ' من 8'), rd('آخر نتيجة', S.msg)]; },
    explain(S) { return Q26.ex('المصادر غير المتجددة: الفحم والنفط والغاز الطبيعي واليورانيوم؛ والمتجددة: الشمس والرياح والمد والجزر والوقود الحيوي.', 'المصادر غير المتجددة يتناقص احتياطيها لأن معدل تكونها أقل بكثير من معدل استهلاكها، والوقود الأحفوري يلوث البيئة عند احتراقه. أما المتجددة فلا تستنفد، ونظيفة، ويمكن أن تكون متاحة محلياً، وكلفة إنتاج الطاقة منها قليلة.', 'العراق غني بأشعة الشمس، فالخلايا الشمسية والسخانات الشمسية مناسبة جداً لنا.'); }
  };
  M8.P[D.id] = D;
})();
/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g9_en_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f && !D._ax) { D._ax = 1; D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); } });
Object.keys(M8.P).filter(id => /^g9_en_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* =============== تجارب الفصل الثامن (تكنولوجيا مصادر الطاقة) =============== */
const M98 = M => M8.merge(Object.assign({ ch: 38, reg: X9 }, M));
M98({ id: 'g9_c8_life', sec: '1-8 الطاقة في حياتنا + 2-8 المصادر الحالية للطاقة', page: 149, kind: 'نشاط', fig: 'الشكلان 1 و 2 + مخطط ص 150',
  title: 'الطاقة في حياتنا: صورها وتحولاتها ومصادرها الحالية',
  desc: 'نشغل أجهزة منزلية ونرى إلى أي صور تتحول الطاقة الكهربائية فيها ونقيس الطاقة بالجول، ثم نصنف مصادر الطاقة الحالية في العالم إلى أحفورية ومائية ونووية.',
  tags: 'الطاقة صور الطاقة تحول الطاقة الجول المصادر الحالية أحفورية مائية نووية',
  fact: ['ص 149: للطاقة صور متعددة: الضوء والحرارة والصوت والطاقة الميكانيكية والكيميائية والنووية، ويمكن تحويلها إلى طاقة كهربائية.', 'ص 150: الطاقة هي المقدرة على إنجاز شغل، وأهم وحداتها الجول.', 'ص 150: ما يزال بعض الناس يستعملون أخشاب الأشجار لتلبية جزء من متطلباتهم من الطاقة.'],
  quiz: [
    { q: 'الطاقة هي:', o: ['المقدرة على إنجاز شغل', 'القوة المؤثرة في الجسم', 'كمية المادة في الجسم'], a: 0, why: 'ص 150.' },
    { q: 'أهم وحدات قياس الطاقة:', o: ['الجول', 'الواط', 'النيوتن'], a: 0, why: 'ص 150: الجول (Joule).' },
    { q: 'تقسم مصادر الطاقة الحالية في العالم إلى:', o: ['أحفورية ومائية ونووية', 'شمسية ورياح ومد وجزر', 'حيوية وشمسية فقط'], a: 0, why: 'ص 150: المخطط.' },
    { q: 'المصباح الكهربائي يحول الطاقة الكهربائية إلى طاقة:', o: ['ضوئية وحرارية', 'كيميائية', 'نووية'], a: 0, why: 'معظمها يضيع حرارة.' }
  ],
  parts: [{ id: 'g9_en_forms', n: 'الطاقة في حياتنا وصورها' }, { id: 'g9_en_tree', n: 'المصادر الحالية للطاقة' }] });
M98({ id: 'g9_c8_current', sec: '1-2-8 + 2-2-8 + 3-2-8 المصادر الأحفورية والمائية والنووية', page: 151, kind: 'نشاط', fig: 'الأشكال 3–5',
  title: 'محطات الكهرباء: الوقود الأحفوري، السد، والمفاعل النووي',
  desc: 'نشغل محطة حرارية تحرق النفط أو الفحم أو الغاز ونرى احتياطي الوقود يتناقص، ونرفع الماء خلف السد ونفتح البوابة لنولد الكهرباء من طاقة الوضع، ونشطر نوى اليورانيوم 235 في تفاعل متسلسل نتحكم فيه بالقضبان، ثم نشغل محطة نووية كاملة.',
  tags: 'وقود أحفوري نفط فحم غاز محطة حرارية سد طاقة الوضع توربين مولد مفاعل نووي انشطار يورانيوم قضبان التحكم',
  fact: ['ص 151: الوقود الأحفوري من مصادر الطاقة غير المتجددة لأن معدل تكونه أقل بكثير من معدل استهلاكه.', 'ص 152: الماء خلف السد يختزن طاقة وضع تتحول إلى طاقة حركية عند سقوطه.', 'ص 152: المفاعل النووي ينتج طاقة حرارية هائلة بانشطار نوى اليورانيوم 235.'],
  quiz: [
    { q: 'الطاقة المتولدة من حركة أو سقوط المياه تدعى:', o: ['الطاقة المائية', 'الطاقة الحيوية', 'الطاقة الشمسية', 'الطاقة النووية'], a: 0, why: 'س1-6 ص 160.' },
    { q: 'الوقود المستعمل في المفاعلات النووية هو:', o: ['اليورانيوم', 'الكادميوم', 'الراديوم', 'الثوريوم'], a: 0, why: 'س1-5 ص 160: اليورانيوم 235.' },
    { q: 'تتكون مصادر الطاقة الأحفورية أساساً من عنصري:', o: ['الكاربون والهيدروجين', 'الأوكسجين والنتروجين', 'الحديد والكبريت'], a: 0, why: 'ص 151: مواد هيدروكاربونية.' },
    { q: 'في المحطة الحرارية يدير البخار:', o: ['التوربين المتصل بالمولد', 'المرجل', 'المدخنة'], a: 0, why: 'ص 151.' },
    { q: 'وظيفة قضبان التحكم في المفاعل النووي:', o: ['امتصاص النيوترونات للتحكم في الانشطار', 'تسخين الماء', 'توليد الكهرباء مباشرة'], a: 0, why: 'تبطئ التفاعل المتسلسل.' }
  ],
  parts: [{ id: 'g9_en_plant', n: 'الوقود الأحفوري: المحطة الحرارية واستعمالاته' }, { id: 'g9_en_dam', n: 'المحطة الكهرومائية — الشكل 4' }, { id: 'g9_en_fission', n: 'الانشطار النووي والتفاعل المتسلسل' }, { id: 'g9_en_reactor', n: 'محطة الطاقة النووية — الشكل 5' }] });
M98({ id: 'g9_c8_solar', sec: '3-8 المصادر البديلة + 1-3-8 تكنولوجيا الطاقة الشمسية', page: 153, kind: 'نشاط', fig: 'الأشكال 6–10',
  title: 'الطاقة الشمسية: الخلايا الشمسية، السخان الشمسي، المرايا، والمقطر الشمسي',
  desc: 'نوجه لوح الخلايا الشمسية نحو الشمس ونشغل مضخة بئر، ونقارن سخاناً شمسياً أسود بآخر لامع، ونجمع الأشعة في بؤرة مرآة قطع مكافئ، ونحلي الماء المالح بالمقطر الشمسي.',
  tags: 'الطاقة الشمسية الخلية الشمسية السخان الشمسي المرايا قطع مكافئ البؤرة تحلية المياه المقطر الشمسي متجددة',
  fact: ['ص 154: الطاقة الشمسية مصدر الحياة على الأرض والمصدر المباشر وغير المباشر لمختلف أنواع الطاقات.', 'ص 155: تغطى الخلية الشمسية بلوح زجاجي لحمايتها من التأثيرات الجوية.', 'ص 155: تطلى صفائح السخانات الشمسية بأكاسيد الكروم والكوبلت السوداء.', 'ص 156 هل تعلم: تستثمر الكهرباء من الخلايا الشمسية لرفع مياه الآبار.'],
  quiz: [
    { q: 'الخلية الشمسية تحول الطاقة:', o: ['الضوئية إلى طاقة كهربائية', 'الحرارية إلى طاقة كهربائية', 'الحرارية إلى طاقة ضوئية', 'الشمسية إلى طاقة ضوئية'], a: 0, why: 'س1-3 ص 160.' },
    { q: 'أي الأمثلة الآتية من مصادر الطاقة المتجددة:', o: ['طاقة الخلايا الشمسية', 'الغاز الطبيعي', 'النفط', 'الطاقة النووية'], a: 0, why: 'س1-2 ص 160.' },
    { q: 'تطلى صفائح السخان الشمسي باللون الأسود لكي:', o: ['تمتص أكبر كمية من الأشعة الشمسية', 'تعكس الأشعة', 'لا تصدأ فقط'], a: 0, why: 'ص 155.' },
    { q: 'المرآة بشكل قطع مكافئ تجمع الأشعة الموازية لمحورها في:', o: ['البؤرة', 'مركز التكور', 'قطب المرآة'], a: 0, why: 'ص 156 الشكل 9.' },
    { q: 'في المقطر الشمسي يتكثف بخار الماء على:', o: ['الغطاء الزجاجي', 'الصفيحة السوداء', 'الطبقة الخاصة'], a: 0, why: 'ص 156 الشكل 10.' }
  ],
  parts: [{ id: 'g9_en_solarcell', n: 'الخلية الشمسية ومضخة البئر' }, { id: 'g9_en_heater', n: 'السخان الشمسي: أسود أم لامع؟' }, { id: 'g9_en_mirror', n: 'المرايا بشكل قطع مكافئ — الشكل 9' }, { id: 'g9_en_still', n: 'تحلية المياه: المقطر الشمسي — الشكل 10' }] });
M98({ id: 'g9_c8_renew', sec: '2-3-8 + 3-3-8 + 4-3-8 الرياح والوقود الحيوي والمد والجزر', page: 157, kind: 'نشاط', fig: 'الأشكال 11–15',
  title: 'طاقة الرياح والوقود الحيوي وطاقة المد والجزر',
  desc: 'نغير سرعة الرياح والموقع ونراقب قدرة التوربين والطاحونة، وننتج الإيثانول والديزل الحيوي وغاز الميثان من المحاصيل والمخلفات، ونولد الكهرباء من فرق منسوب البحر وقت المد والجزر.',
  tags: 'طاقة الرياح توربين طاحونة هوائية 5.4 m/s الوقود الحيوي إيثانول ديزل حيوي ميثان المد والجزر مولد طافٍ',
  fact: ['ص 157: الرياح سريعة في المناطق الساحلية والصحراوية، ويجب ألا تقل سرعتها عن 5.4 m/s.', 'ص 157: الوقود الحيوي من أهم مصادر الطاقة المتجددة، ويتصدر الوقود السائل إنتاجه.', 'ص 158 هل تعلم: غاز الميثان ينتج بالهضم اللاهوائي للمخلفات والنفايات.', 'ص 159: يرتفع منسوب الماء وقت المد وينخفض وقت الجزر.'],
  quiz: [
    { q: 'المولدات الطافية تستعمل في البحر لغرض توليد:', o: ['طاقة المد والجزر', 'طاقة الهيدروجين', 'طاقة الرياح', 'الطاقة الشمسية'], a: 0, why: 'س1-4 ص 160.' },
    { q: 'يجب ألا تقل سرعة الرياح المستثمرة في توليد الكهرباء عن:', o: ['5.4 m/s', '0.5 m/s', '54 m/s'], a: 0, why: 'ص 157.' },
    { q: 'يستخرج وقود الإيثانول من:', o: ['قصب السكر والذرة والتمر والبطاطا الحلوة', 'فول الصويا وعباد الشمس', 'الفحم الحجري'], a: 0, why: 'ص 158.' },
    { q: 'يستخرج الديزل الحيوي من:', o: ['النباتات الحاوية على الزيوت', 'مخلفات الحيوانات', 'قصب السكر'], a: 0, why: 'ص 158: فول الصويا وزيت النخيل وعباد الشمس.' },
    { q: 'تتولد الكهرباء من المد والجزر بسبب:', o: ['فرق منسوب الماء وحركته', 'ملوحة ماء البحر', 'حرارة ماء البحر'], a: 0, why: 'ص 159.' }
  ],
  parts: [{ id: 'g9_en_wind', n: 'طاقة الرياح — الشكلان 11 و 12' }, { id: 'g9_en_bio', n: 'الوقود الحيوي — الشكلان 13 و 14' }, { id: 'g9_en_tide', n: 'طاقة المد والجزر — الشكل 15' }] });
M98({ id: 'g9_c8_review', sec: 'أسئلة الفصل الثامن', page: 160, kind: 'نشاط', fig: 'ص 153 و 160',
  title: 'أسئلة الفصل: متجددة أم غير متجددة؟',
  desc: 'نصنف مصادر الطاقة إلى متجددة وغير متجددة ونقارن بينها، ونعرض إجابات أسئلة الفصل: فائدة لوح الزجاج، وأسباب تفضيل الطاقة المتجددة، ومبدأ عمل الخلايا الشمسية وطاقة الرياح.',
  tags: 'أسئلة الفصل الثامن متجددة غير متجددة تصنيف أسباب التفضيل',
  fact: ['ص 153: تفضل الطاقة المتجددة لأنها لا تستنفد، ونظيفة، ويمكن أن تكون متاحة محلياً، وكلفة إنتاجها قليلة.', 'ص 153: أهم المصادر المتجددة: الشمسية، الرياح، الوقود الحيوي، المد والجزر.'],
  quiz: [
    { q: 'من مصادر الطاقة غير المتجددة:', o: ['طاقة الفحم الحجري', 'طاقة المد والجزر', 'طاقة الرياح', 'طاقة الهيدروجين'], a: 0, why: 'س1-1 ص 160.' },
    { q: 'من أسباب تفضيل الطاقة المتجددة:', o: ['لا تستنفد ونظيفة غير ملوثة', 'تنتج غازات ضارة', 'غير متاحة محلياً'], a: 0, why: 'س3 ص 160 وص 153.' },
    { q: 'يوضع لوح زجاجي على الخلية الشمسية لكي:', o: ['يحميها من التأثيرات الجوية', 'يزيد ملوحة الماء', 'يعكس الضوء كله'], a: 0, why: 'س2 ص 160 وص 155.' },
    { q: 'مبدأ عمل تكنولوجيا طاقة الرياح:', o: ['الرياح تدير مروحة متصلة بمولد كهربائي', 'الرياح تسخن الماء', 'الرياح تشطر النوى'], a: 0, why: 'س4 ص 160 وص 157.' }
  ],
  parts: [{ id: 'g9_en_sort', n: 'تصنيف المصادر وأسئلة الفصل' }] });
