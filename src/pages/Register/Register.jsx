import { useEffect, useState } from 'react';
import styles from './Register.module.css';
import { useDarkMode } from '../../context/darkModeContext';
import useAuthentication from '../../hooks/useAuthentication';

const Register = () => {
    const { signUp, error: errorFirebase, loading } = useAuthentication();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { darkMode } = useDarkMode();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await signUp(email, password);

            if (password !== confirmPassword) {
                setError('As senhas precisam ser iguais!');
                return;
            }

            setDisplayName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            setTimeout(() => setError(''), 3000);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (errorFirebase) {
            setError(errorFirebase)
        }
    }, [errorFirebase])

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className={`${ darkMode ? styles.shadowEffectDark : styles.shadowEffectLight} col-md-6`}>
                    <h1 className='my-3'>Registrar o usuário</h1>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                <span>Nome do usuário:</span>
                            </label>
                            <input
                                type="text"
                                className={darkMode ? styles.formControlDark : styles.formControlLight}
                                id="name"
                                name="name"
                                value={displayName || ""}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                                placeholder="Insira o seu nome completo"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                <span>E-mail:</span>
                            </label>
                            <input
                                type="email"
                                className={darkMode ? styles.formControlDark : styles.formControlLight}
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
                                className={darkMode ? styles.formControlDark : styles.formControlLight}
                                id="password"
                                name="password"
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Insira a sua senha"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassord" className="form-label">
                                <span>Confirme a sua senha:</span>
                            </label>
                            <input
                                type="password"
                                className={darkMode ? styles.formControlDark : styles.formControlLight}
                                id="password"
                                name="confirmPassord"
                                value={confirmPassword || ""}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirme a sua senha"
                            />
                        </div>
                        <div className='d-flex justify-content-center'>
                            {!loading &&
                                <button type="submit" className="btn my-3">
                                    Registrar
                                </button>
                            }
                            {loading &&
                                <button type="submit" className="btn my-3" disabled>
                                    ...Aguarde
                                </button>
                            }
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

export default Register