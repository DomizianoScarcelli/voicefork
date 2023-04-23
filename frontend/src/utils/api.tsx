import axios from "axios";

const Login = (formData: any) => {
    //TO DO: DEFINE URL IN ENV FILE
    axios.post('http://localhost:3001/create-user', formData)
        .then(function(response) {
            return response
        })
        .catch(function(error) {
            return error
        })
}

export default Login

