import React from 'react';
import styles from './Post.module.css'

const Post = ({post}) => {
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
        console.log(timeString)
        return timeString

    }
    return (
        <div className={styles.container}>
            <p>{parseTimestamp(post.createdAt)}</p>
            <p>{post.content}</p>
            {post.images.map((image) =>
                <img key={image} width={400} height={400} src={process.env.REACT_APP_API_URL + image}/>
            )}
        </div>
    );
};

export default Post;