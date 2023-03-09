import { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const Login = () => {
  const [emailUser, setEmail] = useState('');
  const [passwordUser, setPassword] = useState('');
  const [postLogin, setPost] = useState(false);
  const [errorMsn, setError] = useState('');
  const [cookies, setCookies] = useCookies(['']);

  const setingEmail = event => {
    setEmail(event.target.value);
  }
  const setingPassword = event => {
    setPassword(event.target.value);
  }

  const sendPost = () => {
    if(!emailUser | !passwordUser) {
      return setError(<h1>Please, fill in all fields</h1>);
    }
    setPost(true);
}

  useEffect(() => {
    if(postLogin) {
      setPost(false);
      const sendingLogin = async () => {
        try {
          let user = emailUser;
          const post = await axios.post(`http://localhost:3000/user/${user}`, {
            user: {
              email: emailUser,
              password: passwordUser
            }
          })
          setCookies('user', post.data, { path: '/' });
          window.location = "/";
        } catch (error) {
          setError(<h1>{error.response.data.error}</h1>)
        }
      }
      sendingLogin()
    }
  })

  return (
    <section className="content-father">
      <div className='App-header'>
        <h1> Login User </h1>
      </div>
      <form className="getDataMovie">
        <input type="email" onChange={setingEmail} placeholder="Email" value={emailUser} required></input><br></br>
        <input placeholder="Password" onChange={setingPassword} value={passwordUser} required></input><br></br>
        <button type="button" className='ButtonStyle' onClick={sendPost}>Submit</button>
        <button type="button" className='ButtonStyle'><a href="/">Return</a></button>
      </form>
      {errorMsn}
    </section>
  )
}