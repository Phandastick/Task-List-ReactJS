import { readFile, readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse';

export const getDefaultLists = () => {
    return new Promise((resolve, reject) => {
        readFile('./public/mockdb/defaultLists.csv', (err, buf) => {
            parse(buf, {columns: true, trim: true}, (err, rows) =>{
                // console.log(rows)
                // console.log(JSON.stringify(rows))
                if(err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            });
        })
    })
};

export const getUserLists = (username) => {
    return new Promise((resolve, reject) => {
        readFile('./public/mockdb/userLists.csv', (err, buf) => {
            parse(buf, {columns: true, trim: true}, (err, rows) =>{
                // console.log(rows)
                // console.log(JSON.stringify(rows))
                if(err){
                    reject(err)
                } else {
                    let resultArray = []
                    rows.forEach(item => {
                        if(item.username == username){
                            resultArray.push(item)
                        }
                    });
                    console.log('Resolving', resultArray)
                    resolve(resultArray)
                }
            });
        })
    })
};

export const addList = (listName) =>{
    console.log('Records.js> running add list...')
    var listJson = {};

    var response = {
        "status_code": undefined
    }

    // const check = checkList(listName);
    const check =true
    if(!check){
        response.status_code = 412;
        return response;
    }

    const data = readFileSync('./public/mockdb/userLists.csv', 'utf-8')
    console.log(data)
    parse(data, {columns: true, trim: true}, (err, rows) =>{
        // console.log(rows)
        listJson = rows;
        addJson()
    })

    // console.log(currentLists)
}

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

addList("NewList")