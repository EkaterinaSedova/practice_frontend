import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {useAuth} from "../../auth";
import {fetchPostsByUser} from "../../service/postAPI";
import Post from "../../components/Post/Post";
import EditProfile from "../../components/modals/EditProfile";
import {useParams} from "react-router-dom";
import {getUserById} from "../../service/userAPI";
import styles from './Profile.module.css'

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editModalVisible, setEditModalVisible] = useState(false)
    const {currentUser} = useAuth();
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            const data = await fetchPostsByUser(id);
            setPosts(data);
            const user = await getUserById(id)
            setUser(user)
            setLoading(false)
        })()
    }, [])



    return (<>
            <Header/>
        {loading ?

                    <div>loading...</div>
                :
                <div>
                    <div className={styles.profileInfoContainer}>
                        <div>
                            <img className={styles.profileImg} src={process.env.REACT_APP_API_URL + user.profile_img}/>
                        </div>
                        <div className={styles.profileInfoTextContainer}>
                            <p>First Name: <span className={styles.profileInfoText}>{user.firstname}</span></p>
                            <p>Last Name: <span className={styles.profileInfoText}>{user.lastname}</span></p>
                            <p>Sex: <span className={styles.profileInfoText}>{user.sex}</span></p>
                            {currentUser.id === user.id ?
                                <div>
                                    <button className={styles.profileInfoBtn} onClick={() => setEditModalVisible(true)}>Update my info</button>
                                </div>
                                :
                                <></>
                            }
                        </div>

                    </div>

                    <div className={styles.profilePosts}>
                        {posts.map((post) => <Post key={post.id} post={post}/>)}
                    </div>
                    <EditProfile
                        show={editModalVisible}
                        onClose={() => setEditModalVisible(false)}
                    />
                </div>
        }
        </>
    );
};

export default ProfilePage;