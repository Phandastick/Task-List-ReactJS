import { readCSV, readJSON, writeJSON } from './readwrite.js';

export const getDefaultLists = () => {
    return new Promise((resolve, reject) => {
        resolve(readCSV('./mockdb/defaultLists.csv'))
    })
};

export const getUserLists = (username) => { 
    const results = readJSON('./mockdb/tasks.json')
    let response = {}

    const keys = Object.keys(results)
    if(!(keys.includes(username))){
        response.status = 404
        response.statusText = "Username not found"
        return response
    }

    const userList = results[username].lists
    // console.log('Resolving', resultArray)
    let listnames = []
    userList.forEach(list => {
        listnames.push(list.groupname)
    });

    // console.log(listnames)

    response.status = 200
    response.statusText = "OK"
    response.body = listnames
    return response
};

export const addList = async (listname, filename, username) => {
    console.log('Records.js> running add list...')
    let response = {}

    if(listname === undefined || username === undefined || filename=== undefined){
        console.log("Missing data found:",listname,filename,username)
        const missing = listname ? "listname" : username ? "username" : filename ? "filename" : null;
        const response = {
            status: 404,
            statusText: "Data is missing: " + missing
        }
        return response;
    }

    const records = readJSON('./mockdb/tasks.json')

    const users = Object.keys(records)
    if(!(users.includes(username))){
        response.status = 404
        response.statusText = "Username not found"
        return response
    }

    const userLists = records[username]
    const newList = {
        groupname: listname,
        file: filename,
        tasks: []
    }
    userLists.lists.push(newList)

    records[username] = userLists

    // console.log(records[username])
    writeJSON('./mockdb/tasks.json', records);

    response.status = 200
    response.statusText = "OK"
    response.body = userLists
    return response
}

export const getTasks = (username) => {
    var response = {}
    if(username === undefined){
        username = 'error';
    }

    const data = readJSON('./mockdb/tasks.json')

    const existingUsers = Object.keys(data)
    if(!(existingUsers.includes(username))){
        response.status = 404
        response.statusText = `Username ${username} not found`
        return response
    }

    const userLists = data[username]
    response.status = 200
    response.statusText = "Tasks found for " + username
    response.body = userLists
    return response
}

export const addTask = (newList, username) => {
    var response = {} 
    let newUser = false;
    
    //fetch json object
    const data = readJSON('./mockdb/tasks.json')
    const keys = Object.keys(data)
    // console.log(data)
    if(!keys.includes(username)){ //check if username is in database
        console.log("New User detected")
        newUser = true
    }

    const userList = data[username].lists;
    let count = 0, found = false;

    for (let list of userList) {
        if (list.groupname == newList.groupname) {
            let poppedList = userList.splice(count, 1)[0];
            const combinedList = addNewTasks(poppedList, newList.tasks)
            userList.push(combinedList)
            found = true; 
            break;
        }
        count++;
    }
    if(!found){
        //TODO: list does not exist
        const response = {
            status: 400,
            statusText: "List is not found"
        }
        return response
    }


    data[username].lists = userList

    // console.log(userList[3])
    writeJSON('./mockdb/tasks.json',data)
    response = {
        status: 200,
        statusText: "Successfully added tasks"
    }
    // console.log(res)
    return response;
}

// adds tasksList into popped ist
const addNewTasks = (poppedList, tasksList) => {
    tasksList.forEach(task => {
        poppedList.tasks.push(task)
    });
    return poppedList
}

export const getIcons = () => {

}

getUserLists("User1")