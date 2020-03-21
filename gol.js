
window.onload = function () {
  const SIZE = 6;
  // --- Bereich mit der Action, die man im Browser sieht
  var knöpfchen = holeKnopfMitId('knopf');
  knöpfchen.addEventListener('click', myButton);

  var löschKnopf = holeKnopfMitId('reset');
  löschKnopf.addEventListener('click', myResetButton);
  // aktuelleRunde
  let aktuelleRunde = setup();

  zeichneTabelle(aktuelleRunde);
  // --- ENDE --- Bereich mit der Action, die man im Browser sieht

  // --- Game of Life Funktionen ---
  function zeichneTabelle(zellen) {
    for (let tabellenZeile = 0; tabellenZeile < SIZE; tabellenZeile++) {
      zeichneZeile(zellen, tabellenZeile);
    }
  }

  function gibNächstenStatus(daten, y, x) {
    let rundenVeraenderung = daten.slice(); // daten.slice kopiert ein Array
    let lebendeNachbarn = 0;

    // Zähle Nachbarn
    try { if (daten[y - 1][x - 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y][x - 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y + 1][x - 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y + 1][x] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y + 1][x + 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y][x + 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y - 1][x + 1] === 1) { lebendeNachbarn++ } } catch (error) { }
    try { if (daten[y - 1][x] === 1) { lebendeNachbarn++ } } catch (error) { }

    // Werte Regeln aus
    if (istTot(daten[y][x]) === 0 && lebendeNachbarn === 3) {
      rundenVeraenderung[y][x] = 1;
    }
    if (istAmLeben(daten[y][x]) && lebendeNachbarn < 2) {
      rundenVeraenderung[y][x] = 0;
    }
    if (istAmLeben(daten[y][x]) && (lebendeNachbarn === 2 || lebendeNachbarn === 3)) {
      rundenVeraenderung[y][x] = 1;
    }
    if (istAmLeben(daten[y][x]) && lebendeNachbarn > 3) {
      rundenVeraenderung[y][x] = 0;
    }

    return rundenVeraenderung[y][x];
  }

  function istAmLeben(zelle) {
    return zelle === 1;
  }

  function istTot(zelle) {
    return zelle === 0;
  }

  function setup() {
    let spielfeld = [];

    for (zeile1 = 0; zeile1 < 6; zeile1++) {
      let zeile = [];
      for (spalte1 = 0; spalte1 < 6; spalte1++) {

        zeile.push(1); //Berecih für die randomize Fukntion
      }

      spielfeld.push(zeile)

    }

    return spielfeld;
  }

  function zeichneZeile(daten, zeilenZahl) {
    let tabelle = holeHtmlTabelle();
    let zeile = erzeugeTabellenZeile();

    for (let zähler = 0; zähler < 6; zähler++) {
      let zelle = erzeugeTabellenZelle();
      fügeDerZeileHinzu(zeile, zelle);
      if (daten[zeilenZahl][zähler] === 1) {
        setzeZelleAufAlive(zelle);
      }
    }
    fügeDerTabelleHinzu(tabelle, zeile);
  }

  function myButton() {
    let nächsteRunde = setup();

    for (let zeilenÜbergang = 0; zeilenÜbergang < 6; zeilenÜbergang++) {
      var nächsteZeile = [];
      for (let nächsteRundeZelle = 0; nächsteRundeZelle < 6; nächsteRundeZelle++) {
        nächsteZeile.push(gibNächstenStatus(aktuelleRunde, zeilenÜbergang, nächsteRundeZelle));

      }
      nächsteRunde[zeilenÜbergang] = nächsteZeile;
    }
    aktuelleRunde = nächsteRunde;
    // render nächste runde
    holeHtmlTabelle().innerHTML = "";
    zeichneTabelle(nächsteRunde);
  }

  function myResetButton() {
    aktuelleRunde = setup();
    holeHtmlTabelle().innerHTML = "";
    zeichneTabelle(setup());
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
