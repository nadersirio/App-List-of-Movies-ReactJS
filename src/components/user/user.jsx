import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const User = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [postUser, setPost] = useState(false);
  const [errorMsn, setError] = useState('');
  const [cookies, setCookies] = useCookies('');

  const setingEmail = event => {
    setEmail(event.target.value);
  }
  const setingPassword1 = event => {
    setPassword1(event.target.value);
  }
  const setingPassword2 = event => {
    setPassword2(event.target.value);
  }

  useEffect(() => {
    if(postUser) {
      setPost(false)
      const sendPostUser = async () => {
        try {
          const post = await axios.post('http://localhost:3000/user', {
            userData: {
              emailUser: email,
              passwordUser1: password1,
              passwordUser2: password2
            }
          })
          setCookies('user', post.data, { path: '/' });
          window.location = "/";
        } catch(error) {
          if(error.response.status === 406) {
            setError(<h1>{error.response.data.error}</h1>)
          } if(error.response.status === 400) {
            setError(<h1>{error.response.data.error}</h1>)
          }
        }
      }
      sendPostUser();
    }
  }, [postUser])


  const sendPost = () => {
      if(!email | !password1 | !password2) {
        return setError(<h1>Please, fill in all fields</h1>);
      } if(!validateEmail(email)) {
        return setError(<h1>This Email format is wrong</h1>)
      }if(password1 !== password2) {
        return setError(<h1>Passwords do not match</h1>)
      }
      setPost(true);
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <section className="content-father">
      <div className='App-header'>
        <h1> Create your account </h1>
      </div>
      <form className="getDataMovie">
        <input type="email" onChange={setingEmail} placeholder="Email" value={email} required></input><br></br>
        <input placeholder="Password" onChange={setingPassword1} value={password1} required></input><br></br>
        <input placeholder="Confirm Password" onChange={setingPassword2} value={password2} required></input><br></br>
        <button type="button" className='ButtonStyle' onClick={sendPost}>Submit</button>
        <button type="button" className='ButtonStyle'><a href="/">Return</a></button>
      </form>
      {errorMsn}
    </section>
  )
}
