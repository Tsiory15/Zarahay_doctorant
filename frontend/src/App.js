import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Client_page/Login';
import Create from './Client_page/Create'
import Home from './Client_page/Home';
import Header from './Header';
import AdminHeader from './AdminHeader';
import Utilisateur from './Admin_page/Utilisateur';
import Module from './Admin_page/Module';
import AdminForm from './Admin_page/AdminForm';
import InsertModule from './Admin_page/InsertModule';
import Formation from './Client_page/Formation';
import InsertFormation from './Admin_page/InsertFormation';
import ViewDetail from './Client_page/ViewDetail';
import NoFound from './NoFound';
// import Video from './Video';
// import Test from './Admin_page/Test';
import Chat from './Chat';
import Test from './Test';
import Validation from './Admin_page/Validation';
// import VoirVideo from './VoirVideo';
import Voirplus from './Client_page/Voirplus';
import Discussion from './Discussion';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/notFound" element={<NoFound/>}></Route>
        <Route path="/" element={<div><Header/><Discussion/><Home/></div>}></Route>
        <Route path="/Create" element={<Create/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/Utilisateur" element={<div><AdminHeader/><Utilisateur/></div>}></Route>
        <Route path="/Formation" element={<div><Header/><Formation/></div>}></Route>
        <Route path="/module" element={<div><AdminHeader/><Module/></div>}></Route>
        <Route path="/InsertModule" element={<InsertModule/>}></Route>
        <Route path="/AdminForm" element={<AdminForm/>}></Route>
        <Route path="/InsertFormation" element={<div><AdminHeader/><InsertFormation/></div>}></Route>
        <Route path='/ViewDetail/:id' element={<div><Header/><ViewDetail/></div>}></Route>
        <Route path='/Voirplus/:id' element={<div><Header/><Voirplus/></div>}></Route>
        {/* <Route path='/Live' element={<div><Video/></div>}></Route> */}
        {/* <Route path='/Voir' element={<div><VoirVideo/></div>}></Route> */}
        <Route path='/test' element={<div><Chat/></div>}></Route>
        <Route path='/chat' element={<div><Test/></div>}></Route>
        <Route path='/Validation' element={<div><AdminHeader/><Validation/></div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
