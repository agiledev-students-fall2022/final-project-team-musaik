//front end search bar

import "./SearchBar.css"
import back from "../../img/arrow_back.png"
import axios from 'axios';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useEffect, useState } from "react";

function SearchBar() {

    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {

        const getToken = async () => {
            const user = await axios.get('/api/getToken');
            
        };
    })

    async function getSearched(){
        console.log(searchInput + "the Search input")
    }
    
    return(

        <div className="Search-Burger">
            <Link to="/home">
                <img src={back} alt="back Icon"/>
            </Link>
            <form>
                <input type="text" id="home-search" placeholder="Search" name="search" />
                <input type="text" id="home-send" placeholder="Search" name="search" />

            </form>
            <button onClick={console.log()}>Search</button>
        </div>
    )

}

export default SearchBar