import React, {useEffect, useReducer, useState} from 'react';
import styles from './Post.module.css'
import {deletePost, fetchPosts} from "../../service/postAPI";
import {useAuth} from "../../auth";
import CommentsModal from "../modals/CommentsModal";
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../routing/paths";
import {BsChatText, BsFillHeartFill, BsXCircle} from 'react-icons/bs';
import Slider from "react-slick";
import PostSlider from "./PostSlider";
import {createLike, deleteLike} from "../../service/likeAPI";
import {fetchCommentsByPost} from "../../service/commentAPI";
import CreatePostModal from "../modals/CreatePostModal";

const Post = ({post}) => {
    const navigate = useNavigate();
    const {currentUser} = useAuth();
    const [liked, setLiked] = useState();
    const [likeId, setLikeId] = useState();
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [comments, setComments] = useState([])

    const initialState = post.likes.length;
    const reducer = (state, action) => {
        switch (action) {
            case 'increment':
                return state + 1;
            case 'decrement':
                return state - 1;
            default:
                return state;
        }
    }
    const [count, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        post.likes.map((like) => {
            if (like.user_id === currentUser.id) {
                setLiked(true);
                setLikeId(like.id)
            }
        })
    }, [])

    const handleCommentClick = async () => {
        console.log(post.id)
        const data = await fetchCommentsByPost(post.id);

        setComments(data)
    }

    const handleLikeClick = async () => {
        if (liked === true) {
            const data = await deleteLike(likeId)
            dispatch('decrement')
        } else {
            const data = await createLike(currentUser.id, post.id)
            setLikeId(data)
            dispatch('increment')
        }
        setLiked(!liked);
    }

    const handleDelete = () => {
        deletePost(post.id).then(r => {alert('Удалено.'); window.location.reload()});
    }

    const handleUserClick = (user) => {
        navigate(PROFILE_ROUTE + '/' + user.id)
    }

    const parseTimestamp = (unixTime) => {
        const date = new Date(unixTime);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        hours %= 12;
        hours = hours || 12;

        let timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}${ampm} `;
        timeString += `${day} ${monthNames[month]} ${year}`
        return timeString
    }

    return (
        <>
        <div className={styles.container}>
            <div className={styles.postHeader}>
                <div className={styles.userNameContainer} onClick={() => handleUserClick(post.author)}>
                    <img
                        className={styles.userNameImg}
                        src={process.env.REACT_APP_API_URL + post.author.profile_img}
                    />
                    <p className={styles.userNameItem}>
                        {post.author.firstname + ' ' + post.author.lastname}
                        <br/>
                        {parseTimestamp(post.createdAt)}
                    </p>
                </div>
                {post.author.id === currentUser.id ?
                    <p className={styles.postCloseBtn} onClick={() => handleDelete()}><BsXCircle/></p>
                    :
                    <></>
                }

            </div>
            <p className={styles.postBody}>{post.content}</p>
            <div className={styles.postSlider}>
                <PostSlider images={post.images}>

                </PostSlider>
            </div>

            <div className={styles.postFooter}>
                <p className={styles.postFooterItem}
                   onClick={() => {handleCommentClick().then(r => setCommentsVisible(true));}}>
                    <BsChatText/> comments
                </p>
                <div className={styles.postFooterItem}>
                    {liked ?
                        <p className={styles.liked} onClick={() => handleLikeClick()}><BsFillHeartFill/> {count} likes</p>
                        :
                        <p className={styles.didntLiked} onClick={() => handleLikeClick()}><BsFillHeartFill/> {count} likes</p>
                    }
                </div>
            </div>

        </div>
            <CommentsModal
                show={commentsVisible}
                onClose={() => setCommentsVisible(false)}
                comments={comments}
                postId={post.id}
                postAuthorId={post.user_id}
            />
        </>
    );
};

export default Post;