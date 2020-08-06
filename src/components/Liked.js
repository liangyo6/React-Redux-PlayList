import React ,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {padd,ladd,fadd} from '../actions';
import axios from "axios";
// import store from '../store';
import './Liked.css';
import { Icon } from 'semantic-ui-react';

export default function Liked() {

    const dispatch = useDispatch();
    //const [playlist,setLike] = useState([]); 
    


    useEffect(() => {
        async function fetchData() {
          
          const res = await axios.get(`http://localhost:3001/playlist`);
        //store.dispatch(fadd(res.data));
          dispatch(fadd(res.data));
          //setLike(store.getState());
          
        }
        fetchData();
      }, [dispatch]);
      


    const playlist = useSelector(state=>state.playlist);
    const handleClickListened = (id) =>{

        let newList = playlist.map((item)=>{
        
          if(item.id===id){
            const updatedItem = {
              ...item,
              listened:!item.listened,
            };
            axios.put('http://localhost:3001/playlist/'+id, updatedItem);
            return updatedItem;
          }
          return item;
        });
    
        
        
        dispatch(padd(newList));
        dispatch(ladd(newList));
        dispatch(fadd(newList));
       
      }

    const playlistnew = useSelector(state=>state.playlist);
    const handleClickLiked = (id)=>{
        let newList = playlistnew.map((item)=>{
        
          if(item.id===id){
            const updatedItem = {
              ...item,
              favourite:!item.favourite,
            };
            axios.put('http://localhost:3001/playlist/'+id, updatedItem);
            return updatedItem;
          }
          return item;
        });
    
        
        
        dispatch(padd(newList));
        dispatch(ladd(newList));
        dispatch(fadd(newList));
      }

    
    const liked = useSelector(state=>state.favorate);
    
    return (
        
        <div>
          <h1>Favourite</h1>
          {liked.map((p)=>
              <div key={p.id} className="likedlist">
                <div className="detail">
                  <p>{p.artist}</p>
                  <p>{p.track}</p>
                </div>
                <div className="btns">
                  {/* {p.listened?  <button className="listenedbtn" onClick={()=>handleClickListened(p.id)}>Listened</button> : 
                  <button className="normalbtn" onClick={()=>handleClickListened(p.id)}>Listened</button>} */}

                    {p.listened?  <Icon name="music" color='green' onClick={()=>handleClickListened(p.id)} /> : 
                    <Icon name="music" color='grey' onClick={()=>handleClickListened(p.id)} />}

                  
                  {/* {p.favourite?  <button className="likedbtn" onClick={()=>handleClickLiked(p.id)}>Liked</button> : 
                  <button className="normalbtn" onClick={()=>handleClickLiked(p.id)}>Liked</button>} */}
                  {p.favourite?  <Icon name="heart" color='red' onClick={()=>handleClickLiked(p.id)} /> : 
                  <Icon name="heart outline" inverted color='grey' onClick={()=>handleClickLiked(p.id)} />}

                </div>
              </div>

          )}

        </div>
    )
}
