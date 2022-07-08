import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

const params = new URLSearchParams(window.location.search);
const access_token = params.get('access_token');
const refresh_token = params.get('refresh_token');

const  App = () => {
  return access_token ? <Dashboard access_token={ access_token }
    refresh_token={ refresh_token } /> : <Login />
}


export default App