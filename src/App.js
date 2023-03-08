import './App.css';
import React,  { useState, useEffect } from 'react'
import Movies from './components/Movies';
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState("");
  const [nameMovie, setNameMovie] = useState('');
  const [movie, setMovie] = useState([]);
  const [poster, setPoster] = useState([])
  const [errorMsn, setMsn] = useState(false);
  const [requisition, setRequisition] = useState(false);


  const valueSearchMovie = event => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const CallMovies = async () => {
      try {
        const getPoster = await axios.get("http://localhost:3000/poster")
        setPoster(getPoster.data);
      } catch(err) {
        setMsn(true)
      }
    }
    CallMovies()
  }, [])

  useEffect(() => {
      if(requisition) {
        setRequisition(false)
        const searchMovie = async () => {
          try {
            const getMovie = await axios.get(`http://localhost:3000/movie/${nameMovie}`)
            setMovie(getMovie.data.movie)
          } catch(err) {
            setMovie(false)
          }
        }
        searchMovie()
      }
  }, [requisition])

  const buttonSearch = () => {
    setNameMovie(search);
    setSearch("");
    setRequisition(true)
  }

  return (
    <div className="content-father">
      <section className="App-header">
        <a href="/"><h1>Library of Movies</h1></a>
        <input onChange={valueSearchMovie} value={search} type="text" placeholder="Busque nossos filmes!"></input>
        <button className='ButtonStyle' name="searchButton" onClick={buttonSearch}>Search</button>
        <div className='ButtonsInteractivesContent'>
          <button className='ButtonStyle' name="newMovieRedirect"><a href="http://localhost:3001/new-movie">Add Movie</a></button>
          <button className='ButtonStyle' name="UserRegister"><a href="http://localhost:3001/user">Register</a></button>
          <button className='ButtonStyle' name="UserLogin"><a href="http://localhost:3001/login">Login</a></button>
        </div>
      </section>
      { errorMsn ? (<h1> Library Empty </h1>) : ( <Movies poster={poster} movie={movie}/> ) }
    </div>
  );
}

export default App;