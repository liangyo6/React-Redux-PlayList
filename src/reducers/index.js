import playlistReducer from './playlist';
import favorateReducer from './favorate';
import listenedReducer from './listened';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    playlist: playlistReducer,
    favorate:favorateReducer,
    listened:listenedReducer
});

export default allReducers;