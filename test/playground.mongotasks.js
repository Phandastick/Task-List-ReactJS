/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('task-list-db');

const username = "test1"; 
const queryGroupname = "criossant";
const queryID = 1734493356023;

const newTaskName = "newName"
const newTaskDesc = "newDesc"
const newTaskDate = "12th December"

const query = {
    "name": username,                     // Match the user
    "lists.groupname": queryGroupname,      // Match the group by name
    "lists.tasks.ID": queryID      // Match the task by ID
};

// const query = {
//     name: 'test1',
//     'lists.groupname': 'criossant',
//     'lists.tasks.ID': '1734493356023'
// };

// const updateDoc = {
//     $set: {
//         'lists.$[list].tasks.$[task].name': newTaskName,
//         'lists.$[list].tasks.$[task].desc': newTaskDesc,
//         'lists.$[list].tasks.$[task].date': newTaskDate
//     }
// };

const deleteQuery = {
    $pull: {
        "lists.$.tasks":{
            ID: queryID
        }
    }
}

const result = db.tasks.findOne(query);
// const result = db.tasks.updateOne(
//     query,
//     updateDoc,
//     { //options
//         arrayFilters: [
//             { 'list.groupname': queryGroupname },
//             { 'task.ID': queryID }
//         ]
//     }
// );

// const result = db.tasks.updateOne(query, deleteQuery);



console.log(query);
// console.log(deleteQuery);
console.log(JSON.stringify(result));