import styles from './PostDetails.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useFetchPostDetails from '../../hooks/useFetchPostDetails';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const { postDetails, loading, error } = useFetchPostDetails(id);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>Ocorreu um erro: {error}</p>;
    }

    return (
        <div className='container mt-5'>
            {postDetails && (
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <img
                            src={postDetails.image}
                            className={`${styles.imageDetails} img-fluid mb-4 mx-auto`}
                            alt={`Post ${postDetails.id}`}
                        />
                        <h1 className="mb-3">{postDetails.title}</h1>
                        <p>{postDetails.body}</p>
                        <ul className="list-inline">
                            {postDetails.tags.map((tag, index) => (
                                <li key={index} className="list-inline-item">
                                    #{tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetails;