
window.onload = () => {
    // Der Bereich mit der Action, die man im Browser sieht

    // Startdaten
    let startdaten = setup();
    let lebendeNachbarn = 0;
    let toteNachbarn = 0;

    if (startdaten [0][0] === 1) {
      console.log('Meine erste Zelle lebt.');
    } else {
      console.log('Meine erste Zelle ist tot.');
    }

    if (startdaten [0][1] === 1) {
      console.log('Und mein Rechter Nachbar, der lebt.')
       lebendeNachbarn++;
    } else {
      console.log('Und mein Rechter Nachbar, der ist tot.')
       toteNachbarn++;
    }

    if (startdaten [1][0] === 1) {
      console.log('Die Zelle unter mir lebt.')
       lebendeNachbarn++;
    } else {
      console.log('DIe Zelle unter mir ist tot.')
       toteNachbarn++;
    }

    if (startdaten [1][1] === 1) {
      console.log('Die Zelle schräk unter mir lebt.')
       lebendeNachbarn++;
    } else {
      console.log('Die Zelle schräk unter mir ist tot.')
       toteNachbarn++;
    }
      console.log('Meine erste Zelle hat '+ lebendeNachbarn +' lebendeNachbarn.');
      console.log('Meine erste Zelle hat '+ toteNachbarn +' lebendeNachbarn.');

//Aufgabe 5:

if  ( startdaten[0][0] === 0 &&
      startdaten[0][1] === 1 &&
      startdaten[1][0] === 1 &&
      startdaten[1][1] === 1)  {
      startdaten[0][0] = 1;  console.log('Ich lebe in der nächten Runde.');
} else {
   console.log('Ich bin weiterhin tot.');

//Aufgabe 6
let anzahlNachbarn = 0;
if (startdaten[0][0] === 1 && anzahlNachbarn < 2) { startdaten[0][0] = 0;
                           console.log('Ich bin weiterhin am leben')};

if (startdaten[0][1] === 1) { anzahlNachbarn++; }
if (startdaten[1][0] === 1) { anzahlNachbarn++; }
if (startdaten[1][1] === 1) { anzahlNachbarn++; }

/* if (startdaten[0][0] === 1 && startdaten[0][1] === 1 && startdaten[1][0] === 1 ||
                              startdaten[0][1] === 1 && startdaten[1][1] === 1 ||
                              startdaten[1][0] === 1 && startdaten[1][1] === 1 ||
                              startdaten[0][1] === 1 && startdaten[1][0] === 1 &&
                              startdaten[1][1] === 1) {
                      startdaten[0][0] = 1; console.log('Ich bin weiterhin am leben.')
                    }*/
// Aufgabe 7
if (startdaten[0][0] === 1 && startdaten[0][1] === 0 && startdaten [1][0] === 0 &&
                               startdaten[1][1] === 1 ||
                               startdaten[0][1] === 0 && startdaten [1][1] === 0 &&
                               startdaten[1][0] === 1 ||
                               startdaten[1][1] === 0 && startdaten [1][0] === 0 &&
                               startdaten[0][1] === 1 ) {
                                 startdaten[0][0] = 0; console.log('Ich werde sterben.')
                               }






    // Zeichnen (rendern) des Spielfeldes in der HTML Datei
    for (let tabelle = 0; tabelle < 6; tabelle++) {
        renderTable(startdaten, tabelle);
    }

}

// Hier definieren wir die benötigten Funktionen
function setup() {
    let zeile =
        [
            [0, 1, 1, 0, 1, 0],
            [1, 0, 1, 0, 0, 1],
            [0, 0, 1, 1, 0, 0],
            [1, 1, 0, 0, 1, 1],
            [0, 1, 1, 0, 0, 1],
            [1, 1, 0, 1, 0, 0]
        ];
    return zeile;
}

function renderTable(daten, zeilenZahl) {
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
