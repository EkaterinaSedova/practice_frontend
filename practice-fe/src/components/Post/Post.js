import React, {useState} from 'react';
import styles from './Post.module.css'
import {deletePost, fetchCommentsByPost, fetchPosts} from "../../service/postAPI";
import {useAuth} from "../../auth";
import CommentsModal from "../modals/CommentsModal";
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../routing/paths";

const Post = ({post}) => {
    const {currentUser} = useAuth();
    const handleDelete = () => {
        if(post.author.id === currentUser.id) deletePost(post.id).then(r => {alert('Удалено.'); window.location.reload()});
        else alert("У вас нет прав на удаление данного поста.")
    }
    const [commentsVisible, setCommentsVisible] = useState(false)

    const navigate = useNavigate();

    const handleUserClick = (user) => {
        navigate(PROFILE_ROUTE + '/' + user.id)
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
    return (
        <>
        <div className={styles.container}>
            <button onClick={() => handleDelete()}>×</button>
            <div className={styles.userName} onClick={() => handleUserClick(post.author)}>
                <img width={40} height={40} src={process.env.REACT_APP_API_URL + post.author.profile_img}/>
                <p>{post.author.firstname + ' ' + post.author.lastname}</p>
            </div>

            <p>{parseTimestamp(post.createdAt)}</p>
            <p>{post.content}</p>
            {post.images.map((image) =>
                <img key={image} width={400} height={400} src={process.env.REACT_APP_API_URL + image}/>
            )}
            <p onClick={() => setCommentsVisible(true)}>comments</p>
            <p>{post.likes.length} likes</p>
        </div>
            <CommentsModal
                show={commentsVisible}
                onClose={() => setCommentsVisible(false)}
                comments={post.comments}
            />
        </>
    );
};

export default Post;