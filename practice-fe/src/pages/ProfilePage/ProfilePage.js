import React from 'react';
import Header from "../../components/Header/Header";
import {useAuth} from "../../auth";

const ProfilePage = () => {

    const {currentUser} = useAuth();
    return (
        <>
            <Header/>
            <div>
                <img height={400} width={400} src={process.env.REACT_APP_API_URL + currentUser.profile_img}/>
                <p>First Name: {currentUser.firstname}</p>
                <p>Last Name: {currentUser.lastname}</p>
                <p>Sex: {currentUser.sex}</p>
            </div>
        </>
    );
};

export default ProfilePage;