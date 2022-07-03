
import './App.css';
import {Button} from "@chakra-ui/react"
import {Route} from 'react-router-dom'
import Homepage from './Components/Homepage.js'
import Chatpage from './Components/Chatpage.js'

function App() {
  return (
    <div className='App'>
    <Route exact path='/' component={Homepage}></Route>
    <Route path='/chats' component={Chatpage}></Route>
    </div>
  );
}

export default App;
