import React, { useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import './search.css';

const Search = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('');
    const [projectsResult, setProjectsResult] = useState([])
    const [taskResults, setTaskResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [searchBoard, setSearchBoard] = useState(false)
    const user = useSelector(state=>state.session.user)
    const tasks = Object.values(useSelector(state=>state.tasks)).filter(task => task.userId === user.id)
    const projects = Object.values(useSelector(state=>state.projects)).filter(project=>project.userId === user.id)
    let projectSearch = []
    let taskSearch = []

    useEffect(() => {
      if (!searchBoard) return;

      const closeMenu = () => {
        setSearchBoard(false);
      };
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener("click", closeMenu);
  }, [searchBoard]);

    const filteredProjects = (e)=>{
      setSearch(e.target.value)
      setSearchBoard(true)
      if(e.target.value){
        setShowResults(true)
        projectSearch = projects.filter(project=>{
          if(project.name.toLowerCase().startsWith(e.target.value.toLowerCase())){
            return true;
          }else{
            return false;
          }
        })
        taskSearch = tasks.filter(task=>{
          if(task.taskName.toLowerCase().startsWith(e.target.value.toLowerCase())){
            return true;
          }else{
            return false
          }
        })
      }
      setProjectsResult(projectSearch)
      setTaskResults(taskSearch)
    }

    function newProject(e){
      setShowResults(false)
      navigate.push(`/projects/${e.target.id}`)
    }
    function newTask(e){
      setShowResults(false)
      // console.log(e.target.id)
      navigate.push(`/projects/${e.target.id}`)
    }

    return (
        <div className='search-container'>
          <form className='search-form'>
            <i id='search-icon' className="fa-solid fa-magnifying-glass"></i>
            <input
              className='search-bar'
              type='search'
              size={55}
              placeholder="Search your task or project name"
              onChange={
                filteredProjects
                }></input>
           </form>
          {showResults && searchBoard && search.length>0 && (
          <div className='results-container'>
            <div className='search-monitor'>
              <i className="fa-solid fa-magnifying-glass"></i>
              <div>View all results with <div>{search}</div></div>
            </div>
            {projectsResult.length>0 && (
            <div className='project-container'>
              <div className='project-bar'>Projects</div>
              {projectsResult.map(project => (
                <div className='project-outer' key={project.id}>
                  <div className='project-result' id={project.id} onClick={newProject}>
                    <i className="fa-regular fa-circle-check" id={project.id}></i>
                    <div className='search-name' id={project.id}>{project.name}</div>
                    <div className='search-deadline' id={project.id}>Deadline: {project.deadline}</div>
                  </div>

                </div>
              ))}
            </div>)}
            {taskResults.length >0 &&
            <div className='task-container'>
              <div className='task-bar'>Tasks</div>
              {taskResults.map(task=>(
                <div className='task-outer' key={task.id}>
                    <div className='task-result' id={task.project.id} onClick={newTask}>
                      <i className="fa-regular fa-circle-check" id={task.project.id}></i>
                      <div className='search-name' id={task.project.id}>{task.taskName}</div>
                      <div className='search-project' id={task.project.id}>{task.project.name}</div>
                      <div className='search-deadline' id={task.project.id}>Deadline: {task.deadline} </div>
                    </div>
                </div>
              ))}
            </div>}
          </div>)}
        </div>
      )
    };
    export default Search;
