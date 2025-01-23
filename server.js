const express = require("express");
const app = express();
app.use(express.json());


const blacklistedDomains = [
    "bypass.city",
    "bypassunlock.com",
    "adlinkbypass.com",
    "linkvertise-bypasser.vercel.app"
];

app.use((req, res, next) => {
    const referer = req.get("Referer");
    if (referer) {
        const refDomain = new URL(referer).hostname;
        if (blacklistedDomains.includes(refDomain)) {
            console.log(`Blacklisted domain detected: ${refDomain}`);
            return res.status(403).send("Access Denied: Bypass Detected");
        }
    }
    next();
});



app.post("/api/validate", (req, res) => {
    const { action } = req.body;

    if (action === "generateKey") {
        console.log("Valid key generation request received.");
       
        return res.json({ redirectUrl: "https://link-hub.net/501130/rivalsxthekingexploiter" });
    }

    console.log("Invalid action received:", action);
    res.status(403).send("Invalid action");
});

app.get("/", (req, res) => {
    res.send("Welcome to Rivals X The King!");
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
