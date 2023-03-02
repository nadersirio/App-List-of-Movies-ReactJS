const Movies = (props) => {
  const poster = props.poster
  const movie = props.movie

  const rendering = () => {
    if (movie === false) {
      return <h1> Movie not Found </h1>
    }
    if (movie.title) {
      return <ul className="listPosterCustom">
      <a key = { movie.slug } href={`/movie/${movie.title}`}><li className='contentMovie'><img className="imgPosterCustom" src={`${movie.url}`} alt="Banner Movie"></img> { movie.title }</li></a>
    </ul>
    }
    return <ul className="listPosterCustom">
      { poster.map( (poster) => <a key = { poster.slug } href={`/movie/${poster.title}`}><li className='contentMovie'><img className="imgPosterCustom" src={`${poster.url}`} alt="Banner Movie"></img> { poster.title }</li></a> ) }
    </ul>
    }
    return (
      <section className="App-body">
        {rendering()}
      </section>
    )
  }



export default Movies