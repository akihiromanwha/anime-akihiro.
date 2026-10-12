/* ═══ Modal de anime (estilo player) ═══ */
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