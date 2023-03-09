import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHref, Link } from 'react-router-dom';

const Movie = () => {
  const [movie, setMovie] = useState([]);
  const [movieHash, setHash] = useState([]);
  const [errorMsn, setError] = useState('')
  const urlPath = `http://localhost:3000${useHref()}`

  useEffect(() => {
    async function getMovie() {
      try {
        const movie = await axios.get(urlPath);
        setMovie(movie.data.movie);
        setHash(movie.data.movieHash);
      } catch(error) {
        return setError(<h1>{error.response.data.error}</h1>);
      }
    } getMovie();
  }, []);

  const deleteMovie = async () => {
    try {
      await axios.delete(`http://localhost:3000/movie/${movieHash}`)
      window.location = "/"
    } catch(err) {
      return setError(<h1>Not has been possible delete this movie</h1>)
    }
  }

  return (
    <section className="content-father">
      <div className="App-header">
        {errorMsn}
        <h1> { movie.title } </h1>
      </div>
      <div className='AlignMoviePage'>
        <img className="imgCustom" src={`${movie.url}`} alt="Banner Movie"></img>
        <h2> Release in: { movie.release } </h2>
      </div>
      <div className='alignButtons'>
        <button type="button"><a href="/">Home</a></button>
        <button type="button"><Link to="/new-movie" state={{ id: `${movieHash}`, title: `${movie.title}`}}>Edit</Link></button>
        <button type="button" onClick={deleteMovie}>Delete</button>
      </div>
    </section>
  )
};
export default Movie