import './UserNumbers.css'
import React, { useState } from 'react';


function UserNumbers({followers, following}){

    const [followerCount, setFollowers] = useState(followers)

    const [followingCount, setFollowing] = useState(following)

    function incrementFollowers(){
        setFollowers(followers + 1)
    }

    function incrementFollowing(){
        setFollowing(following+1)
    }




    return(

        <div className='User-Card'>
            <div className='Followers-Container'>
                <h4>{followerCount}</h4>
                <h4>Followers</h4>
            </div>

            <div className='Button-Container'>
            <button onClick={incrementFollowers} type="button" className='Edit-Button'>Edit</button>
            </div>

            <div className='Following-Container'>
                <h4>{followingCount}</h4>
                <h4>Following</h4>
            </div>
        </div>


    );
}

export default UserNumbers