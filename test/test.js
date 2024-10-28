import { readFile } from 'fs';
import { parse } from 'csv-parse';

function getDateList(){
    var date = new Date()
    let today = date.getDate();
    let weekday = date.getDay();
    var dateList = []; 

    today = today-weekday
    date.setDate(today)
    // console.log(date.getDate())

    date.setDate(date.getDate()+6)
    // console.log(date.getDate())
    
    for(var i = 0; i < 7; i++){
        dateList[i] = today+i;
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


getDefaultLists().then((data) => {
    console.log(data)
})


// getDateList();