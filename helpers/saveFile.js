const fs = require('fs');

const archivo = './db/data.json';

const saveDB = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data));
}

const readDB = () => {

    if(!fs.existsSync(archivo)){
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8'});

    const data = JSON.parse(info);

    console.log(data);

    return data;
}

module.exports = {
    saveDB,
    readDB
}