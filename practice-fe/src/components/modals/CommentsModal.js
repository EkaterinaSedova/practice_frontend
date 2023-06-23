import React, {useEffect, useState} from 'react';
import styles from './Modal.module.css'
import {deletePost, fetchPosts} from "../../service/postAPI";
import {createComment, deleteComment, fetchCommentsByPost} from "../../service/commentAPI";
import {PROFILE_ROUTE} from "../../routing/paths";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../auth";
import {BsXCircle} from "react-icons/bs";

const CommentsModal = ({show, onClose, comments, postId, postAuthorId}) => {

    const {currentUser} = useAuth();
    const [currentComment, setCurrentComment] = useState('')

    const navigate = useNavigate()

    const handleDelete = async (comment) => {
            if(
                comment.user_id === currentUser.id || postAuthorId === currentUser.id
            ) await deleteComment(comment.id).then(r => {
                alert('Удалено.');
                onClose();
            });
            else alert("У вас нет прав на удаление данного комментария.")
    }
    const handleUserClick = (id) => {
        navigate(PROFILE_ROUTE + '/' + id)
    }

    const handleSendClick = async() => {
        if(currentComment !== "") {
            const data = await createComment(currentUser.id, postId, currentComment)
            setCurrentComment('');
            onClose();
        }
    }

    const parseTimestamp = (unixTime) => {
        const date = new Date(unixTime); // Преобразуем unix время в объект Date
        let hours = date.getHours(); // Получаем часы
        const minutes = date.getMinutes(); // Получаем минуты
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const ampm = hours >= 12 ? 'PM' : 'AM'; // Получаем AM/PM
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        hours %= 12; // Приводим часы к 12-часовому формату
        hours = hours || 12; // Если часы равны 0, то присваиваем значение 12

        let timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}${ampm} `; // Собираем строку времени
        timeString += `${day} ${monthNames[month]} ${year}`
        return timeString
    }

    if (!show) return null;

    if (comments.length === 0) return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>Comments</h4>
                </div>
                <div className={styles.modalBody}>
                    <div>No comments yet</div>
                </div>
                <div className={styles.modalFooter}>
                    <input
                        className={styles.modalInput}
                        type='text'
                        maxLength={255}
                        placeholder='leave comment'
                        value={currentComment}
                        onChange={e => {setCurrentComment(e.target.value)}}
                    />
                    <button className={styles.modalBtn} onClick={() => handleSendClick()}>Send</button>
                    <button className={styles.modalBtn} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>Comments</h4>
                </div>
                <div className={styles.modalBody}>
                    {comments.map((comment) =>
                        <div className={styles.modalComment} key={comment.id}>

                            <div className={styles.modalCommentContent}>
                                    <img
                                    className={styles.modalCommentImg}
                                    src={process.env.REACT_APP_API_URL + comment.comment_author.profile_img}
                                    onClick={() => handleUserClick(comment.comment_author.id)}
                                    />
                                    <div className={styles.modalCommentText}>
                                        <div className={styles.user}>
                                            <div
                                                onClick={() => handleUserClick(comment.comment_author.id)}
                                            >
                                            <span>
                                                {comment.comment_author.firstname + ' ' + comment.comment_author.lastname}
                                            </span>
                                                <span
                                                    className={styles.modalCommentTime}
                                                >
                                                {parseTimestamp(comment.createdAt)}
                                            </span>
                                            </div>
                                        </div>

                                        <div
                                        >
                                            {comment.content}
                                        </div>
                                    </div>
                            </div>
                            <div
                                className={styles.deleteBtn}
                                onClick={() => handleDelete(comment)}
                            >
                                <BsXCircle/>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.modalFooter}>
                    <input
                        className={styles.modalInput}
                        type='text'
                        maxLength={255}
                        placeholder='leave comment'
                        value={currentComment}
                        onChange={e => {setCurrentComment(e.target.value)}}
                    />
                    <button className={styles.modalBtn} onClick={() => handleSendClick()}>Send</button>
                    <button className={styles.modalBtn} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default CommentsModal;