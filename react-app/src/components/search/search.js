import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Search = () => {

    const [projectsResult, setProjectsResult] = useState([])
    const [taskResults, setTaskResults] = useState([])
    // const [keystroke, setKeystroke] = useState('');
    const tasks = Object.values(useSelector(state=>state.tasks))
    const projects = Object.values(useSelector(state=>state.projects))
    let projectSearch = []
    let taskSearch = []
    // const cleanup = () => {
    //   setEnhancedSearch([])
    // }
    const filteredProjects = (e)=>{
      if(e.target.value){
        projectSearch = projects.filter(project=>{
          if(project.name.toLowerCase().includes(e.target.value.toLowerCase())){
            return true;
          }
        })
        taskSearch = tasks.filter(task=>{
          if(task.taskName.toLowerCase().includes(e.target.value.toLowerCase())){
            return true;
          }
        })
      }
      console.log(projectSearch)
      setProjectsResult(projectSearch)
      setTaskResults(taskSearch)
    }
    return (
        <div>
          <input
            className='search'
            type='text'
            placeholder="Search your task or project name"
            onChange={
              filteredProjects
              }
              // setKeystroke(e.target.value)
              // const res = await dispatch(SearchRestaurantsThunk(e.target.value))
              // if (res) {
              //   setEnhancedSearch(res.restaurants)
              // } else {
              //   cleanup()
              // }
             />
          <div className='results-container'>
            {projectsResult.map(project => (
              <NavLink key={project.id} to={`/projects/${project.id}`}>
                <div className='project-result'>
                  <p className='search-name'>{project.name}</p>
                  {/* <p>{result.cuisine}</p> */}
                  <p className='search-detail'>Deadline: {project.deadline} | </p>
                </div>
              </NavLink>
            ))}
            {taskResults.map(task=>(
              <NavLink key={task.id} to={`/projects/${task.project.id}`}>
              <div className='task-result'>
                <p className='search-name'>{task.taskName}</p>
                <p>{task.project.name}</p>
                <p className='search-detail'>Deadline: {task.deadline} </p>
              </div>
            </NavLink>
            ))}
          </div>
        </div>
      )
    };
    export default Search;
