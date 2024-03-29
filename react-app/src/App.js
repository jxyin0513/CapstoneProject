import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalProvider } from './components/context/Modal';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NewProject from './components/projects/AddProject';
import MainPageStatus from './components/DefaultPage';
import Project from './components/projects/ProjectDetail';
// import AllProjects from './components/projects/AllProjects';
import Page from './components/projects/MainPage';
import AddTask from './components/tasks/AddTask';
import AllTasks from './components/tasks/AllTasks';
import TopBar from './components/TopBar';
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
      <TopBar />
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <Page />
        </Route>
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
          <MainPageStatus />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
