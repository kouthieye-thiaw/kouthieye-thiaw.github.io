/* =========================================================
   Les trois univers : énergie, électronique, automatisme.
   Chaque univers reçoit une bande de vignettes animées et la liste
   de ses projets. Les boucles continues (défilement, impulsions) sont
   en CSS ; les séquences qui doivent rester synchronisées (Ladder,
   Grafcet, pupitre, départ moteur, tri) sont en SMIL, sur une seule
   horloge par vignette. Rien ne tourne hors de l'écran.
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const P = window.PROJECTS || [];
  const U = window.UNIVERS || [];
  if (!U.length) return;
  const byId = Object.fromEntries(P.map(p => [p.id, p]));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const src = (name, size) => /\.svg$/.test(name) ? `assets/img/${name}` : `assets/img/${name}${size === 'sm' ? '-sm' : ''}.webp`;
  const pad = n => String(n).padStart(2, '0');
  const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>';
  const f = n => +n.toFixed(1);
  const TAU = Math.PI * 2;

  // courbe y = yc - amp * fn(2π(x - x0)/periode + phase), échantillonnée tous les `step` px
  function wave(x0, x1, yc, amp, period, phase = 0, fn = Math.sin, step = 2) {
    let d = '';
    for (let x = x0; x <= x1 + 0.01; x += step) d += (d ? 'L' : 'M') + f(x) + ',' + f(yc - amp * fn(TAU * (x - x0) / period + phase));
    return d;
  }
  const clip = (id, x, y, w, h) => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`;
  const grid = (x0, y0, x1, y1, dx, dy) => {
    let d = '';
    for (let x = x0; x <= x1 + 0.1; x += dx) d += `M${f(x)},${y0}V${y1}`;
    for (let y = y0; y <= y1 + 0.1; y += dy) d += `M${x0},${f(y)}H${x1}`;
    return `<path class="g" d="${d}"/>`;
  };
  const arrowHead = (x, y, ang, cls = 'k') => `<path class="${cls} fillk" d="M0,0 L-7,-3.5 L-7,3.5 Z" transform="translate(${f(x)} ${f(y)}) rotate(${f(ang)})"/>`;

  /* ---------- Séquences SMIL ---------- */
  // visible pendant les intervalles [a, b] donnés en % d'un cycle de `dur` secondes
  function win(iv, dur, begin = 0) {
    const kt = [0], vs = [iv[0][0] === 0 ? 1 : 0];
    iv.forEach(([a, b]) => {
      if (a > 0) { kt.push(a / 100); vs.push(1); }
      if (b < 100) { kt.push(b / 100); vs.push(0); }
    });
    return `<animate attributeName="opacity" dur="${dur}s" begin="${begin}s" repeatCount="indefinite" calcMode="discrete" keyTimes="${kt.join(';')}" values="${vs.join(';')}"/>`;
  }
  // rotation continue autour de (cx, cy) ; dir = -1 pour le sens trigonométrique
  const spin = (cx, cy, dur, dir = 1) => `<animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="${dir * 360} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>`;
  // rotation par paliers : [instant en %, angle en degrés], du début (0) à la fin (100) du cycle
  const turn = (cx, cy, dur, keys, splines) => `<animateTransform attributeName="transform" type="rotate" dur="${dur}s" repeatCount="indefinite" keyTimes="${keys.map(k => k[0] / 100).join(';')}" values="${keys.map(k => `${k[1]} ${cx} ${cy}`).join(';')}"${splines ? ` calcMode="spline" keySplines="${splines}"` : ''}/>`;

  const VG = {
    /* ---------- Énergie & électrotechnique ---------- */
    // pont de Graetz : les diodes conduisent deux par deux, l'onde de sortie est redressée
    redressement(id) {
      const P0 = 80, x0 = 150, W = 196;
      const cx = 72, cy = 112, r = 40;
      const T = [cx, cy - r], R = [cx + r, cy], B = [cx, cy + r], L = [cx - r, cy];
      const diode = (a, b, cls) => {
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
        return `<g class="${cls}" transform="translate(${f(mx)} ${f(my)}) rotate(${f(ang)})"><path d="M-6,-7 L6,0 L-6,7 Z"/><path d="M6,-7 V7"/></g>`;
      };
      const edge = (a, b) => `M${a[0]},${a[1]}L${b[0]},${b[1]}`;
      return `
        <defs>${clip(id + 'c', x0, 20, W, 196)}</defs>
        <path class="k2" d="${edge(L, T)}${edge(R, T)}${edge(B, L)}${edge(B, R)}"/>
        ${diode(L, T, 'dd a-alt')}${diode(B, R, 'dd a-alt')}
        ${diode(R, T, 'dd a-alt a-alt--2')}${diode(B, L, 'dd a-alt a-alt--2')}
        <path class="k2" d="M${L[0]},${L[1]}H14 M${R[0]},${R[1]}H${R[0] + 18} M${T[0]},${T[1]}V40H${x0 - 8} M${B[0]},${B[1]}V196H${x0 - 8}"/>
        <text x="6" y="${cy - 8}">~</text><text x="${R[0] + 6}" y="${cy - 8}">~</text>
        <text x="${T[0] + 6}" y="${T[1] - 6}">+</text><text x="${B[0] + 6}" y="${B[1] + 14}">−</text>
        <g clip-path="url(#${id}c)">
          <g class="a-scroll" style="--d:2s;--dx:-${P0}px">
            <path class="k" d="${wave(x0, x0 + W + P0, 66, 26, P0)}"/>
            <path class="e" d="${wave(x0, x0 + W + P0, 196, 46, P0, 0, t => Math.abs(Math.sin(t)))}"/>
          </g>
        </g>
        <path class="g" d="M${x0},66H${x0 + W} M${x0},196H${x0 + W}"/>
        <text x="${x0}" y="28">u réseau</text><text x="${x0}" y="138">u redressée</text>`;
    },

    // réseau triphasé : trois sinusoïdes déphasées de 120°
    triphase(id) {
      const P0 = 132, x0 = 40, W = 306;
      const ph = [0, -TAU / 3, -2 * TAU / 3];
      return `
        <defs>${clip(id + 'c', x0, 20, W, 190)}</defs>
        <path class="g" d="M${x0},110H${x0 + W}"/>
        ${grid(x0, 30, x0 + W, 190, 34, 40)}
        <g clip-path="url(#${id}c)"><g class="a-scroll" style="--d:3s;--dx:-${P0}px">
          <path class="k" d="${wave(x0, x0 + W + P0, 110, 66, P0, ph[0])}"/>
          <path class="e" d="${wave(x0, x0 + W + P0, 110, 66, P0, ph[1])}"/>
          <path class="m dash" d="${wave(x0, x0 + W + P0, 110, 66, P0, ph[2])}"/>
        </g></g>
        <text x="8" y="52">L1</text><text x="8" y="112" class="te">L2</text><text x="8" y="172">L3</text>`;
    },

    // moteur asynchrone : le champ tourne, chaque dent s'aimante à son passage, le rotor suit avec un glissement
    moteur() {
      const cx = 180, cy = 110;
      const tooth = `x="${cx - 9}" y="${cy - 92}" width="18" height="22" rx="3"`;
      const teeth = Array.from({ length: 6 }, (_, k) => `
        <g transform="rotate(${k * 60} ${cx} ${cy})">
          <rect class="tooth" ${tooth}/>
          <rect class="tooth tooth--on" ${tooth} opacity="0"><animate attributeName="opacity" values="1;0;0" keyTimes="0;0.3;1" dur="3s" begin="${f(k * 0.5 - 3)}s" repeatCount="indefinite"/></rect>
        </g>`).join('');
      const labels = ['U', "W'", 'V', "U'", 'W', "V'"].map((t, k) => {
        const a = (k * 60 - 90) * Math.PI / 180;
        return `<text x="${f(cx + 106 * Math.cos(a) - 4)}" y="${f(cy + 106 * Math.sin(a) + 4)}">${t}</text>`;
      }).join('');
      const bars = Array.from({ length: 10 }, (_, k) => {
        const a = k * 36 * Math.PI / 180;
        return `M${f(cx + 14 * Math.cos(a))},${f(cy + 14 * Math.sin(a))}L${f(cx + 40 * Math.cos(a))},${f(cy + 40 * Math.sin(a))}`;
      }).join('');
      return `
        <circle class="k2" cx="${cx}" cy="${cy}" r="96"/><circle class="k2" cx="${cx}" cy="${cy}" r="66"/>
        ${teeth}${labels}
        <g>${spin(cx, cy, 3.4)}
          <circle class="k" cx="${cx}" cy="${cy}" r="44"/><circle class="k2" cx="${cx}" cy="${cy}" r="12"/>
          <path class="k2" d="${bars}"/>
        </g>
        <g>${spin(cx, cy, 3)}
          <path class="e" d="M${cx},${cy}V${cy - 58}"/>${arrowHead(cx, cy - 60, -90, 'e')}
        </g>
        <text x="16" y="200">champ</text><text x="16" y="212" class="te">tournant</text>
        <text x="292" y="200">rotor</text><text x="292" y="212">en cage</text>`;
    },

    // hacheur : découpage de E, la valeur moyenne suit le rapport cyclique
    hacheur(id) {
      const x0 = 46, W = 300, Tm = 480, Ts = 16, hi = 52, lo = 172;
      let d = '', avg = '';
      for (let k = 0; k * Ts < W + Tm; k++) {
        const xa = x0 + k * Ts, a = 0.5 + 0.36 * Math.sin(TAU * (k * Ts) / Tm), xb = xa + a * Ts;
        d += `${k ? 'L' : 'M'}${f(xa)},${lo}V${hi}H${f(xb)}V${lo}H${f(xa + Ts)}`;
      }
      for (let x = 0; x <= W + Tm; x += 4) avg += `${x ? 'L' : 'M'}${f(x0 + x)},${f(lo - (lo - hi) * (0.5 + 0.36 * Math.sin(TAU * x / Tm)))}`;
      return `
        <defs>${clip(id + 'c', x0, 30, W, 160)}</defs>
        <path class="g" d="M${x0},${hi}H${x0 + W} M${x0},${lo}H${x0 + W}"/>
        <g clip-path="url(#${id}c)"><g class="a-scroll" style="--d:9s;--dx:-${Tm}px">
          <path class="k2" d="${d}"/>
          <path class="e thick" d="${avg}"/>
        </g></g>
        <text x="10" y="${hi + 4}">E</text><text x="10" y="${lo + 4}">0</text>
        <text x="${x0}" y="208" class="te">⟨u⟩ = α · E</text><text x="${x0 + 150}" y="208">rapport cyclique α</text>`;
    },

    // départ moteur direct : S1 ferme KM1, l'auto-maintien prend le relais, S2 arrête le moteur
    depart() {
      const D = 8, x = 104, c = 262, b = 230;
      // contacts dessinés fermés (lame verticale, pivot en bas) ; un angle de -25° les ouvre
      const blade = (px, py, keys) => `<path class="k" d="M${px},${py}V${py - 22}">${turn(px, py, D, keys)}</path>`;
      const KM = [[0, -25], [17, -25], [18, 0], [76, 0], [77, -25], [100, -25]];
      return `
        <text x="${x - 30}" y="16">L1 L2 L3</text>
        <path class="k2" d="M${x},22V44 M${x},66V86 M${x},112V124 M${x},150V160"/>
        <path class="k2" d="M${x - 6},30l12,-6 M${x - 6},34l12,-6 M${x - 6},38l12,-6"/>
        <rect class="k2" x="${x - 7}" y="44" width="14" height="22" rx="2"/><path class="k2" d="M${x},44V66"/>
        <text x="${x + 14}" y="58">Q1</text>
        <circle class="k2 fillk" cx="${x}" cy="88" r="2.2"/>
        ${blade(x, 112, KM)}
        <text x="${x + 14}" y="102">KM1</text>
        <rect class="k2" x="${x - 9}" y="124" width="18" height="26" rx="2"/><path class="k2" d="M${x - 5},137h3v-5h4v10h3"/>
        <text x="${x + 14}" y="140">F1</text>
        <path class="e thick flow" d="M${x},22V160" opacity="0">${win([[17, 76]], D)}</path>
        <circle class="k" cx="${x}" cy="184" r="24"/>
        <g>${turn(x, 184, D, [[0, 0], [17, 0], [76, 1080], [86, 1170], [100, 1170]], '0 0 1 1;0 0 1 1;0.2 0.4 0.4 1;0 0 1 1')}
          <path class="k2" d="M${x},166V176 M${x},192V202 M${x - 18},184H${x - 8} M${x + 8},184H${x + 18}"/>
        </g>
        <text x="${x - 7}" y="182">M</text><text x="${x - 8}" y="194">3~</text>

        <path class="g" d="M196,14V210"/>
        <text x="210" y="16">commande 24 V</text>
        <path class="k2" d="M${c},24V46 M${c},66V88 M${c},108V126 M${c},150V196 M${c},78H${b}V88 M${b},108V116H${c} M${c},46h8"/>
        <circle class="k2 fillk" cx="${c}" cy="78" r="2.2"/><circle class="k2 fillk" cx="${c}" cy="116" r="2.2"/>
        <path class="k" d="M${c},66L${c + 8},46">${turn(c, 66, D, [[0, 0], [74, 0], [75, 20], [82, 20], [83, 0], [100, 0]])}</path>
        ${blade(c, 108, [[0, -25], [15, -25], [16, 0], [25, 0], [26, -25], [100, -25]])}
        ${blade(b, 108, KM)}
        <rect class="k2" x="${c - 12}" y="126" width="24" height="24" rx="2"/>
        <rect class="coil-on" x="${c - 12}" y="126" width="24" height="24" rx="2" opacity="0">${win([[15, 74]], D)}</rect>
        <path class="e thick flow" d="M${c},24V196" opacity="0">${win([[15, 25]], D)}</path>
        <path class="e thick flow" d="M${c},24V78H${b}V116H${c}V196" opacity="0">${win([[17, 74]], D)}</path>
        <text x="280" y="60">S2 · arrêt</text><text x="280" y="60" class="te" opacity="0">S2 · arrêt${win([[74, 82]], D)}</text>
        <text x="280" y="102">S1 · marche</text><text x="280" y="102" class="te" opacity="0">S1 · marche${win([[15, 25]], D)}</text>
        <text x="200" y="124">KM1</text><text x="280" y="142">KM1</text><text x="${c + 6}" y="208">0 V</text>`;
    },

    // diagramme de Fresnel : tension et courant tournent ensemble, le courant en retard de φ
    phaseurs(id) {
      const cx = 92, cy = 100, phi = 35, P0 = 152, x0 = 196, W = 150;
      const a = phi * Math.PI / 180;
      const arc = `M${f(cx + 30)},${cy} A30,30 0 0 1 ${f(cx + 30 * Math.cos(a))},${f(cy + 30 * Math.sin(a))}`;
      return `
        <defs>${clip(id + 'c', x0, 30, W, 160)}</defs>
        <circle class="g" cx="${cx}" cy="${cy}" r="74"/><path class="g" d="M${cx - 82},${cy}H${cx + 82} M${cx},${cy - 82}V${cy + 82}"/>
        <g>${spin(cx, cy, 6, -1)}
          <path class="k" d="M${cx},${cy}H${cx + 70}"/>${arrowHead(cx + 72, cy, 0)}
          <g transform="rotate(${phi} ${cx} ${cy})"><path class="e" d="M${cx},${cy}H${cx + 52}"/>${arrowHead(cx + 54, cy, 0, 'e')}</g>
          <path class="m" d="${arc}"/>
        </g>
        <path class="g" d="M${x0},110H${x0 + W}"/>
        <g clip-path="url(#${id}c)"><g class="a-scroll" style="--d:6s;--dx:-${P0}px">
          <path class="k" d="${wave(x0, x0 + W + P0, 110, 60, P0)}"/>
          <path class="e" d="${wave(x0, x0 + W + P0, 110, 44, P0, -a)}"/>
        </g></g>
        <text x="${x0}" y="24">v(t) · i(t)</text>
        <text x="20" y="208">V tension</text><text x="104" y="208" class="te">I courant</text><text x="${x0}" y="208">φ déphasage</text>`;
    },

    /* ---------- Électronique & systèmes embarqués ---------- */
    // carte électronique : des impulsions de courant circulent dans les pistes
    pcb() {
      const cx = 196, cy = 112;
      const pins = [];
      for (let k = 0; k < 6; k++) {
        const o = -25 + k * 10;
        pins.push(`M${cx - 30},${cy + o}h-8`, `M${cx + 30},${cy + o}h8`, `M${cx + o},${cy - 30}v-8`, `M${cx + o},${cy + 30}v8`);
      }
      const traces = [
        `M${cx - 38},${cy - 25}H110V46H40`, `M${cx - 38},${cy - 5}H96V86H40`, `M${cx - 38},${cy + 15}H96V126H40`,
        `M${cx - 38},${cy + 25}H110V166H40`, `M${cx + 38},${cy - 15}H292V60H330`, `M${cx + 38},${cy + 5}H300V112H330`,
        `M${cx - 5},${cy - 38}V40H260V30`, `M${cx + 15},${cy + 38}V184H300V196`
      ];
      const pulse = traces.map((d, k) => `<path class="e pulse" pathLength="100" d="${d}" style="--d:${(1.6 + (k % 3) * 0.5).toFixed(1)}s;animation-delay:${(-k * 0.37).toFixed(2)}s"/>`).join('');
      return `
        <path class="trace" d="${traces.join(' ')}"/>
        ${pulse}
        <rect class="k fillink" x="${cx - 30}" y="${cy - 30}" width="60" height="60" rx="3"/>
        <path class="k2" d="${pins.join('')}"/>
        <circle class="k2" cx="${cx - 20}" cy="${cy - 20}" r="2.5"/>
        <text x="${cx - 10}" y="${cy + 4}">MCU</text>
        ${[46, 86, 126, 166].map(y => `<rect class="pad" x="28" y="${y - 6}" width="12" height="12" rx="2"/>`).join('')}
        <rect class="pad" x="330" y="54" width="10" height="12"/><rect class="pad" x="330" y="106" width="10" height="12"/>
        <rect class="k2" x="252" y="22" width="16" height="8" rx="1"/><rect class="k2" x="292" y="196" width="16" height="8" rx="1"/>
        <circle class="via" cx="110" cy="46" r="3"/><circle class="via" cx="292" cy="60" r="3"/><circle class="via" cx="96" cy="126" r="3"/>
        <text x="20" y="30">J1</text><text x="246" y="18">R1</text><text x="312" y="212">C1</text>`;
    },

    // commande MLI : comparaison d'un sinus à une porteuse triangulaire
    mli(id) {
      const x0 = 30, W = 316, S = 160, C = 16, yc = 62, A = 40, hi = 146, lo = 192;
      let tri = '', pwm = '', prev = null;
      for (let x = 0; x <= W + S; x += 1) {
        const tv = 4 * Math.abs(((x / C) % 1) - 0.5) - 1;
        tri += `${x ? 'L' : 'M'}${f(x0 + x)},${f(yc - A * tv)}`;
        const on = 0.85 * Math.sin(TAU * x / S) > tv;
        const y = on ? hi : lo;
        if (prev === null) pwm = `M${x0},${y}`;
        else if (on !== prev) pwm += `H${f(x0 + x)}V${y}`;
        prev = on;
      }
      pwm += `H${x0 + W + S}`;
      return `
        <defs>${clip(id + 'c', x0, 14, W, 196)}</defs>
        <path class="g" d="M${x0},${yc}H${x0 + W} M${x0},${(hi + lo) / 2}H${x0 + W}"/>
        <g clip-path="url(#${id}c)"><g class="a-scroll" style="--d:4s;--dx:-${S}px">
          <path class="k2" d="${tri}"/>
          <path class="e thick" d="${wave(x0, x0 + W + S, yc, A * 0.85, S)}"/>
          <path class="k" d="${pwm}"/>
        </g></g>
        <text x="${x0}" y="122">sortie MLI</text><text x="${x0 + 200}" y="14" class="te">sinus</text><text x="${x0 + 250}" y="14">porteuse</text>`;
    },

    // oscilloscope : porteuse modulée en amplitude, enveloppe en surimpression
    scope(id) {
      const x0 = 24, W = 320, y0 = 22, H = 176, E = 160, Cp = 8, yc = y0 + H / 2, amp = 64, m = 0.6;
      let sig = '', up = '', dn = '';
      for (let x = 0; x <= W + E; x += 1) {
        const env = (1 + m * Math.sin(TAU * x / E)) / (1 + m);
        sig += `${x ? 'L' : 'M'}${f(x0 + x)},${f(yc - amp * env * Math.sin(TAU * x / Cp))}`;
        if (x % 4 === 0) { up += `${x ? 'L' : 'M'}${f(x0 + x)},${f(yc - amp * env)}`; dn += `${x ? 'L' : 'M'}${f(x0 + x)},${f(yc + amp * env)}`; }
      }
      return `
        <defs>${clip(id + 'c', x0, y0, W, H)}</defs>
        <rect class="k2" x="${x0}" y="${y0}" width="${W}" height="${H}" rx="4"/>
        ${grid(x0, y0, x0 + W, y0 + H, 32, 22)}
        <g clip-path="url(#${id}c)"><g class="a-scroll" style="--d:4s;--dx:-${E}px">
          <path class="k thin" d="${sig}"/>
          <path class="e dash" d="${up}"/><path class="e dash" d="${dn}"/>
        </g></g>
        <text x="${x0 + 6}" y="${y0 + 14}">CH1</text><text x="${x0 + W - 34}" y="${y0 + 14}" class="te">RUN</text>
        <text x="${x0}" y="214">porteuse · enveloppe</text>`;
    },

    // liaison série : la trame de 4 octets du test (AB CD 0E 0A), bit de start, LSB d'abord, bit de stop
    uart(id) {
      const x0 = 30, W = 316, bw = 10, hi = 66, lo = 126, bytes = [0xAB, 0xCD, 0x0E, 0x0A];
      const frame = byte => [0, ...Array.from({ length: 8 }, (_, i) => (byte >> i) & 1), 1];
      const bits = [1, 1, 1, ...bytes.flatMap(frame), 1, 1, 1];
      const seq = bits.length * bw;
      let d = '', lvl = null, labels = '';
      for (let r = 0; r < 2; r++) bits.forEach((b, i) => {
        const x = x0 + (r * bits.length + i) * bw, y = b ? hi : lo;
        if (lvl === null) d = `M${x},${y}`;
        else if (b !== lvl) d += `H${x}V${y}`;
        lvl = b;
      });
      d += `H${x0 + 2 * seq}`;
      for (let r = 0; r < 2; r++) bytes.forEach((v, j) => {
        labels += `<text x="${x0 + (r * bits.length + 3 + j * 10 + 2) * bw}" y="${hi - 14}" class="te">0x${v.toString(16).toUpperCase().padStart(2, '0')}</text>`;
      });
      return `
        <defs>${clip(id + 'c', x0, 30, W, 150)}</defs>
        <path class="g" d="M${x0},${hi}H${x0 + W} M${x0},${lo}H${x0 + W}"/>
        <g clip-path="url(#${id}c)"><g class="a-scroll" style="--d:8s;--dx:-${seq}px">
          <path class="k" d="${d}"/>${labels}
        </g></g>
        <text x="6" y="${hi + 4}">1</text><text x="6" y="${lo + 4}">0</text>
        <text x="${x0}" y="160">TX · 19200 bauds · start, 8 bits, stop</text>
        <text x="${x0}" y="186">trame de 4 octets vers /dev/ttyUSB0</text>`;
    },

    // bras robotisé : épaule et coude pilotés par des servomoteurs, électroaimant en bout de bras
    bras() {
      const D = 6, sx = 112, sy = 170, ex = sx + 38, ey = sy - 66;
      return `
        <path class="g" d="M20,200H340"/>
        <rect class="k2" x="78" y="178" width="68" height="20" rx="3"/>
        <path class="m dash" d="M84,200 A28,7 0 0 0 140,200"/>
        <g>${turn(sx, sy, D, [[0, 0], [25, -14], [50, -14], [75, 10], [100, 0]])}
          <path class="k thick" d="M${sx},${sy}L${ex},${ey}"/>
          <g>${turn(ex, ey, D, [[0, 0], [25, 28], [50, 28], [75, -12], [100, 0]])}
            <path class="k thick" d="M${ex},${ey}L${sx + 98},${sy - 50}"/>
            <circle class="k fillink" cx="${ex}" cy="${ey}" r="8"/>
            <rect class="e fille" x="${sx + 92}" y="${sy - 46}" width="14" height="8" rx="2"/>
            <path class="e dash" d="M${sx + 95},${sy - 36}v12 M${sx + 103},${sy - 36}v12" opacity="0">${win([[25, 75]], D)}</path>
          </g>
          <circle class="k fillink" cx="${sx}" cy="${sy}" r="9"/>
        </g>
        <text x="200" y="40">servomoteurs</text><text x="200" y="56" class="te">électroaimant</text>
        <text x="200" y="82">Raspberry Pi · C</text>`;
    },

    // antenne : ondes rayonnées par une antenne directive
    antenne() {
      const ox = 108, oy = 112;
      const arcs = [0, 1, 2, 3].map(k => `
        <g transform="translate(${ox} ${oy})"><path class="k" d="M24,-40 A48,48 0 0 1 24,40" vector-effect="non-scaling-stroke" opacity="0">
          <animateTransform attributeName="transform" type="scale" values="0.5;2.6" dur="3s" begin="${-k * 0.75}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.15;1" dur="3s" begin="${-k * 0.75}s" repeatCount="indefinite"/>
        </path></g>`).join('');
      return `
        <path class="k thick" d="M24,${oy}H${ox}"/>
        <path class="k thick" d="M48,${oy - 62}V${oy + 62} M84,${oy - 56}V${oy + 56}"/>
        <path class="k2" d="M48,${oy}l18,10 M84,${oy}l-18,10"/>
        <circle class="e fille" cx="66" cy="${oy + 10}" r="3"/>
        ${arcs}
        <text x="20" y="206">HB9CV · 144 MHz</text><text x="250" y="206" class="te">rayonnement</text>`;
    },

    /* ---------- Automatisme & informatique industrielle ---------- */
    // Ladder du programme : Marche := (iStart OR Marche) AND iStop AND iEmergency ; voyants oStart / oStop
    ladder() {
      const D = 8, L = 22, R = 338, y1 = 52, y2 = 88, y3 = 136, y4 = 180;
      const no = (x, y) => `<path d="M${x - 8},${y}H${x - 3} M${x - 3},${y - 9}V${y + 9} M${x + 3},${y - 9}V${y + 9} M${x + 3},${y}H${x + 8}"/>`;
      const nc = (x, y) => `${no(x, y)}<path d="M${x - 7},${y + 8}L${x + 7},${y - 8}"/>`;
      const coil = (x, y) => `<path d="M${x - 10},${y}H${x - 6} M${x - 2},${y - 9} A10,10 0 0 0 ${x - 2},${y + 9} M${x + 2},${y - 9} A10,10 0 0 1 ${x + 2},${y + 9} M${x + 6},${y}H${x + 10}"/>`;
      // tronçons de rung : dessinés une fois en gris, puis en braise quand le courant passe
      const a0 = `M${L},${y1}H${L + 18}`;
      const a = `M${L + 18},${y1}H62 M78,${y1}H110`;
      const branch = `M${L + 18},${y1}V${y2}H62 M78,${y2}H110V${y1}`;
      const b = `M110,${y1}H146 M162,${y1}H206 M222,${y1}H284 M304,${y1}H${R}`;
      const r2 = `M${L},${y3}H126 M142,${y3}H284 M304,${y3}H${R}`;
      const r3 = `M${L},${y4}H126 M142,${y4}H284 M304,${y4}H${R}`;
      const lit = (iv, inner) => `<g class="e thick nofill" opacity="0">${inner}${win(iv, D)}</g>`;
      const state = (iv, t) => `<text x="${L + 6}" y="212" class="te" opacity="0">${t}${win(iv, D)}</text>`;
      return `
        <path class="k2" d="M${L},24V194 M${R},24V194"/>
        <g class="k2 nofill">
          <path d="${a0}${a}${branch}${b}${r2}${r3}"/>
          ${no(70, y1)}${no(70, y2)}${no(154, y1)}${no(214, y1)}${coil(294, y1)}
          ${no(134, y3)}${coil(294, y3)}${nc(134, y4)}${coil(294, y4)}
        </g>
        ${lit([[12, 35]], `<path d="${a}"/>${no(70, y1)}`)}
        ${lit([[13, 70]], `<path d="${branch}"/>${no(70, y2)}`)}
        ${lit([[12, 70]], `<path d="${a0}${b}"/>${no(154, y1)}${no(214, y1)}${coil(294, y1)}`)}
        ${lit([[13, 70]], `<path d="${r2}"/>${no(134, y3)}${coil(294, y3)}`)}
        ${lit([[0, 12], [70, 100]], `<path d="${r3}"/>${nc(134, y4)}${coil(294, y4)}`)}
        <text x="54" y="${y1 - 14}">iStart</text><text x="54" y="${y1 - 14}" class="te" opacity="0">iStart${win([[12, 35]], D)}</text>
        <text x="140" y="${y1 - 14}">iStop</text><text x="140" y="${y1 - 14}" class="te" opacity="0">iStop${win([[70, 80]], D)}</text>
        <text x="186" y="${y1 - 14}">iEmergency</text><text x="276" y="${y1 - 14}">Marche</text>
        <text x="50" y="${y2 + 22}">Marche</text>
        <text x="114" y="${y3 - 14}">Marche</text><text x="250" y="${y3 - 14}">oStart_light</text>
        <text x="114" y="${y4 - 14}">Marche</text><text x="254" y="${y4 - 14}">oStop_light</text>
        ${state([[0, 12], [80, 100]], 'ligne à l’arrêt')}${state([[12, 35]], 'appui sur Marche')}
        ${state([[35, 70]], 'auto-maintien')}${state([[70, 80]], 'appui sur Arrêt')}`;
    },

    // Grafcet de la ligne de tri : étape initiale, puis 4 étapes en boucle, un carton à la fois
    grafcet() {
      const D = 8, x = 44, w = 28, h = 20, ys = [12, 52, 92, 132, 172];
      const acts = ['attente', 'chargement · KM1, KM2', 'pesée · tempo 1 s', 'transfert · trieur', 'dégagement · compteur + 1'];
      const trs = ['Marche', 'At_scale', 'Pesee_OK', 'Capteur_cible', '/Capteur_cible'];
      const loop = [[0, 30], [30, 48], [48, 72], [72, 100]];
      let d = '';
      ys.forEach((y, i) => {
        const yt = y + h + 10;
        d += `M${x + w / 2},${y + h}V${i < 4 ? ys[i + 1] : yt + 6} M${x + w / 2 - 7},${yt}h14`;
      });
      d += `M${x + w / 2},${ys[4] + h + 16}H18V${ys[1] - 8}H${x + w / 2}V${ys[1]}`;
      const step = (y, i) => `
        <rect class="stepbox" x="${x}" y="${y}" width="${w}" height="${h}" rx="1"/>
        ${i === 0 ? `<rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}"/>` : ''}
        <text x="${x + 11}" y="${y + 14}">${i}</text>
        <path d="M${x + w},${y + h / 2}h12"/><rect x="${x + w + 12}" y="${y + 2}" width="${f(acts[i].length * 6.2 + 12)}" height="${h - 4}" rx="1"/>
        <text x="${x + w + 18}" y="${y + 14}">${acts[i]}</text>`;
      const steps = ys.map((y, i) => `<g class="k2 nofill">${step(y, i)}</g>`).join('');
      const active = ys.map((y, i) => {
        const anim = i === 0
          ? '<animate attributeName="opacity" values="1;0" keyTimes="0;1" calcMode="discrete" dur="2s" fill="freeze"/>'
          : win([loop[i - 1]], D, 2);
        return `<g class="e nofill step-on" opacity="${i === 0 ? 1 : 0}">${step(y, i)}<circle class="fille" cx="${x + w - 6}" cy="${y + h - 6}" r="2.4"/>${anim}</g>`;
      }).join('');
      const tl = ys.map((y, i) => `<text x="${x + w / 2 + 12}" y="${y + h + 13}" class="tr">${trs[i]}</text>`).join('');
      return `<path class="k2" d="${d}"/>${steps}${active}${tl}`;
    },

    // pupitre de la ligne : voyants, poids brut (×100), compteurs, reset, arrêt d'urgence.
    // Les poids affichés sont ceux lus sur le pupitre dans l'enregistrement ; < 450 → gauche, 450 à 625 → droite.
    pupitre() {
      const D = 12;
      const num = (x, y, iv, v, cls = 'seg') => iv[0][0] === 0 && iv[0][1] === 100
        ? `<text x="${x}" y="${y}" class="${cls}" text-anchor="end">${v}</text>`
        : `<text x="${x}" y="${y}" class="${cls}" text-anchor="end" opacity="0">${v}${win(iv, D)}</text>`;
      const counter = (x, label, vals) => `
        <text x="${x + 2}" y="168">${label}</text>
        <rect class="k2 fillink" x="${x}" y="174" width="80" height="26" rx="3"/>
        ${vals.map(([v, iv]) => num(x + 72, 193, iv, v, 'seg seg--sm')).join('')}`;
      return `
        <rect class="k2 panel" x="24" y="10" width="312" height="202" rx="8"/>
        <circle class="au-ring" cx="66" cy="50" r="24"/><circle class="au" cx="66" cy="50" r="15"/>
        <text x="40" y="90">arrêt d’urgence</text>
        <text x="212" y="32">poids ×100</text>
        <rect class="k2 fillink" x="210" y="38" width="104" height="36" rx="4"/>
        ${num(302, 64, [[0, 14], [24, 34], [44, 54], [64, 100]], '0')}${num(302, 64, [[14, 24]], '368')}
        ${num(302, 64, [[34, 44]], '564')}${num(302, 64, [[54, 64]], '199')}
        <circle class="k2 nofill" cx="70" cy="118" r="15"/><circle class="lamp lamp--start" cx="70" cy="118" r="11" opacity="0">${win([[6, 78]], D)}</circle>
        <circle class="k2 nofill" cx="126" cy="118" r="15"/><circle class="lamp lamp--stop" cx="126" cy="118" r="11" opacity="0">${win([[0, 6], [78, 100]], D)}</circle>
        <circle class="k2 nofill" cx="182" cy="118" r="15"/><circle class="lamp lamp--reset" cx="182" cy="118" r="11"/>
        <circle class="lamp lamp--flash" cx="182" cy="118" r="11" opacity="0">${win([[88, 92]], D)}</circle>
        <text x="50" y="148">marche</text><text x="110" y="148">arrêt</text><text x="166" y="148">reset</text>
        ${counter(40, 'gauche', [['0', [[0, 24], [90, 100]]], ['1', [[24, 64]]], ['2', [[64, 90]]]])}
        ${counter(140, 'devant', [['0', [[0, 100]]]])}
        ${counter(240, 'droite', [['0', [[0, 44], [90, 100]]], ['1', [[44, 90]]]])}`;
    },

    // ligne de tri vue de dessus : S à gauche, M à droite, L tout droit, après 1 s de pesée
    tri() {
      const D = 9, y = 110, x0 = 18, scX = 120, soX = 196;
      const exits = [
        { d: 'V18', len: y - 18, arrow: `M${soX},118V102 M${soX - 6},108l6,-6l6,6` },
        { d: 'V202', len: 202 - y, arrow: `M${soX},102V118 M${soX - 6},112l6,6l6,-6` },
        { d: 'H346', len: 346 - soX, arrow: `M${soX - 8},${y}H${soX + 8} M${soX + 2},${y - 6}l6,6l-6,6` }
      ];
      const box = (s, k, w) => {
        const e = exits[k], stop = ((scX - x0) / (soX - x0 + e.len)).toFixed(3);
        return `
        <rect class="box" x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="2" opacity="0">
          <animateMotion dur="${D}s" begin="${k * 3}s" repeatCount="indefinite" path="M${x0},${y}H${soX}${e.d}" keyPoints="0;${stop};${stop};1;1" keyTimes="0;0.12;0.19;0.32;1" calcMode="linear"/>
          <animate attributeName="opacity" dur="${D}s" begin="${k * 3}s" repeatCount="indefinite" calcMode="discrete" values="1;0" keyTimes="0;0.32"/>
        </rect>
        <text x="${scX - 14}" y="${y + 40}" class="te" opacity="0">${w}<animate attributeName="opacity" dur="${D}s" begin="${k * 3}s" repeatCount="indefinite" calcMode="discrete" values="0;1;0" keyTimes="0;0.12;0.19"/></text>
        <path class="e thick nofill" d="${e.arrow}" opacity="0"><animate attributeName="opacity" dur="${D}s" begin="${k * 3}s" repeatCount="indefinite" calcMode="discrete" values="0;1;0" keyTimes="0;0.19;0.32"/></path>`;
      };
      return `
        <path class="belt" d="M12,${y - 14}H${soX - 14} M12,${y + 14}H${soX - 14}"/>
        <path class="belt" d="M${soX + 14},${y - 14}H348 M${soX + 14},${y + 14}H348"/>
        <path class="belt" d="M${soX - 14},14V${y - 14} M${soX + 14},14V${y - 14}"/>
        <path class="belt" d="M${soX - 14},206V${y + 14} M${soX + 14},206V${y + 14}"/>
        <rect class="scale" x="${scX - 22}" y="${y - 16}" width="44" height="32" rx="2"/>
        <rect class="k2 nofill" x="${soX - 14}" y="${y - 14}" width="28" height="28" rx="2"/>
        <text x="${scX - 20}" y="${y - 22}">balance</text><text x="${soX + 20}" y="${y - 22}">trieur</text>
        <text x="${soX + 22}" y="26">S · gauche</text><text x="${soX + 22}" y="204">M · droite</text><text x="292" y="${y + 30}">L · face</text>
        ${box(10, 0, '8 kg')}${box(14, 1, '10 kg')}${box(19, 2, '15 kg')}`;
    },

    // Modbus TCP, mappage de la scène : capteurs → coils, poids → holding reg 0, actionneurs ← inputs
    modbus() {
      const lanes = [
        { y: 84, dir: 'rl', cls: 'e fille', label: 'coils · capteurs' },
        { y: 124, dir: 'rl', cls: 'e fille', label: 'holding reg · poids' },
        { y: 164, dir: 'lr', cls: 'k fillk', label: 'inputs · actionneurs' }
      ];
      const pk = (l, k) => `<rect class="${l.cls} packet packet--${l.dir}" x="0" y="${l.y - 5}" width="18" height="10" rx="2" style="animation-delay:${f(-k * 0.8 - l.y / 160)}s"/>`;
      return `
        <text x="98" y="24">Modbus TCP · 127.0.0.1:502</text>
        <rect class="k2" x="14" y="44" width="98" height="140" rx="6"/><text x="26" y="68">CODESYS</text><text x="26" y="84">serveur</text>
        <rect class="k2" x="248" y="44" width="98" height="140" rx="6"/><text x="260" y="68">Factory I/O</text><text x="260" y="84">client</text>
        <path class="g" d="${lanes.map(l => `M112,${l.y}H248`).join(' ')}"/>
        ${lanes.map(l => [0, 1, 2].map(k => pk(l, k)).join('') + `<text x="118" y="${l.y - 10}"${l.dir === 'rl' ? ' class="te"' : ''}>${l.label}</text>`).join('')}
        <text x="26" y="168">poids ×100</text>
        <text x="14" y="210">capteurs → automate → moteurs, trieur, voyants</text>`;
    },

    // boucle de régulation PI : le signal fait le tour de la boucle, la réponse rejoint la consigne
    boucle() {
      const loop = 'M18,56H58 M78,56H104 M156,56H186 M244,56H342 M290,56V96H68V66';
      const travel = 'M18,56H186H244H290V96H68V56';
      return `
        <path class="k2" d="${loop}"/>
        <circle class="k2 nofill" cx="68" cy="56" r="10"/><path class="k2" d="M62,56h12 M68,50v12"/>
        <rect class="k2" x="104" y="40" width="52" height="32" rx="3"/><text x="122" y="61">PI</text>
        <rect class="k2" x="186" y="40" width="58" height="32" rx="3"/><text x="198" y="61">H(p)</text>
        <text x="20" y="46">consigne</text><text x="306" y="46">sortie</text><text x="74" y="92">−</text>
        <circle class="e fille" r="4"><animateMotion dur="3s" repeatCount="indefinite" path="${travel}"/></circle>
        <path class="g" d="M30,196H344 M30,118V196"/>
        <path class="m dash" d="M30,138H344"/>
        <path class="e thick reveal" pathLength="1" d="M30,196 C70,196 84,124 120,124 C150,124 160,141 190,138 C220,135 250,138 344,138"/>
        <text x="282" y="130">consigne</text><text x="30" y="214" class="te">erreur statique nulle</text>`;
    }
  };

  /* ---------- Rendu des univers ---------- */
  const vgHTML = (u, v, k) => {
    const id = `vg-${u.id}-${k}`;
    const p = v.open && byId[v.open];
    const tag = p ? 'button' : 'div';
    const attrs = p ? ` type="button" data-open="${p.id}" data-cursor="ouvrir" aria-label="${esc(v.title)} — ouvrir le projet ${esc(p.title)}"` : '';
    return `
      <${tag} class="vg-cell"${attrs}>
        <svg class="vg vg--${v.type}" viewBox="0 0 360 220" aria-hidden="true" focusable="false">${VG[v.type](id)}</svg>
        <span class="vg-cap"><span class="mono">${pad(k + 1)}</span><span class="vg-cap__t"><strong>${esc(v.title)}</strong><span class="vg-cap__l">${esc(v.line)}</span></span>${p ? `<span class="vg-cap__go">${ARROW}</span>` : ''}</span>
      </${tag}>`;
  };

  const cardHTML = (p, u) => `
    <a class="ucard" href="#projet-${p.id}" data-open="${p.id}" data-cursor="ouvrir">
      <span class="ucard__media"><img src="${src(p.cover, 'sm')}" alt="" loading="lazy" decoding="async"></span>
      <span class="ucard__body">
        <span class="ucard__meta mono"><span>${esc(p.frame)}</span><span>${esc(p.year)}</span></span>
        <span class="ucard__title">${esc(p.title)}</span>
        ${p.univers && p.univers[0] !== u.id ? `<span class="ucard__also mono">aussi : ${esc((U.find(x => x.id === p.univers[0]) || {}).short || '')}</span>` : ''}
      </span>
      <span class="ucard__go" aria-hidden="true">${ARROW}</span>
    </a>`;

  function render() {
    const toc = $('.dom-toc');
    if (toc) toc.innerHTML = U.map(u => {
      const n = P.filter(p => (p.univers || []).includes(u.id)).length;
      return `<a href="#${u.id}" class="dom-toc__a"><span class="mono">${u.n}</span><span class="dom-toc__t">${esc(u.title)}</span><span class="mono">${n} projets</span></a>`;
    }).join('');

    U.forEach(u => {
      const el = document.getElementById(u.id);
      if (!el) return;
      const head = $('.dom__head', el), banner = $('.dom__banner', el), list = $('.dom__projects', el);
      if (head) head.innerHTML = `
        <div class="dom__name">
          <span class="mono dom__n">univers ${u.n}</span>
          <h3 class="dom__title" data-split>${esc(u.title)}.</h3>
        </div>
        <div class="dom__about">
          <p class="lead dom__lead" data-reveal>${esc(u.lead)}</p>
          <div class="tags dom__skills" data-reveal>${u.skills.map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div>
        </div>`;
      if (banner) banner.innerHTML = u.vignettes.map((v, k) => vgHTML(u, v, k)).join('');
      if (list) {
        const ps = P.filter(p => (p.univers || []).includes(u.id))
          .sort((a, b) => (a.univers[0] === u.id ? 0 : 1) - (b.univers[0] === u.id ? 0 : 1));
        list.innerHTML = `
          <div class="dom__sub"><h4 class="mono">projets · ${ps.length}</h4><span class="mono">cliquer pour ouvrir</span></div>
          <div class="ucards">${ps.map(p => cardHTML(p, u)).join('')}</div>`;
      }
    });
  }

  // les animations ne tournent que dans les bandes visibles à l'écran
  function liveOnlyWhenVisible() {
    const banners = $$('.dom__banner');
    const set = (b, on) => {
      b.classList.toggle('is-off', !on);
      $$('svg.vg', b).forEach(s => { if (s.pauseAnimations) on ? s.unpauseAnimations() : s.pauseAnimations(); });
    };
    banners.forEach(b => set(b, false));
    if (!('IntersectionObserver' in window)) { banners.forEach(b => set(b, true)); return; }
    const seen = new Map();
    const io = new IntersectionObserver(es => es.forEach(e => { seen.set(e.target, e.isIntersecting); set(e.target, e.isIntersecting && !document.hidden); }), { rootMargin: '120px 0px' });
    banners.forEach(b => io.observe(b));
    document.addEventListener('visibilitychange', () => banners.forEach(b => set(b, !document.hidden && !!seen.get(b))));
  }

  render();
  liveOnlyWhenVisible();
})();
