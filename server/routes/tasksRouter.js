import { getTasks, addTask } from '../classes/records.js'
import db from '../db/connection.js'

import { Router } from 'express'

export const tasksRouter = Router()

tasksRouter.get('/doGetTasks', async (req, res) => {
    let username = req.query.username

    console.log('Fetched tasks from username:', username)
    let response;
    response = getTasks(username);

    // const tasks = db.collection("tasks")

    // const query = {
    //     name: username
    // }
    // tasks.find(query, projection)


    res.status(response.status).json(response);
})

tasksRouter.post('/doPostNewTask', async (req, res) => {
    console.log('Received POST request at /doPostTask wtih:')
    // console.log(req.body)
    let data = req.body
    let taskitems = data.tasks[0]

    try {
        let tasks = await db.collection("tasks")
        let username = req.headers.username
        // console.log(username)

        let validate = await tasks.findOne({ name: username })
        console.log(validate);
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
        console.log(result)

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