import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import image from '../image/sign-page.jpg'
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  // let signUpSlides = [];


  const onSignUp = async (e) => {
    e.preventDefault();

    const data = await dispatch(signUp(username, email, password, repeatPassword));
    if (data) {
      setErrors(data)
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signUp-Container'>
      <img src={image} alt=''></img>
      <div className='signUp-inner-Container'>
        <div className='signUp-Header'>Sign up Here</div>
        {/* <i class="fa-solid fa-arrow-left"></i>
        <i class="fa-solid fa-arrow-right"></i> */}
        <form className='signup-Form' onSubmit={onSignUp}>
          <div className='errors-handle-Signup'>
            {errors.map((error, ind) => (
              <div key={ind}>* {error}</div>
            ))}
          </div>
          <div>
            <label></label>
            <input
              type='text'
              name='username'
              placeholder='Enter your username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              type='text'
              name='email'
              placeholder='aa@example.com'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm your password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
