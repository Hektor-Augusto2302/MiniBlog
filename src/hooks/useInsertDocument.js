import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const useFirebasePost = (customFirestore = null) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addPostToFirestore = async (postData, firestore) => {
        try {
            setLoading(true);

            // Referência do Firebase Firestore
            const db = firestore || getFirestore();
            const postsCollection = collection(db, 'posts');

            // Adiciona o post ao Firestore
            await addDoc(postsCollection, postData);

            // Limpa erros anteriores
            setError(null);
        } catch (error) {
            setError('Erro ao adicionar post ao Firestore. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, addPostToFirestore };
};

export default useFirebasePost;