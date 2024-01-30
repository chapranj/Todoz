import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './TodoApp.css'
import HeaderComponent from "./HeaderComponent"
import LoginComponent from "./LoginComponent"
import WelcomeComponent from "./WelcomeComponent"
import ListTodosComponent from "./ListTodosComponent"
import LogoutComponent from "./LogoutComponent"
import ErrorComponent from "./ErrorComponent"
import FooterComponent from "./FooterComponent"
import AuthProvider, { useAuth } from "./security/AuthContext"
import TodoComponent from "./TodoComponent";
import AddTodoComponent from "./AddTodoComponent";


function AuthenticatedRoute({ children }) {
    const auth = useAuth();
    if (auth.isAuthenticated) {
        return (
            children
        )
    }
    return <Navigate to="/"></Navigate>
}


export default function TodoApp() {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent></HeaderComponent>
                    <Routes>
                        <Route path='/' element={<LoginComponent></LoginComponent>} ></Route>
                        <Route path='/login' element={<LoginComponent></LoginComponent>} ></Route>

                        <Route path='/welcome/:theUser' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent></WelcomeComponent>
                            </AuthenticatedRoute>

                        } ></Route>


                        <Route path='/todos/' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent></ListTodosComponent>
                            </AuthenticatedRoute>
                        } ></Route>

                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent></TodoComponent>
                            </AuthenticatedRoute>
                        } ></Route>



                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent></LogoutComponent>
                            </AuthenticatedRoute>
                        } ></Route>

                        <Route path='/addTodo' element={
                            <AuthenticatedRoute>
                                <AddTodoComponent></AddTodoComponent>
                            </AuthenticatedRoute>
                        } ></Route>

                        <Route path='*' element={<ErrorComponent></ErrorComponent>} ></Route>
                    </Routes>
                    <FooterComponent></FooterComponent>
                </BrowserRouter>
            </AuthProvider>

        </div>
    )
}










