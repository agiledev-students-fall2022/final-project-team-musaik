import './index.css'
import mainlogo from '../../img/logo.png'
import spotify from '../../img/spotify-icon.png'

function Login() {
  const SpotifyLogin = () => {
    window.open('/auth', '_self');
  }

  return (
    <div className="Login">
      <img className="musaik-logo" src={mainlogo} alt="Musaik Logo"/>
      <div className='login-spotify' onClick={SpotifyLogin}>
        <img src={spotify} alt="Spotify Icon"/>
        <p>Continue with Spotify</p>
      </div>
    </div>
  );
}

export default Login;