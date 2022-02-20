import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./forms.css";
import { auth } from "./firebase_config";
import { useAuthValue } from "./AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useAuthValue();
  let history = useNavigate();


  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        history("/");
      })
      .catch((err) => setError(err.message));
  };

  //   function childOfAuthProvider(){
  //     const {currentUser} = useAuthValue()
  //     console.log(currentUser)

  //     return
  //   }

  return (
    <div className="center">
      <div className="auth">
        <h1>Log in</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={login} name="login_form">
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={()=>history("/")}>Login</button>
        </form>
        <p>
          Don't have and account?
          <Link to="/register">Create one here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
