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

  // SVG layout
  const startX = 50, gap = 100, y = 30, stationR = 15;
  const svgWidth = startX * 2 + gap * (universes.length - 1);

  // Get current universe from URL
  const path = window.location.pathname;
  const match = path.match(/\/([A-Za-z]+verse)\//);
  const currentVerse = match ? match[1] : null;

  // Build SVG lines and stations
  let lines = '';
  let stations = '';
  let userIcon = '';
  
  universes.forEach((u, i) => {
    // Draw line segment (except for the last station)
    if (i < universes.length - 1) {
      const x1 = startX + gap * i;
      const x2 = startX + gap * (i + 1);
      lines += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${u.color}" stroke-width="8"/>`;
    }
    
    // Draw station
    const cx = startX + gap * i;
    stations += `<a href="/${u.name}/"><circle id="station-${u.name.toLowerCase()}" cx="${cx}" cy="${y}" r="${stationR}" fill="${u.color}" stroke="#222" stroke-width="3"/></a>`;
    
    // Draw user icon if this is the current universe
    if (u.name.toLowerCase() === (currentVerse ? currentVerse.toLowerCase() : '')) {
      userIcon = `<g>
        <circle cx="${cx}" cy="${y}" r="10" fill="#fff" stroke="#222" stroke-width="2"/>
        <circle cx="${cx}" cy="${y-3}" r="5" fill="#2196f3"/>
        <rect x="${cx-4}" y="${y+2}" width="8" height="6" rx="2" fill="#2196f3"/>
      </g>`;
    }
  });

  // Build station labels
  let labels = '';
  universes.forEach((u, i) => {
    labels += `<span style="color:${u.color};width:80px;text-align:center;">${u.name}</span>`;
  });

  // Compose HTML
  const subwayHTML = `
    <div id="subway-nav">
      <svg width="100%" height="60" viewBox="0 0 ${svgWidth} 60">
        ${lines}
        ${stations}
        ${userIcon}
      </svg>
      <div class="station-labels" style="display:flex;justify-content:space-between;margin:0 40px;font-size:0.9em;">
        ${labels}
      </div>
    </div>
  `;

  // Inject the subway nav at the end of the body
  document.addEventListener("DOMContentLoaded", function() {
    document.body.insertAdjacentHTML('beforeend', subwayHTML);
  });
})(); 