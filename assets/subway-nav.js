(function() {
  // Define universes and their properties
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

  // SVG layout constants
  const startX = 120, gap = 90, yRoot = 30, yBranch = 90, yUniverses = 160, stationR = 16;

  // Calculate SVG width based on universes
  const svgWidth = startX * 2 + gap * (universes.length - 1);

  // Current page
  const path = window.location.pathname;
  const currentPage = path.split("/").filter(Boolean).pop() || "index.html";
  const matchVerse = path.match(/\/([A-Za-z]+verse)\//);
  const currentVerse = matchVerse ? matchVerse[1] : null;

  // Build lines and stations
  let lines = '';
  let stations = '';
  let userIcon = '';
  let labels = '';

  // Root station: index.html
  lines += `<line x1="${svgWidth/2}" y1="${yRoot}" x2="${svgWidth/2-80}" y2="${yBranch}" stroke="#666" stroke-width="7"/>`;
  lines += `<line x1="${svgWidth/2}" y1="${yRoot}" x2="${svgWidth/2+80}" y2="${yBranch}" stroke="#666" stroke-width="7"/>`;

  stations += `<a href="/index.html"><circle id="station-index" cx="${svgWidth/2}" cy="${yRoot}" r="${stationR+4}" fill="#2196f3" stroke="#222" stroke-width="3"/></a>`;
  labels += `<div style="position:absolute;left:${svgWidth/2-30}px;top:${yRoot-28}px;width:60px;text-align:center;font-weight:bold;color:#2196f3;">Home</div>`;

  // About branch
  stations += `<a href="/about.html"><circle id="station-about" cx="${svgWidth/2-80}" cy="${yBranch}" r="${stationR}" fill="#607d8b" stroke="#222" stroke-width="3"/></a>`;
  labels += `<div style="position:absolute;left:${svgWidth/2-120}px;top:${yBranch+14}px;width:80px;text-align:center;color:#607d8b;">About</div>`;

  // Hub branch
  stations += `<a href="/hub1.html"><circle id="station-hub" cx="${svgWidth/2+80}" cy="${yBranch}" r="${stationR}" fill="#4caf50" stroke="#222" stroke-width="3"/></a>`;
  labels += `<div style="position:absolute;left:${svgWidth/2+48}px;top:${yBranch+14}px;width:80px;text-align:center;color:#4caf50;">Hub</div>`;

  // Line from hub to universes
  lines += `<line x1="${svgWidth/2+80}" y1="${yBranch}" x2="${svgWidth/2+80}" y2="${yUniverses-34}" stroke="#4caf50" stroke-width="7"/>`;
  // Universe line
  lines += `<line x1="${startX}" y1="${yUniverses}" x2="${startX + gap * (universes.length-1)}" y2="${yUniverses}" stroke="#ccc" stroke-width="7"/>`;

  // Universe stations and labels
  universes.forEach((u, i) => {
    const cx = startX + gap * i;
    stations += `<a href="/${u.name}/"><circle id="station-${u.name.toLowerCase()}" cx="${cx}" cy="${yUniverses}" r="${stationR}" fill="${u.color}" stroke="#222" stroke-width="3"/></a>`;
    labels += `<div style="position:absolute;left:${cx-40}px;top:${yUniverses+18}px;width:80px;text-align:center;color:${u.color};">${u.name}</div>`;

    // User icon if current universe
    if (u.name.toLowerCase() === (currentVerse ? currentVerse.toLowerCase() : '')) {
      userIcon = `<g>
        <circle cx="${cx}" cy="${yUniverses}" r="11" fill="#fff" stroke="#222" stroke-width="2"/>
        <circle cx="${cx}" cy="${yUniverses-4}" r="5" fill="#2196f3"/>
        <rect x="${cx-4}" y="${yUniverses+3}" width="8" height="6" rx="2" fill="#2196f3"/>
      </g>`;
    }
  });

  // User icon if at root, about, or hub
  if (currentPage === "index.html") {
    userIcon = `<g>
      <circle cx="${svgWidth/2}" cy="${yRoot}" r="11" fill="#fff" stroke="#222" stroke-width="2"/>
      <circle cx="${svgWidth/2}" cy="${yRoot-4}" r="5" fill="#2196f3"/>
      <rect x="${svgWidth/2-4}" y="${yRoot+3}" width="8" height="6" rx="2" fill="#2196f3"/>
    </g>`;
  }
  if (currentPage === "about.html") {
    userIcon = `<g>
      <circle cx="${svgWidth/2-80}" cy="${yBranch}" r="11" fill="#fff" stroke="#222" stroke-width="2"/>
      <circle cx="${svgWidth/2-80}" cy="${yBranch-4}" r="5" fill="#2196f3"/>
      <rect x="${svgWidth/2-84}" y="${yBranch+3}" width="8" height="6" rx="2" fill="#2196f3"/>
    </g>`;
  }
  if (currentPage === "hub1.html") {
    userIcon = `<g>
      <circle cx="${svgWidth/2+80}" cy="${yBranch}" r="11" fill="#fff" stroke="#222" stroke-width="2"/>
      <circle cx="${svgWidth/2+80}" cy="${yBranch-4}" r="5" fill="#2196f3"/>
      <rect x="${svgWidth/2+76}" y="${yBranch+3}" width="8" height="6" rx="2" fill="#2196f3"/>
    </g>`;
  }

  // Compose HTML
  const subwayHTML = `
    <div id="subway-nav" style="position:relative;z-index:100;">
      <svg width="100%" height="220" viewBox="0 0 ${svgWidth} 220">
        ${lines}
        ${stations}
        ${userIcon}
      </svg>
      ${labels}
    </div>
  `;

  // Inject the subway nav at the end of the body
  document.addEventListener("DOMContentLoaded", function() {
    document.body.insertAdjacentHTML('beforeend', subwayHTML);
  });
})();
