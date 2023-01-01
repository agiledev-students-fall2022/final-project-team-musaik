import './NavBar.css';
import { Link } from 'react-router-dom'
import home from '../../img/home.svg'
import radio from '../../img/radio.svg'
import user from '../../img/user.svg'

function NavBar() {

	
    return (
			<nav className="NavBar">
				<ul className="nav-links">
					<li className="nav-item">
						<Link to="/home" className="home-icon"> {/* this is the same router route indicated in App.js */}
							<img src={home} alt="Home Icon"/>
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/radio-bubbles" className="radio-icon">
							<img src={radio} alt="Radio Icon"/>
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/profile" className="user-icon">
							<img src={user} alt="User Icon"/>
						</Link>
					</li>
				</ul>
			</nav>
    );
  }
  
  export default NavBar;