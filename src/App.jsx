import { useState } from 'react'
import './App.css'

const competentieData = {
  explorersRovers: {
    titel: "Teamleiding Explorers / Adviseur Roverscouts",
    taken: [
      { id: 1, taakNummer: 1, tekst: "Periodiek planning taken en werkzaamheden maken (explo) of jongeren hierover adviseren (rover)." },
      { id: 2, taakNummer: 1, tekst: "Bevorderen samenwerking leidingteam, zowel voor jeugdleden als voor leiding onderling." },
      { id: 3, taakNummer: 1, tekst: "Bevorderen taakverdeling leidingteam, zowel voor jeugdleden als voor leiding onderling." },
      { id: 4, taakNummer: 1, tekst: "Bevorderen gezamenlijke verantwoordelijkheid leidingteam, zowel voor jeugdleden als voor leiding onderling." },
      { id: 5, taakNummer: 1, tekst: "Tonen daadkracht ten aanzien van veiligheid en optreden indien nodig." },
      { id: 6, taakNummer: 1, tekst: "Leiderschap tonen bij crisis (voorspelbare situatie)" },
      { id: 7, taakNummer: 1, tekst: "Aanpassen eigen houding en gedrag aan de situatie van het moment." },
      { id: 8, taakNummer: 1, tekst: "Juist afhandelen ongeval (onvoorspelbare situatie) richting jeugdlid en ouders, in samenwerking met groepsbestuur." },
      { id: 9, taakNummer: 2, tekst: "Belang van de kwaliteit van het activiteitenprogramma bewaken samen met jongeren, rekening houdend met de progressiematrix." },
      { id: 10, taakNummer: 2, tekst: "Actieve rol aannemen in begeleiding nieuwe teamleden of coaches/adviseurs tijdens introductiefase." },
      { id: 11, taakNummer: 2, tekst: "Kwaliteit en ontwikkelplan van het team opstellen en verbeteren in overleg met groeps- en praktijkbegeleider." },
      { id: 12, taakNummer: 2, tekst: "Complexe leeftijds- en gedragskenmerken in de eigen en naastliggende speltak verklaren, rekening houdend met ontwikkeling brein." },
      { id: 13, taakNummer: 3, tekst: "Op bekwame wijze speleenheid vertegenwoordigen binnen en buiten de groep (regio, contacten ouders)." }
    ]
  },
  beversWelpenScouts: {
    titel: "Teamleiding Bevers / Welpen / Scouts",
    taken: [
      { id: 1, taakNummer: 1, tekst: "Periodiek planning taken en werkzaamheden maken." },
      { id: 2, taakNummer: 1, tekst: "Bevorderen samenwerking en gezamenlijke verantwoordelijkheid in het leidingteam." },
      { id: 3, taakNummer: 1, tekst: "Tonen daadkracht ten aanzien van veiligheid en handelen bij crisis." },
      { id: 4, taakNummer: 1, tekst: "Aanpassen eigen houding en gedrag aan de situatie van het moment." },
      { id: 5, taakNummer: 2, tekst: "Bewaken kwaliteit van het activiteitenprogramma, rekening houdend met de progressiematrix." },
      { id: 6, taakNummer: 2, tekst: "Actieve rol aannemen in begeleiding nieuwe teamleden tijdens de introductiefase." },
      { id: 7, taakNummer: 2, tekst: "Binnen leidingteam reflecteren op elkaars houding en gedrag." },
      { id: 8, taakNummer: 3, tekst: "Op bekwame wijze speleenheid vertegenwoordigen binnen groep richting ouders en andere teamleiders." }
    ]
  }
};

function App() {
  const [huidigeSpeltak, setHuidigeSpeltak] = useState('explorersRovers');
  const [scores, setScores] = useState({ explorersRovers: {}, beversWelpenScouts: {} });

  const wisselSpeltak = (speltak) => {
    setHuidigeSpeltak(speltak);
  };

  const updateScore = (id, waarde) => {
    setScores(prev => ({
      ...prev,
      [huidigeSpeltak]: {
        ...prev[huidigeSpeltak],
        [id]: parseInt(waarde)
      }
    }));
  };

  const hoofdtaken = [
    { num: 1, titel: "1. Coördinerende en teamgerichte taken" },
    { num: 2, titel: "2. Kwaliteitsbewaking team & activiteiten" },
    { num: 3, titel: "3. Vertegenwoordiging team (binnen/buiten)" }
  ];

  const data = competentieData[huidigeSpeltak];
  
  const scoreInfo = [1, 2, 3].map(num => {
    const relevanteTaken = data.taken.filter(t => t.taakNummer === num);
    let totaal = 0;
    let aantal = 0;
    relevanteTaken.forEach(t => {
      if(scores[huidigeSpeltak][t.id]) {
        totaal += scores[huidigeSpeltak][t.id];
        aantal++;
      }
    });
    const percentage = aantal === 0 ? 0 : Math.round(((totaal / aantal) / 5) * 100);
    return { num, percentage };
  });

  return (
    <>
      <header className="scouting-header">
        <div className="header-inner">
          <img src="/logo.png" alt="Scouting Nederland logo" className="scouting-logo" />
          <div className="header-tekst">
            <h1 className="scouting-title">Scouting Competentieroos</h1>
            <p className="scouting-subtitle">Digitale Kwalificatiekaart &amp; Ontwikkeltool voor Teamleiding</p>
          </div>
        </div>
      </header>

      <div className="nav-container">
        <button 
          id="btn-er" 
          className={"nav-btn" + (huidigeSpeltak === 'explorersRovers' ? ' active' : '')} 
          onClick={() => wisselSpeltak('explorersRovers')}
        >
          Explorers & Roverscouts
        </button>
        <button 
          id="btn-bws" 
          className={"nav-btn" + (huidigeSpeltak === 'beversWelpenScouts' ? ' active' : '')} 
          onClick={() => wisselSpeltak('beversWelpenScouts')}
        >
          Bevers, Welpen & Scouts
        </button>
      </div>

      <div className="main-container">
        <div className="card">
          <h2 id="speltak-titel" className="card-title">{data.titel}</h2>
          <p className="card-intro">
            Geef bij ieder onderdeel aan in hoeverre je hiermee bekend bent of het beheerst op een schaal van 1 t/m 5. 
            Vul dit zo eerlijk mogelijk in om samen met je praktijkbegeleider een ontwikkelplan op te stellen.
          </p>

          <div id="taken-lijst">
            {hoofdtaken.map(ht => {
              const takenVoorHoofdtak = data.taken.filter(t => t.taakNummer === ht.num);
              if(takenVoorHoofdtak.length === 0) return null;
              
              return (
                <div key={ht.num}>
                  <h3 className="hoofdtak-titel">{ht.titel}</h3>
                  {takenVoorHoofdtak.map(taak => {
                    const huidigeScore = scores[huidigeSpeltak][taak.id] || "";
                    return (
                      <div key={taak.id} className="taak-rij">
                        <span className="taak-tekst">{taak.tekst}</span>
                        <select 
                          value={huidigeScore}
                          onChange={(e) => updateScore(taak.id, e.target.value)}
                        >
                          <option value="" disabled>-- Kies --</option>
                          <option value="1">1 - Onbekend</option>
                          <option value="2">2 - Bekend</option>
                          <option value="3">3 - Toepassen</option>
                          <option value="4">4 - Breder</option>
                          <option value="5">5 - Overdragen</option>
                        </select>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="status-sidebar">
          <h3 className="sidebar-title">Jouw Score Overzicht</h3>
          
          <div className="score-item">
            <div className="score-header">
              <span>Hoofdtak 1: Teamgericht &amp; Coördinatie</span>
              <span id="score-1-text">{scoreInfo[0].percentage}%</span>
            </div>
            <div className="progress-bar-outer">
              <div id="progress-1" className="progress-bar-inner bar-groen" style={{ width: `${scoreInfo[0].percentage}%` }}></div>
            </div>
          </div>

          <div className="score-item">
            <div className="score-header">
              <span>Hoofdtak 2: Kwaliteitsbewaking</span>
              <span id="score-2-text">{scoreInfo[1].percentage}%</span>
            </div>
            <div className="progress-bar-outer">
              <div id="progress-2" className="progress-bar-inner bar-blauw" style={{ width: `${scoreInfo[1].percentage}%` }}></div>
            </div>
          </div>

          <div className="score-item">
            <div className="score-header">
              <span>Hoofdtak 3: Vertegenwoordiging</span>
              <span id="score-3-text">{scoreInfo[2].percentage}%</span>
            </div>
            <div className="progress-bar-outer">
              <div id="progress-3" className="progress-bar-inner bar-rood" style={{ width: `${scoreInfo[2].percentage}%` }}></div>
            </div>
          </div>

          <div className="legenda">
            <h4>Legenda van de Matrix</h4>
            <p><strong>1:</strong> Is mij onbekend / kan ik niet</p>
            <p><strong>2:</strong> Ik weet ervan, maar heb het nooit gebruikt</p>
            <p><strong>3:</strong> Ik weet het en kan het toepassen</p>
            <p><strong>4:</strong> Ik kan het toepassen in andere situaties</p>
            <p><strong>5:</strong> Ik beheers het volledig en kan het overdragen</p>
          </div>
        </div>
      </div>

      <div className="score-bar-mobiel">
        <div className="score-bar-mobiel-item">
          <span className="score-bar-mobiel-label">Teamgericht</span>
          <span className="score-bar-mobiel-waarde" id="m-score-1">{scoreInfo[0].percentage}%</span>
          <div className="mini-bar-outer">
            <div className="mini-bar-inner mini-bar-groen" id="m-progress-1" style={{ width: `${scoreInfo[0].percentage}%` }}></div>
          </div>
        </div>
        <div className="score-bar-mobiel-item">
          <span className="score-bar-mobiel-label">Kwaliteit</span>
          <span className="score-bar-mobiel-waarde" id="m-score-2">{scoreInfo[1].percentage}%</span>
          <div className="mini-bar-outer">
            <div className="mini-bar-inner mini-bar-blauw" id="m-progress-2" style={{ width: `${scoreInfo[1].percentage}%` }}></div>
          </div>
        </div>
        <div className="score-bar-mobiel-item">
          <span className="score-bar-mobiel-label">Vertegen.</span>
          <span className="score-bar-mobiel-waarde" id="m-score-3">{scoreInfo[2].percentage}%</span>
          <div className="mini-bar-outer">
            <div className="mini-bar-inner mini-bar-rood" id="m-progress-3" style={{ width: `${scoreInfo[2].percentage}%` }}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App