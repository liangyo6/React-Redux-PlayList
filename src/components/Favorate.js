import React, {Component} from 'react';
import axios from "axios";
import './Favorate.css';
import store from '../store';
import {padd,ladd,fadd} from '../actions';
import { Icon } from 'semantic-ui-react';

class Favorate extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState());
     
    })
  }

  componentDidMount() {
    
    axios.get(`http://localhost:3001/playlist`)
    .then(res => {
      store.dispatch(fadd(res.data));
      
      //this.setState(store.getState());

    })
  }

  handleClickListened(id){

    let newList = this.state.playlist.map((item)=>{
    
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

    //this.setState({listened:newList});
    
    store.dispatch(padd(newList));
    store.dispatch(ladd(newList));
    store.dispatch(fadd(newList));
   
  }

  handleClickLiked(id){
    let newList = this.state.playlist.map((item)=>{
    
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

    //this.setState({playlist:newList});
    
    store.dispatch(padd(newList));
    store.dispatch(ladd(newList));
    store.dispatch(fadd(newList));
  }


  render() {
    const {favorate} = this.state;
   

    return (
        <div>
          <h1>Favourite</h1>
          {favorate.map((p)=>
              <div key={p.id} className="likedlist">
                <div className="detail">
                  <p>{p.artist}</p>
                  <p>{p.track}</p>
                </div>
                <div className="btns">
                  {/* {p.listened?  <button className="listenedbtn" onClick={()=>this.handleClickListened(p.id)}>Listened</button> : 
                  <button className="normalbtn" onClick={()=>this.handleClickListened(p.id)}>Listened</button>} */}
                   {p.listened?  <Icon name="music" color='green' onClick={()=>this.handleClickListened(p.id)} /> : 
                    <Icon name="music" color='grey' onClick={()=>this.handleClickListened(p.id)} />}
                  
                  {/* {p.favourite?  <button className="likedbtn" onClick={()=>this.handleClickLiked(p.id)}>Liked</button> : 
                  <button className="normalbtn" onClick={()=>this.handleClickLiked(p.id)}>Liked</button>} */}
                  {p.favourite?  <Icon name="heart" color='red' onClick={()=>this.handleClickLiked(p.id)} /> : 
                  <Icon name="heart outline" inverted color='grey' onClick={()=>this.handleClickLiked(p.id)} />}

                 
                </div>
              </div>

          )}

        </div>
      )
    }
}

export default Favorate;
