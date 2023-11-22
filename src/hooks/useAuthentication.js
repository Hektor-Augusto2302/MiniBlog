import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const mapFirebaseErrorMessage = (errorCode, operation) => {
        switch (operation) {
            case 'signUp':
                switch (errorCode) {
                    case 'auth/invalid-email':
                        return 'E-mail inválido. Por favor, insira um e-mail válido.';
                    case 'auth/weak-password':
                        return 'Senha fraca. Por favor, escolha uma senha mais forte.';
                    case 'auth/email-already-in-use':
                        return 'E-mail já em uso. Por favor, escolha outro e-mail.';
                    default:
                        return 'Erro ao registrar o usuário. Por favor, tente novamente.';
                }
            case 'logIn':
                switch (errorCode) {
                    case 'auth/invalid-email':
                        return 'E-mail inválido. Por favor, insira um e-mail válido.';
                    case 'auth/wrong-password':
                        return 'Senha incorreta. Por favor, verifique sua senha.';
                    case 'auth/user-not-found':
                        return 'Usuário não encontrado. Por favor, verifique seu e-mail.';
                    default:
                        return 'Erro ao fazer login. Por favor, tente novamente.';
                }
            default:
                return 'Erro desconhecido. Por favor, tente novamente.';
        }
    };

    const signUp = async (email, password) => {
        const auth = getAuth();
    
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(mapFirebaseErrorMessage(error.code));
            setTimeout(() => setError(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    const logIn = async (email, password) => {
        const auth = getAuth();

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(mapFirebaseErrorMessage(error.code, 'logIn'));
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        const auth = getAuth();

        try {
            setLoading(true);
            await signOut(auth);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, signUp, logIn, logOut };
};

export default useAuthentication;