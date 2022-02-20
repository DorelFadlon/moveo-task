import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Profile from './Profile'
import Register from './Register'
import Login from './Login'
import UpdateProfile from './UpdateProfile';
import { AuthProvider } from './AuthContext';
import {useState, useEffect} from 'react'
import {auth,db} from './firebase_config'
import {onAuthStateChanged} from 'firebase/auth'
import {
  collection,
  getDocs,
} from "firebase/firestore/lite";

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [user, setUser] = useState(null);
  const usersRef = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    const getUsers = async () => {
      const data = await getDocs(usersRef);
      const curUser = data.docs.find(
        (doc) => doc.data().email.toString().toLowerCase() === currentUser?.email
      );
      setUser(curUser);
    };
    getUsers();
  }, [user, setUser, usersRef, currentUser]); 
  return (
    <Router>
      <AuthProvider value={{currentUser}}>
      <Routes>
        <Route exact path="/" element={<Profile user={user} setUser={setUser}/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/updateProfile" element={<UpdateProfile user={user} setUser={setUser}/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
