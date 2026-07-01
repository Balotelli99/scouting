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

let huidigeSpeltak = 'explorersRovers';
let scores = { explorersRovers: {}, beversWelpenScouts: {} };

function wisselSpeltak(speltak) {
    huidigeSpeltak = speltak;
    
    // Knoppen actieve status geven
    document.getElementById('btn-er').classList.toggle('active', speltak === 'explorersRovers');
    document.getElementById('btn-bws').classList.toggle('active', speltak === 'beversWelpenScouts');
    
    // Titel updaten
    document.getElementById('speltak-titel').innerText = competentieData[speltak].titel;
    
    renderTaken();
    updateScores();
}

function renderTaken() {
    const container = document.getElementById('taken-lijst');
    container.innerHTML = '';
    
    const data = competentieData[huidigeSpeltak];
    const hoofdtaken = [
        { num: 1, titel: "1. Coördinerende en teamgerichte taken" },
        { num: 2, titel: "2. Kwaliteitsbewaking team & activiteiten" },
        { num: 3, titel: "3. Vertegenwoordiging team (binnen/buiten)" }
    ];
    
    hoofdtaken.forEach(ht => {
        const takenVoorHoofdtak = data.taken.filter(t => t.taakNummer === ht.num);
        if(takenVoorHoofdtak.length === 0) return;
        
        const h3 = document.createElement('h3');
        h3.className = 'hoofdtak-titel';
        h3.innerText = ht.titel;
        container.appendChild(h3);
        
        takenVoorHoofdtak.forEach(taak => {
            const rij = document.createElement('div');
            rij.className = 'taak-rij';
            
            const huidigeScore = scores[huidigeSpeltak][taak.id] || "";
            
            rij.innerHTML = `
                <span class="taak-tekst">${taak.tekst}</span>
                <select onchange="updateScore(${taak.id}, this.value)">
                    <option value="" disabled ${huidigeScore === "" ? "selected" : ""}>-- Kies --</option>
                    <option value="1" ${huidigeScore == 1 ? "selected" : ""}>1 - Onbekend</option>
                    <option value="2" ${huidigeScore == 2 ? "selected" : ""}>2 - Bekend</option>
                    <option value="3" ${huidigeScore == 3 ? "selected" : ""}>3 - Toepassen</option>
                    <option value="4" ${huidigeScore == 4 ? "selected" : ""}>4 - Breder</option>
                    <option value="5" ${huidigeScore == 5 ? "selected" : ""}>5 - Overdragen</option>
                </select>
            `;
            container.appendChild(rij);
        });
    });
}

function updateScore(id, waarde) {
    scores[huidigeSpeltak][id] = parseInt(waarde);
    updateScores();
}

function updateScores() {
    const data = competentieData[huidigeSpeltak];
    
    [1, 2, 3].forEach(num => {
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
        
        // Update desktop sidebar
        document.getElementById(`score-${num}-text`).innerText = `${percentage}%`;
        document.getElementById(`progress-${num}`).style.width = `${percentage}%`;

        // Update mobiele score-balk onderaan
        document.getElementById(`m-score-${num}`).innerText = `${percentage}%`;
        document.getElementById(`m-progress-${num}`).style.width = `${percentage}%`;
    });
}


wisselSpeltak('explorersRovers');