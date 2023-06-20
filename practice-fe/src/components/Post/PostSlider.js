import React, {useState} from 'react';
import {BsArrowLeftCircle, BsArrowRightCircle} from 'react-icons/bs'
import styles from './Post.module.css'

const PostSlider = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        if(currentIndex === 0) setCurrentIndex(images.length - 1);
        else setCurrentIndex(currentIndex - 1);
    }

    const handleNextClick = () => {
        if(currentIndex === images.length - 1) setCurrentIndex(0);
        else setCurrentIndex(currentIndex + 1);
    }
    if (images.length === 0) return (
        <div>
        </div>
    )
    if (images.length === 1) return (
        <div className={styles.sliderContainer}>
            <img className={styles.images} src={process.env.REACT_APP_API_URL + images[currentIndex]}/>
        </div>
    )
    return (
        <div>
            <div className={styles.sliderContainer}>
                <p className={styles.sliderArrowLeft} onClick={() => handlePrevClick()}><BsArrowLeftCircle/></p>
                <img className={styles.images} src={process.env.REACT_APP_API_URL + images[currentIndex]}/>
                <p className={styles.sliderArrowRight} onClick={() => handleNextClick()}><BsArrowRightCircle/></p>

            </div>
            {images.map((image) =>
                <div>

                </div>
            )}
        </div>
    );
};

export default PostSlider;