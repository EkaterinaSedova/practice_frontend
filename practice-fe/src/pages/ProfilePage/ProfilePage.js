import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {useAuth} from "../../auth";
import {fetchPostsByUser} from "../../service/postAPI";
import Post from "../../components/Post/Post";
import EditProfile from "../../components/modals/EditProfile";

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editModalVisible, setEditModalVisible] = useState(false)

    const {currentUser} = useAuth();

    useEffect(() => {
        (async () => {
            const data = await fetchPostsByUser(currentUser.id);
            setPosts(data);
            setLoading(false)
        })()
    }, [])

    return (
        <>
            <Header/>
            <div>
                <img height={400} width={400} src={process.env.REACT_APP_API_URL + currentUser.profile_img}/>
                <p>First Name: {currentUser.firstname}</p>
                <p>Last Name: {currentUser.lastname}</p>
                <p>Sex: {currentUser.sex}</p>
            </div>
            <div>
                <button onClick={() => setEditModalVisible(true)}>Update my info</button>
            </div>
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