(function() {
  // Subway map HTML
  const subwayHTML = `
    <div id="subway-nav">
      <svg width="100%" height="60" viewBox="0 0 700 60">
        <line x1="50" y1="30" x2="650" y2="30" stroke="#888" stroke-width="8"/>
        <a href="/Dramaverse/"><circle id="station-dramaverse" cx="50" cy="30" r="15" /></a>
        <a href="/Funverse/"><circle id="station-funverse" cx="150" cy="30" r="15" /></a>
        <a href="/Historyverse/"><circle id="station-historyverse" cx="250" cy="30" r="15" /></a>
        <a href="/Horroverse/"><circle id="station-horroverse" cx="350" cy="30" r="15" /></a>
        <a href="/Kinkyverse/"><circle id="station-kinkyverse" cx="450" cy="30" r="15" /></a>
        <a href="/Prime/"><circle id="station-prime" cx="550" cy="30" r="15" /></a>
        <a href="/Techverse/"><circle id="station-techverse" cx="650" cy="30" r="15" /></a>
      </svg>
      <div class="station-labels">
        <span>Dramaverse</span>
        <span>Funverse</span>
        <span>Historyverse</span>
        <span>Horroverse</span>
        <span>Kinkyverse</span>
        <span>Prime</span>
        <span>Techverse</span>
      </div>
    </div>
  `;

  // Inject the subway nav at the end of the body
  document.addEventListener("DOMContentLoaded", function() {
    document.body.insertAdjacentHTML('beforeend', subwayHTML);

    // Highlight current verse
    const verseMap = {
      "Dramaverse": "station-dramaverse",
      "Funverse": "station-funverse",
      "Historyverse": "station-historyverse",
      "Horroverse": "station-horroverse",
      "Kinkyverse": "station-kinkyverse",
      "Prime": "station-prime",
      "Techverse": "station-techverse"
    };
    const path = window.location.pathname;
    const match = path.match(/\/([A-Za-z]+verse)\//);
    if (match && verseMap[match[1]]) {
      document.getElementById(verseMap[match[1]]).classList.add('active');
    }
  });
})(); 