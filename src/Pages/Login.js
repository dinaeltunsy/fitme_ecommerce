import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // Ensure you have Firestore imported
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Importing the CSS file for styling


const Login = ({setUserName}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's name from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userName = userDoc.data().name; // Fetch the name from Firestore
          setUserName(userName); // Update the parent component with the name
        }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
