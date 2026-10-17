/* ════════════════════════════════════════════════════════════
   AKIHIRODAIKYANIME — app.js
   © 2026 AkihiroDaikyAnime — Todos los derechos reservados
   GitHub: https://github.com/akihiromanwha
   ════════════════════════════════════════════════════════════ */

const searchInput = document.getElementById('searchInput');
const animeGrid   = document.getElementById('animeGrid');
const statusEl    = document.getElementById('status');
const genreFilter = document.getElementById('genreFilter');
const sortFilter  = document.getElementById('sortFilter');
const sectionTitle= document.getElementById('sectionTitle');
const modal       = document.getElementById('modal');
const modalContent= document.getElementById('modalContent');

let currentType = 'series';

/* ═══ HERO ═══ */
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

/* ═══ LOCALSTORAGE ═══ */
function getHistory(){
  try { return JSON.parse(localStorage.getItem('anime_history') || '[]'); }
  catch(e){ return []; }
}
function saveHistory(list){ localStorage.setItem('anime_history', JSON.stringify(list)); }
function addToHistory(title, ep, cover){
  let h = getHistory();
  h = h.filter(x => x.title !== title);
  h.unshift({ title, ep: String(ep), cover: cover || '', time: Date.now() });
  h = h.slice(0, 15);
  saveHistory(h);
  renderHistory();
}
function clearHistory(){
  localStorage.removeItem('anime_history');
  renderHistory();
}
function getSeen(){
  try { return JSON.parse(localStorage.getItem('anime_seen') || '{}'); }
  catch(e){ return {}; }
}
function saveSeen(obj){ localStorage.setItem('anime_seen', JSON.stringify(obj)); }
function isSeen(title, ep){
  const s = getSeen();
  return !!(s[title] && s[title].includes(String(ep)));
}
function markAsSeen(title, ep){
  const s = getSeen();
  if (!s[title]) s[title] = [];
  const num = String(ep);
  if (!s[title].includes(num)) s[title].push(num);
  saveSeen(s);
}
function totalSeenCount(){
  const s = getSeen();
  return Object.values(s).reduce((acc, arr) => acc + arr.length, 0);
}
function clearSeen(){
  localStorage.removeItem('anime_seen');
  updateSeenCount();
}

function renderHistory(){
  const section = document.getElementById('historySection');
  const grid = document.getElementById('historyGrid');
  if (!section || !grid) return;
  const h = getHistory();
  if (!h.length){ section.classList.add('hidden'); return; }
  section.classList.remove('hidden');
  grid.innerHTML = h.map(item => {
    const cover = item.cover || (catalogAll.find(a => a.title === item.title) || {}).cover || '';
    return `
      <div class="historyCard" data-title="${esc(item.title)}">
        <img src="${esc(cover)}" alt="" onerror="this.style.display='none'">
        <div class="historyInfo">
          <div class="historyTitle">${esc(item.title)}</div>
          <div class="historyEp">Episodio ${esc(item.ep)}</div>
        </div>
      </div>`;
  }).join('');
  grid.querySelectorAll('.historyCard').forEach(card => {
    card.onclick = () => {
      const anime = catalogAll.find(a => a.title === card.dataset.title);
      if (anime) openAnime(anime);
    };
  });
}

/* ═══ Próximos ═══ */
const SOON_ANIME = [
  { title: "Sword Art Online", cover: "https://img.anili.st/media/11757", note: "Próximamente" },
  { title: "Tokyo Ghoul", cover: "https://img.anili.st/media/20605", note: "Próximamente" },
  { title: "Attack on Titan", cover: "https://img.anili.st/media/16498", note: "Próximamente" },
  { title: "Noragami", cover: "https://img.anili.st/media/20447", note: "Próximamente" }
];

/* ═══ LINKS MANUALES ═══ */
const LINKS = {
  "Blood Lad": {
    "Terabox": {
      "1": "https://1024terabox.com/s/1SrOBd6ZnpoQZMkinzMjfaQ",
      "2": "https://1024terabox.com/s/1j1q1Q7PdKnAwNYJFKWiW8Q",
      "3": "https://1024terabox.com/s/1kvD32FuptXudTV4cwziyug",
      "4": "https://1024terabox.com/s/1Oo4EjJz-MVzvuzKgDyMr7w",
      "5": "https://1024terabox.com/s/11DlJfZqeitlWEVYa0Urv8g",
      "6": "https://1024terabox.com/s/1RgFWiI2xj-dhbWb1DQPrGQ",
      "7": "https://1024terabox.com/s/16kkM3LND-OgcHqz0gF5B4A",
      "8": "https://1024terabox.com/s/1w2y73FmI2YCzRb72RdWZeg",
      "9": "https://1024terabox.com/s/1kXyOiawXFF7wjWk-ls00cg",
      "10": "https://1024terabox.com/s/1I0fAabkE6dQXW2S0JZZCBw"
    }
  },
  "The Seven Deadly Sins": {
    "Drive": {
      "1": "https://drive.google.com/file/d/1pPpZu-YHdWfLL16lhWf_Cx1mR_ooVPBf/preview",
      "2": "https://drive.google.com/file/d/1f6Ioc2wVQWQWUmCZIssrwn7BWpgWG075/preview",
      "3": "https://drive.google.com/file/d/1zkCigw0VFWAt5-s0J8A-1qYB2WpL3grf/preview",
      "4": "https://drive.google.com/file/d/1RBFIPZboNAOIxpEcSYf41lKH2R8LZETj/preview",
      "5": "https://drive.google.com/file/d/14e145iN3ZiNfh4Iqq3q53sFVpux5j-E2/preview",
      "6": "https://drive.google.com/file/d/1DlNQlKbpqqgXOoIWnqmEBBJu-GOkDbqO/preview",
      "7": "https://drive.google.com/file/d/1atJ9IaNUs9H1K1V4xWFCkewauTK6R8dK/preview",
      "8": "https://drive.google.com/file/d/1iPGQeMiqBJPP1QjRzqGUt9Ic4hLawvYu/preview",
      "9": "https://drive.google.com/file/d/1zHdk6HjFd8byN4P16flklsAN7lgqfZkP/preview",
      "10": "https://drive.google.com/file/d/1MVsO3-oEKrbuqeIGOQ5PdOyUnxVmqSeJ/preview",
      "11": "https://drive.google.com/file/d/1YU3Hgm_r2EbxArZHcGT8OyshdrG3AmkG/preview",
      "12": "https://drive.google.com/file/d/1-OI_I_w0QJeCftpDUTzNgfKPAIs1Y6t9/preview",
      "13": "https://drive.google.com/file/d/1Y2TjbVupPfBcFb9NtI4nPUU2xwZPir7H/preview",
      "14": "https://drive.google.com/file/d/15I6craRG71Nv17A8JCKyfFAYbYKas92n/preview",
      "15": "https://drive.google.com/file/d/1wC06_XaEOkZgriH6y17QsO1g2zDzQGQB/preview",
      "16": "https://drive.google.com/file/d/1xyCxzmfCoeP-_cVI-cybRs_o5LXJ8M8B/preview",
      "17": "https://drive.google.com/file/d/1aCsxpYzI9iX_P212Ws3RvD6LYelw0tsM/preview",
      "18": "https://drive.google.com/file/d/1lJq4rZB0dS2J_SiZUgprtZrJaZMJyWCl/preview",
      "19": "https://drive.google.com/file/d/1sZC-19DU4Crb2lRTimYYgk9SUTr49-6k/preview",
      "20": "https://drive.google.com/file/d/1btaVxAq5On0MN0gsWDz72wzbLj-RuutK/preview",
      "21": "https://drive.google.com/file/d/1yK-1eSHcWGUK5gaGNh6mny0hOLtjNdTs/preview",
      "22": "https://drive.google.com/file/d/1blulkTyYo-YCnJfWi7hyha2Qs2yynD3d/preview",
      "23": "https://drive.google.com/file/d/138xmbqBi_dKlsqZOwgnDO4FKMbmf14XO/preview",
      "24": "https://drive.google.com/file/d/1dnb5JROpG7XhxUOLKYexc0H-HgKp6_QF/preview"
    }
  },
  "Jujutsu Kaisen": {
    "Drive": {
      "1": "https://drive.google.com/file/d/1MKpnI8y5HNIgJRD5EhVTeZhFt-oGLJrx/preview",
      "2": "https://drive.google.com/file/d/1zMkb-KIsQem6ENOmwbvpzZXQzT4SeNCn/preview",
      "3": "https://drive.google.com/file/d/12di4rm9bkwjn9kHuOHM3jU0B8cOrXnEN/preview",
      "4": "https://drive.google.com/file/d/1AQEDd2ifWdvW33gPq3lPsVE6r3xWr1Vk/preview",
      "5": "https://drive.google.com/file/d/1Ttkx7A0mFP2VlzqRn088ZgB_rtyxDHkL/preview",
      "6": "https://drive.google.com/file/d/1Pm2dCQdf3lqn4unEzwZJid6Qg7aaqg2f/preview",
      "7": "https://drive.google.com/file/d/1x5uvxrM-mmNZ9yai3iawLAG5fdJRECxP/preview",
      "8": "https://drive.google.com/file/d/1kT3W-uMbPgL3sbJmObfl3zKepnCM_rDy/preview",
      "9": "https://drive.google.com/file/d/1hy7Ihhv2JL5MZOQ5hg3uKMeZ1_L2qR9l/preview",
      "10": "https://drive.google.com/file/d/1UBeVtNowUxNKGOHjxxhObjzQlAn0iliM/preview",
      "11": "https://drive.google.com/file/d/1EHtS6_5IzdojjBamhQWpQr-3ybEEzmir/preview",
      "12": "https://drive.google.com/file/d/16vsiKOxSI-OmD94fTZQXzx9yFl1_vJnw/preview",
      "13": "https://drive.google.com/file/d/1PORkM3BKvm4vbx62XEbHIeheZ0feBRm5/preview",
      "14": "https://drive.google.com/file/d/1KjfBxvQGE740PStbGRV4hmKPmYdFZit0/preview",
      "15": "https://drive.google.com/file/d/1m9-JLClhJETAngWmvnxCBnkEdWaFOLTn/preview",
      "16": "https://drive.google.com/file/d/1NUoAzAspn-U8UBUk6dq3yRQxOLFHkRyq/preview",
      "17": "https://drive.google.com/file/d/1FGdIxVdFQTbUzgMLOqkF1AASO_eGGreB/preview",
      "18": "https://drive.google.com/file/d/1Fo08LWsVDNhLeoaAkfyDo3FsbTYDCJMK/preview",
      "19": "https://drive.google.com/file/d/1_7q5dhehjQ7LTcCOSwRm6p-UbdV5xODQ/preview",
      "20": "https://drive.google.com/file/d/1hCU-X46SAWM-0RODBywCqkH36RcTc0yc/preview",
      "21": "https://drive.google.com/file/d/19uMc_9lRpxArezYDYa7FWoL6yuoOw3Kp/preview",
      "22": "https://drive.google.com/file/d/1zd91GPoL0UMENy_u-QY1f8hmObHlShXO/preview",
      "23": "https://drive.google.com/file/d/1cQaLFhR5_IzYnR4_7XoyHbw1G3ih-mdN/preview",
      "24": "https://drive.google.com/file/d/1zTMk99bwXc1ahYO2K_YORwYVRsjzgDsk/preview"
    }
  },
  "DanMachi": {
    "Temporada 1": {
      "Drive": {
        "1": "https://drive.google.com/file/d/1zPG1b1j5DDmaBr_AXlIxoP2eXlRkJ8fi/preview",
        "2": "https://drive.google.com/file/d/1PmbNhAqn8K4BAduzt0PzLfSLpB-HVNrh/preview",
        "3": "https://drive.google.com/file/d/1ygyPKGc8yjpV7BYFz2DoU9i_QtKhkd_P/preview",
        "4": "https://drive.google.com/file/d/1SOTIpsPT5p9FRj8XQDexApZlWP0jqL2n/preview",
        "5": "https://drive.google.com/file/d/1COMLe6vcEgyWXNs5Pxrgmn43FfizNxsr/preview",
        "6": "https://drive.google.com/file/d/1aAtqniBvyF3R88lu6P52rx6i_MNrpFK0/preview",
        "7": "https://drive.google.com/file/d/1sl80epcMafCpNj-wYTV8DZq3SWNEd323/preview",
        "8": "https://drive.google.com/file/d/1F3lAQgRbrubrBxXbPKcbebTpb3g4lylE/preview",
        "9": "https://drive.google.com/file/d/1NSlIBsYu9A7dTs5WZAZuvTFYEqQ9Q-Z7/preview",
        "10": "https://drive.google.com/file/d/1XWa9C7IoGeVfF5ZCdU5oHYeHfjt8imuZ/preview",
        "11": "https://drive.google.com/file/d/10SBTX269uM2hP0mCsM8W-ziWDjm2q6TY/preview"
      }
    },
    "Temporada 2": { "Drive": { "1": "AQUI_LINK_T2_EP1" } },
    "Temporada 3": { "Drive": { "1": "AQUI_LINK_T3_EP1" } },
    "Temporada 4": { "Drive": { "1": "AQUI_LINK_T4_EP1" } }
  }
};

/* ═══ Iconos ═══ */
const SERVER_ICONS = {
  "terabox": "🟦", "drive": "🟢", "mega": "🟥",
  "mediafire": "🟠", "netu": "🟣", "pixeldrain": "⚫", "default": "🎬"
};
function serverIcon(name){
  const k = name.toLowerCase();
  for (const [key, icon] of Object.entries(SERVER_ICONS)){
    if (k.includes(key)) return icon;
  }
  return SERVER_ICONS.default;
}

/* ═══ Utilidades ═══ */
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
function parseScore(s){
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

/* ═══ Catálogos ═══ */
const CUSTOM_SERIES = [
  { title: "Blue Exorcist", genres: ["Action","Supernatural","Fantasy"], episodes: 27, score: "7.8", year: 2024, cover: "https://img.anili.st/media/9919" },
  { title: "Overlord", genres: ["Action","Adventure","Fantasy"], episodes: 52, score: "8.0", year: 2015, cover: "https://img.anili.st/media/20832" },
  { title: "Blood Lad", genres: ["Action","Comedy","Supernatural"], episodes: 10, score: "7.3", year: 2013, cover: "https://img.anili.st/media/11633" },
  { title: "100-man no Inochi no Ue ni Ore wa Tatteiru", genres: ["Action","Adventure","Fantasy"], episodes: 24, score: "7.3", year: 2020, cover: "https://img.anili.st/media/114753" },
  { title: "The Seven Deadly Sins", genres: ["Action","Adventure","Fantasy"], episodes: 24, score: "8.1", year: 2014, cover: "https://img.anili.st/media/20789" },
  { title: "Jujutsu Kaisen", genres: ["Action","Fantasy","Supernatural"], episodes: 24, score: "8.6", year: 2020, cover: "https://img.anili.st/media/113415" },
  { title: "DanMachi", genres: ["Action","Adventure","Fantasy","Romance"], episodes: 59, score: "7.6", year: 2015, cover: "https://img.anili.st/media/20920" },
  { title: "Ranma 1/2", genres: ["Comedy","Romance","Action"], episodes: 161, score: "7.7", year: 1989, cover: "https://img.anili.st/media/210" },
  { title: "Bleach", genres: ["Action","Adventure","Supernatural"], episodes: 366, score: "7.9", year: 2004, cover: "https://img.anili.st/media/269" },
  { title: "Inuyasha", genres: ["Action","Adventure","Romance"], episodes: 167, score: "7.6", year: 2000, cover: "https://img.anili.st/media/249" },
  { title: "Hunter x Hunter", genres: ["Action","Adventure","Fantasy"], episodes: 148, score: "9.0", year: 2011, cover: "https://img.anili.st/media/11061" },
  { title: "Fullmetal Alchemist: Brotherhood", genres: ["Action","Adventure","Drama"], episodes: 64, score: "9.1", year: 2009, cover: "https://img.anili.st/media/5114" },
  { title: "Death Note", genres: ["Mystery","Psychological","Thriller"], episodes: 37, score: "8.6", year: 2006, cover: "https://img.anili.st/media/1535" },
  { title: "Tokyo Ghoul", genres: ["Action","Horror","Supernatural"], episodes: 12, score: "7.8", year: 2014, cover: "https://img.anili.st/media/20605" }
];

const CUSTOM_MOVIES = [
  { title: "Jujutsu Kaisen 0", genres: ["Action","Fantasy","Supernatural"], episodes: 1, score: "8.4", year: 2021, cover: "https://img.anili.st/media/131573" },
  { title: "Demon Slayer: Mugen Train", genres: ["Action","Fantasy","Supernatural"], episodes: 1, score: "8.6", year: 2020, cover: "https://img.anili.st/media/112151" },
  { title: "Your Name", genres: ["Romance","Drama","Supernatural"], episodes: 1, score: "8.7", year: 2016, cover: "https://img.anili.st/media/21519" },
  { title: "A Silent Voice", genres: ["Drama","Romance"], episodes: 1, score: "8.9", year: 2016, cover: "https://img.anili.st/media/20954" },
  { title: "Weathering with You", genres: ["Romance","Drama","Supernatural"], episodes: 1, score: "8.3", year: 2019, cover: "https://img.anili.st/media/106286" },
  { title: "Spirited Away", genres: ["Adventure","Fantasy","Family"], episodes: 1, score: "8.8", year: 2001, cover: "https://img.anili.st/media/199" },
  { title: "Princess Mononoke", genres: ["Action","Adventure","Fantasy"], episodes: 1, score: "8.7", year: 1997, cover: "https://img.anili.st/media/164" },
  { title: "Howl's Moving Castle", genres: ["Adventure","Fantasy","Romance"], episodes: 1, score: "8.7", year: 2004, cover: "https://img.anili.st/media/431" },
  { title: "My Neighbor Totoro", genres: ["Adventure","Fantasy","Family"], episodes: 1, score: "8.3", year: 1988, cover: "https://img.anili.st/media/523" },
  { title: "Akira", genres: ["Action","Sci-Fi","Supernatural"], episodes: 1, score: "8.2", year: 1988, cover: "https://img.anili.st/media/47" },
  { title: "Ghost in the Shell", genres: ["Action","Sci-Fi","Psychological"], episodes: 1, score: "8.3", year: 1995, cover: "https://img.anili.st/media/43" },
  { title: "Perfect Blue", genres: ["Psychological","Thriller","Drama"], episodes: 1, score: "8.7", year: 1998, cover: "https://img.anili.st/media/437" },
  { title: "Paprika", genres: ["Sci-Fi","Psychological","Thriller"], episodes: 1, score: "8.4", year: 2006, cover: "https://img.anili.st/media/1943" },
  { title: "The Girl Who Leapt Through Time", genres: ["Romance","Sci-Fi","Drama"], episodes: 1, score: "8.5", year: 2006, cover: "https://img.anili.st/media/2236" },
  { title: "Wolf Children", genres: ["Drama","Fantasy","Family"], episodes: 1, score: "8.6", year: 2012, cover: "https://img.anili.st/media/12355" }
];

let catalogSeries = [];
let catalogMovies = [];
let catalogAll = [];
let catalog = [];

const fallback = [
  {title:'Naruto',genres:['Action','Adventure'],episodes:220,score:8.1,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-9zXJ6z0g7n8R.jpg'},
  {title:'One Piece',genres:['Action','Adventure'],episodes:1100,score:8.7,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-0pQwJfYc7m9L.jpg'},
  {title:'Attack on Titan',genres:['Action','Drama'],episodes:89,score:9.0,cover:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-8mQ2vR6sK1pL.jpg'}
];

/* ═══ Render ═══ */
function render(list){
  animeGrid.innerHTML = '';
  if(!list.length){
    animeGrid.innerHTML = '<p style="padding:1rem;color:#a0a0a0;">No encontramos ese título.</p>';
    return;
  }
  list.forEach((a,i)=>{
    const card = document.createElement('article');
    card.className = 'card';
    const readyBadge = LINKS[a.title] ? `<span class="badgeReady">Listo</span>` : '';
    card.innerHTML = `
      ${readyBadge}
      <img class="cover" src="${esc(a.cover)}" alt="${esc(a.title)}" onerror="this.style.display='none'">
      <div class="cardBody">
        <div class="title">${esc(a.title)}</div>
        <div class="meta">${esc((a.genres||[]).slice(0,2).join(' • '))} ${a.episodes && a.episodes > 1 ? `• ${a.episodes} eps.` : ''}</div>
        <button data-index="${i}">${currentType === 'movies' ? 'Ver película' : 'Ver episodios'}</button>
      </div>`;
    card.querySelector('button').onclick = () => openAnime(a);
    animeGrid.appendChild(card);
  });
}

/* ═══ Filtros ═══ */
function applyFilters(){
  const q = normalize(searchInput.value);
  const g = normalize(genreFilter.value);
  const sort = sortFilter ? sortFilter.value : 'default';

  let filtered = catalog.filter(a => {
    const text = normalize([a.title, ...(a.genres||[])].join(' '));
    return (!q || text.includes(q)) && (!g || (a.genres||[]).some(x => normalize(x) === g));
  });

  if (sort === 'az')           filtered.sort((a,b) => a.title.localeCompare(b.title));
  else if (sort === 'za')      filtered.sort((a,b) => b.title.localeCompare(a.title));
  else if (sort === 'yearNew') filtered.sort((a,b) => (b.year||0) - (a.year||0));
  else if (sort === 'yearOld') filtered.sort((a,b) => (a.year||0) - (b.year||0));
  else if (sort === 'score')   filtered.sort((a,b) => parseScore(b.score) - parseScore(a.score));

  const isMovies = currentType === 'movies';
  sectionTitle.textContent = q 
    ? `Resultados para "${searchInput.value}"` 
    : (isMovies ? '🎬 Películas populares' : 'Animes populares');
  statusEl.textContent = `${filtered.length} ${isMovies ? 'película' : 'anime'}${filtered.length===1?'':'s'} encontrado${filtered.length===1?'':'s'}.`;
  render(filtered);
}

function fillGenres(){
  genreFilter.innerHTML = '<option value="">Todos los géneros</option>';
  const set = new Set();
  catalog.forEach(a => (a.genres||[]).forEach(g => set.add(g)));
  [...set].sort().forEach(g => {
    const o = document.createElement('option');
    o.value = g; o.textContent = g;
    genreFilter.appendChild(o);
  });
}

/* ═══ Modal ═══ */
function openAnime(a){
  const animeLinks = getAnimeLinks(a.title);
  const isMovie = currentType === 'movies';

  if (!animeLinks || !Object.keys(animeLinks).length){
    modalContent.innerHTML = `
      <div class="playerTopBar">
        <span class="playerIcon">${isMovie ? '🎬' : '🎞️'}</span>
        <span class="playerTitle">${esc(a.title)}</span>
      </div>
      <div class="modalBody">
        <div class="animeInfo">
          <img class="animeInfoCover" src="${esc(a.cover)}" alt="" onerror="this.style.display='none'">
          <div class="animeInfoText">
            <h3>${esc(a.title)}</h3>
            <p class="infoMeta"><span class="star">★</span> ${esc(a.score || '—')} • ${esc((a.genres||[]).slice(0,3).join(' • '))}</p>
          </div>
        </div>
        <p class="sectionTitle">Ver ${isMovie ? 'película' : 'episodios'}</p>
        <p class="noLinks">Este título aún no tiene links configurados.<br>Agrégalo en <code>LINKS</code> en <code>app.js</code>.</p>
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
      <span class="playerIcon">${isMovie ? '🎬' : '🎞️'}</span>
      <span class="playerTitle">${esc(a.title)}</span>
    </div>
    <div class="modalBody">
      <div class="animeInfo">
        <img class="animeInfoCover" src="${esc(a.cover)}" alt="" onerror="this.style.display='none'">
        <div class="animeInfoText">
          <h3>${esc(a.title)}</h3>
          <p class="infoMeta"><span class="star">★</span> ${esc(a.score || '—')} • ${esc((a.genres||[]).slice(0,3).join(' • '))}</p>
          <p class="infoMeta">Selecciona servidor</p>
        </div>
      </div>
      <div id="seasonTabsBox"></div>
      <p class="sectionTitle">Servidores</p>
      <div id="serverTabsBox"></div>
      <p class="sectionTitle">${isMovie ? 'Película' : 'Episodios'}</p>
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
    const player = document.getElementById('playerBox');
    if (!box) return;
    if (player) player.innerHTML = '';

    const keys = Object.keys(epsObj).sort((x,y) => Number(x) - Number(y));
    if (!keys.length){
      box.innerHTML = `<p class="noLinks">No hay contenido en <b>${esc(serverName)}</b>.</p>`;
      return;
    }
    box.innerHTML = keys.map(num => {
      const seen = isSeen(a.title, num);
      const label = isMovie ? 'Ver' : esc(num);
      return `
        <button class="episode${seen ? ' seen' : ''}" data-link="${esc(epsObj[num])}" data-num="${esc(num)}">
          ${label}
        </button>`;
    }).join('');

    box.onclick = (e) => {
      const btn = e.target.closest('.episode');
      if (!btn) return;
      const link = btn.dataset.link;
      const num = btn.dataset.num;

      if (link.startsWith('AQUI_') || !link.startsWith('http')){
        alert('⚠️ Aún sin link configurado.');
        return;
      }

      addToHistory(a.title, isMovie ? 'Película' : num, a.cover);
      markAsSeen(a.title, num);
      updateSeenCount();
      btn.classList.add('seen');

      if (link.includes('drive.google.com')){
        const match = link.match(/\/d\/([^/]+)/);
        const id = match ? match[1] : '';
        player.innerHTML = `
          <div class="playerHeader">
            <span>▶ ${isMovie ? 'Película' : 'Episodio ' + esc(num)}</span>
            <button class="closePlayer" onclick="document.getElementById('playerBox').innerHTML=''">✕</button>
          </div>
          <iframe src="https://drive.google.com/file/d/${id}/preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        window.open(link, '_blank', 'noopener');
      }
    };
  }

  if (isSeasons){
    const seasons = Object.keys(animeLinks);
    const seasonBox = document.getElementById('seasonTabsBox');
    seasonBox.innerHTML = `
      <p class="sectionTitle">Temporadas</p>
      <div class="seasonTabs">
        ${seasons.map((s, i) => `
          <button class="seasonTab${i===0?' active':''}" data-season="${esc(s)}">${esc(s)}</button>
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

/* ═══ Cerrar ═══ */
document.getElementById('closeModal').onclick = () => modal.classList.add('hidden');
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.add('hidden'); });
document.getElementById('clearHistory').onclick = () => {
  if (confirm('¿Borrar todo el historial?')) clearHistory();
};

/* ═══ Perfil ═══ */
const profileModal = document.getElementById('profileModal');
const profileBtn = document.getElementById('profileBtn');
const closeProfile = document.getElementById('closeProfile');
const profileName = document.getElementById('profileName');
const profileNameInput = document.getElementById('profileNameInput');
const saveProfile = document.getElementById('saveProfile');
const themeState = document.getElementById('themeState');
const seenCountEl = document.getElementById('seenCount');

function updateSeenCount(){
  if (seenCountEl) seenCountEl.textContent = totalSeenCount();
}
const savedName = localStorage.getItem('anime_name') || '';
if (savedName){
  profileName.textContent = savedName;
  profileNameInput.value = savedName;
  profileBtn.textContent = savedName.charAt(0).toUpperCase();
}
profileBtn.onclick = () => {
  profileNameInput.value = profileName.textContent === 'Invitado' ? '' : profileName.textContent;
  themeState.textContent = document.body.classList.contains('light') ? 'Claro' : 'Oscuro';
  updateSeenCount();
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
document.getElementById('optClearSeen').onclick = () => {
  if (confirm('¿Borrar la marca de vistos?')){ clearSeen(); alert('✅ Limpiado'); }
};

/* ═══ Toggle Series / Películas ═══ */
document.querySelectorAll('.typeBtn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.typeBtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentType = btn.dataset.type;
    catalog = currentType === 'movies' ? catalogMovies : catalogSeries;
    genreFilter.innerHTML = '<option value="">Todos los géneros</option>';
    fillGenres();
    if (sortFilter) sortFilter.value = 'default';
    applyFilters();
  };
});

/* ═══ Eventos ═══ */
searchInput.addEventListener('input', applyFilters);
genreFilter.addEventListener('change', applyFilters);
if (sortFilter) sortFilter.addEventListener('change', applyFilters);
document.getElementById('themeBtn').onclick = () => { document.body.classList.toggle('light'); };

/* ═══ Cargar catálogo ═══ */
async function loadCatalog(){
  statusEl.textContent = 'Cargando catálogo...';
  try {
    // SERIES
    const querySeries = `query ($page: Int) { Page(page: $page, perPage: 50) { media(type: ANIME, format_not: MOVIE, sort: POPULARITY_DESC) { id title { romaji english native } genres episodes averageScore seasonYear coverImage { large } } } }`;
    const seriesTodas = [];
    for (const p of [1, 2]){
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: querySeries, variables: { page: p } })
      });
      const data = await res.json();
      seriesTodas.push(...(data?.data?.Page?.media || []));
      await new Promise(r => setTimeout(r, 700));
    }
    catalogSeries = seriesTodas.map(x => ({
      title: x.title?.english || x.title?.romaji || x.title?.native || 'Anime',
      genres: x.genres || [],
      episodes: x.episodes || 0,
      score: x.averageScore ? (x.averageScore/10).toFixed(1) : '—',
      year: x.seasonYear || null,
      cover: x.coverImage?.large || ''
    })).filter(x => x.title);
    catalogSeries = [...CUSTOM_SERIES, ...catalogSeries];
    const vistoS = new Set();
    catalogSeries = catalogSeries.filter(a => {
      if (vistoS.has(a.title)) return false;
      vistoS.add(a.title);
      return true;
    });

    // MOVIES
    const queryMovies = `query ($page: Int) { Page(page: $page, perPage: 50) { media(type: ANIME, format: MOVIE, sort: POPULARITY_DESC) { id title { romaji english native } genres episodes averageScore seasonYear coverImage { large } } } }`;
    const moviesTodas = [];
    for (const p of [1, 2]){
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryMovies, variables: { page: p } })
      });
      const data = await res.json();
      moviesTodas.push(...(data?.data?.Page?.media || []));
      await new Promise(r => setTimeout(r, 700));
    }
    let deAniList = moviesTodas.map(x => ({
      title: x.title?.english || x.title?.romaji || x.title?.native || 'Película',
      genres: x.genres || [],
      episodes: 1,
      score: x.averageScore ? (x.averageScore/10).toFixed(1) : '—',
      year: x.seasonYear || null,
      cover: x.coverImage?.large || ''
    })).filter(x => x.title);

    catalogMovies = [...CUSTOM_MOVIES, ...deAniList];
    const vistoM = new Set();
    catalogMovies = catalogMovies.filter(a => {
      if (vistoM.has(a.title)) return false;
      vistoM.add(a.title);
      return true;
    });

    catalogAll = [...catalogSeries, ...catalogMovies];
    catalog = catalogSeries;

  } catch(e) {
    console.error('Error:', e);
    catalogSeries = [...CUSTOM_SERIES, ...fallback];
    catalogMovies = [...CUSTOM_MOVIES];
    catalogAll = [...catalogSeries, ...catalogMovies];
    catalog = catalogSeries;
    statusEl.textContent = 'Catálogo de respaldo cargado.';
  }

  fillGenres();
  applyFilters();
  renderHistory();
  renderFresh();
  renderSoon();
  updateSeenCount();
}
loadCatalog();