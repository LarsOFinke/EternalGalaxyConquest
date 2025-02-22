// Funktion zum Erstellen eines Canvas-Elements
const index = () => {
    const main = document.querySelector('main'); // Korrigiere den Selektor
    if (!main) {
        console.error('Das <main>-Element wurde nicht gefunden.');
        return null;
    }

    // Erstelle ein Canvas-Element
    const game = document.createElement('canvas');
    game.id = 'game-canvas'; // Optional: ID für das Canvas-Element
    main.appendChild(game);

    return game;
};

// Routen-Definition
const routes = [
    {
        name: "Start",
        path: "/",
        module: index // Speichere die Funktion, nicht das Ergebnis
    }
];

// Navigation erstellen
const nav = document.getElementById('navbar');
if (nav) {
    nav.innerHTML = `
        <ul>
            ${routes.map(route => `
                <li>
                    <a href="${route.path}" data-route="${route.name}">${route.name}</a>
                </li>
            `).join('')}
        </ul>
    `;

    // Event-Listener für Navigationslinks hinzufügen
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Verhindere das Standardverhalten des Links

            // Finde die entsprechende Route
            const routeName = link.getAttribute('data-route');
            const route = routes.find(r => r.name === routeName);

            if (route && route.module) {
                // Rufe die Modul-Funktion auf
                route.module();
            }
        });
    });
} else {
    console.error('Das Navbar-Element wurde nicht gefunden.');
}