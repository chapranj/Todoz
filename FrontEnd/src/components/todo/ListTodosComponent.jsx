import {useEffect, useState} from "react";
import {calldeleteTodo, retrieveAllTodosForUsername, retrieveTodoApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

export default function ListTodosComponent() {

    const today = new Date();

    const auth = useAuth()

    const navigate = useNavigate();
    
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());

    const [todos, setTodos] = useState([])

    const [updateMessage, setupdateMessage] = useState(null)

    useEffect (
        () => refreshTodos(), []
    )

    function refreshTodos() {
        retrieveAllTodosForUsername(auth.username)
            .then(
                (response) => {
                    console.log(response.data)
                    setTodos(response.data)
                }
            )
            .catch(
                (response) => console.log("Error: " + response)
            )
            .finally(
                console.log('hellow')
            )
    }


    function deleteTodo(id){
        calldeleteTodo(auth.username,id )
        .then(
            (response)=>{
                refreshTodos()
                setupdateMessage(`Deleted Todo ${id}`)
            }
        )
        .catch(
            (error) => console.log(error)
        )
    }

    function updateTodo(id){
        navigate(`/todo/${id}`)
    }

    function handleAddNewTodo(){
        navigate(`/addTodo`)
    }



    return (
        <div className="container">
            <h1>Things you want to do!</h1>
            <div>
                {updateMessage && <div>{updateMessage}</div>}
                <table className="table">
                    <thead>
                        <tr>

                            <th>Description</th>
                            <th>Is Done</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>{
                        todos.map(
                            (todo) => (
                                <tr key={todo.id}>

                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate}</td>
                                    <td><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>


            </div>
            <div className="btn btn-outline-primary" onClick={handleAddNewTodo} >Add new Todo</div>
        </div>
    )
}