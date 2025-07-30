(function() {
  // Universe info
  const universes = [
    { name: "Dramaverse", color: "#e53935" },
    { name: "Funverse", color: "#8e24aa" },
    { name: "Historyverse", color: "#3949ab" },
    { name: "Horrorverse", color: "#00897b" },
    { name: "Kinkyverse", color: "#fbc02d" },
    { name: "Primeverse", color: "#fb8c00" },
    { name: "Techverse", color: "#43a047" },
    { name: "Weirdverse", color: "#6a1b9a" },
    { name: "Islingtonverse", color: "#1565c0" }
  ];

  // SVG geometry
  const svgWidth = 800, svgHeight = 340;
  const homeX = svgWidth / 2, homeY = 40;
  const aboutX = svgWidth / 2 - 120, aboutY = 110;
  const hubX = svgWidth / 2 + 120, hubY = 110;
  const universeRadius = 100;
  const hubAngle = Math.PI / 2; // Downwards
  const fanStart = Math.PI * 0.85;
  const fanEnd = Math.PI * 0.15;
  const stationR = 17;

  // Current location detection
  const path = window.location.pathname;
  const currentPage = path.split("/").filter(Boolean).pop() || "index.html";
  const matchVerse = path.match(/\/([A-Za-z]+verse)\//);
  const currentVerse = matchVerse ? matchVerse[1].toLowerCase() : null;

  // Tooltip div (HTML, styled)
  if (!document.getElementById('subway-tooltip')) {
    const tooltip = document.createElement('div');
    tooltip.id = 'subway-tooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = 9999;
    tooltip.style.padding = '5px 13px';
    tooltip.style.background = 'rgba(0,32,64,0.97)';
    tooltip.style.color = '#fff';
    tooltip.style.borderRadius = '7px';
    tooltip.style.fontSize = '1em';
    tooltip.style.fontFamily = 'sans-serif';
    tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';
    tooltip.style.visibility = 'hidden';
    document.body.appendChild(tooltip);
  }
  function showTooltip(text, evt) {
    const tooltip = document.getElementById('subway-tooltip');
    tooltip.textContent = text;
    tooltip.style.left = (evt.clientX + 12) + 'px';
    tooltip.style.top = (evt.clientY - 10) + 'px';
    tooltip.style.visibility = 'visible';
  }
  function hideTooltip() {
    const tooltip = document.getElementById('subway-tooltip');
    tooltip.style.visibility = 'hidden';
  }

  // SVG elements
  let lines = '';
  let stations = '';
  let userIcon = '';

  // Connections: Home to About and Hub
  lines += `<line x1="${homeX}" y1="${homeY}" x2="${aboutX}" y2="${aboutY}" stroke="#607d8b" stroke-width="7"/>`;
  lines += `<line x1="${homeX}" y1="${homeY}" x2="${hubX}" y2="${hubY}" stroke="#4caf50" stroke-width="7"/>`;

  // Stations: Home, About, Hub
  stations += `<a href="/index.html" onmouseenter="showTooltip('Home',event)" onmouseleave="hideTooltip()"><circle cx="${homeX}" cy="${homeY}" r="${stationR+3}" fill="#2196f3" stroke="#222" stroke-width="3"/></a>`;
  stations += `<a href="/about.html" onmouseenter="showTooltip('About',event)" onmouseleave="hideTooltip()"><circle cx="${aboutX}" cy="${aboutY}" r="${stationR}" fill="#607d8b" stroke="#222" stroke-width="3"/></a>`;
  stations += `<a href="/hub1.html" onmouseenter="showTooltip('Hub',event)" onmouseleave="hideTooltip()"><circle cx="${hubX}" cy="${hubY}" r="${stationR}" fill="#4caf50" stroke="#222" stroke-width="3"/></a>`;

  // Universe branches: fan out from hub node
  const fanSpread = Math.PI * 0.9; // 162°
  const fanOffset = Math.PI / 2 - fanSpread / 2;
  universes.forEach((u, i) => {
    // Polar coordinates for branching
    const angle = fanOffset + (fanSpread * i) / (universes.length - 1);
    const ux = hubX + universeRadius * Math.cos(angle);
    const uy = hubY + universeRadius * Math.sin(angle);

    // Line from Hub to Universe
    lines += `<line x1="${hubX}" y1="${hubY}" x2="${ux}" y2="${uy}" stroke="${u.color}" stroke-width="7"/>`;

    // Station with tooltip
    stations += `<a href="/${u.name}/" onmouseenter="showTooltip('${u.name}',event)" onmouseleave="hideTooltip()"><circle cx="${ux}" cy="${uy}" r="15" fill="${u.color}" stroke="#222" stroke-width="3"/></a>`;

    // User icon if in current universe
    if (u.name.toLowerCase() === currentVerse)
      userIcon = `<g>
        <circle cx="${ux}" cy="${uy}" r="11" fill="#fff" stroke="#222" stroke-width="2"/>
        <circle cx="${ux}" cy="${uy-4}" r="5" fill="#2196f3"/>
        <rect x="${ux-4}" y="${uy+3}" width="8" height="6" rx="2" fill="#2196f3"/>
      </g>`;
  });

  // User icon if at root, about, or hub
  function makeUserIcon(cx, cy) {
    return `<g>
      <circle cx="${cx}" cy="${cy}" r="11" fill="#fff" stroke="#222" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy-4}" r="5" fill="#2196f3"/>
      <rect x="${cx-4}" y="${cy+3}" width="8" height="6" rx="2" fill="#2196f3"/>
    </g>`;
  }
  if (currentPage === "index.html") userIcon = makeUserIcon(homeX, homeY);
  if (currentPage === "about.html") userIcon = makeUserIcon(aboutX, aboutY);
  if (currentPage === "hub1.html") userIcon = makeUserIcon(hubX, hubY);

  // Compose HTML
  const subwayHTML = `
    <div id="subway-nav" style="position:relative;z-index:100;">
      <svg width="100%" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
        ${lines}
        ${stations}
        ${userIcon}
      </svg>
    </div>
    <script>
      window.showTooltip = ${showTooltip.toString()};
      window.hideTooltip = ${hideTooltip.toString()};
    </script>
  `;

  // Inject the subway nav at the end of the body
  document.addEventListener("DOMContentLoaded", function() {
    document.body.insertAdjacentHTML('beforeend', subwayHTML);
  });
})();
