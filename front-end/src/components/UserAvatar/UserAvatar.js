import './UserAvatar.css';


function UserAvatar({text,image}){
    return(

        <div className='Avatar'>
            <img src={image} alt="Avatar PlaceHolder" className='Avatar-Picture' />
            <h4>@{text}</h4>
        </div>



    )
}

export default UserAvatar