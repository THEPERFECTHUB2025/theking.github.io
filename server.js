const express = require("express");
const crypto = require("crypto");
const app = express();
app.use(express.json());

// Tableau pour stocker les clés générées (à remplacer par une base de données pour la production)
let validKeys = [];

// Générer une clé unique
function generateKey() {
    return crypto.randomBytes(16).toString("hex");
}

// Endpoint pour générer une clé et la sauvegarder
app.post("/api/generate-key", (req, res) => {
    const key = generateKey();
    validKeys.push(key); // Ajoute la clé au tableau
    console.log(`Clé générée : ${key}`); // Pour debug
    res.json({ redirectUrl: `/key.html?key=${key}` }); // Redirige vers key.html avec la clé
});

// Endpoint pour valider une clé
app.post("/api/validate-key", (req, res) => {
    console.log("Validation request received:", req.body); // Affiche les données reçues
    const { key } = req.body;
    if (validKeys.includes(key)) {
        res.json({ success: true, message: "Key is valid" });
    } else {
        res.json({ success: false, message: "Invalid key" });
    }
});



// Servir les fichiers statiques (par exemple, index.html, key.html)
app.use(express.static(__dirname));

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
