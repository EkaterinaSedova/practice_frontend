import React, {useEffect, useRef, useState} from 'react';
import styles from './Modal.module.css'
import {useAuth} from "../../auth";
import {updateUser} from "../../service/userAPI";
const EditProfile = ({show, onClose}) => {
    const [maleStyle, setMaleStyle] = useState(styles.modalChooseSexButton);
    const [femaleStyle, setFemaleStyle] = useState(styles.modalChooseSexButton)

    const {currentUser} = useAuth();
    const [firstName, setFirstName] = useState(currentUser.firstname);
    const [lastName, setLastName] = useState(currentUser.lastname);
    const [sex, setSex] = useState(currentUser.sex);
    const [img, setImg] = useState(null);
    const selectFile = e => {
        setImg(e.target.files[0])
    }

    useEffect(() => {
        if(sex === 'female') setFemaleStyle(styles.modalChooseSexButtonActive);
        else setMaleStyle(styles.modalChooseSexButtonActive);
    }, [])
    const handleEdit = () => {
        const formData = new FormData();
        if (!img) setImg()
        formData.append('id', currentUser.id);
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('sex', sex);
        formData.append('profile_img', img);
        updateUser(formData).then(data => onClose());
        window.location.reload()
    }

    const handleClickMale = () => {
        setFemaleStyle(styles.modalChooseSexButton)
        setMaleStyle(styles.modalChooseSexButtonActive)
        setSex('male')
    }

    const handleClickFemale = () => {
        setMaleStyle(styles.modalChooseSexButton)
        setFemaleStyle(styles.modalChooseSexButtonActive)
        setSex('female')
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
                        Profile FirstName:
                        <input
                            className={styles.modalInput}
                            type='text'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className={styles.modalBodyBlock}>
                        Profile LastName:
                        <input
                            className={styles.modalInput}
                            type='text'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                    <div className={styles.modalBodyBlock}>
                        Sex:
                        <span className={maleStyle} onClick={() => handleClickMale()}>male</span>
                        <span className={femaleStyle} onClick={() => handleClickFemale()}>female</span>
                    </div>
                    <div className={styles.modalBodyBlock}>
                        Avatar:
                        <input className={styles.modalInput}
                               type='file'
                               onChange={selectFile}
                        />
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.modalBtn} onClick={() => handleEdit()}>Save</button>
                    <button className={styles.modalBtn} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;