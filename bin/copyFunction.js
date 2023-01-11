import fs from "fs";

function createCopy(arrFrom, arrTo, from, to) {
    fs.mkdirSync(to)
    arrTo.map((path) => {
        fs.mkdirSync(`${to}/${path}`)
    })

    arrFrom.map((path, index) => {
        fs.readdirSync(`${from}/${path}`).forEach((file) => {
            fs.cp(`${from}/${path}/${file}`, `${to}/${arrTo[index]}/${file}`, {recursive: true}, (err) => {
                if (err) throw err;
            })
        })
    })
}

export default createCopy;