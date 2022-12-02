import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import loginPage from '../image/sign-page.jpg'
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  const  demoSign = async(e)=>{
    const demoUser = {
      email: 'demo@aa.io',
      password: 'password'
    }
    await dispatch(login(demoUser.email, demoUser.password))
  }
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-Container'>
      <img src={loginPage} alt=''></img>
      <div className='login-inner-Container'>
        <div className='login-header'>
          <div>Sign In Here</div>
        </div>
        <form className='login-Form' onSubmit={onLogin}>
          <div className='errors-handler-Login'>
            {errors.map((error, ind) => (
              <div key={ind}>* {error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email'></label>
            <input
              name='email'
              type='text'
              placeholder='Enter your email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'></label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
        <div className='block'>------------------------or--------------------------</div>
        <p className='demo-User-Container'>Wanna Sign in as <button onClick={demoSign} className='demo-Button'>Demo User</button> ?</p>
      </div>
    </div>
  );
};

export default LoginForm;
