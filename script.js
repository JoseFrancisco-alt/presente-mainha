/* =========================================================
   CONTEÚDO — edite só aqui.
   ========================================================= */
const NOME = "mainha";
const ASSINATURA = "seu filho";
const WHATSAPP = "";   // seu número com DDI+DDD (ex.: "5582999999999"). Vazio = sem botão de resgate.
const FOTO_CAPA = "fotos/01.jpg";

// forma do quadrinho: "tall" (em pé, 2 linhas), "wide" (deitado, 2 colunas), "sq" (pequeno)
// som = onomatopeia no canto do quadrinho · pos = qual parte da foto aparece
const FOTOS = [
  { src: "fotos/01.jpg", legenda: "2014: eu, você e uma bala", som: "NHAC!", forma: "tall", pos: "50% 45%" },
  { src: "fotos/02.jpg", legenda: "6h51 e ninguém acordou", som: "ZZZ...", forma: "sq", pos: "55% 50%" },
  { src: "fotos/03.jpg", legenda: "eu de língua de fora, como sempre", som: "BLEH!", forma: "wide", pos: "50% 40%" },
  { src: "fotos/04.jpg", legenda: "a selfie da praia que deu", som: "SPLASH!", forma: "wide", pos: "60% 45%" },
  { src: "fotos/05.jpg", legenda: "guaxuma, todo mundo junto", som: "XIS!", forma: "sq", pos: "45% 50%" },
  { src: "fotos/06.jpg", legenda: "o pequeno indo pro colégio", som: "PARTIU!", forma: "tall", pos: "50% 50%" },
  { src: "fotos/07.jpg", legenda: "pé na areia", som: "UHUL!", forma: "wide", pos: "42% 40%" },
  { src: "fotos/08.jpg", legenda: "minha parceira de cabelos malucos", som: "TCHAN!", forma: "tall", pos: "50% 40%" },
];

// *palavra* entre asteriscos fica em vermelho
const CARTA = "mainha, eu não sou muito bom de falar essas coisas olhando na cara, então resolvi fazer um site. obrigado por tudo, por aguentar eu e meu irmão, por cuidar da gente até hoje. eu te amo muito, *de verdade.*";

// ícones: bolt, shield, star, heart, crown
const PODERES = [
  { texto: "resolver tudo, mesmo brava", icone: "bolt", cor: "#e5232b", tinta: "#fff" },
  { texto: "aguentar eu pequeno (e não foi fácil)", icone: "shield", cor: "#ff6fb1" },
  { texto: "mexer no meu cabelo sem eu pedir", icone: "star", cor: "#45b8f0" },
  { texto: "ser a primeira pessoa que eu quero contar tudo", icone: "heart", cor: "#ffd23f" },
  { texto: "ser mãe. não precisa de motivo", icone: "crown", cor: "#7ed957" },
];

// capa: foto do pacote de verdade (ex.: "fotos/pacote.jpg"). Vazio = pacote desenhado.
const PACOTES = [
  {
    capa: "", sabor: "azedinhas", cores: ["#e5232b", "#ff7a3d"], sombra: "#ff6fb1", giro: -2,
    vale: "1 tattoo", extra: "grátis", cor: "#e5232b",
    desc: "você escolhe o desenho e o lugar. eu pago.",
    rodape: "nº 001 · só vale pra você",
  },
  {
    capa: "", sabor: "docinhas", cores: ["#45b8f0", "#7ed957"], sombra: "#45b8f0", giro: 2,
    vale: "1 pedido", extra: "na Renner", cor: "#e5232b",
    desc: "escolhe o que quiser lá que eu pago. (sem exagerar kkkk)",
    rodape: "nº 002 · vale até você usar",
  },
];

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const params = new URLSearchParams(location.search);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
// aparelho fraco: menos enfeite, mesma página
const lite = reduce || (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 && innerWidth < 800);
if (lite) document.documentElement.classList.add("lite");
const G = !!(window.gsap && window.ScrollTrigger) && !reduce;   // sem internet ou "reduzir movimento": a página funciona sem GSAP
if (!G) document.documentElement.classList.add("no-pin");
const buzz = (p) => { try { navigator.vibrate && navigator.vibrate(p); } catch {} };   // celular treme de leve (Android)
const TRIO = ["#ff6fb1", "#45b8f0", "#7ed957"];
const WORM_COLORS = [["#e5232b", "#ffd23f"], ["#45b8f0", "#ff6fb1"], ["#7ed957", "#e5232b"], ["#ffd23f", "#45b8f0"], ["#ff6fb1", "#7ed957"]];

/* ---------- textos ---------- */
$("#gateFrom").textContent = `de: ${ASSINATURA}`;
$("#heroTitle").innerHTML = [...NOME.toUpperCase()].map((c) => `<span class="ch">${c}</span>`).join("");
$("#heroSub").textContent = "desce aí. tem foto, tem textão e lá no final tem presente.";
$("#heroImg").src = FOTO_CAPA;
$("#fimTitle").innerHTML = `Te amo<br><em>${NOME}</em>`;
$("#fimSign").textContent = `beijo, ${ASSINATURA}`;
document.title = `${NOME[0].toUpperCase() + NOME.slice(1)}, a superpoderosa`;
$("#marquee").innerHTML = Array(2).fill(["feliz aniversário", "POW!", `te amo ${NOME}`, "ZAP!", "a superpoderosa", "TCHAN!"].map((t) => `<span>${t}</span>`).join("")).join("");

// explosão de gibi atrás da foto da capa
$("#burstPoly").setAttribute("points", Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2, r = i % 2 ? 72 : 98;
  return `${(100 + Math.cos(a) * r).toFixed(1)},${(100 + Math.sin(a) * r).toFixed(1)}`;
}).join(" "));

/* ---------- minhocas de goma ---------- */
let wormId = 0;
function wormSVG([c1, c2]) {
  const id = `wg${wormId++}`, d = "M14 40 C 32 6, 52 74, 72 40 S 112 6, 130 40";
  return `<svg viewBox="0 0 144 80"><defs><linearGradient id="${id}"><stop offset=".5" stop-color="${c1}"/><stop offset=".5" stop-color="${c2}"/></linearGradient></defs>
    <path d="${d}" fill="none" stroke="#1d0f1f" stroke-width="25" stroke-linecap="round" transform="translate(3 4)"/>
    <path d="${d}" fill="none" stroke="#1d0f1f" stroke-width="25" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="url(#${id})" stroke-width="18" stroke-linecap="round"/>
    <path d="M16 35 C 34 1, 54 69, 74 35 S 112 1, 128 35" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 9"/></svg>`;
}
const HERO_WORMS = [[70, 3, 130, -14, .5], [-4, 54, 110, 22, .9], [52, 82, 150, 6, .3], [84, 62, 96, 64, 1.2], [30, 12, 84, -38, .7]];
$("#heroWorms").innerHTML = HERO_WORMS.slice(0, lite ? 3 : 5).map(([x, y, s, r, sp], i) =>
  `<div class="worm" data-speed="${sp}" style="left:${x}%;top:${y}%;--s:${s}px;--r:${r}deg"><div style="--d:${-i * 1.2}s">${wormSVG(WORM_COLORS[i % WORM_COLORS.length])}</div></div>`).join("");

/* =========================================================
   UM CANVAS SÓ: rastro de três cores, minhoquinhas e estrelas.
   Só roda enquanto tem coisa mexendo.
   ========================================================= */
const fx = $("#fx"), fxc = fx.getContext("2d");
let parts = [], flyers = [], fxOn = false, fxW = 0, fxH = 0;
function fxSize() {
  const d = Math.min(devicePixelRatio || 1, 1.5);
  fxW = innerWidth; fxH = innerHeight;
  fx.width = fxW * d; fx.height = fxH * d;
  fxc.setTransform(d, 0, 0, d, 0, 0);
}
fxSize();
const wake = () => { if (!fxOn) { fxOn = true; requestAnimationFrame(fxLoop); } };
function burst(x, y, n = 40, spread = 1) {
  if (reduce) return;
  if (lite) n = Math.ceil(n / 2);
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (Math.random() - .5) * Math.PI * 1.3 * spread, v = 6 + Math.random() * 11;
    parts.push({ star: i % 4 === 0, x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6.3, vr: (Math.random() - .5) * .4, l: 16 + Math.random() * 18, c: WORM_COLORS[i % WORM_COLORS.length] });
  }
  wake();
}
// FUMAÇA DE AVIÃO: cada pedacinho é uma bolinha macia pré-desenhada (barato de pintar).
// Três faixas coladas (rosa, azul, verde) que ficam no ar e vão se desfazendo.
const SMOKE = TRIO.map((c) => {
  const s = document.createElement("canvas"); s.width = s.height = 64;
  const g = s.getContext("2d"), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, c); gr.addColorStop(.5, c); gr.addColorStop(1, c + "00");
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return s;
});
const PUFF_LIFE = lite ? 1000 : 1600;
let puffs = [];
function smokeAlong(a, b, size, now) {
  const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
  if (len < 1) return;
  const nx = -dy / len, ny = dx / len, n = Math.ceil(len / Math.max(3, size * .4));
  for (let i = 1; i <= n; i++) {
    const t = i / n, x = a.x + dx * t, y = a.y + dy * t;
    for (let k = 0; k < 3; k++) {
      const o = (k - 1) * size * 1.05;
      puffs.push({ x: x + nx * o, y: y + ny * o, k, s: size, t: now - (1 - t) * 16, dx: (Math.random() - .5) * .22, dy: (Math.random() - .5) * .22 - .06 });
    }
  }
  if (puffs.length > 2600) puffs.splice(0, puffs.length - 2600);
}
// aviãozinho vermelho puxando a fumaça
function drawPlane(x, y, ang, size) {
  fxc.save(); fxc.translate(x, y); fxc.rotate(ang); fxc.scale(size / 40, size / 40);
  fxc.lineJoin = "round"; fxc.lineWidth = 3; fxc.strokeStyle = "#1d0f1f";
  fxc.fillStyle = "#b3121c";
  fxc.beginPath(); fxc.moveTo(6, -3); fxc.lineTo(-6, -24); fxc.lineTo(-13, -24); fxc.lineTo(-7, -3); fxc.lineTo(-7, 3); fxc.lineTo(-13, 24); fxc.lineTo(-6, 24); fxc.lineTo(6, 3); fxc.closePath(); fxc.fill(); fxc.stroke();
  fxc.beginPath(); fxc.moveTo(-17, -2); fxc.lineTo(-25, -12); fxc.lineTo(-21, -2); fxc.lineTo(-21, 2); fxc.lineTo(-25, 12); fxc.lineTo(-17, 2); fxc.closePath(); fxc.fill(); fxc.stroke();
  fxc.fillStyle = "#e5232b"; fxc.beginPath(); fxc.ellipse(0, 0, 23, 7, 0, 0, Math.PI * 2); fxc.fill(); fxc.stroke();
  fxc.fillStyle = "#bfe9ff"; fxc.beginPath(); fxc.ellipse(9, 0, 5.5, 3.6, 0, 0, Math.PI * 2); fxc.fill(); fxc.lineWidth = 2; fxc.stroke();
  fxc.fillStyle = "#fff"; fxc.globalAlpha = .7; fxc.beginPath(); fxc.ellipse(-2, -3, 10, 1.6, 0, 0, Math.PI * 2); fxc.fill(); fxc.globalAlpha = 1;
  fxc.restore();
}
// um avião cruzando a tela numa curva (x0,y0 até x1,y1 passando perto de cx,cy)
function flyBy(x0, y0, x1, y1, cx, cy, ms = 1400, size = 13) {
  if (reduce) return;
  flyers.push({ x0, y0, x1, y1, cx, cy, t0: performance.now(), ms, size, last: null });
  wake();
}
function star(x, y, r, rot) {
  fxc.save(); fxc.translate(x, y); fxc.rotate(rot); fxc.beginPath();
  for (let i = 0; i < 8; i++) { const rr = i % 2 ? r * .38 : r, a = i * Math.PI / 4; fxc.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  fxc.closePath(); fxc.fillStyle = "#ffd23f"; fxc.fill(); fxc.lineWidth = 2; fxc.strokeStyle = "#1d0f1f"; fxc.stroke(); fxc.restore();
}
function fxLoop(now) {
  fxc.clearRect(0, 0, fxW, fxH);
  // fumaça
  puffs = puffs.filter((p) => now - p.t < PUFF_LIFE);
  for (const p of puffs) {
    const a = Math.max(0, (now - p.t) / PUFF_LIFE), r = p.s * (.62 + a * 1.25);
    p.x += p.dx; p.y += p.dy;
    fxc.globalAlpha = Math.pow(1 - a, 1.5) * .95;
    fxc.drawImage(SMOKE[p.k], p.x - r, p.y - r, r * 2, r * 2);
  }
  fxc.globalAlpha = 1;
  // aviões
  flyers = flyers.filter((f) => {
    const p = Math.min(1, (now - f.t0) / f.ms), e = p * p * (3 - 2 * p), u = 1 - e;
    const cur = { x: u * u * f.x0 + 2 * u * e * f.cx + e * e * f.x1, y: u * u * f.y0 + 2 * u * e * f.cy + e * e * f.y1 };
    if (f.last) {
      smokeAlong(f.last, cur, f.size, now);
      if (Math.hypot(cur.x - f.last.x, cur.y - f.last.y) > .3) f.ang = Math.atan2(cur.y - f.last.y, cur.x - f.last.x);
    }
    drawPlane(cur.x, cur.y, f.ang || 0, f.size * 3.2);
    f.last = cur;
    return p < 1;
  });
  // minhoquinhas e estrelas
  parts = parts.filter((p) => p.y < fxH + 60);
  fxc.lineCap = "round";
  for (const p of parts) {
    p.vy += .32; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
    if (p.star) { star(p.x, p.y, 9, p.r); continue; }
    const cs = Math.cos(p.r), sn = Math.sin(p.r), h = p.l / 2;
    fxc.strokeStyle = "#1d0f1f"; fxc.lineWidth = 10;
    fxc.beginPath(); fxc.moveTo(p.x - cs * h, p.y - sn * h); fxc.lineTo(p.x + cs * h, p.y + sn * h); fxc.stroke();
    fxc.lineWidth = 6;
    fxc.strokeStyle = p.c[0]; fxc.beginPath(); fxc.moveTo(p.x - cs * h, p.y - sn * h); fxc.lineTo(p.x, p.y); fxc.stroke();
    fxc.strokeStyle = p.c[1]; fxc.beginPath(); fxc.moveTo(p.x, p.y); fxc.lineTo(p.x + cs * h, p.y + sn * h); fxc.stroke();
  }
  if (parts.length || puffs.length || flyers.length) requestAnimationFrame(fxLoop);
  else { fxOn = false; fxc.clearRect(0, 0, fxW, fxH); }
}
// fumaça segue o mouse; no celular, segue o dedo enquanto encosta
if (!lite) {
  let touching = false, lp = null;
  addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") touching = true; lp = null; }, { passive: true });
  const stop = () => { touching = false; lp = null; };
  addEventListener("pointerup", stop, { passive: true });
  addEventListener("pointercancel", stop, { passive: true });
  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" && !touching) return;
    if (e.target.closest && e.target.closest(".pack, .lightbox")) { lp = null; return; }
    const p = { x: e.clientX, y: e.clientY };
    if (lp) smokeAlong(lp, p, finePointer ? 7 : 9, performance.now());
    lp = p; wake();
  }, { passive: true });
}
// toque solto: espirra minhoquinha
addEventListener("pointerdown", (e) => {
  if (e.target.closest("canvas, button, a, .panel, .pack, .lightbox")) return;
  burst(e.clientX, e.clientY, 8, .8);
});

/* =========================================================
   GSAP + ScrollTrigger + Lenis (scroll suave só no computador)
   ========================================================= */
let lenis = null;
if (G) {
  gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis && finePointer && !lite) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
}

/* ---------- faixa de três cores da capa (coladas, sem buraco) ---------- */
function buildStreaks() {
  const svg = $(".hero-streaks"), hero = $("#hero"), w = hero.clientWidth, h = hero.clientHeight;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  const W = Math.max(16, Math.min(34, w * .045));
  // curva em S (dois trechos cúbicos) atravessando a capa
  const seg = [[[-.1, .97], [.25, .7], [.35, 1.02], [.55, .72]], [[.55, .72], [.75, .42], [.82, .2], [1.12, .14]]];
  const pts = [];
  seg.forEach((c, si) => {
    for (let i = si ? 1 : 0; i <= 40; i++) {
      const t = i / 40, u = 1 - t;
      const x = u * u * u * c[0][0] + 3 * u * u * t * c[1][0] + 3 * u * t * t * c[2][0] + t * t * t * c[3][0];
      const y = u * u * u * c[0][1] + 3 * u * u * t * c[1][1] + 3 * u * t * t * c[2][1] + t * t * t * c[3][1];
      pts.push([x * w, y * h]);
    }
  });
  const band = (off) => pts.map(([x, y], i) => {
    const [ax, ay] = pts[Math.max(0, i - 1)], [bx, by] = pts[Math.min(pts.length - 1, i + 1)];
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1;
    return `${i ? "L" : "M"}${(x - dy / L * off).toFixed(1)} ${(y + dx / L * off).toFixed(1)}`;
  }).join(" ");
  svg.innerHTML = `<path class="st st0" d="${band(0)}" style="stroke-width:${3 * W + 8}px"/>` +
    [-W, 0, W].map((o, k) => `<path class="st st${k + 1}" d="${band(o)}" style="stroke-width:${W + 1.5}px"/>`).join("") +
    `<path class="st sth" d="${band(-W * 1.25)}" style="stroke-width:${Math.max(2, W * .14)}px"/>`;
}
buildStreaks();
{
  let lastW = innerWidth;
  addEventListener("resize", () => {
    if (innerWidth === lastW) return;
    lastW = innerWidth; buildStreaks();
  });
}

/* ---------- abertura do gibi (toca quando o coração é apertado) ---------- */
let intro = null;
if (G) {
  const streaks = $$(".st");
  streaks.forEach((p) => { const L = p.getTotalLength() + 2; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
  intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
    .from(".cover-top", { y: -40, opacity: 0, duration: .6 })
    .to(streaks, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" }, 0)
    .from(".hero-pre", { y: 20, opacity: 0, duration: .5 }, .15)
    .from(".hero-title .ch", { yPercent: 70, rotate: () => gsap.utils.random(-25, 25), opacity: 0, duration: .8, stagger: .06, ease: "back.out(2.2)" }, .2)
    .from(".hero-tag span", { scale: 0, rotate: -20, duration: .6, ease: "back.out(2.5)" }, .65)
    .from("#heroPhoto", { scale: 0, rotate: -25, duration: 1.1, ease: "elastic.out(1, .55)" }, .35)
    .from("#heroBubble", { scale: 0, transformOrigin: "20% 100%", duration: .6, ease: "back.out(3)" }, .95)
    .from(".worm", { y: () => -innerHeight * .8, opacity: 0, duration: 1, stagger: .08, ease: "bounce.out" }, .3)
    .from(".hero-sub, .scroll-hint", { y: 20, opacity: 0, duration: .5, stagger: .1 }, .9);
  gsap.to(".burst", { rotate: 360, duration: 40, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
}

/* ---------- capa: aperta o coração ---------- */
const gate = $("#gate");
function openGate(quiet) {
  if (gate.classList.contains("open")) return;
  gate.classList.add("open");
  buzz([30, 40, 60]);
  document.body.classList.remove("locked");
  if (lenis) lenis.start();
  if (intro) intro.play();
  if (!quiet) {
    burst(innerWidth / 2, innerHeight * .5, 60);
    flyBy(-60, innerHeight * .92, innerWidth + 60, innerHeight * .12, innerWidth * .3, innerHeight * .15, 1500, 15);
    setTimeout(() => burst(innerWidth / 2, innerHeight * .45, 36), 260);
  }
  setTimeout(() => { gate.hidden = true; if (G) ScrollTrigger.refresh(); }, 1000);
}
$("#gateBtn").addEventListener("click", () => openGate(false));
if (params.has("direto")) openGate(true);   // ?direto pula a capa (pra testar)

/* ---------- aviõezinhos cruzando a capa de vez em quando ---------- */
if (!reduce && !lite) {
  let timer = null;
  const pass = () => {
    if (gate.classList.contains("open")) {
      const ltr = Math.random() > .5, W = innerWidth, H = innerHeight, y0 = H * (.25 + Math.random() * .5);
      flyBy(ltr ? -60 : W + 60, y0, ltr ? W + 60 : -60, H * (.1 + Math.random() * .3), W * .5, y0 + H * (Math.random() > .5 ? .25 : -.25), 2600, 11);
    }
    timer = setTimeout(pass, 5200 + Math.random() * 2500);
  };
  new IntersectionObserver((en) => {
    if (en[0].isIntersecting) { if (!timer) timer = setTimeout(pass, 2600); }
    else { clearTimeout(timer); timer = null; }
  }, { threshold: .4 }).observe($("#hero"));
}

/* ---------- página de gibi ---------- */
const PANEL_BG = ["#ff6fb1", "#45b8f0", "#ffd23f", "#7ed957", "#e5232b"];
const SFX_COLORS = ["#ffd23f", "#ff6fb1", "#7ed957", "#45b8f0", "#fff"];
$("#page").innerHTML = FOTOS.map((f, i) => `
  <button class="panel ${f.forma || "sq"}" data-i="${i}" style="--c:${PANEL_BG[i % PANEL_BG.length]};--pos:${f.pos || "50% 50%"};--sfx:${SFX_COLORS[i % SFX_COLORS.length]}" aria-label="${f.legenda}">
    <img src="${f.src}" alt="${f.legenda}" loading="lazy" decoding="async">
    <span class="cap">${f.legenda}</span>
    ${f.som ? `<span class="sfx">${f.som}</span>` : ""}
  </button>`).join("") + `<div class="panel end"><span>e a história<br>continua...</span></div>`;
const lb = $("#lightbox");
$("#page").addEventListener("click", (e) => {
  const p = e.target.closest(".panel[data-i]");
  if (!p) return;
  const f = FOTOS[+p.dataset.i];
  $("#lbImg").src = f.src; $("#lbImg").alt = f.legenda; $("#lbCap").textContent = f.legenda;
  lb.hidden = false;
  if (lenis) lenis.stop();
});
const closeLb = () => { lb.hidden = true; if (lenis) lenis.start(); };
$("#lbClose").addEventListener("click", closeLb);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLb(); });

/* ---------- textão ---------- */
const cartaText = $("#cartaText");
cartaText.innerHTML = CARTA.split(/(\*[^*]+\*)/).map((chunk) => {
  const em = chunk.startsWith("*");
  const words = chunk.replace(/\*/g, "").split(/\s+/).filter(Boolean).map((w) => `<span class="w">${w}</span>`).join(" ");
  return em ? `<em>${words}</em>` : words;
}).join(" ");
const words = $$(".w", cartaText);
if (!G) words.forEach((w) => (w.style.opacity = 1));

/* ---------- superpoderes ---------- */
const ICONS = {
  bolt: `<polygon points="70,4 18,112 58,112 40,196 124,76 80,76 104,4" fill="#ffd23f" stroke="#1d0f1f" stroke-width="7" stroke-linejoin="round"/>`,
  shield: `<path d="M70 6 L128 26 C 128 96, 108 150, 70 192 C 32 150, 12 96, 12 26 Z" fill="#fff" stroke="#1d0f1f" stroke-width="7" stroke-linejoin="round"/><path d="M70 50 L82 84 L118 84 L89 104 L100 138 L70 117 L40 138 L51 104 L22 84 L58 84 Z" fill="#e5232b" stroke="#1d0f1f" stroke-width="5" stroke-linejoin="round"/>`,
  star: `<path d="M70 4 L88 66 L134 66 L97 102 L112 166 L70 128 L28 166 L43 102 L6 66 L52 66 Z" fill="#ffd23f" stroke="#1d0f1f" stroke-width="7" stroke-linejoin="round"/>`,
  heart: `<path d="M70 176 C 26 140, 6 106, 8 72 C 10 40, 34 24, 54 28 C 62 30, 67 36, 70 44 C 73 36, 78 30, 86 28 C 106 24, 130 40, 132 72 C 134 106, 114 140, 70 176 Z" fill="#e5232b" stroke="#1d0f1f" stroke-width="7" stroke-linejoin="round"/>`,
  crown: `<path d="M10 150 L22 46 L52 94 L70 30 L88 94 L118 46 L130 150 Z" fill="#ffd23f" stroke="#1d0f1f" stroke-width="7" stroke-linejoin="round"/><circle cx="70" cy="122" r="12" fill="#e5232b" stroke="#1d0f1f" stroke-width="5"/>`,
};
$("#track").innerHTML = PODERES.map((p, i) => `
  <article class="power" style="--c:${p.cor};${p.tinta ? `--t:${p.tinta};` : ""}--r:${[-2, 1.5, -1, 2, -1.5][i % 5]}deg">
    <div class="power-top"><span class="power-no">PODER #${i + 1}</span><span class="power-lvl">nível MAX</span></div>
    <div class="power-art"><svg viewBox="0 0 140 200" aria-hidden="true">${ICONS[p.icone] || ICONS.star}</svg></div>
    <h3>${p.texto}</h3>
    <div class="meter"><small>força</small><div class="meter-bar"><i></i></div></div>
  </article>`).join("");

/* ---------- pacotes de minhoca pra raspar ---------- */
function drawWorm(ctx, x, y, len, ang, [c1, c2], th) {
  const pt = (t, oy = 0) => [(t - .5) * len, Math.sin(t * Math.PI * 2.3) * len * .13 + oy];
  const line = (t0, t1, oy) => { ctx.beginPath(); for (let t = t0; t <= t1 + .001; t += .04) { const [px, py] = pt(t, oy); t === t0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke(); };
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.lineWidth = th + 7; ctx.strokeStyle = "#1d0f1f"; line(0, 1, th * .2); line(0, 1, 0);
  ctx.lineWidth = th; ctx.strokeStyle = c2; line(.5, 1, 0);
  ctx.strokeStyle = c1; line(0, .5, 0);
  ctx.lineWidth = th * .2; ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.setLineDash([2, th * .6]); line(.04, .96, -th * .2); ctx.setLineDash([]);
  ctx.restore();
}
function drawPack(ctx, w, h, cfg, img) {
  ctx.globalCompositeOperation = "source-over";
  if (img) {
    const s = Math.max(w / img.width, h / img.height);
    ctx.drawImage(img, (w - img.width * s) / 2, (h - img.height * s) / 2, img.width * s, img.height * s);
    return;
  }
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, cfg.cores[0]); g.addColorStop(1, cfg.cores[1]);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  // raios saindo do meio
  ctx.save(); ctx.translate(w / 2, h * .48); ctx.fillStyle = "rgba(255,255,255,.12)";
  for (let i = 0; i < 16; i++) { ctx.rotate(Math.PI / 8); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-w * .06, -h); ctx.lineTo(w * .06, -h); ctx.fill(); }
  ctx.restore();
  // retícula de gibi
  ctx.fillStyle = "rgba(255,255,255,.18)";
  for (let y = 0; y < h; y += 12) for (let x = (y / 12) % 2 ? 6 : 0; x < w; x += 12) { ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill(); }
  // minhocas
  const th = w * .072;
  [[.2, .19, .5, -.5], [.8, .22, .46, .7], [.14, .5, .34, 1.3], [.88, .55, .34, -1.2], [.24, .8, .5, .4], [.78, .83, .46, -.6]]
    .forEach(([x, y, l, a], i) => drawWorm(ctx, x * w, y * h, l * w, a, WORM_COLORS[(i + cfg.sabor.length) % WORM_COLORS.length], th));
  // rótulo
  ctx.save(); ctx.translate(w / 2, h * .48); ctx.rotate(-.06);
  const lw = w * .84, lh = h * .3;
  ctx.fillStyle = "#1d0f1f"; ctx.beginPath(); ctx.roundRect(-lw / 2 + 6, -lh / 2 + 7, lw, lh, lh * .26); ctx.fill();
  ctx.fillStyle = "#fff4e6"; ctx.strokeStyle = "#1d0f1f"; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-lw / 2, -lh / 2, lw, lh, lh * .26); ctx.fill(); ctx.stroke();
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  let fs = w * .17; ctx.font = `400 ${fs}px Bangers, Impact, sans-serif`;
  const tw = ctx.measureText("MINHOCAS").width;
  if (tw > lw * .86) { fs *= (lw * .86) / tw; ctx.font = `400 ${fs}px Bangers, Impact, sans-serif`; }
  ctx.lineJoin = "round"; ctx.lineWidth = 6; ctx.strokeStyle = "#1d0f1f"; ctx.strokeText("MINHOCAS", 0, -lh * .04);
  ctx.fillStyle = cfg.cores[0]; ctx.fillText("MINHOCAS", 0, -lh * .04);
  ctx.fillStyle = "#1d0f1f"; ctx.font = `700 ${w * .095}px Caveat, cursive`; ctx.fillText(cfg.sabor, 0, lh * .3);
  ctx.font = `400 ${w * .045}px Bangers, sans-serif`; ctx.fillText("GOMINHAS SUPERPODEROSAS", 0, -lh * .36);
  ctx.restore();
  // selo "raspe aqui"
  ctx.save(); ctx.translate(w * .5, h * .74); ctx.rotate(.05);
  ctx.fillStyle = "#ffd23f"; ctx.strokeStyle = "#1d0f1f"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(-w * .33, -h * .036, w * .66, h * .072, h * .036); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#1d0f1f"; ctx.font = `400 ${w * .056}px Bangers, sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("RASPE AQUI COM O DEDO!", 0, 2);
  ctx.restore();
  // solda de cima e de baixo
  const band = h * .06;
  [0, h - band].forEach((y) => {
    ctx.fillStyle = "rgba(0,0,0,.22)"; ctx.fillRect(0, y, w, band);
    ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.lineWidth = 1.5; ctx.beginPath();
    for (let x = 4; x < w; x += 7) { ctx.moveTo(x, y + 3); ctx.lineTo(x, y + band - 3); }
    ctx.stroke();
  });
  ctx.fillStyle = "rgba(29,15,31,.8)"; ctx.beginPath(); ctx.ellipse(w / 2, band / 2, w * .06, band * .22, 0, 0, Math.PI * 2); ctx.fill();
  // brilho do plástico
  const s = ctx.createLinearGradient(0, 0, w, h * .6);
  s.addColorStop(0, "rgba(255,255,255,.32)"); s.addColorStop(.35, "rgba(255,255,255,0)"); s.addColorStop(.7, "rgba(255,255,255,.12)"); s.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = s; ctx.fillRect(0, 0, w, h);
  ctx.textAlign = "center"; ctx.fillStyle = "rgba(255,255,255,.9)"; ctx.font = `700 ${w * .03}px "DM Sans", sans-serif`;
  ctx.fillText("PESO LÍQUIDO: 1 PRESENTE", w / 2, h - band - h * .03);
}

const packsEl = $("#packs");
packsEl.innerHTML = PACOTES.map((p, i) => `
  <div class="pack-wrap">
    <div class="pack" data-i="${i}" style="--sh:${p.sombra};--r:${p.giro || 0}deg">
      <div class="voucher" style="--v:${p.cor}">
        <div class="top"><small>vale-presente</small><span class="vale">VALE</span><strong>${p.vale}<br>${p.extra}</strong></div>
        <div class="bottom"><p class="desc">${p.desc}</p><small>${p.rodape}</small></div>
        <i class="shine"></i>
      </div>
      <canvas aria-label="Pacote de minhoca pra raspar"></canvas>
    </div>
    <p class="pack-hint">raspa aqui</p>
  </div>`).join("");

let revealed = 0;
$$(".pack", packsEl).forEach((el) => {
  const cfg = PACOTES[+el.dataset.i], cv = $("canvas", el), ctx = cv.getContext("2d"), hint = el.parentElement.querySelector(".pack-hint");
  const GX = 18, GY = 24;   // grade pra saber quanto já foi raspado (sem ler pixel do canvas)
  let w = 0, h = 0, cells, cleared = 0, done = false, down = false, last = null, touched = false, img = null;
  function paint() {
    const d = Math.min(devicePixelRatio || 1, 2);
    w = el.clientWidth; h = el.clientHeight;
    cv.width = w * d; cv.height = h * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    drawPack(ctx, w, h, cfg, img);
    cells = new Uint8Array(GX * GY); cleared = 0;
  }
  function mark(x, y, R) {
    const x0 = Math.max(0, Math.floor((x - R) / w * GX)), x1 = Math.min(GX - 1, Math.floor((x + R) / w * GX));
    const y0 = Math.max(0, Math.floor((y - R) / h * GY)), y1 = Math.min(GY - 1, Math.floor((y + R) / h * GY));
    for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) if (!cells[j * GX + i]) { cells[j * GX + i] = 1; cleared++; }
  }
  function scratch(p) {
    const R = Math.max(22, w * .075), a = last || p;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = R * 2;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(p.x + .01, p.y); ctx.stroke();
    const steps = Math.max(1, Math.ceil(Math.hypot(p.x - a.x, p.y - a.y) / R));
    for (let s = 0; s <= steps; s++) mark(a.x + (p.x - a.x) * s / steps, a.y + (p.y - a.y) * s / steps, R * .8);
    last = p; touched = true;
    if (cleared / (GX * GY) > .5) reveal();
  }
  function reveal() {
    if (done) return;
    done = true; el.classList.add("done");
    buzz([20, 40, 20, 40, 120]);
    hint.textContent = "é seu!!";
    const r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height * .45, 60);
    flyBy(-60, r.bottom, innerWidth + 60, r.top - 40, innerWidth * .3, r.top - 60, 1500, 12);
    if (++revealed === PACOTES.length) {
      $("#packNote").textContent = "os dois são seus. desce mais um pouco";
      setTimeout(() => { burst(innerWidth * .2, innerHeight * .7, 50, .7); burst(innerWidth * .8, innerHeight * .7, 50, .7); }, 500);
    }
  }
  const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  cv.addEventListener("pointerdown", (e) => { down = true; last = null; cv.setPointerCapture(e.pointerId); scratch(pos(e)); });
  cv.addEventListener("pointermove", (e) => { if (down) scratch(pos(e)); });
  ["pointerup", "pointercancel"].forEach((t) => cv.addEventListener(t, () => { down = false; last = null; }));
  addEventListener("resize", () => { if (!done && !touched && el.clientWidth !== w) paint(); });
  const start = () => { paint(); if (params.has("revelar")) reveal(); };   // ?revelar mostra os vales (pra testar)
  const ready = document.fonts ? document.fonts.ready : Promise.resolve();
  if (cfg.capa) { const im = new Image(); im.onload = () => { img = im; ready.then(start); }; im.onerror = () => ready.then(start); im.src = cfg.capa; }
  else ready.then(start);
});

/* ---------- títulos engordam quando aparecem (uma vez) ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: .2 });
$$("[data-morph]").forEach((el) => io.observe(el));

/* =========================================================
   ANIMAÇÕES DE SCROLL (GSAP): só transform e opacity
   ========================================================= */
if (G) {
  // barra de progresso
  const progress = $("#progress");
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => (progress.style.transform = `scaleX(${s.progress})`) });

  // capa: foto, título e minhocas em velocidades diferentes
  const heroST = { trigger: "#hero", start: "top top", end: "bottom top", scrub: true };
  gsap.to("#heroPhoto", { yPercent: -22, rotate: 8, ease: "none", scrollTrigger: heroST });
  gsap.to("#heroTitle", { xPercent: -10, ease: "none", scrollTrigger: heroST });
  $$(".worm").forEach((wm) => gsap.to(wm, { y: () => -innerHeight * .45 * +wm.dataset.speed, ease: "none", scrollTrigger: heroST }));

  // quadrinhos entram um por um, com a onomatopeia pulando
  const panels = $$(".panel");
  gsap.set(panels, { opacity: 0, scale: .7, rotate: () => gsap.utils.random(-9, 9) });
  gsap.set(".panel .sfx", { scale: 0 });
  ScrollTrigger.batch(panels, {
    start: "top 90%", once: true,
    onEnter: (batch) => {
      gsap.to(batch, { opacity: 1, scale: 1, rotate: 0, duration: .7, stagger: .1, ease: "back.out(1.8)", overwrite: true });
      gsap.to(batch.map((p) => $(".sfx", p)).filter(Boolean), { scale: 1, duration: .5, stagger: .1, delay: .35, ease: "back.out(3)" });
    },
  });

  // textão: palavras acendem conforme rola
  gsap.to(words, { opacity: 1, stagger: .5, ease: "none", scrollTrigger: { trigger: "#carta", start: "top 65%", end: "bottom 80%", scrub: true } });

  // superpoderes: a seção trava e os cards passam de lado
  const track = $("#track");
  const dist = () => Math.max(0, track.scrollWidth - innerWidth);
  const side = gsap.to(track, {
    x: () => -dist(), ease: "none",
    scrollTrigger: { trigger: "#poderesPin", pin: true, scrub: 1, start: "top top", end: () => "+=" + dist(), invalidateOnRefresh: true, anticipatePin: 1 },
  });
  $$(".power").forEach((card) => {
    gsap.from($(".meter-bar i", card), { scaleX: 0, ease: "none", scrollTrigger: { trigger: card, containerAnimation: side, start: "left 95%", end: "center 55%", scrub: true } });
    gsap.from($(".power-art svg", card), { scale: .3, rotate: -30, ease: "back.out(2)", scrollTrigger: { trigger: card, containerAnimation: side, start: "left 100%", end: "left 60%", scrub: true } });
  });

  // pacotes caem girando
  gsap.from(".pack-wrap", { y: 120, rotate: (i) => (i % 2 ? 14 : -14), opacity: 0, duration: 1, stagger: .15, ease: "back.out(1.4)", scrollTrigger: { trigger: "#packs", start: "top 85%" } });

  // fim
  gsap.from("#fimHeart", { scale: 0, rotate: -40, duration: 1, ease: "elastic.out(1, .5)", scrollTrigger: { trigger: "#fim", start: "top 60%" } });
  gsap.from("#fimTitle", { y: 60, opacity: 0, duration: .8, ease: "back.out(2)", scrollTrigger: { trigger: "#fim", start: "top 55%" } });

  addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
} else {
  // sem GSAP: barra de progresso simples
  const progress = $("#progress");
  let tk = false;
  addEventListener("scroll", () => {
    if (tk) return; tk = true;
    requestAnimationFrame(() => { tk = false; progress.style.transform = `scaleX(${Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))})`; });
  }, { passive: true });
}
addEventListener("resize", fxSize);

/* ---------- final ---------- */
if (WHATSAPP) {
  const a = $("#whats");
  a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Abri meu presente! Quero usar meus vales: 1 tattoo grátis e 1 pedido na Renner.")}`;
  a.hidden = false;
}
$("#again").addEventListener("click", () => { if (lenis) lenis.scrollTo(0, { duration: 2 }); else scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
new IntersectionObserver((en, o) => {
  if (!en[0].isIntersecting) return;
  burst(innerWidth / 2, innerHeight * .8, 80);
  flyBy(-60, innerHeight * .25, innerWidth + 60, innerHeight * .3, innerWidth * .5, innerHeight * .95, 2000, 15);
  o.disconnect();
}, { threshold: .5 }).observe($("#fim"));
