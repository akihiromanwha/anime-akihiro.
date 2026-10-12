const searchInput = document.getElementById('searchInput');
const animeGrid   = document.getElementById('animeGrid');
const statusEl    = document.getElementById('status');
const genreFilter = document.getElementById('genreFilter');
const yearFilter  = document.getElementById('yearFilter');
const seasonFilter= document.getElementById('seasonFilter');
const dayFilter   = document.getElementById('dayFilter');
const sectionTitle= document.getElementById('sectionTitle');
const resultsCount= document.getElementById('resultsCount');
const modal       = document.getElementById('modal');
const modalContent= document.getElementById('modalContent');

/* Toggle filtros */
const toggleFilters = document.getElementById('toggleFilters');
const filterPanel = document.getElementById('filterPanel');
toggleFilters.addEventListener('click', () => {
  filterPanel.classList.toggle('open');
});

/* HERO rotativo */
const HERO_IMAGES = [
  "https://img.anili.st/media/9919",
  "https://img.anili.st/media/20832",
  "https://img.anili.st/media/210",
  "https://img.anili.st/media/20605",
  "https://img.anili.st/media/269",
  "https://img.anili.st/media/11061"
];
(function(){
  let i = 0, useA = true;
  function swap(){
    const a = document.getElementById('heroBgA');
    const b = document.getElementById('heroBgB');
    if (!a || !b) return;
    const img = HERO_IMAGES[i];
    if (useA){ a.style.backgroundImage = `url(${img})`; a.classList.add('active'); b.classList.remove('active'); }
    else { b.style.backgroundImage = `url(${img})`; b.classList.add('active'); a.classList.remove('active'); }
    useA = !useA;
    i = (i + 1) % HERO_IMAGES.length;
  }
  swap();
  setInterval(swap, 5500);
})();

/* LINKS */
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
  "terabox": "🟦", "mega": "🟥", "mediafire": "🟠", "netu": "🟣", "default": "🎬"
};
function serverIcon(n){
  n = n.toLowerCase();
  for (const [k,v] of Object.entries(SERVER_ICONS)) if (n.includes(k)) return v;
  return SERVER_ICONS.default;
}

function normalize(s){
  return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
function esc(s){
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function getAnimeLinks(title){
  if (!title) return null;
  if (LINKS[title]) return LINKS[title];
  const n = normalize(title);
  for (const [k,v] of Object.entries(LINKS)) if (normalize(k) === n) return v;
  return null;
}

/* Animes personalizados */
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

const DAY_NAMES = { 0:'Dom', 1:'Lun', 2:'Mar', 3:'Mié', 4:'Jue', 5:'Vie', 6:'Sáb' };

/* Render */
function render(list){
  animeGrid.innerHTML = '';
  if (!list.length){
    animeGrid.innerHTML = '<p style="padding:1rem;color:#a0a0a0;">No hay resultados.</p>';
    return;
  }
  list.forEach((a,i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="cover" src="${esc(a.cover)}" alt="${esc(a.title)}" onerror="this.style.display='none'">
      <div class="cardBody">
        <div class="title">${esc(a.title)}</div>
        <div class="meta">${esc((a.genres||[]).slice(0,2).join(' • '))}${a.year ? ' • '+a.year : ''}</div>
        <button>Ver episodios</button>
      </div>`;
    card.querySelector('button').onclick = () => openAnime(a);
    animeGrid.appendChild(card);
  });
}

/* Filtros */
function applyFilters(){
  const q = normalize(searchInput.value);
  const g = normalize(genreFilter.value);
  const y = yearFilter.value;
  const s = seasonFilter.value;
  const d = dayFilter.value;

  const filtered = catalog.filter(a => {
    const text = normalize([a.title, ...(a.genres||[])].join(' '));
    if (q && !text.includes(q)) return false;
    if (g && !(a.genres||[]).some(x => normalize(x) === g)) return false;
    if (y && String(a.year) !== String(y)) return false;
    if (s && a.season !== s) return false;
    if (d !== '' && Number(a.day) !== Number(d)) return false;
    return true;
  });

  sectionTitle.textContent = q ? `Resultados para "${searchInput.value}"` : 'Animes populares';
  resultsCount.textContent = `${filtered.length} resultado${filtered.length===1?'':'s'}`;
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

/* Modal */
function openAnime(a){
  const animeLinks = getAnimeLinks(a.title);

  if (!animeLinks || !Object.keys(animeLinks).length){
    modalContent.innerHTML = `
      <img class="modalCover" src="${esc(a.cover)}" onerror="this.style.display='none'">
      <h2>${esc(a.title)}</h2>
      <p>⭐ ${esc(a.score||'—')} • ${esc((a.genres||[]).join(', '))}</p>
      <div class="watchOptions">
        <h3 class="watchTitle">Ver episodios</h3>
        <p class="noLinks">Aún no tiene links configurados.<br>Agrégalo en <code>LINKS</code> en <code>app.js</code>.</p>
      </div>`;
    modal.classList.remove('hidden');
    return;
  }

  const firstKey = Object.keys(animeLinks)[0];
  const isSeasons = typeof animeLinks[firstKey] === 'object' && typeof Object.values(animeLinks[firstKey])[0] === 'object';

  modalContent.innerHTML = `
    <img class="modalCover" src="${esc(a.cover)}" onerror="this.style.display='none'">
    <h2>${esc(a.title)}</h2>
    <p>⭐ ${esc(a.score||'—')} • ${esc((a.genres||[]).join(', '))}</p>
    <div class="watchOptions">
      <h3 class="watchTitle">Ver episodios</h3>
      <div id="seasonTabsBox"></div>
      <div id="serverTabsBox"></div>
      <div class="episodes" id="episodesBox"></div>
    </div>`;

  function showServers(linksObj){
    const servers = Object.keys(linksObj);
    const box = document.getElementById('serverTabsBox');
    box.innerHTML = `
      <div class="serverTabs">
        ${servers.map((srv,i) => `
          <button class="serverTab${i===0?' active':''}" data-s="${esc(srv)}">
            ${serverIcon(srv)} ${esc(srv)}
          </button>
        `).join('')}
      </div>`;
    showEpisodes(linksObj[servers[0]], servers[0]);
    box.querySelectorAll('.serverTab').forEach(btn => {
      btn.onclick = () => {
        box.querySelectorAll('.serverTab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showEpisodes(linksObj[btn.dataset.s], btn.dataset.s);
      };
    });
  }

  function showEpisodes(epsObj, serverName){
    const box = document.getElementById('episodesBox');
    const keys = Object.keys(epsObj).sort((a,b) => Number(a) - Number(b));
    if (!keys.length){
      box.innerHTML = '<p class="noLinks">Sin episodios.</p>';
      return;
    }
    box.innerHTML = keys.map(n => `
      <button class="episode" data-link="${esc(epsObj[n])}" data-n="${esc(n)}">${esc(n)}</button>
    `).join('');
    box.onclick = (e) => {
      const btn = e.target.closest('.episode');
      if (!btn) return;
      const link = btn.dataset.link;
      if (link.startsWith('AQUI_') || !link.startsWith('http')){
        alert('⚠️ Episodio ' + btn.dataset.n + ' sin link.\n\nEn app.js reemplaza:\n"' + link + '"');
        return;
      }
      window.open(link, '_blank', 'noopener');
    };
  }

  if (isSeasons){
    const seasons = Object.keys(animeLinks);
    const sBox = document.getElementById('seasonTabsBox');
    sBox.innerHTML = `
      <div class="serverTabs">
        ${seasons.map((s,i) => `
          <button class="serverTab${i===0?' active':''}" data-season="${esc(s)}">${esc(s)}</button>
        `).join('')}
      </div>`;
    showServers(animeLinks[seasons[0]]);
    sBox.querySelectorAll('[data-season]').forEach(btn => {
      btn.onclick = () => {
        sBox.querySelectorAll('[data-season]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showServers(animeLinks[btn.dataset.season]);
      };
    });
  } else {
    showServers(animeLinks);
  }

  modal.classList.remove('hidden');
}

/* Cerrar modal */
document.getElementById('closeModal').onclick = () => modal.classList.add('hidden');
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.add('hidden'); });

/* Perfil */
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

/* Eventos */
searchInput.addEventListener('input', applyFilters);
genreFilter.addEventListener('change', applyFilters);
yearFilter.addEventListener('change', applyFilters);
seasonFilter.addEventListener('change', applyFilters);
dayFilter.addEventListener('change', applyFilters);

document.getElementById('clearFilters').onclick = () => {
  searchInput.value = '';
  genreFilter.value = '';
  yearFilter.value = '';
  seasonFilter.value = '';
  dayFilter.value = '';
  applyFilters();
};

document.getElementById('themeBtn').onclick = () => {
  document.body.classList.toggle('light');
};

/* Cargar catálogo */
async function loadCatalog(){
  statusEl.textContent = 'Cargando catálogo...';
  try{
    const query = `query ($p: Int) { Page(page: $p, perPage: 50) { media(type: ANIME, sort: POPULARITY_DESC) { title { romaji english native } genres episodes averageScore season seasonYear coverImage { large } nextAiringEpisode { airingAt } } } }`;
    const todas = [];
    for (const p of [1, 2]){
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ query, variables: { p } })
      });
      const data = await res.json();
      todas.push(...(data?.data?.Page?.media || []));
      await new Promise(r => setTimeout(r, 700));
    }
    const animeList = todas.map(x => {
      let day = null;
      if (x.nextAiringEpisode?.airingAt){
        day = new Date(x.nextAiringEpisode.airingAt * 1000).getDay();
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

    const all = [...CUSTOM_ANIME, ...animeList];
    const seen = new Set();
    catalog = all.filter(a => {
      if (seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    });
  }catch(e){
    console.error(e);
    catalog = [...CUSTOM_ANIME];
    statusEl.textContent = 'Catálogo de respaldo cargado.';
  }
  fillGenres();
  applyFilters();
}
loadCatalog();