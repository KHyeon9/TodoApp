import { useEffect, useState } from "react";
import { retrieveTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";

export default function ListTodosComponent() {
    // const today = new Date();
    // const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());
    // const todos = [
    //     {
    //         id: 1,
    //         description: 'Learn AWS',
    //         done: false,
    //         targetDate: targetDate,
    //     },
    //     {
    //         id: 2,
    //         description: 'Learn Full Stack Dev',
    //         done: false,
    //         targetDate: targetDate,
    //     },
    //     {
    //         id: 3,
    //         description: 'Learn DevOps',
    //         done: false,
    //         targetDate: targetDate,
    //     },
    // ];
    const authContext = useAuth()
    const username = authContext.username;

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect( () => refreshTodos(),[] );

    function refreshTodos() {
        retrieveTodosForUsernameApi(username)
            .then(response => {
                setTodos(response.data)
            })
            .catch(error => console.log(error));
    }

    function deleteTodo(id) {
        console.log("click delete " + id);
        deleteTodoApi(username, id)
            .then(
                // 1. 삭제 성공 메세지
                // 2. Todo-list 업데이트
                () => {
                    setMessage(`Delete of todo with id = ${id} successful`);
                    refreshTodos();
                }
            )
            .catch(error => console.log(error));
    }

    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>
            { message && <div className="alert alert-warning">{ message }</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={ todo.id }>
                                        <td>{ todo.description }</td>
                                        <td>{ todo.done.toString() }</td>
                                        {/*<td>{ todo.targetDate.toDateString() }</td>*/}
                                        <td>{ todo.targetDate.toString() }</td>
                                        <td><button className="btn btn-warning"
                                                    onClick={() => deleteTodo(todo.id)}
                                            >Delete</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
