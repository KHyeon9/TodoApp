import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function WelcomeComponent() {
    const { username } = useParams();

    const [message, setMessage] = useState(null);

    function callHelloWorldRestApi() {
        // axios
        // axios.get('http://localhost:8080/hello-world')
        //      .then( (response) => successfulResponse(response) )
        //      .catch( (error) => errorResponse(error) )
        //      .finally( () => console.log('clean up') );
        
        axios.get('http://localhost:8080/hello-world-bean')
             .then( (response) => successfulResponse(response) )
             .catch( (error) => errorResponse(error) )
             .finally( () => console.log('clean up') );
    }

    function successfulResponse(response) {
        console.log(response.data);
        // setMessage(response.data);
        setMessage(response.data.message);
    }

    function errorResponse(error) {
        console.log(error);
    }

    return (
        <div className="Welcome">
            <h1>Welcome { username }</h1>
            <div>
                Manage Your todos - <Link to="/todos">Go Here</Link>
            </div>
            <div 
                className="btn btn-success m-5" 
                onClick={ callHelloWorldRestApi }
                >Call Hello World
            </div>
            <div className="text-info">{ message }</div>
        </div>
    );
}
