const fs = require("fs")

const conns = fs.readFileSync("./connections.txt").toString()

const cleaned_conns = conns.split("\n\n").join("\n---\n")

fs.writeFileSync("./cleaned-connections.txt", cleaned_conns)