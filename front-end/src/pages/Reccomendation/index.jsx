import Albums from '../../stationAlbums';
import NavBar from '../../NavBar';

function Reccomendation() {
  return (
    <div className='Album-Card'>
        <Albums text={"Reccomended for you"}/>
        <Albums text={"Recently played by friends"}/>
        <Albums text={"Station Reccomendation"}/>


        <div className="Player-Container">
            <SpotPlayer accessToken={accessToken} trackUri={trackUri} />
        </div>
    
    <NavBar />
    </div>
  );
}

export default Reccomendation;