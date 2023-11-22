import { createContext, useContext, useState, useEffect } from 'react';
import useAuthentication from '../hooks/useAuthentication';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { user, loading, signUp } = useAuthentication();
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
        setAuthenticatedUser(user);
    }, [user]);

    const signupWithContext = async (email, password) => {
        try {
            await signUp(email, password);
            const user = await signUp(email, password);
            setAuthenticatedUser(user);
        } catch (error) {
            console.error('Erro no cadastro:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user: authenticatedUser,
                loading,
                signup: signupWithContext,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};