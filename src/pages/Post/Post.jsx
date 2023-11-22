import { useState } from 'react'
import styles from './Post.module.css'
import useFirebasePost from '../../hooks/useInsertDocument';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import { serverTimestamp } from 'firebase/firestore';

const Post = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const [formError, setFormError] = useState('');

    const { loading, error, addPostToFirestore } = useFirebasePost(db);
    const { user } = useAuthentication();

    const navigate = useNavigate()

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidUrl(image)) {
            setFormError('Por favor, insira uma URL de imagem válida.');

            setTimeout(() => {
                setFormError('');
            }, 5000);
            return;
        }

        // Crie um objeto com os dados do post
        const postData = {
            title,
            body,
            image,
            tags: tags.split(',').map((tag) => tag.trim()), // Converte a string de tags em um array
            userId: user.uid,
            createdAt: serverTimestamp(),
        };

        await addPostToFirestore(postData);

        setTitle('');
        setImage('');
        setBody('');
        setTags('');

        navigate('/');
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className={`col-md-6 ${styles.shadowEffect}`}>
                    <h2 className="my-4">Criar Post</h2>
                    <p>Escreva sobre o que quiser e compartilhe conhecimento</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                <span>Título:</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                className={styles.formControl}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Insira um bom título"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                <span>Imagem:</span>
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className={styles.formControl}
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                                placeholder="Insira uma imagem para seu post"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                <span>Conteúdo:</span>
                            </label>
                            <textarea
                                name="body"
                                className={styles.formControl}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                                placeholder="Insira o conteúdo do post"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                <span>Tags:</span>
                            </label>
                            <input
                                type="text"
                                name="tags"
                                className={styles.formControl}
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                required
                                placeholder="Insira as tags separadas por virgulas"
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn my-3" disabled={loading}>
                                {loading ? 'Aguarde...' : 'Postar'}
                            </button>
                        </div>
                        {error && <p className='error'>{error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Post;