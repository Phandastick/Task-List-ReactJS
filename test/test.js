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


// getDefaultLists().then((data) => {
//     console.log(data)
// })


getDateList();