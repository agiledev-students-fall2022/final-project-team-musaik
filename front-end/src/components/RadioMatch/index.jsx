import './index.css'
import { Link } from "react-router-dom"; 

   

function RadioMatch({img1, img2}){

    return(
        <div className='Match'>
            <h2>Radio Match</h2>
            <div className='Match-Card'>
                <div className='user'>
                    <img className='image' src={img1} alt='user' />
                </div>
                <div className = 'match'>
                   <Link to="/radio-bubbles" className="btn">
                    <img className='image' src={img2} alt='match'/>
                   </Link>
                   
                </div>
            </div>
        </div>
    )
}

export default RadioMatch