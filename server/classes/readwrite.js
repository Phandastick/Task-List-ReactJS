import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

export const readCSV = (filepath) => {
    const readData = readFileSync(filepath, 'utf-8')
    const result = parse(
                        readData, 
                        {
                            columns: true, 
                            trim: true, 
                            relax_quotes:true
                        }
                    );

    //return as json object
    return result;
}

export  const writeCSV = async (filepath, array) => {
    var string = array.join("")
    console.log("readwrite.js> writing joined list:\n",string)

    writeFileSync(filepath,string)
}

export const readJSON = (filepath) => {
    const readData = readFileSync(filepath, 'utf-8')
    // return readData
    return (JSON.parse(readData))
}

export const writeJSON = (filepath, jsonData) => {
    console.log('Writing json data:')
    console.log(jsonData)
    writeFileSync(filepath,JSON.stringify(jsonData))
}

// readJSON('./public/mockdb/tasks.json')