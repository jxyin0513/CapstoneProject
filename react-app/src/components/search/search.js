import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Search = () => {

    const [enhancedSearch, setEnhancedSearch] = useState([])
    // const [keystroke, setKeystroke] = useState('');
    const tasks = Object.values(useSelector(state=>state.tasks))
    const projects = Object.values(useSelector(state=>state.projects))
    let search = []
    // const cleanup = () => {
    //   setEnhancedSearch([])
    // }
    const filteredProjects = (e)=>{
      if(e.target.value){
        search = projects.filter(project=>{
          if(project.name.toLowerCase().includes(e.target.value.toLowerCase()) || project.name.toLowerCase().includes(e.target.value.toLowerCase())){
            return true;
          }
        })
      }
      console.log(search)
      setEnhancedSearch(search)
    }
    return (
        <>
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
            {enhancedSearch.map(result => (
              <NavLink key={result.id} to={`/projects/${result.id}`}>
                <div className='individual-result'>
                  <p className='search-name'>{result.name}</p>
                  {/* <p>{result.cuisine}</p> */}
                  <p className='search-detail'>Deadline: {result.deadline} | </p>
                </div>
              </NavLink>
            ))}
          </div>
        </>
      )
    };
    export default Search;
