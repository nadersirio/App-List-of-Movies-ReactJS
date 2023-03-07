import { useEffect, useState } from "react"
import axios from 'axios'
import { useHref } from "react-router";

export const NewMovie = () => {
  const [titleMovie, setTitle] = useState('');
  const [releaseMovie, setRelease] = useState('');
  const [bannerMovie, setBanner] = useState('');
  const [postMovie, setPost] = useState(false);
  const [errorMsg, setError] = useState('');

  const setingTitle = event => {
    setTitle(event.target.value);
  }
  const setingRelease = event => {
    setRelease(event.target.value);
  }
  const setingBanner = event => {
    setBanner(event.target.value);
  }

  const sendPostData = () => {
    if(!titleMovie | !releaseMovie | !bannerMovie) {
      return setError(<h1>Please, fill in all fields</h1>);
    }
    setPost(true);
  }

  useEffect(() => {
    if(postMovie) {
      setPost(false);
      const sendPost = async () => {
        try {
          const post = await axios.post('http://localhost:3000/new-movie', {
            movie: {
            title: titleMovie,
            url: bannerMovie,
            release: releaseMovie
            }
          })
          window.location = "/";
        } catch(error) {
          setError(<h1>This movie already exists in our library</h1>);
        }
      }
      sendPost()
    }
  }, [postMovie])

  //console.log(useHref().slice(11))

  return (
    <section className="content-father">
      <div className="App-header">
        <h1>Add Your Movie</h1>
      </div>
      <form className="getDataMovie">
        <input name="TitleNewMovie" type="text" onChange={setingTitle} value={titleMovie} placeholder="Title Movie"></input><br />
        <input name="ReleaseNewMovie" type="number" onChange={setingRelease} value={releaseMovie} placeholder="Release Movie"></input><br />
        <input name="BannerNewMovie" type="text" onChange={setingBanner} value={bannerMovie} placeholder="PNG image Movie"></input><br />
        <button type="button" onClick={sendPostData}>Create</button>
        <button type="button"><a href="/">Return</a></button>
      </form>
      {errorMsg}
    </section>
  )
}

export default NewMovie