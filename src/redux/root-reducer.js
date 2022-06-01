import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from '../redux/user/userSlice';
import postsReducer from '../redux/post/postSlice';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'posts']
};

const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer
});

export default persistReducer(persistConfig, rootReducer);