
window.onload = () => {
    // Der Bereich mit der Action, die man im Browser sieht

    // Startdaten
    let startdaten = setup();

    // Prüfungen (Aufgabe 1 - 4)

    // Zeichnen (rendern) des Spielfeldes in der HTML Datei
    for (let table = 0; table < 6; table++) {
        renderTable(startdaten, table);
    }

}

// Hier definieren wir die benötigten Funktionen
function setup() {
    let row =
        [
            [0, 1, 1, 0, 1, 0],
            [1, 0, 1, 0, 0, 1],
            [0, 0, 1, 1, 0, 0],
            [1, 1, 0, 0, 1, 1],
            [0, 1, 1, 0, 0, 1],
            [1, 1, 0, 1, 0, 0]
        ];
    return row;
}

function renderTable(daten, rowCount) {
    let table = holeHtmlTabelle();
    let row = erzeugeTabellenZeile();

    for (let counter = 0; counter < 6; counter++) {
        let cell = erzeugeTabellenZelle();
        fügeDerZelleHinzu(row, cell);
        if (daten[rowCount][counter] === 1) {
            setzeZelleAufAlive(cell);
        }
    }
    fügeDerTabelleHinzu(table, row);
}

// Wrapper für JavaScript Funktionen
function setzeZelleAufAlive(cell) {
    cell.className += " alive";
}

function fügeDerTabelleHinzu(table, row) {
    table.appendChild(row);
}

function fügeDerZelleHinzu(row, cell) {
    row.appendChild(cell);
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
