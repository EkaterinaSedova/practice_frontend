import React, { useState} from 'react';
import styles from './Modal.module.css'

const CommentsModal = ({show, onClose, comments}) => {

    if (!show) return null;
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>Comments</h4>
                </div>
                <div className={styles.modalBody}>
                    {comments.map((comment) =>
                        <div className={styles.modalComment} key={comment.id}>
                            <p>{comment.content}</p>
                        </div>
                    )}
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.modalBtn} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default CommentsModal;