import { readFile } from 'fs';
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
                console.log(rows)
                console.log(JSON.stringify(rows))
                if(err){
                    reject(err)
                } else {
                    let resultArray = []
                    rows.forEach(item => {
                        if(item.username == username){
                            resultArray.push(item)
                        }
                    });
                    resolve(resultArray)
                }
            });
        })
    })
};

export const getTaskLists = (username) => {
    if(username === undefined){
        username = 'error';
    }

    return new Promise((resolve, reject) => {
        readFile('./public/mockdb/tasklists.json', (err,data)=>{

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

getTaskLists();