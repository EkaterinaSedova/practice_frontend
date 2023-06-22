import React, {useRef, useState} from 'react';
import styles from './Modal.module.css'
import {useAuth} from "../../auth";
import {updateUser} from "../../service/userAPI";
import {createPost} from "../../service/postAPI";
const CreatePostModal = ({show, onClose}) => {

    const [postContent, setPostContent] = useState('')
    const {currentUser} = useAuth();
    const [img, setImg] = useState();
    const selectFile = e => {
        let images = [];
        for (let i = 0; i < e.target.files.length; i++)
        {
            images.push(e.target.files[i])
        }
        setImg(images)
    }
    const handleSaveClick = async () => {
        const formData = new FormData();
        if (!img) setImg(null)
        formData.append('content', postContent);
        formData.append('user_id', currentUser.id);
        //formData.append('images[]', img);
        for (let i = 0; i < img.length; i++) {
            formData.append(`images`, img[i]);
        }
        const data = await createPost(formData)
        window.location.reload()
        onClose();
    }


    if (!show) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>Edit profile</h4>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyBlock}>
                        Content:
                        <input
                            className={styles.input}
                            type='text'
                            value={postContent}
                            onChange={e => setPostContent(e.target.value)}
                        />
                    </div>
                    <div className={styles.modalBodyBlock}>
                        Pictures:
                        <input className={styles.input}
                               type='file' multiple
                               onChange={selectFile}
                        />
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.modalBtn} onClick={() => handleSaveClick()}>Save</button>
                    <button className={styles.modalBtn} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;