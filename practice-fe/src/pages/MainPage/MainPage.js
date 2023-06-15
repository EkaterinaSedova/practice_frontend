import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './Main.module.css';
import {fetchPosts} from "../../service/postAPI";
import Post from "../../components/Post/Post";

const MainPage = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await fetchPosts();
            setPosts(data);
            setLoading(false)
        })()
    }, [])
    return (
        <>
            <Header/>
            { loading ?
                <div>loading</div>
                :
                <div className={styles.container}>
                    {posts.map((post) =>
                        <Post
                            key={post.id}
                            post={post}
                        >
                            {post.content}
                        </Post>
                    )
                    }
                </div>
            }

        </>
    );
};

export default MainPage;