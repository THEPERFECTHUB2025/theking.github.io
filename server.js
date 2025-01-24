const express = require("express");
const app = express();
app.use(express.json());

let validKeys = []; // Stockage des clés générées

// Générer une clé unique
function generateKey() {
    return require("crypto").randomBytes(16).toString("hex");
}

// Endpoint pour générer une clé
app.post("/api/validate-key", (req, res) => {
    console.log("Validation request received:", req.body); // Affiche les données reçues
    const { key } = req.body;
    if (validKeys.includes(key)) {
        res.json({ success: true, message: "Key is valid" });
    } else {
        res.json({ success: false, message: "Invalid key" });
    }
});


// Endpoint pour valider une clé
app.post("/api/validate-key", (req, res) => {
    const { key } = req.body;
    if (validKeys.includes(key)) {
        res.json({ success: true, message: "Key is valid" });
    } else {
        res.json({ success: false, message: "Invalid key" });
    }
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
