import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './search.css';

const Search = () => {
    const [search, setSearch] = useState('');
    const [projectsResult, setProjectsResult] = useState([])
    const [taskResults, setTaskResults] = useState([])
    // const [result, setResult] = useState(false)
    // const [keystroke, setKeystroke] = useState('');
    const user = useSelector(state=>state.session.user)
    const tasks = Object.values(useSelector(state=>state.tasks)).filter(task => task.userId === user.id)
    const projects = Object.values(useSelector(state=>state.projects)).filter(project=>project.userId === user.id)
    let projectSearch = []
    let taskSearch = []
    // const cleanup = () => {
    //   setEnhancedSearch([])
    // }
    const filteredProjects = (e)=>{
      setSearch(e.target.value)
      if(e.target.value){
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
      // console.log(projectSearch)
      setProjectsResult(projectSearch)
      setTaskResults(taskSearch)
      if(taskResults.length>0 || projectsResult.length>0){
      setSearch(true)
    }
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
          {search.length>0 && (
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
                  <NavLink className='project-search'  to={`/projects/${project.id}`}>
                    <div className='project-result'>
                      <i className="fa-regular fa-circle-check"></i>
                      <div className='search-name'>{project.name}</div>
                      <div className='search-deadline'>Deadline: {project.deadline}</div>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>)}
            {taskResults.length >0 &&
            <div className='task-container'>
              <div className='task-bar'>Tasks</div>
              {taskResults.map(task=>(
                <div className='task-outer' key={task.id}>
                  <NavLink  className='task-search' to={`/projects/${task.project.id}`}>
                    <div className='task-result'>
                      <i className="fa-regular fa-circle-check"></i>
                      <div className='search-name'>{task.taskName}</div>
                      <div className='search-project'>{task.project.name}</div>
                      <div className='search-deadline'>Deadline: {task.deadline} </div>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>}
          </div>)}
        </div>
      )
    };
    export default Search;
