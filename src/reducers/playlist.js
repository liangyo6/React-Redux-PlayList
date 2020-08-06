const playlistReducer = (state=[],action)=>{
    switch (action.type){
        case 'pinit':
            return action.payload;
            
        default:
            return state;
    }



};

export default playlistReducer;