import { Router } from 'express'
import db from '../db/connection.js';
import fs from 'node:fs'
import { base_dir } from '../../index.js';

export const listsRouter = Router()

// #region task lists operation
listsRouter.get('/doGetDefaultLists', async (req, res) => {
    let lists = await db.collection("tasks")
    let result = await lists.findOne({ name: 'default' })

    if (!result) {
        res.status(404).send("Default lists not found!")
    } else {
        try {
            const defaultLists = result.lists
            let list;
            var payload = {
                lists: []
            }
            defaultLists.forEach(elemList => {
                list = {
                    groupname: elemList.groupname,
                    filename: elemList.filename
                }
                payload.lists.push(list)
            })
            // console.log(payload)
            res.status(200).json(payload)
        } catch (error) {
            res.status(500).send("Something went wrong retrieving lists!")
        }
    }
});

listsRouter.get('/doGetLists', async (req, res) => {
    let username = req.query.username
    console.log('Fetching lists for :', username)

    let lists = await db.collection("tasks")
    let result = await lists.findOne({ name: username })

    if (!result) {
        res.status(404).send("User not found!")
    } else {
        const userLists = result.lists
        if(userLists == undefined || userLists.length < 1) {
            res.status(200).json({lists:[]})
            return
        }
        let list = {}, payload = {
            lists: []
        };
        try {
            userLists.forEach(elemList => {
                list = {
                    groupname: elemList.groupname,
                    filename: elemList.filename
                }
                payload.lists.push(list)
            })
            //FIXME: lists does not exist
            payload.statusText = "Lists retrieved successfully"
            // console.log(payload)
            res.status(200).json(payload)
        } catch (error) {
            res.status(500).send("Something went wrong retrieving lists!")
        }
    }

});

listsRouter.post('/doPostNewList', async (req, res) => {
    // console.log(req.body);
    // console.log(req.headers);
    let data = req.body

    let groupname = data.groupname;
    let filename = data.filename;
    let username = data.username;
    console.log("Posting new list: "+ groupname + " for", username )

    console.log('Adding list:', groupname, ', for account', username)

    const tasks = await db.collection("tasks");

    let query = {
        name: username
    }
    // console.log(query)
    // validation list
    let validate = await tasks.findOne(query)
    // console.log(validate)
    if (!validate) { //check username existance
        res.status(400).send("Username not found")
        return
    }

    let existingKeys = validate.lists;
    let found = false;
    // console.log(existingKeys)
    existingKeys.forEach(list => { //check each list for groupname
        if (list.groupname == groupname) {
            found = true;
        }
    });
    if (found) {
        res.status(400).send("List exists")
        return
    }


    query = { name: username };
    const insertDoc = {
        $push: {
            lists: {
                groupname: groupname,
                filename: filename,
                tasks: []
            }
        }
    }

    const result = await tasks.updateOne(query, insertDoc)
    // console.log(result);

    if (!result.acknowledged) {
        console.log("Query Failed: " + insertDoc)
        res.status(400).send("Query not acknowledged")
        return
    }
    if (result.matchedCount > 0 && result.modifiedCount > 0) {
        res.status(200).send("List successfully added")
    } else {
        res.status(400).send("Query acknowledged but not added correctly")
    }

    // let response = await addList(name, filename, username);
    // console.log("Response: ",response)
    // res.status(response.status).json(response);
});

listsRouter.delete('/doDeleteList', async (req, res) => {
    const data = req.body
    const username = data.username
    const listname = data.groupname
    
    const lists = await db.collection("tasks")

    const validation = await lists.findOne({
        "name": username,
        "lists.groupname": oldName
    })

    res.sendStatus(502)
});

listsRouter.patch('/doPatchList', async (req, res) => {

    const data = req.body
    const username = data.username
    const oldName = data.oldName
    const newName = data.newName

    const lists = await db.collection("tasks")

    const validation = await lists.findOne({
        "name": username,
        "lists.groupname": oldName
    })

    if(!validation){
        res.status(404).send("Invalid List!")
    }

    const updateResults = await db.updateOne(
        {
            "name": username
        },
        { //set new list, positional operator is there to filter
            $set: {
            "lists.$[lists].groupname":newName
            }
        },
        {
            arrayFilters: [ //filter for existing list
            {
                "lists.groupname": oldName
            }
            ]
        }
    )

    if (updateResults.acknowledged == true && updateResults.matchedCount > 0 ){
        if (updateResults.modifiedCount > 0 ){
            return res.status(200).send("List updated.")
        }
    }
    res.sendStatus(400)
});

// #endregion

listsRouter.get('/doGetIcons', async (req, res) => {
    //search all icons
    const filepath = `${base_dir}/public/assets/userIcons`
    const data = await fs.readdirSync(filepath); //returns array of filenames
    if (data.length < 1) {
        res.status(400).send("Icons not found")
    }
    const payload = {
        icons: data
    }

    res.status(200).json(payload);
});