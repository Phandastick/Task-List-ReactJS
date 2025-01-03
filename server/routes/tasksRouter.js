import db from '../db/connection.js'

import { Router } from 'express'

export const tasksRouter = Router()

//TODO: Add ID for each task when posting new tasks
//TODO: Post task should accept Time as optional, Date as needed
//TODO: fetch all including ID's
//TODO: check if all tasks has an ID, or else add one when fetching tasks

//#region task operations
tasksRouter.get('/doGetTasks', async (req, res) => {
    let username = req.query.username

    // console.log('Fetching tasks from username:', username)
    // let response;
    // response = getTasks(username);

    const tasks = await db.collection("tasks")
    const query = {
        name: username
    }

    const result = await tasks.findOne(query)
    if (!result) {
        res.status(400).send("Tasks not found")
        return
    }

    //FIXME: check if tasks are empty
    const listArray = result.lists
    const response = {
        lists: listArray
    }
    res.status(200).json(response)
    // res.status(response.status).json(response);
})

tasksRouter.post('/doPostNewTask', async (req, res) => {
    // console.log('Received POST request at /doPostNewTask')
    // console.log(req.body)
    let data = req.body
    let taskname = data.name
    let taskdate = data.date
    let taskdesc = data.desc
    let username = data.username
    let groupname = data.groupname

    console.log("Posting new task for:", username, "\n" + JSON.stringify(data))

    try {
        let tasks = await db.collection("tasks")
        // console.log(username)

        let validate = await tasks.findOne({ name: username })
        // console.log(validate);
        if (!validate) { //checks for username's list existance
            throw new Error("User is not found!")
        } else if (typeof groupname !== 'string' || groupname.includes('$') || groupname.includes('.')) {
            throw new Error('Invalid query groupname');
        }

        let listfound = false;
        let taskfound = false;
        // console.log(validate)
        validate.lists.forEach(list => { //vaidate that the right task is in the right list
            if (list.groupname == groupname) {
                listfound = true;

                list.tasks.forEach(task => {
                    if(task.name == taskname) {
                        taskfound = true;
                    }
                })
            }
        });

        if (!listfound) { // check if list exists to be inserted
            res.status(400).send("List not found!")
            return
        }
        if(taskfound) {
            res.status(400).send("Duplicate task found!")
            return
        }

        let newID = new Date().getTime();

        const newDoc = {
            ID: newID,
            name: taskname,
            desc: taskdesc,
            date: taskdate,
        }

        //if task already exists
        let query = {
            name: username,
            "lists.groupname": groupname
        }
        let insertDoc = {
            $push: {
                "lists.$[i].tasks": newDoc
            }
        };
        let options = {
            arrayFilters: [{
                "i.groupname": groupname
            }]
        }

        // console.log(insertDoc)

        let result = await tasks.updateOne(query, insertDoc, options)
        // console.log(result)

        if (result.acknowledged) {
            if (result.modifiedCount > 0 || result.upsertedCount > 0)
                res.status(200).send("Task successfully added");
            else
                res.status(400).send("Query Acknowledged but not executed")
        } else {
            throw new Error("Task refused.")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

tasksRouter.patch('/doUpdateTask/:taskID', async (req, res) => {
    //get id of task and groupname

    const data = req.body;
    const queryID = parseInt(req.params.taskID);
    
    const username = data.username;
    const queryGroupname = data.groupname;

    //TODO; Change groupname / move task to new list
    const newGroupname = data.newGroupname;

    let validationquery = {
        "name": username,
        "lists.groupname": queryGroupname,
        "lists.tasks.ID": queryID
    }

    console.log(validationquery)

    const tasks = await db.collection("tasks");
    const validate = await tasks.findOne(validationquery)

    console.log(JSON.stringify(validate))

    if(!validate){
        res.status(404).send("Task not found")
        return
    }

    // updated records
    const updateName = data.name;
    const updateDesc = data.desc;
    const updateDate = data.date;

    //do updateOne() using groupname and task id

    const updateDoc = {
        $set: {
            'lists.$[list].tasks.$[task].name': updateName,
            'lists.$[list].tasks.$[task].desc': updateDesc,
            'lists.$[list].tasks.$[task].date': updateDate
        }
    };

    const results = await tasks.updateOne(
        validationquery,
        updateDoc,
        {
            "arrayFilters": [
                { 'list.groupname': queryGroupname },
                { 'task.ID': queryID }
            ]
        }
    )

    console.log(results);

    if(results.acknowledged){
        if(results.matchedCount > 0) {
            res.status(202).send("Task Successfully patched")
        } else {
            res.status(404).send("Somehow your task was not found")
        }
    } else {
        res.status(502).send("Something went wrong with query")
    }
})

tasksRouter.delete('/doDeleteTask/:taskID', async (req, res) => {
    //get ID
    const data = req.body;

    let queryID = parseInt(req.params.taskID);

    let username = data.username;
    let queryGroupname = data.groupname;
    let taskName = data.taskname;

    console.log("Deleting task: " + queryID)

    //do delete based on id and groupname
    const taskCollection = await db.collection("tasks")

    const validationquery = {
        name: username,
        "lists.groupname": queryGroupname,
        "lists.tasks.ID": queryID,
    }

    const validate = await taskCollection.findOne(validationquery);
    // console.log("Validation for deletion: " +  "\n" + JSON.stringify(validate))
    
    if(!validate){
        res.status(404).send("Task not Found");
        return
    }

    var found = false;
    validate.lists.forEach(list => {
        list.tasks.forEach(task => {
            if(task.name == taskName) {
                found = true;
            }
        })
    })

    if(!found) {
        res.status(404).send("Task not found!")
        return
    }

    const query = {
        name: username,
        "lists.groupname": queryGroupname,
    }

    const deleteQuery = {
        $pull: {
            'lists.$.tasks': {
                ID: queryID
            }
        }
    }

    const result = await taskCollection.updateOne(query, deleteQuery);

    if(result.acknowledged) {
        if (result.modifiedCount > 0) {
            console.log("Deletion successful for task", queryID)
            res.status(200).send("Deletion successful")
        } else {
            res.status(400).send("Task not found!")
        }
    } else {
        res.status(500).send("Query failed!")
    }
})


//#endregion