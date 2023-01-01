import { Users } from "./dummyData";
import React from "react";
import { useState, useEffect } from "react";
import Player from './Player';
import { songs } from "./dummyData";

export default function Post({ post }) {

      const [currentSongIndex, setCurrentSongIndex]= useState(0);
      const [nextSongIndex, setNextSongIndex]= useState(currentSongIndex+1);
    
      const [like,setLike] = useState(post.like)
      const [isLiked,setIsLiked] = useState(false)

     useEffect(() => {
        setNextSongIndex(() => {
           if (currentSongIndex + 1 > songs.length - 1) {
            return 0;
           } else {
             return currentSongIndex + 1;
           }
        });
      }, [currentSongIndex]);


      const LikeHandler =()=>{
      setLike(isLiked ? like-1 : like+1)
      setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              // src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">    
            <img className="headphonesIcon" src={post.h_img} onClick={LikeHandler} alt="" />
            <span className="postCommentText"> {post.comment}  </span>

            <img className="likeIcon" id="likeIcon" onClick={LikeHandler} src={!isLiked ? post.like_img_before : post.like_img_after} alt="" />
            <span className="postLikeCounter"> {like}</span>
          </div>
        </div>
        
        <div className="postCenter">
        <span className="postText">{post?.desc}</span>
            <Player 
               currentSongIndex={currentSongIndex} 
               setCurrentSongIndex={setCurrentSongIndex} 
               nextSongIndex={nextSongIndex} 
               songs={songs}
             />
        </div>
        <div className="postBottom">
        </div>
      </div>
    </div>
  );
}