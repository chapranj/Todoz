import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


import { callAPI, callAPIWParam } from "./api/HelloWorldApiService";

export default function WelcomeComponent() {


    // the line below extracts the theUser variable from the url 
    const { theUser } = useParams();

    const [message, setMessage] = useState(null);

    function callHelloWorldRestApi() {
        callAPIWParam(theUser)
            .then(
                (response) => {
                    console.log(response.data.message)
                    successfulResponse(response)
                }
              
            )
            .catch(
                (response) => errorResponse(response)
            )
            .finally(
                () => console.log("Param Done!")
            )


    }

    function successfulResponse(r) {
        console.log("response: " + r)
        console.log("data " + r.data)
        console.log("message: " + r.data.message)
        setMessage(r.data.message)

    }

    function errorResponse(e) {
        console.log(e)
    }


    return (
        <div>
            <h1>Welcome to the Application {theUser}</h1>
            <h1>{message}</h1>
            <div>
                Your todos. <Link to={'/todos/'}>Go here</Link>
            </div>
            <div>
                {/* <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello World</button> */}
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Parameter</button>

            </div>
        </div>
    )
}