import './BigBubbles.css'

function BigBubbles({img1, img2}){
    return(
        <div className='Top-Row'>
            <img src={img1} alt='top Img'  className='Bubbles' />
            <img src={img2} alt='top Img' className='Bubbles'/>

        </div>
    )
}

export default BigBubbles