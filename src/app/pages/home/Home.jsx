import { useContext, useState } from "react";
import styles from "./Home.module.css";
import { UserContext } from "../../App";

function Home() {
    const { user } = useContext(UserContext);

    const [comments, setComments] = useState([
        { id: 1, text: "Great article!" },
        { id: 2, text: "Very helpful, thanks!" },
    ]);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { id: Date.now(), text: newComment }]);
            setNewComment("");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Welcome to the Home Page 222</h1>
            <p className={styles.text}>This is the home page of our app.</p>

            <section className={styles.commentsSection}>
                <h2 className={styles.commentsHeading}>Comments</h2>
                <ul className={styles.commentsList}>
                    {comments.map((comment) => (
                        <li key={comment.id} className={styles.comment}>
                            {comment.text}
                        </li>
                    ))}
                </ul>

                {user ? (
                    <div className={styles.addCommentSection}>
                        <textarea
                            className={styles.textarea}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment..."
                        />
                        <button className={styles.button} onClick={handleAddComment}>
                            Add Comment
                        </button>
                    </div>
                ) : (
                    <p className={styles.loginPrompt}>
                        Please <a href="/login" className={styles.link}>login</a> to add a comment.
                    </p>
                )}
            </section>
        </div>
    );
}

export default Home;
