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
  const svgWidth = 800, svgHeight = 370;
  const homeX = svgWidth / 2, homeY = 40;
  const aboutX = svgWidth / 2 - 120, aboutY = 110;
  const hubX = svgWidth / 2 + 120, hubY = 110;
  const universeRadius = 120;
  const stationR = 17;

  // Tooltip div (HTML, styled)
  let tooltip = document.getElementById('subway-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'subway-tooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '9999';
    tooltip.style.padding = '7px 16px';
    tooltip.style.background = 'rgba(0,32,64,0.97)';
    tooltip.style.color = '#fff';
    tooltip.style.borderRadius = '7px';
    tooltip.style.fontSize = '1em';
    tooltip.style.fontFamily = 'sans-serif';
    tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';
    tooltip.style.visibility = 'hidden';
    document.body.appendChild(tooltip);
  }

  // Tooltip logic (encapsulated)
  function showTooltip(text, evt) {
    tooltip.textContent = text;
    tooltip.style.left = (evt.clientX + 14) + 'px';
    tooltip.style.top = (evt.clientY - 10) + 'px';
    tooltip.style.visibility = 'visible';
  }
  function hideTooltip() {
    tooltip.style.visibility = 'hidden';
  }

  // Current location detection
  const path = window.location.pathname;
  const currentPage = path.split("/").filter(Boolean).pop() || "index.html";
  const matchVerse = path.match(/\/([A-Za-z]+verse)\//);
  const currentVerse = matchVerse ? matchVerse[1].toLowerCase() : null;

  // SVG elements
  let lines = '';
  let stations = '';
  let userIcon = '';

  // Connections: Home to About and Hub
  lines += `<line x1="${homeX}" y1="${homeY}" x2="${aboutX}" y2="${aboutY}" stroke="#607d8b" stroke-width="7"/>`;
  lines += `<line x1="${homeX}" y1="${homeY}" x2="${hubX}" y2="${hubY}" stroke="#4caf50" stroke-width="7"/>`;

  // Stations: Home, About, Hub
  stations += `<a href="/index.html" data-title="Home"><circle cx="${homeX}" cy="${homeY}" r="${stationR+3}" fill="#2196f3" stroke="#222" stroke-width="3"/></a>`;
  stations += `<a href="/about.html" data-title="About"><circle cx="${aboutX}" cy="${aboutY}" r="${stationR}" fill="#607d8b" stroke="#222" stroke-width="3"/></a>`;
  stations += `<a href="/hub1.html" data-title="Hub"><circle cx="${hubX}" cy="${hubY}" r="${stationR}" fill="#4caf50" stroke="#222" stroke-width="3"/></a>`;

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

    // Universe node points to its index.html
    stations += `<a href="/${u.name}/index.html" data-title="${u.name}"><circle cx="${ux}" cy="${uy}" r="15" fill="${u.color}" stroke="#222" stroke-width="3"/></a>`;

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
  `;

  // Utility: Replace nav bar beneath header
  document.addEventListener("DOMContentLoaded", function() {
    // Find header and nav bar beneath it
    const header = document.querySelector('header');
    let navBar = null;
    if (header) {
      // Find next sibling nav (could be <nav>, or a div with class 'navbar', etc)
      navBar = header.nextElementSibling;
      // If next sibling is not nav bar, look for .navbar or nav in immediate siblings
      if (navBar && !(navBar.tagName === 'NAV' || navBar.classList.contains('navbar'))) {
        navBar = null;
        let sibling = header.nextElementSibling;
        while(sibling) {
          if (sibling.tagName === 'NAV' || sibling.classList.contains('navbar')) {
            navBar = sibling;
            break;
          }
          sibling = sibling.nextElementSibling;
        }
      }
    }
    // Replace nav bar if found, otherwise insert after header
    if (navBar) {
      navBar.parentNode.replaceChild(
        (function() {
          const div = document.createElement('div');
          div.innerHTML = subwayHTML;
          return div.firstElementChild;
        })(),
        navBar
      );
    } else if (header) {
      header.parentNode.insertBefore(
        (function() {
          const div = document.createElement('div');
          div.innerHTML = subwayHTML;
          return div.firstElementChild;
        })(),
        header.nextElementSibling
      );
    } else {
      // Fallback: Insert at top of body
      document.body.insertAdjacentHTML('afterbegin', subwayHTML);
    }

    // Tooltip event listeners (delegated)
    const nav = document.getElementById('subway-nav');
    if (nav) {
      nav.addEventListener('mousemove', function(evt) {
        const el = evt.target.closest('a[data-title]');
        if (el) {
          showTooltip(el.getAttribute('data-title'), evt);
        } else {
          hideTooltip();
        }
      });
      nav.addEventListener('mouseleave', hideTooltip);
    }
  });
})();
