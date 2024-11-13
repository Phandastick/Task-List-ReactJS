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