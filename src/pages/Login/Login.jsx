import { useState } from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import { BsArrowRepeat } from 'react-icons/bs';
import styles from './Login.module.css';

const Login = () => {

  const { logIn, error, loading } = useAuthentication();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password);
    } catch (error) {
      console.log("Houve um erro:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className={`${styles.shadowEffect} col-md-6`}>
          <h1 className='my-5'>Entrar em sua conta</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <span>E-mail:</span>
              </label>
              <input
                type="email"
                className={styles.formControl}
                id="email"
                name="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Insira o seu e-mail"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">
                <span>Senha:</span>
              </label>
              <input
                type="password"
                className={styles.formControl}
                id="password"
                name="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Insira a sua senha"
              />
            </div>
            <div className='d-flex justify-content-center'>
              <button type="submit" className="btn my-3" disabled={loading}>
                {loading ? <BsArrowRepeat className="spin" /> : 'Entrar'}
              </button>
            </div>
            {error &&
              <p className='error'>
                {error}
              </p>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login