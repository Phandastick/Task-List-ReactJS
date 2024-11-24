import { readFile } from 'fs';
import { parse } from 'csv-parse';

function getDateList(){
    var date = new Date()
    let todayDate = date.getDate(); // date number
    var dateList = []; 
    
    let dayofweek = date.getDay()-1;
    if(dayofweek == -1){
        dayofweek = 6
    }

    console.log(dayofweek)
    console.log(todayDate)
    date.setDate(todayDate - dayofweek) // get monday

    //find monday's date
    // if today is tuesday, only difference of one
    // get today is tuesday (2), date is 20
    // monday is 19
    // day of week tuesday is 3

    //day of week sun = 0, monday = 1
    // day of week - 1
    // date - day = 
    
    for(var i = 0; i < 7; i++){
        //Increment starting from monday idk how
        dateList[i] = date.getDate();
        date.setDate(date.getDate()+1)
    }

    // console.log(dateList)
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

const testData = {
    "groupname": "New Project",
    "tasks": [
      {
        "name": "Structural progress",
        "date": "2025-02-01",
        "desc": "Schedule and conduct the project kickoff meeting with all stakeholders to outline project goals and expectations."
      },
      {
        "name": "Structural progress",
        "date": "2025-02-01",
        "desc": "Schedule and conduct the project kickoff meeting with all stakeholders to outline project goals and expectations."
      }
    ]
}

const newData = {
    "tasks": [
        {
            "name": "Structural progress",
            "date": "2025-02-01",
            "desc": "Schedule and conduct the project kickoff meeting with all stakeholders to outline project goals and expectations."
        }
    ]
}

// testData.tasks.push(newData.tasks)
// console.log(testData.tasks);

function insertTask (){
    const insertDoc = 
    {
        $push: {}
    }
    insertDoc.$push = {
        listname: "tasks"
    }
    
    console.log(insertDoc)
}

insertTask();


// let listname = 0; // listname is explicitly set to undefined
// let username = "username"; // username is a string
// let filename = undefined; // filename is a number (0)

// if (listname === undefined || username === undefined || filename === undefined) {
//     console.log("Missing data found:", listname, filename, username);
    
//     const missing = !listname ? "listname" : !username ? "username" : !filename ? "filename" : null;
//     console.log(missing);
// }

// getUserLists('bob').then((result) => {
//     console.log('Result \n',result)
// })

// getDefaultLists().then((data) => {
//     console.log(data)
// })


// getDateList();

// getTaskLists();
