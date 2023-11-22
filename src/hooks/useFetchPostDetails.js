import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const useFetchPostDetails = (postId) => {
    const [postDetails, setPostDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postDoc = await getDoc(doc(db, 'posts', postId));

                if (postDoc.exists()) {
                    setPostDetails({ id: postId, ...postDoc.data() });
                } else {
                    setError('Post não encontrado.');
                }
            } catch (error) {
                setError('Ocorreu um erro ao buscar o post.');
            } finally {
                setLoading(false);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId]);

    return { postDetails, loading, error };
};

export default useFetchPostDetails;