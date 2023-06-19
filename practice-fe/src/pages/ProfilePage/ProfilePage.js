import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {useAuth} from "../../auth";
import {fetchPostsByUser} from "../../service/postAPI";
import Post from "../../components/Post/Post";
import EditProfile from "../../components/modals/EditProfile";
import {useParams} from "react-router-dom";
import {getUserById} from "../../service/userAPI";

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



    return (
        <>
            <Header/>
            <div>
                <img height={400} width={400} src={process.env.REACT_APP_API_URL + user.profile_img}/>
                <p>First Name: {user.firstname}</p>
                <p>Last Name: {user.lastname}</p>
                <p>Sex: {user.sex}</p>
            </div>
            {currentUser.id === user.id ?
                <div>
                    <button onClick={() => setEditModalVisible(true)}>Update my info</button>
                </div>
                :
                <></>
            }
            {loading ?
                <div>loading posts...</div>
                :
                <>
                    {posts.map((post) => <Post key={post.id} post={post}/>)}
                </>

            }
            <EditProfile
                show={editModalVisible}
                onClose={() => setEditModalVisible(false)}
            />
        </>

    );
};

export default ProfilePage;