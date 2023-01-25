import Post from "../../components/post";
import NavBar from '../../components/NavBar/NavBar';
// import { Posts } from "../../components/dummyData";
import './index.css'


export default function CurrentStation() {
  return (
    <> 
      <div className="homeContainer">
      {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>

       <div className="Radio">
        <NavBar />
     </div>  
    </>
  );
}
