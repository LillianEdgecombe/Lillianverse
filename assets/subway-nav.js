(function() {
  // Universes structure
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

  // SVG layout
  const svgWidth = 800;
  const svgHeight = 320;
  // Node positions
  const homeX = svgWidth / 2, homeY = 40;
  const aboutX = svgWidth / 2 - 120, aboutY = 110;
  const hubX = svgWidth / 2 + 120, hubY = 110;
  const universeY = 220;
  const universeGap = 70;
  const universeStartX = hubX - (universeGap * (universes.length - 1) / 2);

  // Current location detection
  const path = window.location.pathname;
  const currentPage = path.split("/").filter(Boolean).pop() || "index.html";
  const matchVerse = path.match(/\/([A-Za-z]+verse)\//);
  const currentVerse = matchVerse ? matchVerse[1].toLowerCase() : null;

  // SVG elements
  let lines = '';
  let stations = '';
  let labels = '';
  let userIcon = '';

  // Connections: Home to About and Hub
  lines += `<line x1="${homeX}" y1="${homeY}" x2="${aboutX}" y2="${aboutY}" stroke="#607d8b" stroke-width="7"/>`;
  lines += `<line x1="${homeX}" y1="${homeY}" x2="${hubX}" y2="${hubY}" stroke="#4caf50" stroke-width="7"/>`;

  // Hub to Universes
  universes.forEach((u, i) => {
    const ux = universeStartX + i * universeGap;
    lines += `<line x1="${hubX}" y1="${hubY}" x2="${ux}" y2="${universeY - 22}" stroke="${u.color}" stroke-width="7"/>`;
  });

  // Stations
  stations += `<a href="/index.html"><circle cx="${homeX}" cy="${homeY}" r="20" fill="#2196f3" stroke="#222" stroke-width="3"/></a>`;
  stations += `<a href="/about.html"><circle cx="${aboutX}" cy="${aboutY}" r="17" fill="#607d8b" stroke="#222" stroke-width="3"/></a>`;
  stations += `<a href="/hub1.html"><circle cx="${hubX}" cy="${hubY}" r="17" fill="#4caf50" stroke="#222" stroke-width="3"/></a>`;

  universes.forEach((u, i) => {
    const ux = universeStartX + i * universeGap;
    stations += `<a href="/${u.name}/"><circle cx="${ux}" cy="${universeY}" r="15" fill="${u.color}" stroke="#222" stroke-width="3"/></a>`;
  });

  // Labels
  labels += `<text x="${homeX}" y="${homeY-28}" text-anchor="middle" font-size="1.1em" fill="#2196f3" font-weight="bold">Home</text>`;
  labels += `<text x="${aboutX}" y="${aboutY+35}" text-anchor="middle" font-size="1em" fill="#607d8b">About</text>`;
  labels += `<text x="${hubX}" y="${hubY+35}" text-anchor="middle" font-size="1em" fill="#4caf50">Hub</text>`;
  universes.forEach((u, i) => {
    const ux = universeStartX + i * universeGap;
    labels += `<text x="${ux}" y="${universeY+30}" text-anchor="middle" font-size="0.9em" fill="${u.color}">${u.name}</text>`;
  });

  // User location icon (avatar)
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
  universes.forEach((u, i) => {
    const ux = universeStartX + i * universeGap;
    if (u.name.toLowerCase() === currentVerse)
      userIcon = makeUserIcon(ux, universeY);
  });

  // Compose HTML
  const subwayHTML = `
    <div id="subway-nav" style="position:relative;z-index:100;">
      <svg width="100%" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
        ${lines}
        ${stations}
        ${labels}
        ${userIcon}
      </svg>
    </div>
  `;

  // Inject the subway nav at the end of the body
  document.addEventListener("DOMContentLoaded", function() {
    document.body.insertAdjacentHTML('beforeend', subwayHTML);
  });
})();
