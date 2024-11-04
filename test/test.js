import { readFile } from 'fs';
import { parse } from 'csv-parse';

function getDateList(){
    var date = new Date()
    let todayDate = date.getDate();
    let dayofweek = date.getDay();
    var dateList = []; 

    //find sunday's date
    todayDate = todayDate-dayofweek
    date.setDate(todayDate)
    // console.log(date.getDate())
    
    for(var i = 0; i < 7; i++){
        //Increment starting from monday idk how
        dateList[i] = date.getDate(date.setDate(date.getDate()+1));
    }

    console.log(dateList)
    return dateList
}

const getDefaultLists = () => {
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

const getTaskLists = (username) => {
    if(username === undefined){
        username = 'error';
    }

    return new Promise((resolve, reject) => {
        readFile('./public/mockdb/tasklists.json', (err,data)=>{

            if(err) throw err;

            let json = JSON.parse(data);
            for(var k in json){
                let jsonelem = json[k]
                if(jsonelem.groupname == 'Personal Development Goals'){
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

// getDefaultLists().then((data) => {
//     console.log(data)
// })


// getDateList();

getTaskLists();