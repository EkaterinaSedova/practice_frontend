import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './Main.module.css';
import {fetchPosts} from "../../service/postAPI";
import Post from "../../components/Post/Post";
import {BsPencilSquare} from 'react-icons/bs'
import CreatePostModal from "../../components/modals/CreatePostModal";

const MainPage = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createPostVisible, setCreatePostVisible] = useState(false)

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
                <div>
                    <div
                        onClick={() => setCreatePostVisible(true)}
                        className={styles.createPost}
                    >
                        <BsPencilSquare/>
                        <span>Create post</span>
                    </div>
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
                </div>

            }

            <CreatePostModal
                show={createPostVisible}
                onClose={() => setCreatePostVisible(false)}
            />
        </>

    );
};

export default MainPage;