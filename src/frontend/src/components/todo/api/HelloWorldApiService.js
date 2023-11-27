import axios from "axios";

// export function retrieveHelloWorldBean() {
//    return axios.get('http://localhost:8080/hello-world-bean');
// }

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

export const retrieveHelloWorldBean
    = () => apiClient.get(
        '/hello-world-bean');

export const retrieveHelloWorldPathVariable // 주소로 받는 값이 있읅경우 매개 변수를 만들고 백틱을 이용해서 전달 받음
    = (username) => apiClient.get(
        `/hello-world/path-variable/${username}`);