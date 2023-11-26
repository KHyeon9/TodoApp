import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function WelcomeComponent() {
    const { username } = useParams();

    function callHelloWorldRestApi() {
        console.log("called");
        // axios
        axios.get('http://localhost:8080/hello-world')
             .then( (response) => successfulResponse(response) )
             .catch( (error) => errorResponse(error) )
             .finally( () => console.log('clean up') );
    }

    function successfulResponse(response) {
        console.log(response)
    }

    function errorResponse(error) {
        console.log(error)
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
                >Call Hello World</div>
        </div>
    );
}
