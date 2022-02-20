import {useState} from 'react'
import {app, auth, db} from './firebase_config'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import './forms.css'
import { Link } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore/lite'
import { useNavigate } from "react-router-dom";



function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate();

    
    const [error, setError] = useState('')

    const validatePassword = () => {//todo: add letters
        let isValid = true
        if (password !== '' && confirmPassword !== ''){
          if (password !== confirmPassword) {
            isValid = false
            setError('Passwords does not match')
          }
        }
        return isValid
    }

    const register = async (e) => {
        e.preventDefault()
        setError('')
        if(validatePassword()) {
          // Create a new user with email and password using firebase
            createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
                const colRef = collection(db,"users")
                addDoc(colRef, {
                    email: email,
                    password: password,
                    name: name,
                    birthday: birthday,
                    address: address,
                });
              })
            .catch(err => setError(err.message))
            console.log(error);
        }
        //saveUser();
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setName('')
        setBirthday('')
        setAddress('')
    }

    return (
        <div className='center'>
        <div className='auth'>
          <h1>Register</h1>
          {error && <div className='auth__error'>{error}</div>}
          <form onSubmit={register} name='registration_form'>
            <input 
              type='email' 
              value={email}
              placeholder="Enter your email"
              required
              onChange={e => setEmail(e.target.value)}/>
  
            <input 
              type='password'
              value={password} 
              required
              placeholder='Enter your password'
              onChange={e => setPassword(e.target.value)}/>
  
              <input 
              type='password'
              value={confirmPassword} 
              required
              placeholder='Confirm password'
              onChange={e => setConfirmPassword(e.target.value)}/>

            <input 
              type='name'
              value={name} 
              required
              placeholder='Full Name'
              onChange={e => setName(e.target.value)}/>

            <input 
              type='birthday'
              value={birthday} 
              required
              placeholder='birthday'
              onChange={e => setBirthday(e.target.value)}/>

            <input 
              type='address'
              value={address} 
              required
              placeholder='address'
              onChange={e => setAddress(e.target.value)}/>
  
            <button type='submit' onClick={()=>navigate("/")}>Register</button>
          </form>
          <span>
            Already have an account?  
            <Link to='/login'>login</Link>
          </span>
        </div>
      </div>
    )
}

export default Register
