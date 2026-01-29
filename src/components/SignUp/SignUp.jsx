import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { FaEye } from 'react-icons/fa';



const SignUp = () => {
    const [success, setSuccess] =useState(false);
    const [errorMessage, setErrorMessage] =useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.value;
        console.log(email, password, terms);

        // reset
        setSuccess(false);
        setErrorMessage('');

        // password validate
        const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(passwordRegExp.test(password) === false){
            setErrorMessage('Password must one lowercase, one uppercase, one digit and 6 characters or longer.')
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result)
            setSuccess(true)
        })
        .catch(error =>{
            console.log(error)
            setErrorMessage(error.message)
        })
    }
    return (
        
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
         <h1 className="text-5xl font-bold">Login now!</h1>
      <div className="card-body">
        <form onSubmit={handleSignUp} className="fieldset">
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">Password</label>
          <div className='relative'>
            <input type={showPassword ? 'text' : "password"} name='password' className="input" placeholder="Password" />
            <button 
                onClick={()=>{setShowPassword(!showPassword)}}
            className='btn btn-xs top-2 right-6 absolute'><FaEye></FaEye></button>
          </div>
          <div><a className="link link-hover">Forgot password?</a></div>

          <label className="label">
    <input type="checkbox" name='terms' defaultChecked className="checkbox" />
    Accept Terms and Conditions
  </label>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        {
            errorMessage && <p className='text-red-500'>{errorMessage}</p>
        }
        {
            success && <p className='text-green-500'>User has created successfully</p>
        }
      </div>
    </div>
  
    );
};

export default SignUp;