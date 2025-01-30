import { useEffect } from 'react'
import {auth} from './config/firebase-config'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import TextEditor from './components/TextEditor';


function App() {
  
//authentication
  useEffect(() => {
    //user will get an anonymous id
    signInAnonymously(auth);
    onAuthStateChanged(auth, user => {
      if(user){
        console.log('User signed in: '+ user.uid);
      }
    })
  }
  , [])

  return (
    <div className="App">
      <header>
        <h1 className='font-sans text-4xl font-bold my-[20px]'>Google Docs Clone</h1>
      </header>
      <TextEditor />
    </div>
  );
}

export default App
