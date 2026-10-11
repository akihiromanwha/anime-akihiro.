/* ════════════════════════════════════════════════════════════
   ANIMEAKHIRODAIKY — app.js
   © 2026 AnimeAkihiroDaiky — Todos los derechos reservados
   GitHub: https://github.com/akihiromanwha
   ════════════════════════════════════════════════════════════ */

const searchInput = document.getElementById('searchInput');
const animeGrid   = document.getElementById('animeGrid');
const statusEl    = document.getElementById('status');
const genreFilter = document.getElementById('genreFilter');
const sectionTitle= document.getElementById('sectionTitle');
const modal       = document.getElementById('modal');
const modalContent= document.getElementById('modalContent');

/* ═══ LINKS DE SERVIDORES (USO PERSONAL) ═══ */
const LINKS = {
   "Blue Exorcist": {
    "Drive": {
      "1": "https://drive.google.com/file/d/1Pw-etcZRlrayTsEY1VPvOZf09YcyLDmF/preview",
      "2": "https://drive.google.com/file/d/1XEOvRpbEGPrRVNhAEn5acpJ9VA8r0F8L/preview",
      "3": "https://drive.google.com/file/d/1DQzgaCH0OnCwDGgVJHACrvH_ooN_ZeQf/preview",
      "4": "https://drive.google.com/file/d/18U03kcXEcnpVeJHHYt_AlBAI9rhynYkk/preview",
      "5": "https://drive.google.com/file/d/1frXC_lBxSMVT4_7vkE1yXF7M0uhlbCxI/preview",
      "6": "https://drive.google.com/file/d/1coWHp7daQoj89NwIuUs6_5tUJGHzIgMT/preview",
      "7": "https://drive.google.com/file/d/17THu33ZROHKTrxaFkua8cXBG98qGwxTt/preview",
      "8": "https://drive.google.com/file/d/1B9tbCACH7DwDiEMnhP-mMVVFONliHQ3b/preview",
      "9": "https://drive.google.com/file/d/13zcUdiJjqj3rabkZcp2PJOcTbpiiestY/preview",
      "10": "https://drive.google.com/file/d/16xmxgzZly0HiP25_nt7DoNsS0RsrGNPu/preview",
      "11": "https://drive.google.com/file/d/1M_8Ld3t-A4nLj-cVadwXTgMkrWl9O5w0/preview",
      "12": "https://drive.google.com/file/d/1YDwKyqcp3mTr0ICb2GdsyYxfK2tlxppV/preview",
      "13": "https://drive.google.com/file/d/1uOc04h1apo5MmejpRBF3D0T-lsjE8ic0/preview",
      "14": "https://drive.google.com/file/d/1JFNutB3kYkis5OnHGblVVu0T7tMvi4T9/preview",
      "15": "https://drive.google.com/file/d/1T09mDlhmvHfipHWr5Cs487t0J-g4BodV/preview",
      "16": "https://drive.google.com/file/d/1rluRFAapA7_pRpcNr1qO0NrX7RxgKmg7/preview",
      "17": "https://drive.google.com/file/d/1AdUXG5vJv_Dyr0PBas0Qzomq8p9Ai0sY/preview",
      "18": "https://drive.google.com/file/d/1Z0vMMqyGuqg1iwH0szA_OKmDrhAQRhQB/preview",
      "19": "https://drive.google.com/file/d/1FVpCQtXl6OHIC95ur5AbYrSyrGBvwyor/preview",
      "20": "https://drive.google.com/file/d/1aogsK8s54sibJdCWrk8YX8SRrcyB7kWM/preview",
      "21": "https://drive.google.com/file/d/1bzvj1XEWgI8Q0CKIXZPnzEJ1ZHku_ILf/preview",
      "22": "https://drive.google.com/file/d/19-Sbg98zm5ZQxNY8WyY2W-_zAQJTqeom/preview",
      "23": "https://drive.google.com/file/d/1kLFOLGuXCYzxerS21eovzkWD43LR-YUP/preview",
      "24": "https://drive.google.com/file/d/13LGfJT7i8fSocN5DFQDQoCO-x_gMe2k2/preview",
      "25": "https://drive.google.com/file/d/1Feot667h59Ts6qcZ-sRqKdp19A-Yob4O/preview",
      "26": "https://drive.google.com/file/d/11xLLlV-c-q4D0YNHO7ZwDrXdFNv8NaKx/preview",
      "27": "https://drive.google.com/file/d/1_TA1DNFLb2YE9NxfLqHv0ltTz6bm8OCG/preview"
    }  
  }
};

const SERVER_ICONS = {
  "terabox": "🟦", "drive": "🟢", "mega": "🟥",
  "mediafire": "🟠", "netu": "🟣", "default": "🎬"
};
function serverIcon(name){
  const k = name.toLowerCase();
  for (const [key, icon] of Object.entries(SERVER_ICONS)){
    if (k.includes(key)) return icon;
  }
  return SERVER_ICONS.default;
}

function normalize(s){
  return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
function esc(s){
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function getAnimeLinks(title){
  if (!title) return null;
  if (LINKS[title]) return LINKS[title];
  const n = normalize(title);
  for (const [k, v] of Object.entries(LINKS)){
    if (normalize(k) === n) return v;
  }
  return null;
}

/* ═══ ANIMES PERSONALIZADOS ═══ */
const CUSTOM_ANIME = [
  { title: "Blue Exorcist", genres: ["Action","Supernatural","Fantasy"], episodes: 25, score: "7.8", cover: "https://img.anili.st/media/9919" },
  { title: "Ranma 1/2", genres: ["Comedy","Romance","Action"], episodes: 161, score: "7.7", cover: "https://img.anili.st/media/210" },
  { title: "Bleach", genres: ["Action","Adventure","Supernatural"], episodes: 366, score: "7.9", cover: "https://img.anili.st/media/269" },
  { title: "Inuyasha", genres: ["Action","Adventure","Romance"], episodes: 167, score: "7.6", cover: "https://img.anili.st/media/249" },
  { title: "Hunter x Hunter", genres: ["Action","Adventure","Fantasy"], episodes: 148, score: "9.0", cover: "https://img.anili.st/media/11061" },
  { title: "Fullmetal Alchemist: Brotherhood", genres: ["Action","Adventure","Drama"], episodes: 64, score: "9.1", cover: "https://img.anili.st/media/5114" },
  { title: "Death Note", genres: ["Mystery","Psychological","Thriller"], episodes: 37, score: "8.6", cover: "https://img.anili.st/media/1535" },
  { title: "Tokyo Ghoul", genres: ["Action","Horror","Supernatural"], episodes: 12, score: "7.8", cover: "https://img.anili.st/media/20605" }
];

let catalog = [];
let catalogAnime = [];

const fallback = [
  {title:'Naruto',genres:['Action','Adventure'],episodes:220,score:8.1,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-9zXJ6z0g7n8R.jpg'},
  {title:'One Piece',genres:['Action','Adventure'],episodes:1100,score:8.7,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-0pQwJfYc7m9L.jpg'},
  {title:'Attack on Titan',genres:['Action','Drama'],episodes:89,score:9.0,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-8mQ2vR6sK1pL.jpg'}
];

/* ═══ RENDER ═══ */
function render(list){
  animeGrid.innerHTML = '';
  if(!list.length){
    animeGrid.innerHTML = '<p style="padding:1rem;color:#a0a0a0;">No encontramos ese título. Prueba otro nombre.</p>';
    return;
  }
  list.forEach((a,i)=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="cover" src="${esc(a.cover)}" alt="${esc(a.title)}" onerror="this.style.display='none'">
      <div class="cardBody">
        <div class="title">${esc(a.title)}</div>
        <div class="meta">${esc((a.genres||[]).slice(0,2).join(' • '))} ${a.episodes?`• ${a.episodes} eps.`:''}</div>
        <button data-index="${i}">Ver episodios</button>
      </div>`;
    card.querySelector('button').onclick = () => openAnime(a);
    animeGrid.appendChild(card);
  });
}

function applyFilters(){
  const q = normalize(searchInput.value);
  const g = normalize(genreFilter.value);
  const filtered = catalog.filter(a => {
    const text = normalize([a.title, ...(a.genres||[])].join(' '));
    return (!q || text.includes(q)) && (!g || (a.genres||[]).some(x => normalize(x) === g));
  });
  sectionTitle.textContent = q ? `Resultados para "${searchInput.value}"` : 'Animes populares';
  statusEl.textContent = `${filtered.length} anime${filtered.length===1?'':'s'} encontrado${filtered.length===1?'':'s'}.`;
  render(filtered);
}

function fillGenres(){
  const set = new Set();
  catalog.forEach(a => (a.genres||[]).forEach(g => set.add(g)));
  [...set].sort().forEach(g => {
    const o = document.createElement('option');
    o.value = g; o.textContent = g;
    genreFilter.appendChild(o);
  });
}

/* ═══ MODAL DE ANIME ═══ */
function openAnime(a){
  const animeLinks = getAnimeLinks(a.title);

  if (!animeLinks || !Object.keys(animeLinks).length){
    modalContent.innerHTML = `
      <img class="modalCover" src="${esc(a.cover)}" alt="" onerror="this.style.display='none'">
      <h2>${esc(a.title)}</h2>
      <p>⭐ ${esc(a.score || '—')} &nbsp; • &nbsp; ${esc((a.genres||[]).join(', '))}</p>
      <div class="watchOptions">
        <h3 class="watchTitle">▶ Ver episodios</h3>
        <p class="noLinks">Este anime aún no tiene links configurados.<br>
        Agrégalo en <code>LINKS</code> dentro de <code>app.js</code>.</p>
      </div>`;
    modal.classList.remove('hidden');
    return;
  }

  const servers = Object.keys(animeLinks);
  modalContent.innerHTML = `
    <img class="modalCover" src="${esc(a.cover)}" alt="" onerror="this.style.display='none'">
    <h2>${esc(a.title)}</h2>
    <p>⭐ ${esc(a.score || '—')} &nbsp; • &nbsp; ${esc((a.genres||[]).join(', '))}</p>
    <div class="watchOptions">
      <h3 class="watchTitle">▶ Elegir servidor</h3>
      <div class="serverTabs">
        ${servers.map((srv, i) => `
          <button class="serverTab${i===0?' active':''}" data-server="${esc(srv)}">
            ${serverIcon(srv)} ${esc(srv)}
          </button>
        `).join('')}
      </div>
      <div class="episodes" id="episodesBox"></div>
      <div id="playerBox"></div>
    </div>
  `;

  renderEpisodes(servers[0]);

  modalContent.querySelectorAll('.serverTab').forEach(btn => {
    btn.onclick = () => {
      // 🔇 Detener video anterior al cambiar de servidor
      const player = document.getElementById('playerBox');
      if (player) player.innerHTML = '';

      modalContent.querySelectorAll('.serverTab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEpisodes(btn.dataset.server);
    };
  });

  function renderEpisodes(serverName){
    const box = document.getElementById('episodesBox');
    if (!box) return;
    const eps = animeLinks[serverName] || {};
    const keys = Object.keys(eps).sort((x,y) => Number(x) - Number(y));

    if (!keys.length){
      box.innerHTML = `<p class="noLinks">No hay episodios en ${esc(serverName)}.</p>`;
      return;
    }

    box.innerHTML = keys.map(num => `
      <button class="episode" data-link="${esc(eps[num])}" data-num="${esc(num)}">
        Episodio ${esc(num)}
      </button>
    `).join('');

    box.onclick = (e) => {
      const btn = e.target.closest('.episode');
      if (!btn) return;
      const link = btn.dataset.link;
      const num  = btn.dataset.num;
      let player = document.getElementById('playerBox');
      if (!player){
        player = document.createElement('div');
        player.id = 'playerBox';
        if (box.parentNode) box.parentNode.insertBefore(player, box.nextSibling);
      }

      // 🔇 Detener el video anterior antes de poner el nuevo
      player.innerHTML = '';

      if (link.includes('drive.google.com')){
        const match = link.match(/\/d\/([^/]+)/);
        const id = match ? match[1] : '';
        player.innerHTML = `
          <div class="playerHeader">
            <span>▶ Episodio ${esc(num)}</span>
            <button class="closePlayer" onclick="document.getElementById('playerBox').innerHTML=''">✕</button>
          </div>
          <iframe src="https://drive.google.com/file/d/${id}/preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
      } else {
        window.open(link, '_blank', 'noopener');
      }
    };
  }

  modal.classList.remove('hidden');
}

/* ═══ CERRAR MODAL (detiene el video) ═══ */
function cerrarModal(){
  const player = document.getElementById('playerBox');
  if (player) player.innerHTML = '';      // 🔇 destruye el iframe → corta el audio
  modalContent.innerHTML = '';             // limpia el contenido del modal
  modal.classList.add('hidden');
}

document.getElementById('closeModal').onclick = cerrarModal;
modal.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarModal(); });

/* ═══ EVENTOS ═══ */
searchInput.addEventListener('input', applyFilters);
genreFilter.addEventListener('change', applyFilters);
document.getElementById('heroListBtn').onclick = () => { searchInput.focus(); };
document.getElementById('themeBtn').onclick = () => { document.body.classList.toggle('light'); };

/* ═══ CARGA DEL CATÁLOGO ═══ */
async function loadCatalog(){
  statusEl.textContent = 'Cargando catálogo...';
  try {
    const query = `query ($page: Int) { Page(page: $page, perPage: 50) { media(type: ANIME, sort: POPULARITY_DESC) { id title { romaji english native } genres episodes averageScore coverImage { large } } } }`;

    const animeTodas = [];
    for (const p of [1, 2]){
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { page: p } })
      });
      const data = await res.json();
      animeTodas.push(...(data?.data?.Page?.media || []));
      await new Promise(r => setTimeout(r, 700));
    }

    catalogAnime = animeTodas.map(x => ({
      title: x.title?.english || x.title?.romaji || x.title?.native || 'Anime',
      genres: x.genres || [],
      episodes: x.episodes || 0,
      score: x.averageScore ? (x.averageScore/10).toFixed(1) : '—',
      cover: x.coverImage?.large || ''
    })).filter(x => x.title);

    catalogAnime = [...CUSTOM_ANIME, ...catalogAnime];

    const vistos = new Set();
    catalogAnime = catalogAnime.filter(a => {
      if (vistos.has(a.title)) return false;
      vistos.add(a.title);
      return true;
    });

    catalog = catalogAnime;
  } catch(e) {
    console.error('Error cargando catálogo:', e);
    catalog = [...CUSTOM_ANIME, ...fallback];
    statusEl.textContent = 'Catálogo de respaldo cargado.';
  }

  fillGenres();
  applyFilters();
}
loadCatalog();
