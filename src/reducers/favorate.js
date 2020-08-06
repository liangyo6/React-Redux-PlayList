const favorateReducer = (state=[],action)=>{
    switch (action.type){
        case 'fadd':
            const likedlist = action.payload.filter(playlist=>playlist.favourite===true);
           
            return likedlist;
            
        default:
            return state;
    }



};

export default favorateReducer;