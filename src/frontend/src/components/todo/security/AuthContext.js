import { createContext, useContext, useState } from "react";

// 1: Context 생성
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 2: state 추가하고 Context 안에서 
// 공유하고 Context를 다른 컴포넌트와 공유

function AuthProvider({ children }) {
    // 3: Provider를 만들어서 State를 context에 넣기
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    function login(username, password) {
        if(username === 'hyeon' && password === 'dummy') {
            setAuthenticated(true);
            setUsername(username);
            return true;
        } else {
            setAuthenticated(false);
            setUsername(null);
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, username, login, logout } }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;