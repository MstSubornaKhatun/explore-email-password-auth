import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router';



const SignUp = () => {
    const [success, setSuccess] =useState(false);
    const [errorMessage, setErrorMessage] =useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const photo = e.target.photo.value;
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


            // email verify
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                setSuccess(true)
                alert('We sent you a verification email.')
            })

            // update user
            const profile = {
                displayName: name,
                photoURL: photo
            }

            updateProfile(auth.currentUser, profile)
            .then(()=>{
                console.log('user profile updated')
            })
            .catch(error => console.log(error))



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
          <label className="label">Name</label>
          <input type="name" name='name' className="input" placeholder="Name" />

          <label className="label">Photo URL</label>
          <input type="photo" name='photo' className="input" placeholder="Photo URL" />


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
        <p>Already have an account? Please <Link className='text-blue-500 underline' to="/login">Login</Link></p>
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