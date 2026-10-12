/* ════════════════════════════════════════════════════════════
   ANIMEAKHIRODAIKY — app.js
   © 2026 AnimeAkihiroDaiky — Todos los derechos reservados
   GitHub: https://github.com/akihiromanwha
   ════════════════════════════════════════════════════════════ */

const searchInput = document.getElementById('searchInput');
const animeGrid   = document.getElementById('animeGrid');
const statusEl    = document.getElementById('status');
const genreFilter = document.getElementById('genreFilter');
const yearFilter  = document.getElementById('yearFilter');
const sectionTitle= document.getElementById('sectionTitle');
const resultsCount= document.getElementById('resultsCount');
const modal       = document.getElementById('modal');
const modalContent= document.getElementById('modalContent');

/* ═══ Filtros activos ═══ */
let activeSeason = '';
let activeDay = '';

/* ═══ HERO ═══ */
const HERO_IMAGES = [
  "https://img.anili.st/media/9919",
  "https://img.anili.st/media/20832",
  "https://img.anili.st/media/210",
  "https://img.anili.st/media/20605",
  "https://img.anili.st/media/269",
  "https://img.anili.st/media/11061"
];

(function initHero(){
  let idx = 0;
  let useA = true;
  function swap(){
    const a = document.getElementById('heroBgA');
    const b = document.getElementById('heroBgB');
    if (!a || !b) return;
    const img = HERO_IMAGES[idx];
    if (useA){
      a.style.backgroundImage = `url(${img})`;
      a.classList.add('active');
      b.classList.remove('active');
    } else {
      b.style.backgroundImage = `url(${img})`;
      b.classList.add('active');
      a.classList.remove('active');
    }
    useA = !useA;
    idx = (idx + 1) % HERO_IMAGES.length;
  }
  swap();
  setInterval(swap, 5500);
})();

/* ═══ Toggle del panel de filtros ═══ */
const toggleFilters = document.getElementById('toggleFilters');
const filterPanel = document.getElementById('filterPanel');
if (toggleFilters && filterPanel){
  toggleFilters.onclick = () => {
    toggleFilters.classList.toggle('open');
    filterPanel.classList.toggle('open');
  };
}

/* ═══ LINKS DE SERVIDORES ═══ */
const LINKS = {
  "Blue Exorcist": {
    "Terabox": { "1": "AQUI_LINK_TERABOX_EP1", "2": "AQUI_LINK_TERABOX_EP2" },
    "Mega": { "1": "AQUI_LINK_MEGA_EP1" },
    "Mediafire": { "1": "AQUI_LINK_MEDIAFIRE_EP1" }
  },
  "Overlord": {
    "Temporada 2": {
      "Terabox": { "1": "AQUI_LINK_TERABOX_T2_EP1" },
      "Mega": { "1": "AQUI_LINK_MEGA_T2_EP1" },
      "Mediafire": { "1": "AQUI_LINK_MEDIAFIRE_T2_EP1" }
    }
  }
};

const SERVER_ICONS = {
  "terabox":   "🟦",
  "mega":      "🟥",
  "mediafire": "🟠",
  "netu":      "🟣",
  "pixeldrain":"⚫",
  "default":   "🎬"
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

/* ═══ Días de la semana ═══ */
const DAY_NAMES = {
  0: 'Dom', 1: 'Lun', 2: 'Mar', 3: 'Mié',
  4: 'Jue', 5: 'Vie', 6: 'Sáb'
};

/* ═══ Estaciones ═══ */
const SEASON_NAMES = {
  WINTER: 'Invierno',
  SPRING: 'Primavera',
  SUMMER: 'Verano',
  FALL:   'Otoño'
};

/* ═══ Animes personalizados ═══ */
const CUSTOM_ANIME = [
  { title: "Blue Exorcist", genres: ["Action","Supernatural","Fantasy"], episodes: 27, score: "7.8", cover: "https://img.anili.st/media/9919", season: "SPRING", year: 2024, day: 5 },
  { title: "Overlord", genres: ["Action","Adventure","Fantasy"], episodes: 52, score: "8.0", cover: "https://img.anili.st/media/20832", season: "SUMMER", year: 2015, day: 2 },
  { title: "Ranma 1/2", genres: ["Comedy","Romance","Action"], episodes: 161, score: "7.7", cover: "https://img.anili.st/media/210", season: "SPRING", year: 1989, day: 6 },
  { title: "Bleach", genres: ["Action","Adventure","Supernatural"], episodes: 366, score: "7.9", cover: "https://img.anili.st/media/269", season: "FALL", year: 2004, day: 2 },
  { title: "Inuyasha", genres: ["Action","Adventure","Romance"], episodes: 167, score: "7.6", cover: "https://img.anili.st/media/249", season: "FALL", year: 2000, day: 6 },
  { title: "Hunter x Hunter", genres: ["Action","Adventure","Fantasy"], episodes: 148, score: "9.0", cover: "https://img.anili.st/media/11061", season: "FALL", year: 2011, day: 0 },
  { title: "Fullmetal Alchemist: Brotherhood", genres: ["Action","Adventure","Drama"], episodes: 64, score: "9.1", cover: "https://img.anili.st/media/5114", season: "SPRING", year: 2009, day: 0 },
  { title: "Death Note", genres: ["Mystery","Psychological","Thriller"], episodes: 37, score: "8.6", cover: "https://img.anili.st/media/1535", season: "FALL", year: 2006, day: 3 },
  { title: "Tokyo Ghoul", genres: ["Action","Horror","Supernatural"], episodes: 12, score: "7.8", cover: "https://img.anili.st/media/20605", season: "SUMMER", year: 2014, day: 4 }
];

let catalog = [];
let catalogAnime = [];

const fallback = [
  {title:'Naruto',genres:['Action','Adventure'],episodes:220,score:8.1,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-9zXJ6z0g7n8R.jpg'},
  {title:'One Piece',genres:['Action','Adventure'],episodes:1100,score:8.7,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-0pQwJfYc7m9L.jpg'},
  {title:'Attack on Titan',genres:['Action','Drama'],episodes:89,score:9.0,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-8mQ2vR6sK1pL.jpg'}
];

/* ═══ Render ═══ */
function render(list){
  animeGrid.innerHTML = '';
  if(!list.length){
    animeGrid.innerHTML = '<p style="padding:1rem;color:#a0a0a0;">No encontramos resultados con esos filtros.</p>';
    return;
  }
  list.forEach((a,i)=>{
    const card = document.createElement('article');
    card.className = 'card';
    const dayBadge = (a.day !== undefined && a.day !== null) 
      ? `<span class="dayBadge">${DAY_NAMES[a.day] || ''}</span>` 
      : '';
    const yearInfo = a.year ? ` • ${a.year}` : '';
    card.innerHTML = `
      ${dayBadge}
      <img class="cover" src="${esc(a.cover)}" alt="${esc(a.title)}" onerror="this.style.display='none'">
      <div class="cardBody">
        <div class="title">${esc(a.title)}</div>
        <div class="meta">${esc((a.genres||[]).slice(0,2).join(' • '))}${yearInfo} ${a.episodes?`• ${a.episodes} eps.`:''}</div>
        <button data-index="${i}">Ver episodios</button>
      </div>`;
    card.querySelector('button').onclick = () => openAnime(a);
    animeGrid.appendChild(card);
  });
}

/* ═══ Aplicar filtros ═══ */
function applyFilters(){
  const q = normalize(searchInput.value);
  const g = normalize(genreFilter.value);
  const y = yearFilter.value;
  const s = activeSeason;
  const d = activeDay;

  const filtered = catalog.filter(a => {
    const text = normalize([a.title, ...(a.genres||[])].join(' '));
    if (q && !text.includes(q)) return false;
    if (g && !(a.genres||[]).some(x => normalize(x) === g)) return false;

    if (y){
      if (y === '2010'){ if (!a.year || a.year < 2010 || a.year > 2014) return false; }
      else if (y === '2005'){ if (!a.year || a.year < 2005 || a.year > 2009) return false; }
      else if (y === '2000'){ if (!a.year || a.year >= 2005) return false; }
      else { if (String(a.year) !== String(y)) return false; }
    }

    if (s && a.season !== s) return false;
    if (d !== '' && Number(a.day) !== Number(d)) return false;

    return true;
  });

  sectionTitle.textContent = q ? `Resultados para "${searchInput.value}"` : 'Animes populares';
  if (resultsCount){
    resultsCount.textContent = `${filtered.length} resultado${filtered.length===1?'':'s'}`;
  }
  statusEl.textContent = '';
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

/* ═══ Modal de anime ═══ */
function openAnime(a){
  const animeLinks = getAnimeLinks(a.title);

  if (!animeLinks || !Object.keys(animeLinks).length){
    modalContent.innerHTML = `
      <div class="playerTopBar">
        <span class="playerIcon">🎬</span>
        <span class="playerTitle">${esc(a.title)}</span>
      </div>
      <div class="modalBody">
        <div class="animeInfo">
          <img class="animeInfoCover" src="${esc(a.cover)}" alt="" onerror="this.style.display='none'">
          <div class="animeInfoText">
            <h3>${esc(a.title)}</h3>
            <p class="infoMeta"><span class="star">★</span> ${esc(a.score || '—')} &nbsp;•&nbsp; ${esc((a.genres||[]).slice(0,3).join(' • '))}</p>
          </div>
        </div>
        <p class="sectionTitle">Ver episodios</p>
        <p class="noLinks">Este anime aún no tiene links configurados.<br>
        Agrégalo en <code>LINKS</code> dentro de <code>app.js</code>.</p>
      </div>`;
    modal.classList.remove('hidden');
    return;
  }

  const firstKey = Object.keys(animeLinks)[0];
  const firstValue = animeLinks[firstKey];
  const isSeasons = typeof firstValue === 'object' 
                 && !Array.isArray(firstValue)
                 && typeof Object.values(firstValue)[0] === 'object';

  modalContent.innerHTML = `
    <div class="playerTopBar">
      <span class="playerIcon">🎬</span>
      <span class="playerTitle">${esc(a.title)}</span>
    </div>
    <div class="modalBody">
      <div class="animeInfo">
        <img class="animeInfoCover" src="${esc(a.cover)}" alt="" onerror="this.style.display='none'">
        <div class="animeInfoText">
          <h3>${esc(a.title)}</h3>
          <p class="infoMeta"><span class="star">★</span> ${esc(a.score || '—')} &nbsp;•&nbsp; ${esc((a.genres||[]).slice(0,3).join(' • '))}</p>
          <p class="infoMeta">Selecciona servidor y episodio</p>
        </div>
      </div>
      <div id="seasonTabsBox"></div>
      <p class="sectionTitle">Servidores</p>
      <div id="serverTabsBox"></div>
      <p class="sectionTitle">Episodios</p>
      <div class="episodes" id="episodesBox"></div>
    </div>`;

  function showServers(linksObj){
    const servers = Object.keys(linksObj);
    const serverBox = document.getElementById('serverTabsBox');
    if (!serverBox) return;

    serverBox.innerHTML = `
      <div class="serverTabs">
        ${servers.map((srv, i) => `
          <button class="serverTab${i===0?' active':''}" data-server="${esc(srv)}">
            <span class="serverLabel">Opción ${i+1}</span>
            <span class="serverName">${serverIcon(srv)} ${esc(srv)}</span>
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
      box.innerHTML = `<p class="noLinks">No hay episodios en <b>${esc(serverName)}</b> todavía.</p>`;
      return;
    }

    box.innerHTML = keys.map(num => `
      <button class="episode" data-link="${esc(epsObj[num])}" data-num="${esc(num)}">
        ${esc(num)}
      </button>
    `).join('');

    box.onclick = (e) => {
      const btn = e.target.closest('.episode');
      if (!btn) return;
      const link = btn.dataset.link;
      const num = btn.dataset.num;

      if (link.startsWith('AQUI_') || !link.startsWith('http')){
        alert('⚠️ Episodio ' + num + ' aún sin link.\n\nVe a app.js y reemplaza:\n"' + link + '"');
        return;
      }
      window.open(link, '_blank', 'noopener');
    };
  }

  if (isSeasons){
    const seasons = Object.keys(animeLinks);
    const seasonBox = document.getElementById('seasonTabsBox');
    seasonBox.innerHTML = `
      <p class="sectionTitle">Temporadas</p>
      <div class="seasonTabs">
        ${seasons.map((s, i) => `
          <button class="seasonTab${i===0?' active':''}" data-season="${esc(s)}">
            ${esc(s)}
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

/* ═══ Modal de perfil ═══ */
const profileModal = document.getElementById('profileModal');
const profileBtn = document.getElementById('profileBtn');
const closeProfile = document.getElementById('closeProfile');
const profileName = document.getElementById('profileName');
const profileNameInput = document.getElementById('profileNameInput');
const saveProfile = document.getElementById('saveProfile');
const themeState = document.getElementById('themeState');

const savedName = localStorage.getItem('anime_name') || '';
if (savedName){
  profileName.textContent = savedName;
  profileNameInput.value = savedName;
  profileBtn.textContent = savedName.charAt(0).toUpperCase();
}

profileBtn.onclick = () => {
  profileNameInput.value = profileName.textContent === 'Invitado' ? '' : profileName.textContent;
  themeState.textContent = document.body.classList.contains('light') ? 'Claro' : 'Oscuro';
  profileModal.classList.remove('hidden');
};
closeProfile.onclick = () => profileModal.classList.add('hidden');
profileModal.addEventListener('click', e => { if (e.target === profileModal) profileModal.classList.add('hidden'); });

saveProfile.onclick = () => {
  const name = profileNameInput.value.trim();
  if (name){
    profileName.textContent = name;
    localStorage.setItem('anime_name', name);
    profileBtn.textContent = name.charAt(0).toUpperCase();
  } else {
    profileName.textContent = 'Invitado';
    localStorage.removeItem('anime_name');
    profileBtn.textContent = '👤';
  }
  profileModal.classList.add('hidden');
};

document.getElementById('optTheme').onclick = () => {
  document.body.classList.toggle('light');
  themeState.textContent = document.body.classList.contains('light') ? 'Claro' : 'Oscuro';
};

/* ═══ Eventos de filtros ═══ */
searchInput.addEventListener('input', applyFilters);
genreFilter.addEventListener('change', applyFilters);
yearFilter.addEventListener('change', applyFilters);

// Chips de estación
document.querySelectorAll('[data-season]').forEach(chip => {
  chip.onclick = () => {
    const val = chip.dataset.season;
    if (activeSeason === val){
      activeSeason = '';
      chip.classList.remove('active');
    } else {
      activeSeason = val;
      document.querySelectorAll('[data-season]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    }
    applyFilters();
  };
});

// Chips de día
document.querySelectorAll('[data-day]').forEach(chip => {
  chip.onclick = () => {
    const val = chip.dataset.day;
    if (String(activeDay) === String(val)){
      activeDay = '';
      chip.classList.remove('active');
    } else {
      activeDay = val;
      document.querySelectorAll('[data-day]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    }
    applyFilters();
  };
});

// Limpiar filtros
document.getElementById('clearFilters').onclick = () => {
  searchInput.value = '';
  genreFilter.value = '';
  yearFilter.value = '';
  activeSeason = '';
  activeDay = '';
  document.querySelectorAll('.filterChip').forEach(c => c.classList.remove('active'));
  applyFilters();
};

document.getElementById('themeBtn').onclick = () => {
  document.body.classList.toggle('light');
};

/* ═══ Carga del catálogo ═══ */
async function loadCatalog(){
  statusEl.textContent = 'Cargando catálogo...';
  try {
    const query = `query ($page: Int) { Page(page: $page, perPage: 50) { media(type: ANIME, sort: POPULARITY_DESC) { id title { romaji english native } genres episodes averageScore season seasonYear coverImage { large } nextAiringEpisode { airingAt episode } } } }`;

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

    catalogAnime = animeTodas.map(x => {
      let day = null;
      if (x.nextAiringEpisode?.airingAt){
        const d = new Date(x.nextAiringEpisode.airingAt * 1000);
        day = d.getDay();
      }
      return {
        title: x.title?.english || x.title?.romaji || x.title?.native || 'Anime',
        genres: x.genres || [],
        episodes: x.episodes || 0,
        score: x.averageScore ? (x.averageScore/10).toFixed(1) : '—',
        cover: x.coverImage?.large || '',
        season: x.season || null,
        year: x.seasonYear || null,
        day: day
      };
    }).filter(x => x.title);

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