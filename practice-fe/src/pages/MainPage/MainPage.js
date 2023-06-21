import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './Main.module.css';
import {fetchPosts, fetchPostsFromSubscriptions} from "../../service/postAPI";
import Post from "../../components/Post/Post";
import {BsPencilSquare} from 'react-icons/bs'
import CreatePostModal from "../../components/modals/CreatePostModal";
import {useAuth} from "../../auth";

const MainPage = () => {

    const {currentUser} = useAuth();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const [btnStyleAll, setBtnStyleAll] = useState(styles.chooseButtonActive)
    const [btnStyleFriends, setBtnStyleFriends] = useState(styles.chooseButton)

    useEffect(() => {
        (async () => {
            const data = await fetchPosts();
            setPosts(data);
            setLoading(false)
        })()
    }, [])

    const handleAllClick = () => {
        window.location.reload()
        setBtnStyleAll(styles.chooseButtonActive);
        setBtnStyleFriends(styles.chooseButton);
    }

    const handleFriendsClick = async () => {
        setLoading(true)
        const data = await fetchPostsFromSubscriptions(currentUser.id);
        setPosts(data)
        setBtnStyleFriends(styles.chooseButtonActive)
        setBtnStyleAll(styles.chooseButton)
        setLoading(false)
    }

    return (
        <>

            <Header/>
            { loading ?
                <div className={styles.loading}>loading...</div>
                :
                <div>
                    <div className={styles.chooseBlock}>
                        <span className={btnStyleAll} onClick={() => handleAllClick()}>All posts</span>
                        <span className={btnStyleFriends} onClick={() => handleFriendsClick()}>My friends' posts</span>
                    </div>
                    <div
                        onClick={() => setCreatePostVisible(true)}
                        className={styles.createPost}
                    >
                        <BsPencilSquare/>
                        <span className={styles.createPostText}>Create post</span>
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