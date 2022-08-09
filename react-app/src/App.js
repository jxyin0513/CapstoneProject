import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalProvider } from './components/context/Modal';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import NewProject from './components/projects/AddProject';
import Project from './components/projects/ProjectDetail';
import AllProjects from './components/projects/AllProjects';
import AddTask from './components/tasks/AddTask';
import AllTasks from './components/tasks/AllTasks';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ModalProvider>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/tasks' exact={true} >
          <AllTasks />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/projects/:projectId'>
          <Project />
        </ProtectedRoute>
        <ProtectedRoute path='/new/project-form'>
          <NewProject />
        </ProtectedRoute>
        <ProtectedRoute path='/new/task'>
          <AddTask />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <AllProjects />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
