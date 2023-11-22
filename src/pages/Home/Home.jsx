import styles from './Home.module.css';
import useFetchPosts from '../../hooks/useFetchPosts';
import { useEffect, useState } from 'react';
import unidecode from 'unidecode';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { BiError } from 'react-icons/bi';

const Home = () => {
  const { posts, loading, error, fetchData, deletePost } = useFetchPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setSearchedPosts([]);
  }, [searchTerm]);

  const handleSearch = () => {
    const removeAccents = (str) => unidecode(str);

    const filteredPosts = posts.filter((post) =>
      removeAccents(post.title.toLowerCase()).includes(removeAccents(searchTerm.toLowerCase()))
    );

    setSearchedPosts(filteredPosts);
    setShowNoResults(filteredPosts.length === 0);
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    fetchData();
  };

  if (loading) {
    return <LoadingSpinner />;
}

  if (error) {
    return <p>Ocorreu um erro: {error}</p>;
  }

  const displayPosts = searchTerm ? searchedPosts : posts;

  return (
    <div className="container mt-5">
      <div className="mb-3 d-flex justify-content-center">
        <input
          type="text"
          className={`${styles.formControl} me-3`}
          placeholder="Digite sua pesquisa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.btnOutline} onClick={handleSearch}>
          Pesquisar
        </button>
      </div>

      <div className="d-flex flex-column align-items-center">
        {displayPosts.length > 0 ? (
          displayPosts.map((post) => (
            <div key={post.id} className={`${styles.customCard} pb-5 mb-5`}>
              <img src={post.image} className="card-img-top" alt={`Card ${post.id}`} />
              <div className="card-body text-center">
                <h3 className="card-title">{post.title}</h3>
                <h5 className="card-text">{post.body}</h5>
              </div>
              <ul className="d-flex">
                {post.tags.map((tag, index) => (
                  <li key={index} className={`${styles.tag} d-flex`}>
                    #{tag}
                  </li>
                ))}
              </ul>
              <div className='d-flex justify-content-center align-items-center mt-5'>
                <Link className={`${styles.btnLink} me-3 px-5 py-3`} to={`/posts/${post.id}`}>Ver</Link>
                <button className={`${styles.btnBuuton} px-5 py-3`} onClick={() => handleDelete(post.id)}>Excluir</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-3">
            {showNoResults ? (
              <p>
                <BiError size={24} className="my-3" />
                Nenhum post encontrado.
              </p>
            ) : (
              <p>
                <BiError size={24} className="my-3" />
                Sem posts disponíveis.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;