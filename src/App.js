import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddImage from "./component/AddImage";
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';
import Signup from './pages/Signup';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/' element={<Login/>}/>
      <Route path = '/signup' element={<Signup/>}/>
      <Route path = '/dashboard' element={<Dashboard/>}>
          <Route path ='/dashboard' element={<AddImage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
