import { apiClient } from "./ApiClient";

// export function retrieveHelloWorldBean() {
//    return axios.get('http://localhost:8080/hello-world-bean');
// }


export const retrieveHelloWorldBean
    = () => apiClient.get(
        '/hello-world-bean');

// 프리플라이트 요청에 대한 액세스 제어 체크를 못함
export const retrieveHelloWorldPathVariable // 주소로 받는 값이 있읅경우 매개 변수를 만들고 백틱을 이용해서 전달 받음
    = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`
    // ,{
    //         headers: {
    //             Authorization: token
    //     }
    // }
    );

export const excuteBasicAuthenticationService
    = (token) => apiClient.get(`/basicauth`, {
        headers: {
            Authorization: token
        }
    });