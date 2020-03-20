
window.onload = function () {
  // Der Bereich mit der Action, die man im Browser sieht
  var knöpfchen = holeKnopfMitId('knopf');
  knöpfchen.addEventListener('click', myButton);

  var löschKnopf = holeKnopfMitId('reset');
  löschKnopf.addEventListener('click', myResetButton);
  // aktuelleRunde
  let aktuelleRunde = setup();

  zeichneTabelle(aktuelleRunde);

  // Hier definieren wir die benötigten Funktionen
  function zeichneTabelle(zellen) {
    for (let tabellenZeile = 0; tabellenZeile < 6; tabellenZeile++) {
      zeichneZeile(zellen, tabellenZeile);
    }
  }
  
  function gibNächstenStatus(daten, y, x) {
    // JSON.parse(JSON.stringify()) kopiert ein Objekt (deep copy)
    let rundenVeraenderung = JSON.parse(JSON.stringify(daten))
    let lebendeNachbarn3 = 0;
    let toteNachbarn3 = 0;

    try {
      if (daten[y - 1][x - 1] === 1) { lebendeNachbarn3++ }
      else if (daten[y - 1][x - 1] === 0) { toteNachbarn3++ }
    } catch (Exception) {
      console.log('Nachbar nicht vorhanden 1');
    }
    try {
      if (daten[y][x - 1] === 1) { lebendeNachbarn3++ }
      else if (daten[y][x - 1] === 0) { toteNachbarn3++ }
    } catch (Exception) {
      console.log('Nachbar nicht vorhanden 2');
    }
    try {
      if (daten[y + 1][x - 1] === 1) { lebendeNachbarn3++ }
      else if (daten[y + 1][x - 1] === 0) { toteNachbarn3++ }
    } catch (Exception) {
      console.log('Nachbar nicht vorhanden 3');
    }
    try {
      if (daten[y + 1][x] === 1) { lebendeNachbarn3++ }
      else if (daten[y + 1][x] === 0) { toteNachbarn3++ }
    } catch (Exception) {
      console.log('Nachbar nicht vorhanden 4');
    }
    try {
      if (daten[y + 1][x + 1] === 1) { lebendeNachbarn3++ }
      else if (daten[y + 1][x + 1] === 0) { toteNachbarn3++ }
    } catch (Exception) {
      console.log('Nachbar nicht vorhanden 5');
    }
    try {
      console.log('Nachbar 6', daten[y][x + 1],daten)
      if (daten[y][x + 1] === 1) { lebendeNachbarn3++ }
      else if (daten[y][x + 1] === 0) { toteNachbarn3++ }
    } catch (Exception) {
      console.log('Nachbar nicht vorhanden 6');
    }
    try {
      console.log('Nachbar 7', daten[y - 1][x + 1],daten)
      if (daten[y - 1][x + 1] === 1) { lebendeNachbarn3++ }
      else if (daten[y - 1][x + 1] === 0) { toteNachbarn3++ }
    } catch (Exception) {
      console.log('Nachbar nicht vorhanden 7');
    }
    try {
      if (daten[y - 1][x] === 1) { lebendeNachbarn3++ }
      else if (daten[y - 1][x] === 0) { toteNachbarn3++ }
    } catch (Exception) {
      console.log('Nachbar nicht vorhanden 8');
    }


    if (daten[y][x] === 1) {
      console.log('Ich bin die ' + (6 * y + x + 1) + '.Zelle,ich lebe und ich habe ' +
        lebendeNachbarn3 + ' lebende Nachbarn, und ' + toteNachbarn3 + ' tote Nachbarn');
    } else {
      console.log('Ich bin die ' + (6 * y + x + 1) + '.Zelle ,ich bin tot und ich habe ' +
        lebendeNachbarn3 + ' lebende Nachbarn, und ' + toteNachbarn3 + ' tote Nachbarn');
    }

  

  //aufgabe 14

  if (daten[y][x] === 0 && lebendeNachbarn3 === 3) { rundenVeraenderung[y][x] = 1 }
  if (daten[y][x] === 1 && lebendeNachbarn3 < 2) { rundenVeraenderung[y][x] = 0 }
  if (daten[y][x] === 1 && (lebendeNachbarn3 === 2
    || lebendeNachbarn3 === 3)) { rundenVeraenderung[y][x] = 1 }
  if (daten[y][x] === 1 && lebendeNachbarn3 > 3) { rundenVeraenderung[y][x] = 0 }

  console.log(rundenVeraenderung[y][x]);
  return rundenVeraenderung[y][x];
}



function setup() {
  let spielfeld = [];
 

  for (zeile1 = 0; zeile1 < 6 ; zeile1++) {
    let zeile = [];
    for (spalte1 = 0; spalte1 < 6 ; spalte1++) {
      
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

// Wrapper für JavaScript Funktionen
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


function myButton() {
  console.log();
  let nächsteRunde = setup();

  
  for (let zeilenÜbergang = 0; zeilenÜbergang < 6; zeilenÜbergang++) {
    var nächsteZeile = [];
    for (let nächsteRundeZelle = 0; nächsteRundeZelle < 6; nächsteRundeZelle++) {
      nächsteZeile.push(gibNächstenStatus(aktuelleRunde, zeilenÜbergang, nächsteRundeZelle));
      
    }
    console.log(nächsteZeile);
    nächsteRunde[zeilenÜbergang] = nächsteZeile;
  }
  console.log(nächsteRunde)
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

}
/*function setup() {
  let zeile =
    [
      [0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ];
  return zeile;
}*/