const exhibitService = require("./exhibitService");
const fs = require('fs');
const dataFile = "./data/final.json";


fs.readFile(dataFile, (err, inputD) => {
    if (err) throw err;
    const data = JSON.parse(inputD.toString());
    Promise.all(data.map(d => exhibitService
        .saveExhibit("qrId", d?.qrId, d)))
        .then(results => {
            fs.writeFileSync("./data/logs.json", JSON.stringify(results));
            console.log("saved results");
        })
        .catch(err => {
            console.log("Got err", err);
        });
});

