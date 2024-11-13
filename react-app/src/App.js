import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import SideBar from './components/SideBar';
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
    <BrowserRouter future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}>
      <SideBar />
      <NavBar />
      <Routes>
        <Route path='/' element={<Page /> }>
        </Route>
        <Route path='/login' element={<LoginForm />}>
        </Route>
        <Route path='/sign-up' element={<SignUpForm />}>
        </Route>
        <Route path='/tasks' element={<ProtectedRoute><AllTasks /></ProtectedRoute>}/>
        {/* <ProtectedRoute path='/tasks' >
          <AllTasks />
        </ProtectedRoute> */}
        <Route path='/users/:userId' element={<ProtectedRoute><User /></ProtectedRoute>}/>
        {/* <ProtectedRoute path='/users/:userId' >
          <User />
        </ProtectedRoute> */}
        <Route path='/projects/:projectId' element={<ProtectedRoute><Project /></ProtectedRoute>}/>
        {/* <ProtectedRoute path='/projects/:projectId'>
          <Project />
        </ProtectedRoute> */}
        <Route path='/new/project-form' element={<ProtectedRoute><NewProject /></ProtectedRoute>}/>
        {/* <ProtectedRoute path='/new/project-form'>
          <NewProject />
        </ProtectedRoute> */}
        <Route path='/new/task' element={<ProtectedRoute><AddTask /></ProtectedRoute>}/>
        {/* <ProtectedRoute path='/new/task'>
          <AddTask />
        </ProtectedRoute> */}
        <Route path='/' element={<ProtectedRoute><MainPageStatus /></ProtectedRoute>}/>
        {/* <ProtectedRoute path='/' >
          <MainPageStatus />
        </ProtectedRoute> */}
      </Routes>
    </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
