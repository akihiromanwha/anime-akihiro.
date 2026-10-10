const searchInput = document.getElementById('searchInput');
const animeGrid   = document.getElementById('animeGrid');
const statusEl    = document.getElementById('status');
const genreFilter = document.getElementById('genreFilter');
const sectionTitle= document.getElementById('sectionTitle');
const modal       = document.getElementById('modal');
const modalContent= document.getElementById('modalContent');

/* ============================================================
   🎬 LINKS DE SERVIDORES (USO PERSONAL)
   ------------------------------------------------------------
   Estructura:
   {
     "Título exacto del anime": {
        "Nombre del servidor": {
           "1": "https://link-del-episodio-1",
           "2": "https://link-del-episodio-2",
           ...
        }
     }
   }
   Puedes poner los servidores que quieras: Terabox, Drive,
   Mega, Mediafire, etc.
   ============================================================ */
const LINKS = {
  // ============ EJEMPLO (descomenta y edítalo) ============
  // "Naruto": {
  //   "Terabox": {
  //     "1": "https://terabox.com/s/xxxxx1",
  //     "2": "https://terabox.com/s/xxxxx2",
  //     "3": "https://terabox.com/s/xxxxx3"
  //   },
  //   "Drive": {
  //     "1": "https://drive.google.com/file/d/xxxxx1/view",
  //     "2": "https://drive.google.com/file/d/xxxxx2/view"
  //   }
  // },
  // "One Piece": {
  //   "Terabox": {
  //     "1": "https://terabox.com/s/yyyyy1",
  //     "2": "https://terabox.com/s/yyyyy2"
  //   },
  //   "Mega": {
  //     "1": "https://mega.nz/file/yyyyy1"
  //   }
  // }
};

/* Íconos por servidor (decorativo) */
const SERVER_ICONS = {
  "terabox":   "🟦",
  "drive":     "🟢",
  "mega":      "🟥",
  "mediafire": "🟠",
  "default":   "🎬"
};
function serverIcon(name){
  const k = name.toLowerCase();
  for (const [key, icon] of Object.entries(SERVER_ICONS)){
    if (k.includes(key)) return icon;
  }
  return SERVER_ICONS.default;
}

/* Busca el anime en LINKS por título exacto o normalizado */
function getAnimeLinks(title){
  if (!title) return null;
  if (LINKS[title]) return LINKS[title];
  const n = normalize(title);
  for (const [k, v] of Object.entries(LINKS)){
    if (normalize(k) === n) return v;
  }
  return null;
}

/* ============================================================
   Catálogo de respaldo
   ============================================================ */
const fallback = [
 {title:'Naruto',genres:['Action','Adventure','Ninja'],episodes:220,score:8.1,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-9zXJ6z0g7n8R.jpg'},
 {title:'Naruto: Shippuden',genres:['Action','Adventure','Ninja'],episodes:500,score:8.2,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1735-0mZkQ8cV4xQw.jpg'},
 {title:'One Piece',genres:['Action','Adventure','Fantasy'],episodes:1100,score:8.7,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-0pQwJfYc7m9L.jpg'},
 {title:'Demon Slayer',genres:['Action','Fantasy'],episodes:63,score:8.5,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-gZx5Q8s3T1uA.jpg'},
 {title:'Jujutsu Kaisen',genres:['Action','Fantasy','Supernatural'],episodes:47,score:8.6,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-Km2xL9qW4s7A.jpg'},
 {title:'Dragon Ball Z',genres:['Action','Adventure','Fantasy'],episodes:291,score:8.1,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx813-7vK9pQ2sLm4N.jpg'},
 {title:'Attack on Titan',genres:['Action','Drama','Fantasy'],episodes:89,score:9.0,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-8mQ2vR6sK1pL.jpg'},
 {title:'My Hero Academia',genres:['Action','Superhero'],episodes:159,score:8.0,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-aK7mP2qL8vR3.jpg'}
];

let catalog = [];

/* ============================================================
   Utilidades
   ============================================================ */
function normalize(s){
  return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
function esc(s){
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ============================================================
   Render del grid
   ============================================================ */
function render(list){
  animeGrid.innerHTML = '';
  if(!list.length){
    animeGrid.innerHTML = '<p>No encontramos ese anime. Prueba otro nombre.</p>';
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
        <button data-index="${i}">Ver opciones</button>
      </div>`;
    card.querySelector('button').onclick = () => openAnime(a);
    animeGrid.appendChild(card);
  });
}

/* ============================================================
   Filtros
   ============================================================ */
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

/* ============================================================
   🎬 MODAL — Servidor + Episodios
   ============================================================ */
function openAnime(a){
  const animeLinks = getAnimeLinks(a.title);

  // Sin links configurados
  if (!animeLinks || !Object.keys(animeLinks).length){
    modalContent.innerHTML = `
      <img class="modalCover" src="${esc(a.cover)}" alt="">
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
    <img class="modalCover" src="${esc(a.cover)}" alt="">
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
    const eps = animeLinks[serverName] || {};
    const keys = Object.keys(eps).sort((x,y) => Number(x) - Number(y));

    if (!keys.length){
      box.innerHTML = `<p class="noLinks">No hay episodios en ${esc(serverName)}.</p>`;
      return;
    }

    box.innerHTML = keys.map(num => `
      <a class="episode" target="_blank" rel="noopener" href="${esc(eps[num])}">
        Episodio ${esc(num)}
      </a>
    `).join('');
  }

  modal.classList.remove('hidden');
}

/* Cerrar modal */
document.getElementById('closeModal').onclick = () => modal.classList.add('hidden');
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.add('hidden'); });

/* ============================================================
   Eventos generales
   ============================================================ */
searchInput.addEventListener('input', applyFilters);
genreFilter.addEventListener('change', applyFilters);
document.getElementById('heroListBtn').onclick = () => { searchInput.focus(); };
document.getElementById('themeBtn').onclick = () => { document.body.classList.toggle('light'); };

/* ============================================================
   Carga del catálogo desde AniList
   ============================================================ */
async function loadCatalog(){
  statusEl.textContent = 'Cargando catálogo automático...';
  try{
    const query = `query { Page(page:1, perPage:100) { media(type:ANIME, sort:POPULARITY_DESC) { id title { romaji english native } genres episodes averageScore coverImage { large } } } }`;
    const res = await fetch('https://graphql.anilist.co',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({query})
    });
    if(!res.ok) throw new Error('API');
    const data = await res.json();
    const rows = data?.data?.Page?.media || [];
    catalog = rows.map(x => ({
      title: x.title?.english || x.title?.romaji || x.title?.native || 'Anime',
      genres: x.genres || [],
      episodes: x.episodes || 0,
      score: x.averageScore ? (x.averageScore/10).toFixed(1) : '—',
      cover: x.coverImage?.large || ''
    })).filter(x => x.title);
    if(!catalog.length) throw new Error('Sin datos');
  }catch(e){
    catalog = fallback;
    statusEl.textContent = 'Catálogo de respaldo cargado.';
  }
  fillGenres();
  applyFilters();
}
loadCatalog();