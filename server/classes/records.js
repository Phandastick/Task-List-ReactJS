import { readFile, readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { readCSV, writeCSV } from './readwrite.js';

export const getDefaultLists = () => {
    return new Promise((resolve, reject) => {
        resolve(readCSV('./public/mockdb/defaultLists.csv'))
    })
};

export const getUserLists = (username) => { 
    return new Promise((resolve, reject) => {
        const results = readCSV('./public/mockdb/userLists.csv')
        let resultArray = []
        results.forEach(item => {
            if(item.username == username){
                resultArray.push(item)
            }
        });
        // console.log('Resolving', resultArray)
        resolve(resultArray)
    })
};

export async function addList(data){
    console.log('Records.js> running add list...')
    let listname = data.name
    let filename = data.filename
    let username = data.username

    let response = {
        status_code: 500
    }

    if(listname === undefined || username === undefined || filename=== undefined){
        console.log("Missing data found:",listname,filename,username)
        response.status_code = 404;
        response.error_message = "missing data"
        return response;
    }

    const records = readCSV('./public/mockdb/userLists.csv')

    let array = [];
    array.push('name,file,username\n');
    for (const row of records){
        if(row.name == listname && row.username == username){
            console.log("Caught duplicate data: ", row.name, row.username)
            response.status_code = 412;
            response.error_message = "duplicate data"
            return response;
        } else {
            array.push(`${row.name},${row.file},${row.username}\n`)
        }
    };
    
    array.push(`${listname},${filename},${username}\n`)
    // console.log("New lists: ",array)
    writeCSV('./public/mockdb/userLists.csv',array)

    response.status_code = 200
    response.error_message = "Sucessfully added new list"
    response.data = data

    // console.log(res)
    return response;
}


    // console.log(currentLists)

export const getTasks = (username) => {
    if(username === undefined){
        username = 'error';
    }

    return new Promise((resolve, reject) => {
        readFile('./public/mockdb/tasks.json', (err,data)=>{

            if(err) throw err;

            let json = JSON.parse(data);
            for(var k in json){
                if(k == 'username'){
                    console.log(json[k])
                }
            }

            resolve(json)
        })
    })
}

// getUserLists('bob').then((result) => {
//     console.log('Result \n',result)
// })

// addList("NewList")