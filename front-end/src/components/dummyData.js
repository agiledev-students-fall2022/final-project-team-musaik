import image1 from './images/profile_pic.jpeg'
import likeImageBefore from './images/heart_before.png'
import likeImageAfter from './images/heart_after.png'
import headphonesImage from './images/headphone.png'
import image from './images/beyonce.jpeg'
import image2 from './images/lizzo.png'
import image3 from './images/joji.png'
import image4 from './images/harry.jpeg'

export const Users = [
    {
      id:1,
      profilePicture: image1,
      username: "Homer Simpson",
    },
    // {
    //   id:2,
    //   profilePicture: image1,
    //   username: "Janell Shrum",
    // },
  ];

    export const songs = [
    {
      title: "CUFF IT",
      artist: "Beyonce",
      img_src: image,
      src: ""
    },
    {
      title: "About Damn Time",
      artist: "Lizzo",
      img_src:image2,
      src: ""
    },
    {
      title: "Glimpse of Us",
      artist: "Joji",
      img_src: image3,
      src: ""
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
      img_src: image4,
      src: ""
    }
  ];
  
  export const Posts = [
    {
      id: 1,
      desc: "Obsessed with these songs lately!",
      date: "5 mins ago",
      userId: 1,
      like: 32,
      like_img_before: likeImageBefore,
      like_img_after: likeImageAfter,
      h_img: headphonesImage,
      comment: 23,
    },
    // {
    //   id: 2,
    //   desc: "Hey everyone",
    //   photo: "assets/post/2.jpeg",
    //   date: "15 mins ago",
    //   userId: 2,
    //   like_img_before: likeImageBefore,
    //   like_img_after: likeImageAfter,
    //   like: 154,
    //   comment: 899,
    // }

  ];