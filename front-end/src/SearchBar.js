import "./SearchBar.css"
import back from "./img/arrow_back.png"

import {BrowserRouter as Router, Link} from 'react-router-dom';


function SearchBar(){
    return(

        <div className="Search-Burger">
            <Link to="/">
                <img src={back} alt="back Icon"/>
            </Link>

            <form action="/" method="get">
            <input type="text" id="home-search" placeholder="Search" name="search"  />
            </form>
        </div>
    )

}

export default SearchBar