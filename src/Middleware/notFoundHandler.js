const path = require("node:path")

function notFoundHandler(req, res, next) {
    if (req.path === "/api" || req.path.startsWith("/api/")){
        return res.status(404).json({ error: "API ruten blev ikke fundet"})
    }

    res.status(404).type("html").sendFile(path.join(__dirname, "../Views/page-not-found.html"))

}

module.exports = notFoundHandler;