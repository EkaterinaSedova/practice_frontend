import React, {useEffect, useRef, useState} from 'react';
import styles from './Modal.module.css'
import {useAuth} from "../../auth";
import {getUserById, updateUser} from "../../service/userAPI";
import {createPost} from "../../service/postAPI";
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../routing/paths";

const FriendsModal = ({show, onClose, subcriptions}) => {

    //const {currentUser} = useAuth();

    const [friends, setFriends] = useState([])

    useEffect(() => {
        (async () => {
            let users = [];
            subcriptions.map(async (sub) => {
                const user = await getUserById(sub.subscriber_to_id)
                users.push(user)
            })
                setFriends(users)
            }
        )()
    }, [])

    const navigate = useNavigate();

    const handleUserClick = (id) => {
        navigate(PROFILE_ROUTE + '/' + id);
        window.location.reload();
        onClose();
    }

    if (!show) return null;

    if (friends.length === 0) return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>Friends</h4>
                </div>
                <div className={styles.modalBody}>
                    No friends yet.
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.modalBtn} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>Friends</h4>
                </div>
                <div className={styles.modalBody}>
                    {friends.map((friend) =>
                        <div
                            className={styles.modalComment}
                            key={friend.id}
                            onClick={() => handleUserClick(friend.id)}
                        >
                            <div className={styles.userNameContainer}>
                                <img
                                    className={styles.userNameImg}
                                    src={process.env.REACT_APP_API_URL + friend.profile_img}
                                />
                                <p className={styles.userNameItem}>
                                    {friend.firstname + ' ' + friend.lastname}
                                </p>
                            </div>
                        </div>
                    )
                    }
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.modalBtn} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default FriendsModal;