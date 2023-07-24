const fs = require('fs');
const { convertCSVToArray } = require('convert-csv-to-array');
const converter = require('convert-csv-to-array');

const csvFilePath='./data/data.csv';

fs.readFile(csvFilePath, (err, inputD) => {
    if (err) throw err;
    const data = arrayofArrays(inputD.toString());
    const rows = data.slice(1);
    const objs = rows.map(d1 => {
        const row = d1.map(d => !!d ? `${d}` : d);
        return {
            "name": row[1],
            "shortDescription": row[34],
            "fullDescription": row[2],
            "logoURL": "",
            "videoURL": row[3],
            "boothNumber": `${row[35]}`,
            "organization": "",
            "requireQr": `${row[36]}` === "Yes",
            "pptLink": "",
            "pdfLink": row[37],
            "imageLinks": [row[38], row[39]].filter(d => d),
            "qrId": `${row[0]}`,
            "quizConfig": {
                "title": "Quiz",
                "description": "",
                "questions": [
                    {
                        "question": row[4],
                        "correctAnswer": row[9],
                        "options": [
                            row[5],
                            row[6],
                            row[7],
                            row[8],
                        ]
                    },
                    {
                        "question": row[10],
                        "correctAnswer": row[15],
                        "options": [
                            row[11],
                            row[12],
                            row[13],
                            row[14],
                        ]
                    },
                    {
                        "question": row[16],
                        "correctAnswer": row[21],
                        "options": [
                            row[17],
                            row[18],
                            row[19],
                            row[20],
                        ]
                    },
                    {
                        "question": row[22],
                        "correctAnswer": row[27],
                        "options": [
                            row[23],
                            row[24],
                            row[25],
                            row[26],
                        ]
                    },
                    {
                        "question": row[28],
                        "correctAnswer": row[33],
                        "options": [
                            row[29],
                            row[30],
                            row[31],
                            row[32],
                        ]
                    }
                ]
            }
        };
    })
    writeToFile('./data/final.json', objs);
    writeToFile('./data/data.json', rows);
 })


const arrayofArrays = (data) => convertCSVToArray(data, {
    type: 'array',
    separator: ';', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
  });


function writeToFile(fileName, input) {
    fs.writeFileSync(fileName, JSON.stringify(input, null, 4));
}
