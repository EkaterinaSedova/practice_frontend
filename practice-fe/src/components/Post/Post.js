import React from 'react';
import styles from './Post.module.css'

const Post = ({post}) => {
    return (
        <div className={styles.container}>
            <p>{post.content}</p>
            {post.images.map((image) =>
                <img key={image} width={400} height={400} src={process.env.REACT_APP_API_URL + image}/>
            )}
        </div>
    );
};

export default Post;