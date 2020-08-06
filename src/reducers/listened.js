const listenedReducer = (state=[],action)=>{
    switch (action.type){
        case 'ladd':
            
            const listenedlist = action.payload.filter(playlist=>playlist.listened===true);
           
            return listenedlist;

        default:
            return state;
    }



};

export default listenedReducer;