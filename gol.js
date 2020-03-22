
window.onload = function () {
  const SIZE = 6;
  // --- Bereich mit der Action, die man im Browser sieht
  var nächsteRundeKnopf = holeKnopfMitId('next');
  nächsteRundeKnopf.addEventListener('click', berechneNächsteGeneration);

  var zurücksetzenKnopf = holeKnopfMitId('reset');
  zurücksetzenKnopf.addEventListener('click', setzeSpielfeldZurück);

  let aktuelleRunde = setup();
  zeichneTabelle(aktuelleRunde);
  // --- ENDE --- Bereich mit der Action, die man im Browser sieht

  // --- Game of Life Funktionen ---
  function setup() {
    let spielfeld = [];

    for (let zeilenIndex = 0; zeilenIndex < 6; zeilenIndex++) {
      let zeile = [];

      for (let spaltenIndex = 0; spaltenIndex < 6; spaltenIndex++) {
        zeile.push(1); //Bereich für die randomize Funktion
      }

      spielfeld.push(zeile)
    }

    return spielfeld;
  }

  function zeichneTabelle(zellen) {
    holeHtmlTabelle().innerHTML = ""; // lösche die aktuelle Tabelle aus HTML Seite
    for (let tabellenZeile = 0; tabellenZeile < SIZE; tabellenZeile++) {
      zeichneZeile(zellen, tabellenZeile);
    }
  }

  function zeichneZeile(daten, zeilenIndex) {
    let tabelle = holeHtmlTabelle();
    let zeile = erzeugeTabellenZeile();

    for (let zellenIndex = 0; zellenIndex < 6; zellenIndex++) {
      let zelle = erzeugeTabellenZelle();
      fügeDerZeileHinzu(zeile, zelle);

      let istAmLeben = daten[zeilenIndex][zellenIndex] === 1;
      if (istAmLeben) {
        setzeZelleAufAlive(zelle);
      }
    }
    fügeDerTabelleHinzu(tabelle, zeile);
  }

  function berechneNächsteGeneration() {
    let nächsteRunde = setup();

    for (let zeilenÜbergang = 0; zeilenÜbergang < 6; zeilenÜbergang++) {
      var nächsteZeile = [];
      for (let nächsteRundeZelle = 0; nächsteRundeZelle < 6; nächsteRundeZelle++) {
        nächsteZeile.push(gibNächstenStatus(aktuelleRunde, zeilenÜbergang, nächsteRundeZelle));

      }
      nächsteRunde[zeilenÜbergang] = nächsteZeile;
    }
    aktuelleRunde = nächsteRunde;

    zeichneTabelle(nächsteRunde);
  }

  function gibNächstenStatus(daten, y, x) {

    // Zähle Nachbarn
    let lebendeNachbarn = 0;
    try { if (daten[y - 1][x - 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y][x - 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y + 1][x - 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y + 1][x] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y + 1][x + 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y][x + 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y - 1][x + 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y - 1][x] === 1) { lebendeNachbarn++ } } catch (error) { }

    // Werte Regeln aus
    let statusInDerNächstenRunde;
    let aktuelleZelle = daten[y][x];
    let istTot = aktuelleZelle === 0;
    let istAmLeben = aktuelleZelle === 1;

    if (istTot) {
      statusInDerNächstenRunde = entstehtLebendeZelle(lebendeNachbarn);
    } else if (istAmLeben) {
      statusInDerNächstenRunde = bleibtZelleAmLeben(lebendeNachbarn);
    }

    return statusInDerNächstenRunde;
  }

  function entstehtLebendeZelle(lebendeNachbarn) {
    return lebendeNachbarn === 3;
  }

  function bleibtZelleAmLeben(lebendeNachbarn) {
    let status;
    if (lebendeNachbarn < 2) {
      status = 0;
    }
    else if ((lebendeNachbarn === 2) || (lebendeNachbarn === 3)) {
      status = 1;
    }
    else if (lebendeNachbarn > 3) {
      status = 0;
    }
    return status;
  }

  function setzeSpielfeldZurück() {
    aktuelleRunde = setup();
    zeichneTabelle(aktuelleRunde);
  }
  // --- ENDE --- Game of Life Funktionen ---

  // --- Hilfsfunktionen zur Arbeit mit HTML Elementen ---
  function setzeZelleAufAlive(zelle) {
    zelle.className += " alive";
  }

  function fügeDerTabelleHinzu(tabelle, zeile) {
    tabelle.appendChild(zeile);
  }

  function fügeDerZeileHinzu(zeile, zelle) {
    zeile.appendChild(zelle);
  }

  function erzeugeTabellenZelle() {
    return document.createElement('td');
  }

  function erzeugeTabellenZeile() {
    return document.createElement('tr');
  }

  function holeHtmlTabelle() {
    return document.getElementById('gol-container');
  }

  function holeKnopfMitId(id) {
    return document.getElementById(id);
  }
  // --- ENDE --- Hilfsfunktionen zur Arbeit mit HTML Elementen ---

}
