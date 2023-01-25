import './UserNumbers.css'
import React, { useState } from 'react';


function UserNumbers({followers, following}){

    return(


        <div className='User-Card'>
            <div className='Followers-Container'>
                <h4>{followers}</h4>
                <h4>Followers</h4>
            </div>

            <div className='Button-Container'>
            <button  type="button" className='Edit-Button'>Edit</button>
            </div>

            <div className='Following-Container'>
                <h4>{following}</h4>
                <h4>Following</h4>
            </div>
        </div>


    );
}

export default UserNumbers