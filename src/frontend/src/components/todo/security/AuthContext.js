import { createContext, useContext, useState } from "react";
import { excuteJwtBasicAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

// 1: Context 생성
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 2: state 추가하고 Context 안에서 
// 공유하고 Context를 다른 컴포넌트와 공유

function AuthProvider({ children }) {
    // 3: Provider를 만들어서 State를 context에 넣기
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // function login(username, password) {
    //     if(username === 'hyeon' && password === 'dummy') {
    //         setAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     } else {
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }
    // }

    // async function login(username, password) {
    //     // base64 incoding
    //     const basicToken = 'Basic ' + window.btoa(username + ":" + password);
    //
    //     try {
    //         const response = await excuteBasicAuthenticationService(basicToken);
    //
    //         if(response.status === 200) {
    //             setAuthenticated(true);
    //             setUsername(username);
    //             setToken(basicToken);
    //
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token');
    //                     config.headers.Authorization = basicToken;
    //
    //                     return config;
    //                 }
    //             );
    //
    //             return true;
    //         } else {
    //             logout();
    //             return false;
    //         }
    //     } catch (error) {
    //         logout();
    //         return false;
    //     }
    //
    // }

    async function login(username, password) {
        try {
            const response = await excuteJwtBasicAuthenticationService(username, password);

            if(response.status === 200) {
                const jwtToken = 'Bearer ' + response.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token');
                        config.headers.Authorization = jwtToken;

                        return config;
                    }
                );

                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            logout();
            return false;
        }

    }

    function logout() {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, username, token, login, logout } }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;