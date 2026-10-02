'use strict';
/* ====== الأول المتوسط — الفصل الأول (إضافات): معرض أمثلة متحركة للتغير الفيزيائي والكيميائي (g7_changes) ====== */
(() => {
  const E = EXPS.find(e => e.id === 'g7_changes'); if (!E) return;
  const mix = (a, b, p) => { p = clamp(p, 0, 1); const A = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), B = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16)); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * p).toString(16).padStart(2, '0')).join(''); };
  const sm = p => { p = clamp(p, 0, 1); return p * p * (3 - 2 * p); };
  /* [key, name, icon, chem?, new substance?, reversible?] */
  const EX = [
    ['egg', 'سلق البيض', '🥚', 1, 'نعم — يتصلب بياض البيض ويتغير تركيبه', 'لا — لا تعود البيضة المسلوقة نيئة'],
    ['tooth', 'تسوس الأسنان', '🦷', 1, 'نعم — أحماض البكتيريا تتفاعل مع مادة السن', 'لا — الجزء المتسوس لا يعود سليماً'],
    ['ice', 'انصهار الثلج', '🧊', 0, 'لا — الماء يبقى ماءً، تغيرت حالته فقط', 'نعم — بالتجميد يعود ثلجاً'],
    ['sugar', 'ذوبان السكر في الماء', '🍬', 0, 'لا — جزيئات السكر تنتشر بين جزيئات الماء', 'نعم — بتبخير الماء يعود السكر'],
    ['crush', 'سحق وطرق المواد', '🔨', 0, 'لا — تغيّر الشكل فقط والمادة هي نفسها', 'المادة نفسها — يمكن صهرها وتشكيلها ثانية'],
    ['wood', 'حرق الخشب', '🪵', 1, 'نعم — رماد ودخان وغازات مع حرارة وضوء', 'لا — لا يعود الرماد خشباً'],
    ['caramel', 'حرق السكر', '🍮', 1, 'نعم — كراميل بني ثم فحم أسود وبخار ماء', 'لا — لا يعود السكر المحروق أبيض'],
    ['apple', 'تغيّر لون قطع الفاكهة', '🍎', 1, 'نعم — مادة بنية من تفاعلها مع أوكسجين الهواء', 'لا — لا يعود لونها الأبيض'],
    ['rot', 'تعفن الفاكهة', '🍌', 1, 'نعم — مواد جديدة لها لون ورائحة وطعم مختلفة', 'لا — لا تعود الفاكهة طازجة']];
  const VC = ['#2563eb', '#ea580c'], VN = ['تغير فيزيائي', 'تغير كيميائي'];

  /* ---------- the animations: drawn in a 120×90 box centred at (0,0), p = 0 (before) … 1 (after), t = time ---------- */
  const flame = (ctx, x, y, s, t) => { const f = 1 + .12 * Math.sin(t * 19) + .08 * Math.sin(t * 31); const gr = ctx.createRadialGradient(x, y - 6 * s, 1, x, y - 6 * s, 14 * s * f); gr.addColorStop(0, '#fff7cc'); gr.addColorStop(.4, '#fbbf24'); gr.addColorStop(1, 'rgba(249,115,22,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x, y - 18 * s * f); ctx.bezierCurveTo(x + 8 * s, y - 8 * s, x + 7 * s, y, x, y + 1); ctx.bezierCurveTo(x - 7 * s, y, x - 8 * s, y - 8 * s, x, y - 18 * s * f); ctx.fill(); };
  const puff = (ctx, x, y, r, a) => { ctx.fillStyle = `rgba(100,116,139,${a})`; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); };
  const A = {
    egg(ctx, p, t) {
      // pot with boiling water + flame
      ctx.fillStyle = '#94a3b8'; rr(ctx, -56, -6, 50, 38, 6); ctx.fill(); ctx.fillStyle = '#64748b'; ctx.fillRect(-62, -8, 62, 6);
      ctx.fillStyle = '#7dd3fc'; ctx.fillRect(-52, -2, 42, 8);
      for (let i = 0; i < 5; i++) { const a = (t * 1.6 + i * .21) % 1; ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(-48 + i * 8, 4 - a * 14, 2 + a * 1.5, 0, TAU); ctx.fill(); }
      for (let i = 0; i < 3; i++) { const a = (t * .7 + i * .33) % 1; puff(ctx, -38 + i * 8 + Math.sin(t * 2 + i) * 4, -14 - a * 26, 4 + a * 6, .35 * (1 - a)); }
      flame(ctx, -40, 44, .7, t); flame(ctx, -24, 44, .7, t + 1);
      // egg cut in half on a plate: the white turns from clear to solid white
      ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.ellipse(32, 34, 30, 7, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.globalAlpha = .45 + .55 * p; ctx.fillStyle = mix('#cfe8ff', '#ffffff', p); ctx.beginPath(); ctx.ellipse(32, 16, 24 - 4 * p, 16 - 2 * p, 0, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = mix('#93c5fd', '#cbd5e1', p); ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = mix('#f59e0b', '#fcd34d', p); ctx.beginPath(); ctx.arc(32, 17, 8.5, 0, TAU); ctx.fill();
      if (p < .3) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.ellipse(26, 10, 5, 2.5, -.4, 0, TAU); ctx.fill(); }
    },
    tooth(ctx, p, t) {
      ctx.translate(0, 5);
      const path = () => { ctx.beginPath(); ctx.moveTo(-30, -18); ctx.bezierCurveTo(-34, -42, -10, -44, 0, -34); ctx.bezierCurveTo(10, -44, 34, -42, 30, -18); ctx.bezierCurveTo(28, 0, 24, 8, 20, 30); ctx.bezierCurveTo(18, 42, 8, 42, 7, 28); ctx.lineTo(4, 10); ctx.lineTo(-4, 10); ctx.lineTo(-7, 28); ctx.bezierCurveTo(-8, 42, -18, 42, -20, 30); ctx.bezierCurveTo(-24, 8, -28, 0, -30, -18); ctx.closePath(); };
      path(); ctx.fillStyle = mix('#ffffff', '#fef3c7', p * .6); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke();
      ctx.save(); path(); ctx.clip();
      ctx.fillStyle = mix('#fde68a', '#78350f', p); ctx.globalAlpha = sm(p * 1.5); ctx.beginPath(); ctx.ellipse(8, -30, 4 + 9 * p, 3 + 8 * p, .3, 0, TAU); ctx.fill();
      ctx.fillStyle = '#1c1917'; ctx.globalAlpha = sm((p - .35) * 1.6); ctx.beginPath(); ctx.ellipse(9, -31, 2 + 6 * p, 2 + 5 * p, .3, 0, TAU); ctx.fill();
      ctx.fillStyle = '#92400e'; ctx.globalAlpha = sm((p - .5) * 2); ctx.beginPath(); ctx.arc(-14, -26, 4, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; ctx.restore();
      ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.ellipse(-16, -30, 6, 3, -.4, 0, TAU); ctx.fill();
      // bacteria + acid around the tooth
      const n = Math.round(2 + 7 * p); for (let i = 0; i < n; i++) { const a = i * 2.4 + t * .8, r = 40 + 6 * Math.sin(t * 2 + i); const x = Math.cos(a) * r * 1.2, y = -26 + Math.sin(a) * r * .5; ctx.fillStyle = '#16a34a'; ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0, 0, 5, 2.6, 0, 0, TAU); ctx.fill(); ctx.restore(); }
      if (p > .2) { ctx.fillStyle = '#dc2626'; ctx.font = '800 9px ui-monospace,monospace'; ctx.textAlign = 'center'; for (let i = 0; i < 3; i++) { const a = (t * .9 + i / 3) % 1; ctx.globalAlpha = 1 - a; ctx.fillText('H⁺', 22 - i * 12, -44 + a * 16); } ctx.globalAlpha = 1; }
    },
    ice(ctx, p, t) {
      // heat (sun) + plate + shrinking cube + growing puddle
      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(44, -30, 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; for (let i = 0; i < 8; i++) { const a = i * TAU / 8 + t * .5; ctx.beginPath(); ctx.moveTo(44 + Math.cos(a) * 12, -30 + Math.sin(a) * 12); ctx.lineTo(44 + Math.cos(a) * 17, -30 + Math.sin(a) * 17); ctx.stroke(); }
      ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.ellipse(-4, 34, 46, 8, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(56,189,248,.55)'; ctx.beginPath(); ctx.ellipse(-4, 32, 8 + 36 * p, 3 + 4 * p, 0, 0, TAU); ctx.fill();
      const s = 34 * (1 - .82 * p); if (s > 2) { const x = -4 - s / 2, y = 31 - s; const gr = ctx.createLinearGradient(x, y, x + s, y + s); gr.addColorStop(0, '#f0f9ff'); gr.addColorStop(1, '#7dd3fc'); ctx.fillStyle = gr; rr(ctx, x, y, s, s, 3 + s * .12); ctx.fill(); ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x + s * .15, y + s * .15, s * .2, s * .5);
        if (p > .05 && p < .95) { const a = (t * 1.5) % 1; ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(x + s + 2, y + s * .5 + a * s * .5, 2.2, 0, TAU); ctx.fill(); } }
    },
    sugar(ctx, p, t) {
      // glass of water, a sugar cube that falls, shrinks and spreads as tiny particles; a spoon stirs
      ctx.fillStyle = 'rgba(186,230,253,.55)'; ctx.fillRect(-28, -22, 56, 60); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-30, -36); ctx.lineTo(-28, 40); ctx.lineTo(28, 40); ctx.lineTo(30, -36); ctx.stroke();
      ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-28, -22); ctx.lineTo(28, -22); ctx.stroke();
      const fall = sm(p * 4), cy = lerp(-50, 30, fall), s = 16 * (1 - sm((p - .2) / .7));
      if (s > .6) { ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.2; rr(ctx, -6 - s / 2, cy - s, s, s, 2); ctx.fill(); ctx.stroke(); }
      const R = C1.rng(11), n = Math.round(46 * sm((p - .2) / .7)); for (let i = 0; i < n; i++) { const tx = -24 + R() * 48, ty = -18 + R() * 54, k = sm((p - .2) / .8); const x = lerp(-6, tx, k) + Math.sin(t * 3 + i) * 1.2, y = lerp(30, ty, k); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = .6; ctx.beginPath(); ctx.arc(x, y, 1.7, 0, TAU); ctx.fill(); ctx.stroke(); }
      if (p > .25) { const a = Math.sin(t * 5) * .35; ctx.save(); ctx.translate(8, -46); ctx.rotate(a); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 64); ctx.stroke(); ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.ellipse(0, 66, 4, 6, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    },
    crush(ctx, p, t) {
      // anvil + metal piece flattened by a hammer; on the right a piece of chalk crushed to powder
      ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.moveTo(-50, 20); ctx.lineTo(-6, 20); ctx.lineTo(-12, 28); ctx.lineTo(-18, 28); ctx.lineTo(-18, 40); ctx.lineTo(-38, 40); ctx.lineTo(-38, 28); ctx.lineTo(-44, 28); ctx.closePath(); ctx.fill();
      const w = 12 + 16 * p, hh = 13 - 9 * p; const mg = ctx.createLinearGradient(-28 - w, 20 - hh, -28 + w, 20); mg.addColorStop(0, '#e2e8f0'); mg.addColorStop(1, '#94a3b8'); ctx.fillStyle = mg; ctx.beginPath(); ctx.ellipse(-28, 20 - hh, w, hh, 0, Math.PI, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.stroke();
      const ph = (t * 1.6) % 1, sw = p > 0 && p < 1 ? Math.max(0, Math.sin(ph * Math.PI)) : .3, hit = p > 0 && p < 1 && ph < .12;
      ctx.save(); ctx.translate(-2, -36); ctx.rotate(-.2 - .9 * sw); ctx.fillStyle = '#a16207'; ctx.fillRect(-3, 0, 6, 44); ctx.fillStyle = '#475569'; rr(ctx, -16, -4, 32, 13, 3); ctx.fill(); ctx.restore();
      if (hit) { ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { const a = -Math.PI + i * .7 + .2; ctx.beginPath(); ctx.moveTo(-28 + Math.cos(a) * 10, 8 + Math.sin(a) * 8); ctx.lineTo(-28 + Math.cos(a) * 18, 8 + Math.sin(a) * 14); ctx.stroke(); } }
      // chalk: whole stick → pieces → powder
      const R = C1.rng(5); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1;
      if (p < .3) { rr(ctx, 18, 26, 34, 10, 4); ctx.fill(); ctx.stroke(); }
      else if (p < .65) for (let i = 0; i < 5; i++) { rr(ctx, 16 + i * 8 + R() * 3, 28 + R() * 4, 6 + R() * 3, 6, 2); ctx.fill(); ctx.stroke(); }
      else { ctx.beginPath(); ctx.ellipse(35, 36, 22, 5, 0, Math.PI, TAU); ctx.fill(); ctx.stroke(); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(16 + R() * 38, 30 + R() * 6, 1.2, 0, TAU); ctx.fill(); } }
    },
    wood(ctx, p, t) {
      const k = 1 - .65 * sm(p), c = mix('#92400e', '#1c1917', sm(p * 1.2));
      // ash pile
      ctx.fillStyle = mix('#cbd5e1', '#9ca3af', p); ctx.beginPath(); ctx.ellipse(0, 38, 8 + 34 * sm(p), 2 + 8 * sm(p), 0, Math.PI, TAU); ctx.fill();
      // two crossed logs that shrink and blacken
      [[-.35, -1], [.35, 1]].forEach(([a, sd]) => { ctx.save(); ctx.translate(sd * 4, 30); ctx.rotate(a); ctx.fillStyle = c; rr(ctx, -34 * k, -6 * k, 68 * k, 12 * k, 6 * k); ctx.fill(); ctx.fillStyle = mix('#d6a86a', '#292524', sm(p * 1.2)); ctx.beginPath(); ctx.ellipse(34 * k * sd, 0, 4 * k, 6 * k, 0, 0, TAU); ctx.fill(); ctx.restore(); });
      if (p > .03 && p < .97) { const fs = 1.1 * Math.sin(Math.PI * clamp(p * 1.05, 0, 1)) + .3; for (let i = -1; i <= 1; i++) flame(ctx, i * 12, 26, fs * (i ? .8 : 1.15), t + i); }
      for (let i = 0; i < 4; i++) { const a = (t * .5 + i * .25) % 1; if (p > .05) puff(ctx, Math.sin(t + i * 2) * 8 + i * 4 - 6, 6 - a * 50, 4 + a * 9, .35 * (1 - a) * Math.min(1, p * 3)); }
    },
    caramel(ctx, p, t) {
      // pan on a flame: white crystals → golden liquid → brown caramel → black, with smoke
      flame(ctx, -12, 42, .8, t); flame(ctx, 6, 42, .8, t + 1);
      ctx.fillStyle = '#334155'; ctx.fillRect(28, 12, 34, 5); ctx.beginPath(); ctx.ellipse(-4, 20, 36, 10, 0, 0, Math.PI); ctx.fill(); ctx.fillRect(-40, 12, 72, 8);
      const col = p < .3 ? '#ffffff' : p < .55 ? mix('#fde68a', '#d97706', (p - .3) / .25) : mix('#b45309', '#1c1917', (p - .55) / .45);
      if (p < .3) { const R = C1.rng(2); for (let i = 0; i < 26; i++) { ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = .7; const x = -34 + R() * 60, y = 6 + R() * 7; ctx.fillRect(x, y, 4, 4); ctx.strokeRect(x, y, 4, 4); } }
      else { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(-4, 13, 33, 6, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(-14, 11, 8, 2, 0, 0, TAU); ctx.fill(); for (let i = 0; i < 3; i++) { const a = (t * 1.3 + i * .33) % 1; ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(-20 + i * 16, 13, 1 + a * 3, 0, TAU); ctx.stroke(); } }
      if (p > .5) for (let i = 0; i < 4; i++) { const a = (t * .6 + i * .25) % 1; puff(ctx, -10 + i * 7 + Math.sin(t * 2 + i) * 5, 2 - a * 46, 4 + a * 8, (.25 + .4 * (p - .5)) * (1 - a)); }
    },
    apple(ctx, p, t) {
      // two apple slices: flesh turns brown; O₂ molecules from the air reach the cut surface
      [[-26, -.2], [26, .2]].forEach(([x, a]) => { ctx.save(); ctx.translate(x, 14); ctx.rotate(a); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.ellipse(0, 0, 25, 22, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = mix('#fefce8', '#b7793f', sm(p)); ctx.beginPath(); ctx.ellipse(0, 0, 22, 19, 0, 0, TAU); ctx.fill();
        if (p > .2) { ctx.fillStyle = 'rgba(120,53,15,' + (.35 * sm(p)) + ')'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(Math.cos(i) * 12, Math.sin(i * 2) * 10, 3 + 2 * p, 0, TAU); ctx.fill(); } }
        ctx.strokeStyle = mix('#d9f99d', '#92400e', p); ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(0, 0, 9, 11, 0, 0, TAU); ctx.stroke();
        ctx.fillStyle = '#3f2a14'; [[-3, -3], [3, -3], [0, 4]].forEach(([u, v]) => { ctx.beginPath(); ctx.ellipse(u, v, 1.6, 2.6, u * .2, 0, TAU); ctx.fill(); }); ctx.restore(); });
      for (let i = 0; i < 4; i++) { const a = (t * .45 + i * .25) % 1, x = -40 + i * 26 + Math.sin(t + i) * 4, y = -46 + a * 30; ctx.globalAlpha = Math.min(1, (1 - a) * 2) * (p > 0 && p < 1 ? 1 : .4); K.ball(ctx, x - 3.5, y, 3.6, '#ef4444'); K.ball(ctx, x + 3.5, y, 3.6, '#ef4444'); ctx.globalAlpha = 1; }
      ctx.fillStyle = '#b91c1c'; ctx.font = '800 9px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.fillText('O₂', 48, -42);
    },
    rot(ctx, p, t) {
      // a banana: yellow → brown spots → dark & shrivelled with mould, and a fly
      const k = 1 - .1 * sm(p), body = mix('#facc15', '#7c4a1e', sm((p - .15) / .8));
      ctx.save(); ctx.scale(k, k); ctx.fillStyle = body; ctx.strokeStyle = mix('#a16207', '#3f2a14', p); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-46, -6); ctx.quadraticCurveTo(-10, 40, 46, -10); ctx.quadraticCurveTo(44, -2, 40, 0); ctx.quadraticCurveTo(-8, 26, -40, -10); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#3f2a14'; ctx.fillRect(43, -16, 6, 8); ctx.beginPath(); ctx.arc(-44, -8, 3, 0, TAU); ctx.fill();
      const R = C1.rng(8), n = Math.round(14 * sm(p * 1.3)); for (let i = 0; i < n; i++) { const u = R(), x = lerp(-38, 38, u), y = 12 * Math.sin(u * Math.PI) - 2 + (R() - .5) * 8; ctx.fillStyle = 'rgba(63,42,20,.85)'; ctx.beginPath(); ctx.arc(x, y, 1.5 + R() * 2.5 * p, 0, TAU); ctx.fill(); }
      if (p > .55) { const m = sm((p - .55) / .45); for (let i = 0; i < 5; i++) { const x = -26 + i * 13, y = 12 * Math.sin((x + 38) / 76 * Math.PI) - 4; ctx.fillStyle = `rgba(187,247,208,${.9 * m})`; ctx.beginPath(); ctx.arc(x, y, 3 + 4 * m, 0, TAU); ctx.fill(); ctx.fillStyle = `rgba(34,197,94,${.7 * m})`; ctx.beginPath(); ctx.arc(x + 1, y + 1, 1.5 + 2 * m, 0, TAU); ctx.fill(); } }
      ctx.restore();
      if (p > .45) { const a = t * 3, x = Math.cos(a) * 34, y = -30 + Math.sin(a * 2) * 8; ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.ellipse(x, y, 4, 2.6, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(148,163,184,.8)'; ctx.beginPath(); ctx.ellipse(x - 1, y - 3, 3, 1.6, -.5 + Math.sin(t * 40) * .4, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + 2, y - 3, 3, 1.6, .5 - Math.sin(t * 40) * .4, 0, TAU); ctx.fill(); }
    }
  };
  const anim = (ctx, k, cx, cy, s, p, t) => K.raw(ctx, () => { ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; A[k](ctx, p, t); ctx.restore(); });

  /* ---------- gallery geometry ---------- */
  const geo = S => { const w = S.W, h = S.H, x0 = 78, aw = w - x0 - 16, gap = 10; const tw = (aw - 2 * gap) / 3, th = clamp(Math.min(h * .17, (h - 84 - 52 - 214 - 32) / 3), 78, 136), gy = 52; const py = gy + 3 * (th + gap) + 2, ph = Math.max(150, h - 84 - py); const aW = clamp(aw * .36, 170, 270); return { w, h, x0, aw, gap, tw, th, gy, py, ph, aW }; };
  const tile = (g, i) => ({ x: g.x0 + g.aw - g.tw / 2 - (i % 3) * (g.tw + g.gap), y: g.gy + g.th / 2 + Math.floor(i / 3) * (g.th + g.gap) });
  const tileP = (S, i) => { const tt = (S.t * .9 + i * .77) % 7; return sm((tt - .8) / 4); };
  const selP = S => S.gman != null ? S.gman : sm((S.t - (S.g0 || 0)) / 4);
  const parts = g => { const ax = g.x0 + 12 + g.aW / 2, tx0 = g.x0 + g.aW + 34, tx1 = g.x0 + g.aw - 14; return { ax, ay: g.py + (g.ph - 30) / 2 + 4, as: Math.min((g.aW - 20) / 120, (g.ph - 56) / 95), bar: { x0: ax - g.aW / 2 + 22, x1: ax + g.aW / 2 - 22, y: g.py + g.ph - 18 }, tx: (tx0 + tx1) / 2, tw: tx1 - tx0, tx0, tx1 }; };
  const btns = (g, P) => [{ v: 0, x: P.tx + P.tw / 4, y: g.py + 84 }, { v: 1, x: P.tx - P.tw / 4, y: g.py + 84 }];

  E.gallery = {
    draw(ctx, w, h, S) {
      const g = geo(S); K.bg(ctx, w, h, { benchY: h - 70 });
      G.text(ctx, 'شاهد كل مثال: قبل ← بعد. انقر عليه واحكم: فيزيائي أم كيميائي؟', g.x0 + g.aw / 2, 26, { s: 13.5, w: 900, c: '#0f172a', raw: 1 });
      EX.forEach((X, i) => { const T = tile(g, i), on = S.gsel === i, ans = S.gans[i];
        K.raw(ctx, () => { ctx.save(); if (on) { ctx.shadowColor = '#7c3aed'; ctx.shadowBlur = 16; } ctx.fillStyle = 'rgba(255,255,255,.96)'; rr(ctx, T.x - g.tw / 2, T.y - g.th / 2, g.tw, g.th, 14); ctx.fill(); ctx.restore(); ctx.strokeStyle = on ? '#7c3aed' : ans != null ? VC[X[3]] : '#cbd5e1'; ctx.lineWidth = on ? 3 : 2; rr(ctx, T.x - g.tw / 2, T.y - g.th / 2, g.tw, g.th, 14); ctx.stroke();
          ctx.save(); rr(ctx, T.x - g.tw / 2 + 2, T.y - g.th / 2 + 2, g.tw - 4, g.th - 30, 12); ctx.clip(); ctx.fillStyle = '#f8fafc'; ctx.fillRect(T.x - g.tw / 2, T.y - g.th / 2, g.tw, g.th - 28); ctx.restore(); });
        const s = Math.min((g.tw - 16) / 120, (g.th - 36) / 92); K.raw(ctx, () => { ctx.save(); rr(ctx, T.x - g.tw / 2 + 2, T.y - g.th / 2 + 2, g.tw - 4, g.th - 30, 12); ctx.clip(); anim(ctx, X[0], T.x, T.y - 14, s, on ? selP(S) : tileP(S, i), S.t); ctx.restore(); });
        G.text(ctx, X[2] + ' ' + X[1], T.x, T.y + g.th / 2 - 14, { s: 13, w: 900, c: '#0f172a', raw: 1 });
        if (ans != null) K.tag(ctx, VN[X[3]], T.x + g.tw / 2 - 46, T.y - g.th / 2 + 14, { s: 11, bg: VC[X[3]] });
        else G.text(ctx, '؟', T.x + g.tw / 2 - 16, T.y - g.th / 2 + 16, { s: 16, w: 900, c: '#7c3aed', raw: 1 }); });
      // detail panel of the selected example
      const P = parts(g), i = S.gsel, X = EX[i], ans = S.gans[i], p = selP(S);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.97)'; rr(ctx, g.x0, g.py, g.aw, g.ph, 16); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.5; ctx.stroke(); ctx.fillStyle = '#f1f5f9'; rr(ctx, g.x0 + 10, g.py + 8, g.aW, g.ph - 16, 12); ctx.fill(); });
      K.raw(ctx, () => { ctx.save(); rr(ctx, g.x0 + 10, g.py + 8, g.aW, g.ph - 16, 12); ctx.clip(); anim(ctx, X[0], P.ax, P.ay - 6, P.as, p, S.t); ctx.restore(); });
      const B = P.bar; K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, B.x0, B.y - 4, B.x1 - B.x0, 8, 4); ctx.fill(); ctx.fillStyle = '#7c3aed'; const xx = lerp(B.x1, B.x0, p); rr(ctx, xx, B.y - 4, B.x1 - xx, 8, 4); ctx.fill(); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(xx, B.y, 9, 0, TAU); ctx.fill(); ctx.stroke(); });
      G.text(ctx, 'قبل', B.x1 + 14, B.y, { s: 11.5, w: 900, c: '#334155', raw: 1 }); G.text(ctx, 'بعد', B.x0 - 14, B.y, { s: 11.5, w: 900, c: '#334155', raw: 1 });
      G.text(ctx, X[2] + ' ' + X[1], P.tx, g.py + 24, { s: 18, w: 900, c: '#4c1d95', raw: 1 });
      if (ans == null) { G.text(ctx, 'ما نوع هذا التغير؟ هل تكونت مادة جديدة؟', P.tx, g.py + 52, { s: 13.5, w: 800, c: '#334155', raw: 1 }); btns(g, P).forEach(b => C1.chip(ctx, b.x, b.y, Math.min(170, P.tw / 2 - 12), 40, (b.v ? '⚗️ ' : '💧 ') + VN[b.v], false, VC[b.v], { s: 15 })); }
      else { const ok = ans === X[3]; K.tag(ctx, (ok ? '✓ صحيح! ' : '✗ ليس كذلك — ') + 'إنه ' + VN[X[3]], P.tx, g.py + 54, { s: 15.5, bg: ok ? VC[X[3]] : '#b91c1c' });
        const rows = [['🧪 هل تكونت مادة جديدة؟', X[4]], ['↩️ هل يمكن إرجاعها كما كانت؟', X[5]]];
        rows.forEach(([q, a], k) => { const y = g.py + 88 + k * 44; G.text(ctx, q, P.tx1, y, { s: 12.5, w: 900, c: '#334155', a: 'right', raw: 1 }); G.text(ctx, a, P.tx1, y + 19, { s: 13, w: 800, c: VC[X[3]], a: 'right', raw: 1 }); });
        C1.chip(ctx, P.tx0 + 60, g.py + g.ph - 24, 110, 32, 'المثال التالي ←', false, '#7c3aed', { s: 12.5 }); }
      const nOk = EX.filter((X2, k) => S.gans[k] === X2[3]).length, nAns = EX.filter((_, k) => S.gans[k] != null).length;
      if (P.tw > 300) G.text(ctx, `أجبت ${nAns} من 9 — صحيح ${nOk}`, P.tx1 - 60, g.py + g.ph - 24, { s: 12, w: 800, c: '#475569', raw: 1 });
      if (S.gman == null && p < 1) G.text(ctx, 'اسحب الدائرة لتشاهد خطوة خطوة', P.ax, g.py + 20, { s: 11, w: 800, c: '#6d28d9', raw: 1, bg: 'rgba(255,255,255,.85)' });
      K.party(ctx, S);
    },
    drags(S) {
      const g = geo(S), P = parts(g), L = [];
      EX.forEach((X, i) => { const T = tile(g, i); L.push({ id: 'ex_' + X[0], x: T.x, y: T.y, w: g.tw, h: g.th, hint: i === 0, idle: i === 0 ? 'انقر على مثال لتراه بحجم كبير ✋' : undefined, tip: 'انقر لمشاهدة «' + X[1] + '» والحكم عليه', click: S => { S.gsel = i; S.g0 = S.t; S.gman = null; S.last = X[0]; } }); });
      const B = P.bar;
      L.push({ id: 'scrub', x: P.ax, y: P.ay, w: g.aW, h: g.ph - 16, axis: 'x', hint: false, tip: 'اسحب يميناً ويساراً: قبل ← بعد. انقر لإعادة التشغيل',
        drag: (S, d) => { S.gman = clamp((B.x1 - d.x) / (B.x1 - B.x0), 0, 1); }, click: S => { S.gman = null; S.g0 = S.t; } });
      if (S.gans[S.gsel] == null) btns(g, P).forEach(b => L.push({ id: 'ans' + b.v, x: b.x, y: b.y, w: Math.min(170, P.tw / 2 - 12), h: 44, hint: false, tip: 'حكمك: ' + VN[b.v], click: S => { const X = EX[S.gsel]; S.gans[S.gsel] = b.v; if (S.gman == null) S.g0 = Math.min(S.g0, S.t - 4); if (b.v === X[3]) { C1.good(); if (EX.every((X2, k) => S.gans[k] === X2[3])) K.cheer(S, S.W / 2, S.H * .3); } else C1.wrong(); } }));
      else L.push({ id: 'next', x: P.tx0 + 60, y: g.py + g.ph - 24, w: 120, h: 36, hint: false, tip: 'المثال التالي', click: S => { const n = EX.findIndex((_, k) => k > S.gsel && S.gans[k] == null); S.gsel = n >= 0 ? n : (S.gsel + 1) % 9; S.g0 = S.t; S.gman = null; } });
      return L;
    }
  };
  /* ---------- hook the gallery into the experiment (a 3rd activity mode) ---------- */
  const md = E.controls.find(c => c.k === 'mode'); if (md && !md.opts.some(o => o[0] === 'gallery')) md.opts.push(['gallery', '🎬 أمثلة متحركة']);
  E.steps = E.steps.concat(['اختر «🎬 أمثلة متحركة»: شاهد كل مثال (سلق البيض، تسوس الأسنان، انصهار الثلج، ذوبان السكر، سحق وطرق المواد، حرق الخشب، حرق السكر، تغير لون الفاكهة، تعفن الفاكهة) وانقر عليه، ثم احكم: فيزيائي أم كيميائي؟ واقرأ السبب.']);
  const s0 = E.setup, d0 = E.draw, g0 = E.drags, u0 = E.update, r0 = E.readings, e0 = E.explain, rec0 = E.record;
  E.setup = S => { s0(S); S.gsel = 0; S.g0 = 0; S.gman = null; S.gans = {}; };
  E.update = (S, dt) => { if (S.p.mode === 'gallery') return; return u0(S, dt); };
  E.draw = (ctx, w, h, S) => { if (S.p.mode === 'gallery') return E.gallery.draw(ctx, w, h, S); d0(ctx, w, h, S);
    if (S.p.mode === 'candle') C1.chip(ctx, 70 + (w - 70) * .5 + 20, 22, 300, 32, '🎬 شاهد أمثلة متحركة للتغيرات', false, '#7c3aed', { s: 13 }); };
  E.drags = S => { if (S.p.mode === 'gallery') return E.gallery.drags(S); const L = g0(S) || []; if (S.p.mode === 'candle') L.push({ id: 'toGallery', x: 70 + (S.W - 70) * .5 + 20, y: 22, w: 300, h: 34, hint: false, tip: 'انتقل إلى الأمثلة المتحركة', click: S => setParam(S, 'mode', 'gallery') }); return L; };
  E.readings = S => { if (S.p.mode !== 'gallery') return r0(S); const X = EX[S.gsel], a = S.gans[S.gsel]; const nOk = EX.filter((X2, k) => S.gans[k] === X2[3]).length; return [rd('المثال', X[2] + ' ' + X[1]), rd('نوع التغير', a == null ? 'احكم أولاً' : VN[X[3]]), rd('أحكام صحيحة', nOk + ' / 9'), rd('مادة جديدة؟', a == null ? '؟' : X[4], 1)]; };
  E.explain = S => { if (S.p.mode !== 'gallery') return e0(S); const X = EX[S.gsel]; if (S.gans[S.gsel] == null) return `شاهد <b>${X[1]}</b>: ماذا كان قبل؟ وماذا أصبح بعد؟ اسأل نفسك: هل تكونت <b>مادة جديدة</b>؟ وهل يمكن <b>إرجاعها</b> كما كانت؟`; return `<b>${X[1]}</b> = <b>${VN[X[3]]}</b>. مادة جديدة؟ ${X[4]}. الإرجاع؟ ${X[5]}.`; };
  E.record = S => { if (S.p.mode === 'gallery') { Runner.toast('الجدول لتجربة الشمعة', 'info'); return null; } return rec0(S); };
})();
