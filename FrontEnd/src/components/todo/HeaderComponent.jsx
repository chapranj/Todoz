import { Link } from "react-router-dom"
import { AuthContext, useAuth } from "./security/AuthContext"
import { useContext } from "react";
export default function HeaderComponent() {


    const auth = useAuth();

    function logOut(){
        auth.logOut()
    }
    
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="#">Todoz</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                {auth.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>}
                                {auth.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>}
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            {!auth.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>}
                            {auth.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/logout" onClick={logOut}>Logout</Link></li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
}