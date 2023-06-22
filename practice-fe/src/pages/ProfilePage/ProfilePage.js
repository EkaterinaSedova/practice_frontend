import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {useAuth} from "../../auth";
import {fetchPostsByUser} from "../../service/postAPI";
import Post from "../../components/Post/Post";
import EditProfile from "../../components/modals/EditProfile";
import {useParams} from "react-router-dom";
import {getUserById} from "../../service/userAPI";
import styles from './Profile.module.css'
import {createSub, deleteSub} from "../../service/serviceAPI";
import {createLike} from "../../service/likeAPI";
import {BsPencilSquare} from "react-icons/bs";
import CreatePostModal from "../../components/modals/CreatePostModal";
import FriendsModal from "../../components/modals/FriendsModal";

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonContent, setButtonContent] = useState('Add friend')
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [friendsModalVisible, setFriendsModalVisible] = useState(false)
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const {currentUser} = useAuth();
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            const data = await fetchPostsByUser(id);
            setPosts(data);
            const candidate = await getUserById(id)
            setUser(candidate)
            currentUser.subscriptions.map((sub) => {
                if(sub.subscriber_to_id === candidate.id) setButtonContent('Remove friend');
            })

            setLoading(false)
        })()
    }, [])

    const handleFriendClick = async () => {
        switch (buttonContent) {
            case 'Add friend': {
                setButtonContent('Remove friend')
                const data = await createSub(currentUser.id, id)
                break;
            }
            case 'Remove friend': {
                setButtonContent('Add friend')
                deleteSub(currentUser.id, id).then()
                break;
            }
        }
    }


    return (<>

            <Header/>
        {loading ?

                    <div className={styles.loading}>loading...</div>
                :
                <div>
                    <div className={styles.profileInfoContainer}>
                        <div>
                            <img
                                className={styles.profileImg}
                                src={process.env.REACT_APP_API_URL + user.profile_img}
                            />
                        </div>
                        <div className={styles.profileInfoTextContainer}>
                            <p>
                                First Name:
                                <span className={styles.profileInfoText}>
                                    {user.firstname}
                                </span>
                            </p>
                            <p>
                                Last Name:
                                <span className={styles.profileInfoText}>
                                    {user.lastname}
                                </span>
                            </p>
                            <p>
                                Sex:
                                <span className={styles.profileInfoText}>
                                    {user.sex}
                                </span>
                            </p>
                            {currentUser.id === user.id ?
                                <div>
                                    <button
                                        className={styles.profileInfoBtn}
                                        onClick={() => setEditModalVisible(true)}
                                    >
                                        Update my info
                                    </button>
                                    <button
                                        className={styles.profileInfoBtn}
                                        onClick={() => setFriendsModalVisible(true)}
                                    >
                                        My friends
                                    </button>
                                </div>
                                :
                                <div>
                                    <button
                                        className={styles.profileInfoBtn}
                                        onClick={() => handleFriendClick()}
                                    >
                                        {buttonContent}
                                    </button>
                                    <button
                                        className={styles.profileInfoBtn}
                                        onClick={() => setFriendsModalVisible(true)}
                                    >
                                        {user.firstname}'s friends
                                    </button>
                                </div>
                            }
                        </div>

                    </div>
                    <div
                        onClick={() => setCreatePostVisible(true)}
                        className={styles.createPost}
                    >
                        <BsPencilSquare/>
                        <span className={styles.createPostText}>Create post</span>
                    </div>
                    <div className={styles.profilePosts}>
                        {posts.map((post) => <Post key={post.id} post={post}/>)}
                    </div>
                    <EditProfile
                        show={editModalVisible}
                        onClose={() => setEditModalVisible(false)}
                    />
                    <CreatePostModal
                        show={createPostVisible}
                        onClose={() => setCreatePostVisible(false)}
                    />
                    <FriendsModal
                        show={friendsModalVisible}
                        onClose={() => setFriendsModalVisible(false)}
                        subcriptions={user.subscriptions}
                    />
                </div>
        }
        </>
    );
};

export default ProfilePage;