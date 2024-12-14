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
    let taskitems = data.tasks[0]
    let username = data.username

    console.log("Posting new task for:", username, "\n" + data)

    try {
        let tasks = await db.collection("tasks")
        // console.log(username)

        let validate = await tasks.findOne({ name: username })
        // console.log(validate);
        if (!validate) { //checks for username's list existance
            throw new Error("User is not found!")
        } else if (typeof data.groupname !== 'string' || data.groupname.includes('$') || data.groupname.includes('.')) {
            throw new Error('Invalid query groupname');
        }

        let found = false;
        validate.lists.forEach(element => {
            if (element.groupname == data.groupname) {
                found = true
            }
        });

        if (!found) { // check if list exists to be inserted
            res.status(400).send("List not found!")
            return
        }

        const newDoc = {
            name: taskitems.name,
            desc: taskitems.desc,
            date: taskitems.date
        }


        const lists = validate.lists
        //if list already exists
        let query = {
            name: username,
            "lists.groupname": data.groupname
        }
        let insertDoc = {
            $push: {
                "lists.$[i].tasks": newDoc
            }
        };
        let options = {
            arrayFilters: [{
                "i.groupname": data.groupname
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

tasksRouter.delete('./doDeleteTask', async (req, res) => {
    res.sendStatus(502)
})

tasksRouter.patch('./doUpdateTask', async (req, res) => {
    res.sendStatus(502)
})

//#endregion