import Modal from 'react-modal';
import styles from './Modal.module.css'
import { useContext, useEffect, useState } from 'react';
import { usernameContext, listsContext, tasksUpdateContext, modalModeContext, editModalDataContext } from '@Contexts';
import { Component } from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL

//https://reactcommunity.org/react-modal/
//TODO: Implement date/time with proper implementation
// - should be optional for adding tasks
// - used to display tasks in the calander
// - handles time as well


export default function ModalAddList(props) {
    Modal.setAppElement(document.getElementById('Task-wrapper'));
    const modalState = props.modalState;
    const {useLists} = useContext(listsContext);
    const {useModalMode} = useContext(modalModeContext);
    const {useEditData} = useContext(editModalDataContext);
    const {setTasksUpdate} = useContext(tasksUpdateContext); // sets update flag 
    const {currentUsername} = useContext(usernameContext);

    const [listsState, setLists] = useState(['Loading lists...']);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    let data = {
        taskID: "",
        name: "",
        desc: "",
        date: "",
        groupname: "",
    }
    const [editData, setEditData] = useState(data);

    let olddata;

    useEffect(()=>{ //sets the lists in dropdown
        setLists(useLists)
    },[useLists])

    useEffect(() => { //calls update form
        if(useEditData != null && useEditData != undefined) {
            data.taskID = useEditData.taskID
            data.name = useEditData.name
            data.desc = useEditData.desc
            data.date = useEditData.date
            data.groupname = useEditData.groupname
            setEditData(data);
        }
    }, [useEditData])
    
    const openModal = () => { props.setModalState(true) }
    const closeModal = () => { 
        clearModal();
        props.setModalState(false);
    }


    async function submitList(e) { //after clicking submit button
        setLoading(true);
        console.log('Submitting data...')
        e.preventDefault();
        // console.log(e)
    
        var data = {}
        const form = new FormData(e.target)
        form.forEach((value, key) => {
            // console.log(key, value);
            if(key == "datetime"){ //<value>: "2022-04-18T09:30"
                if (value == undefined || value == null || value.length < 1) { // if date is not filled in
                    data.date = ""; 
                    return
                }
                data.date = value;
            } else {
                data[key] = value
            } 
        }); // put form data into data json

        try {
            const response = {};
            let url, method;
            if(useModalMode == "New") { //New Task
                url = `${BASE_URL}/api/doPostNewTask`;
                method = "post";
            } else if (useModalMode == "Edit") { //Edited task
                let taskID = document.getElementById('hdf-form-taskID').value
                url = `${BASE_URL}/api/doUpdateTask/${taskID}`;
                method = "patch"
            } else {
                throw new Error("SOmething went wrong with modal mode...")
            }

            const payload = {
                username: currentUsername,
                groupname: data.listname,
                name: data.name,
                desc: data.desc,
                date: data.date
            }
            const headers = {
                'Content-type': 'application/json'
            }

            const res = await fetch(url, {
                body: JSON.stringify(payload),
                headers:headers,
                method: method
            })

            if(res.status == 200){
                setTasksUpdate(true)
                closeModal()
            } else {
                throw new Error(res.statusText)
            }
            
        } catch (error) {
            setError(error.message)
        } finally {
            setTimeout(()=>{console.log("elo there")}, 500)
            setLoading(false);
        }
    }

    const clearModal = () => {
        let inputs = document.querySelectorAll('[id^=form-]');
        inputs.forEach(field => {
            field.innerHTML = ""
        });
    }

    return (
    <Modal 
    className={styles.modal}
    isOpen={modalState}
    styles= {styles}
    onAfterOpen={() => document.body.style.overflow = 'hidden'}
    onAfterClose={() => document.body.style.overflow = 'unset'}>
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-header"]}>Add new task</div>
            <button className={styles["modal-button-close"]}
                onClick={closeModal}>
                <embed id={styles["closeBtn"]} 
                src='./assets/cross.svg'/>
            </button>

            <form className={styles.form} name="AddTaskForm" id='modal-form' onSubmit={submitList} >
                <label htmlFor="name"> Task Name </label>
                <input type='text' id="form-name" name="name" className={styles["modal-tf"]} defaultValue={editData.name} required/>

                <label htmlFor="desc"> Task Description </label>
                <textarea type='text' id="form-desc" name="desc" className={styles["modal-tfdesc"]} defaultValue={editData.desc} required/>

                <label htmlFor="datetime"> Task Duedate </label>
                <input type='datetime-local' id="form-date" name="date" className={styles["modal-datetime"]} defaultValue={editData.date} />

                <select className={styles["ddl-listname"]} name='listname' id='form-ddl' defaultValue={editData.groupname}>
                    {//Drop down list of task lists
                        listsState.map((list, index) => {
                            return( //individual options
                                <option 
                                value={list.groupname}
                                key={"Modal-ddl-" + index}>
                                    {list.groupname}
                                </option>
                            )
                        })
                    }
                </select>
                {error ? <div>{error}</div> : null}

                <button 
                    className={styles["modal-addBtn"]}
                    disabled={loading}
                >Add task</button>

                
                <input type="hidden" id="hdf-form-taskID" value={editData.taskID}/>
            </form>
        </div>
    </Modal>
    )
}