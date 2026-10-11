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

/* ═══ PROXY MANGADEX ═══ */
const PROXY_URL = 'https://mangadex-proxy-ten.vercel.app';

async function fetchMangaDex(endpoint){
  const url = `${PROXY_URL}/api/proxy?url=${encodeURIComponent(endpoint)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
  return await res.json();
}

/* ═══ LINKS DE SERVIDORES (USO PERSONAL) ═══ */
const LINKS = {
  "Blue Exorcist": {
    "Drive": {
      "1": "https://drive.google.com/file/d/1Pw-etcZRlrayTsEY1VPvOZf09YcyLDmF/preview",
      "2": "https://drive.google.com/file/d/1XEOvRpbEGPrRVNhAEn5acpJ9VA8r0F8L/preview",
      "3": "https://drive.google.com/file/d/1DQzgaCH0OnCwDGgVJHACrvH_ooN_ZeQf/preview",
      "4": "https://drive.google.com/file/d/18U03kcXEcnpVeJHHYt_AlBAI9rhynYkk/preview"
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

/* ═══ MANHWAS PERSONALIZADOS ═══ */
const CUSTOM_MANHWA = [];

let currentType = 'anime';
let catalogAnime = [];
let catalogManhwa = [];
let catalog = [];

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
        <div class="meta">${esc((a.genres||[]).slice(0,2).join(' • '))} ${a.episodes?`• ${a.episodes} ${currentType === 'anime' ? 'eps.' : 'caps.'}`:''}</div>
        <button data-index="${i}">${currentType === 'anime' ? 'Ver episodios' : 'Leer'}</button>
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
  sectionTitle.textContent = q
    ? `Resultados para "${searchInput.value}"`
    : (currentType === 'anime' ? 'Animes populares' : 'Manhwas populares');
  statusEl.textContent = `${filtered.length} ${currentType === 'anime' ? 'anime' : 'manhwa'}${filtered.length===1?'':'s'} encontrado${filtered.length===1?'':'s'}.`;
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
  if (a.source === 'mangadex'){
    openMangaReader(a);
    return;
  }

  const animeLinks = getAnimeLinks(a.title);

  if (!animeLinks || !Object.keys(animeLinks).length){
    modalContent.innerHTML = `
      <img class="modalCover" src="${esc(a.cover)}" alt="" onerror="this.style.display='none'">
      <h2>${esc(a.title)}</h2>
      <p>⭐ ${esc(a.score || '—')} &nbsp; • &nbsp; ${esc((a.genres||[]).join(', '))}</p>
      <div class="watchOptions">
        <h3 class="watchTitle">▶ Ver ${currentType === 'anime' ? 'episodios' : 'capítulos'}</h3>
        <p class="noLinks">Este título aún no tiene links configurados.<br>
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

/* ═══ LECTOR DE MANHWA (MangaDex) ═══ */
async function openMangaReader(manga){
  const proxify = (url) => `${PROXY_URL}/api/proxy?url=${encodeURIComponent(url)}`;

  modalContent.innerHTML = `
    <img class="modalCover" src="${esc(manga.cover)}" alt="" onerror="this.style.display='none'">
    <h2>${esc(manga.title)}</h2>
    <p>${esc(manga.score)} ${manga.genres.length ? '• '+esc(manga.genres.slice(0,3).join(', ')) : ''}</p>
    <div class="watchOptions">
      <h3 class="watchTitle">▶ Capítulos</h3>
      <div class="episodes" id="chaptersList">
        <p class="noLinks">Cargando capítulos...</p>
      </div>
      <div id="mangaReaderBox"></div>
    </div>`;
  modal.classList.remove('hidden');

  try {
    const feed = await fetchMangaDex(
      `https://api.mangadex.org/manga/${manga.id}/feed?translatedLanguage[]=es-la&translatedLanguage[]=es&translatedLanguage[]=en&order[chapter]=asc&limit=500&includeExternalUrl=0`
    );
    const chapters = (feed.data || []).filter(ch => !ch.attributes.externalUrl);

    if (!chapters.length){
      document.getElementById('chaptersList').innerHTML =
        '<p class="noLinks">No hay capítulos disponibles.</p>';
      return;
    }

    const listEl = document.getElementById('chaptersList');
    listEl.innerHTML = chapters.map(ch => `
      <button class="episode" data-chapter-id="${ch.id}">
        Cap. ${ch.attributes.chapter || '?'} ${ch.attributes.translatedLanguage ? '('+ch.attributes.translatedLanguage+')' : ''}
      </button>
    `).join('');

    listEl.onclick = async (e) => {
      const btn = e.target.closest('.episode');
      if (!btn) return;
      const chapterId = btn.dataset.chapterId;
      const readerBox = document.getElementById('mangaReaderBox');
      readerBox.innerHTML = '<p style="padding:1rem;text-align:center;color:#a0a0a0;">Cargando páginas...</p>';

      try {
        const serverData = await fetchMangaDex(`https://api.mangadex.org/at-home/server/${chapterId}`);
        const baseUrl = serverData.baseUrl;
        const hash = serverData.chapter.hash;
        const useSaver = serverData.chapter.dataSaver && serverData.chapter.dataSaver.length;
        const pages = useSaver ? serverData.chapter.dataSaver : serverData.chapter.data;
        const folder = useSaver ? 'data-saver' : 'data';

        const imageUrls = pages.map(filename => proxify(`${baseUrl}/${folder}/${hash}/${filename}`));

        readerBox.innerHTML = `
          <div class="playerHeader" style="margin-top:1rem;">
            <span>📖 ${btn.textContent.trim()}</span>
            <button class="closePlayer" onclick="document.getElementById('mangaReaderBox').innerHTML=''">✕</button>
          </div>
          <div class="mangaPages">
            ${imageUrls.map(url => `<img src="${esc(url)}" loading="lazy" alt="Página">`).join('')}
          </div>`;
      } catch (err) {
        readerBox.innerHTML = '<p class="noLinks">Error al cargar las páginas.</p>';
        console.error(err);
      }
    };
  } catch (err) {
    document.getElementById('chaptersList').innerHTML =
      '<p class="noLinks">Error al cargar los capítulos.</p>';
    console.error(err);
  }
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
    const query = `query ($page: Int, $type: MediaType) { Page(page: $page, perPage: 50) { media(type: $type, sort: POPULARITY_DESC) { id title { romaji english native } genres episodes chapters averageScore coverImage { large } } } }`;

    const animeTodas = [];
    for (const p of [1, 2]){
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { page: p, type: 'ANIME' } })
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

    // Manhwas desde MangaDex (portadas por proxy)
    try {
      const mangaRes = await fetchMangaDex(
        'https://api.mangadex.org/manga?limit=50&includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&originalLanguage[]=ko&hasAvailableChapters=true'
      );
      const mangas = mangaRes.data || [];
      const proxify = (url) => `${PROXY_URL}/api/proxy?url=${encodeURIComponent(url)}`;

      const deMangaDex = mangas.map(x => {
        const coverRel = (x.relationships || []).find(r => r.type === 'cover_art');
        const coverRaw = coverRel
          ? `https://uploads.mangadex.org/covers/${x.id}/${coverRel.attributes.fileName}.256.jpg`
          : '';
        return {
          id: x.id,
          title: x.attributes.title.en || x.attributes.title.ja || Object.values(x.attributes.title)[0] || 'Manhwa',
          genres: (x.attributes.tags || []).map(t => t.attributes.name.en).filter(Boolean),
          episodes: 0,
          score: x.attributes.year ? String(x.attributes.year) : '',
          cover: coverRaw ? proxify(coverRaw) : '',
          source: 'mangadex'
        };
      }).filter(x => x.title);

      catalogManhwa = [...CUSTOM_MANHWA, ...deMangaDex];
    } catch (err){
      console.error('MangaDex error:', err);
      catalogManhwa = [...CUSTOM_MANHWA];
    }

    const limpiar = arr => {
      const vistos = new Set();
      return arr.filter(a => {
        if (vistos.has(a.title)) return false;
        vistos.add(a.title);
        return true;
      });
    };
    catalogAnime = limpiar(catalogAnime);
    catalogManhwa = limpiar(catalogManhwa);
    catalog = catalogAnime;

  } catch(e) {
    console.error('Error cargando catálogo:', e);
    catalogAnime = [...CUSTOM_ANIME, ...fallback];
    catalogManhwa = [...CUSTOM_MANHWA];
    catalog = catalogAnime;
    statusEl.textContent = 'Catálogo de respaldo cargado.';
  }

  fillGenres();
  applyFilters();

  document.querySelectorAll('.typeTab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.typeTab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tipo = tab.dataset.type;
      catalog = tipo === 'anime' ? catalogAnime : catalogManhwa;
      currentType = tipo;
      searchInput.value = '';
      genreFilter.innerHTML = '<option value="">Todos los géneros</option>';
      fillGenres();
      applyFilters();
    };
  });
}
loadCatalog();
