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
      "5": "https://drive.google.com/file/d/1frXC_1BxSMVT4_7vKE1yXF7M0uhlbcXI/preview",
      "6": "https://drive.google.com/file/d/1coWlp7daQoJ89NwIuOs6_5tUJGHzIgMT/preview",
      "7": "https://drive.google.com/file/d/17THu332ROHkTrxafKua8cXBG98q6wxTt/preview",
      "8": "https://drive.google.com/file/d/1B9tbCACH7DwD1EMnhP-mWVFQN1iHQ3b/preview",
      "9": "https://drive.google.com/file/d/13zcUdijjqj3rabkZcp2PJOcTbpiesty/preview",
      "10": "https://drive.google.com/file/d/16xmxgzZLy0HIP25_nt7DOnsS0RsrGNPa/preview",
      "11": "https://drive.google.com/file/d/1M_8Ld3t-A4nLj-cVadwXTgMkrW1905w0/preview",
      "12": "https://drive.google.com/file/d/1YDwKycqp3Mtr0ICb2GdsyYxfK2tlxppV/preview",
      "13": "https://drive.google.com/file/d/1uOc04h1apo5MmejpRBF3DOT-1sjE8ic0/preview",
      "14": "https://drive.google.com/file/d/1JFNuTB3kYkiSs0nHGb1VU0T7tMvI4T9/preview",
      "15": "https://drive.google.com/file/d/1T09mDlhmvHfiphWR5Cs487t0J-g4BodV/preview",
      "16": "https://drive.google.com/file/d/1rIuRFAapA7_pRpcNr1qO0NrX7RxgKmg7/preview",
      "17": "https://drive.google.com/file/d/1AdUXG5vJv-Dyr0PBas0Qzomq8p9Ai8sY/preview",
      "18": "https://drive.google.com/file/d/1Z0vMMqyGuqq1iwH0szA_0KmDrhAQRhQB/preview",
      "19": "https://drive.google.com/file/d/1fVpCQtX16OHIC95ur5AbYrSyrGbwvyor/preview",
      "20": "https://drive.google.com/file/d/1aogsk8s54sibJdCWrk8YX8SRrcyB7kWM/preview",
      "21": "https://drive.google.com/file/d/1bzvj1XEWgI8O0cKIXZPnzEJ1ZHku_Ilf/preview",
      "22": "https://drive.google.com/file/d/19-Sbg98zm5ZQxNY8WyY2W-_zAQJTqeom/preview",
      "23": "https://drive.google.com/file/d/1kLf0LGuXCYzxerS21eovzkWD43LR-YUP/preview",
      "24": "https://drive.google.com/file/d/13LGfJT7i8fSocN5DFQDqoCO-x_gMe2k2/preview",
      "25": "https://drive.google.com/file/d/1Feot667h59tS6qcz-sRqKdp19A-Yob40/preview",
      "26": "https://drive.google.com/file/d/11xLL1V-c-q4D0YNHO7ZwDrXdFNv8NaKx/preview",
      "27": "https://drive.google.com/file/d/1_TA1DNFLb2YE9NxfLqHv0ltTz6bm8O0G/preview"
    }
  },
  "Overlord": {
    "Temporada 2": {
      "Drive": {
        "1": "https://drive.google.com/file/d/1kK8yop1NzCDp8mrgq9J5dZVg3JCZ7ub3/preview",
        "2": "https://drive.google.com/file/d/1P16PwQysQqiWUnJOPqDJmRccRVBpofD9/preview",
        "3": "https://drive.google.com/file/d/1MH1Eo7vP8gG_SLww2dMG8kOhHMbai4Fc/preview",
        "4": "https://drive.google.com/file/d/1d9Nhkf0eRks1blEnX0G7ivbIiEjPhrV_/preview",
        "5": "https://drive.google.com/file/d/18q_Es_GondQUUjuTseGS7-fz7-Azs6JP/preview",
        "6": "https://drive.google.com/file/d/1bEE6ir4MRvMUlxYX4QQjH8PoWFCKa9sq/preview",
        "7": "https://drive.google.com/file/d/1ssl1_ml8WHMuugflKnzSt6-tcXFJ9G-E/preview",
        "8": "https://drive.google.com/file/d/1zUydQxcQsOQZjZmFzPh9Bc3A8vuhHEAE/preview",
        "9": "https://drive.google.com/file/d/1Qnfd9lqzMmdvToD18GbqswmcKg6GYdUj/preview",
        "10": "https://drive.google.com/file/d/18i5nB5aiQTsDNaJlozaNTXrgv-pJtfY9/preview",
        "11": "https://drive.google.com/file/d/11w4DV_I1LjzISfBmkUWSHrb1-gtPr5fa/preview",
        "12": "https://drive.google.com/file/d/1eIJzpEFhT1RN7hcbZwpINdmFdOQLS816/preview",
        "13": "https://drive.google.com/file/d/15R1emgj95_zWxqF1tFJs0HFfXFgB00XG/preview"
      }
    }
  }
};

/* ═══ ÍCONOS POR SERVIDOR ═══ */
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

/* ═══ UTILIDADES ═══ */
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
  { title: "Blue Exorcist", genres: ["Action","Supernatural","Fantasy"], episodes: 27, score: "7.8", cover: "https://img.anili.st/media/9919" },
  { title: "Overlord", genres: ["Action","Adventure","Fantasy"], episodes: 52, score: "8.0", cover: "https://img.anili.st/media/20832" },
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

/* ═══ MODAL DE ANIME (con soporte de temporadas) ═══ */
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

  // Detectar si tiene temporadas
  const firstKey = Object.keys(animeLinks)[0];
  const firstValue = animeLinks[firstKey];
  const isSeasons = typeof firstValue === 'object' 
                 && !Array.isArray(firstValue)
                 && typeof Object.values(firstValue)[0] === 'object';

  modalContent.innerHTML = `
    <img class="modalCover" src="${esc(a.cover)}" alt="" onerror="this.style.display='none'">
    <h2>${esc(a.title)}</h2>
    <p>⭐ ${esc(a.score || '—')} &nbsp; • &nbsp; ${esc((a.genres||[]).join(', '))}</p>
    <div class="watchOptions">
      <h3 class="watchTitle">▶ Ver episodios</h3>
      <div id="seasonTabsBox"></div>
      <div id="serverTabsBox"></div>
      <div class="episodes" id="episodesBox"></div>
      <div id="playerBox"></div>
    </div>`;

  function showServers(linksObj){
    const servers = Object.keys(linksObj);
    const serverBox = document.getElementById('serverTabsBox');
    if (!serverBox) return;

    serverBox.innerHTML = `
      <div class="serverTabs">
        ${servers.map((srv, i) => `
          <button class="serverTab${i===0?' active':''}" data-server="${esc(srv)}">
            ${serverIcon(srv)} ${esc(srv)}
          </button>
        `).join('')}
      </div>`;
    showEpisodes(linksObj[servers[0]], servers[0]);

    serverBox.querySelectorAll('.serverTab').forEach(btn => {
      btn.onclick = () => {
        serverBox.querySelectorAll('.serverTab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showEpisodes(linksObj[btn.dataset.server], btn.dataset.server);
      };
    });
  }

  function showEpisodes(epsObj, serverName){
    const box = document.getElementById('episodesBox');
    if (!box) return;
    const keys = Object.keys(epsObj).sort((x,y) => Number(x) - Number(y));
    if (!keys.length){
      box.innerHTML = `<p class="noLinks">No hay episodios en ${esc(serverName)}.</p>`;
      return;
    }
    box.innerHTML = keys.map(num => `
      <button class="episode" data-link="${esc(epsObj[num])}" data-num="${esc(num)}">
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

  // Si tiene temporadas
  if (isSeasons){
    const seasons = Object.keys(animeLinks);
    const seasonBox = document.getElementById('seasonTabsBox');
    seasonBox.innerHTML = `
      <div class="seasonTabs">
        ${seasons.map((s, i) => `
          <button class="seasonTab${i===0?' active':''}" data-season="${esc(s)}">
            🎬 ${esc(s)}
          </button>
        `).join('')}
      </div>`;
    showServers(animeLinks[seasons[0]]);

    seasonBox.querySelectorAll('.seasonTab').forEach(btn => {
      btn.onclick = () => {
        seasonBox.querySelectorAll('.seasonTab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showServers(animeLinks[btn.dataset.season]);
      };
    });
  } else {
    showServers(animeLinks);
  }

  modal.classList.remove('hidden');
}

/* ═══ Cerrar modal ═══ */
document.getElementById('closeModal').onclick = () => modal.classList.add('hidden');
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.add('hidden'); });

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

    // Quitar duplicados
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
