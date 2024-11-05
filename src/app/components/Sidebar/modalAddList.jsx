import { useState } from 'react';
import Modal from 'react-modal';
import styles from './Modal.module.css'

export default function ModalAddList(props) {
    const styles = {

    };

    return (
    <Modal 
    isOpen={props.isModalOpen}
    styles= {styles}>
        <div className={styles["modal-header"]}>Add new list</div>
        <div className={styles["modal-tfname"]} id="modal-name"></div>
        <input type='text' className={styles["modal-tf"]}/>
        
        <div className={styles["modal-tfname"]} id="modal-desc"></div>
        <input type='text' className={styles["modal-tf"]}/>

        <div className={styles["modal-tfname"]} id="modal-date"></div>
        <input type='text' className={styles["modal-tf"]}/>
    </Modal>
    )
}