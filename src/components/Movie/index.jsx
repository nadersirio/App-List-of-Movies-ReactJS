import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHref } from 'react-router-dom';

const Movie = () => {
  const [movie, setMovie] = useState([]);
  const [movieHash, setHash] = useState([]);
  const urlPath = `http://localhost:3000${useHref()}`

  useEffect(() => {
    async function getMovie() {
      const movie = await axios.get(urlPath);
      setMovie(movie.data.movie);
      setHash(movie.data.movieHash);
    } getMovie();
  }, []);

  const editMovie = async () => {
    console.log("editar filme")
  }

  const deleteMovie = async () => {
    try {
      await axios.delete(`http://localhost:3000/movie/${movieHash}`)
      window.location = "/"
    } catch(err) {}
  }

  return (
    <section className="content-father">
      <div className="App-header">
        <h1> { movie.title } </h1>
      </div>
      <div className='AlignMoviePage'>
        <img className="imgCustom" src={`${movie.url}`} alt="Banner Movie"></img>
        <h2> Release in: { movie.release } </h2>
      </div>
      <div className='alignButtons'>
        <button type="button"><a href="/">Home</a></button>
        <button type="button" onclick={editMovie}>Edit</button>
        <button type="button" onClick={deleteMovie}>Delete</button>
      </div>
    </section>
  )
};
export default Movie