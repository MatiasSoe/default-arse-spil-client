const path = require("node:path");

exports.getStorePage = async (req, res) => {
    res.status(200).type("html").sendFile(path.join(__dirname, "../../Views/store.html"));
};