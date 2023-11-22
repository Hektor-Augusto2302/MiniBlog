import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import useAuthentication from './useAuthentication';

const useFetchPosts = () => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuthentication();

    const fetchData = async () => {
        try {
            if (user) {
                const q = await query(
                    collection(db, 'posts'),
                    where('userId', '==', user.uid),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setPosts(postsData);
            } else {
                setPosts([]); // Limpa os posts se o usuário não estiver autenticado
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (postId) => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, 'posts', postId));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return { posts, loading, error, fetchData, deletePost };
};

export default useFetchPosts;