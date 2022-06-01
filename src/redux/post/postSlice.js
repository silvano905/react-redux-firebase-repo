import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        post: null
    },
    reducers: {
        getPosts: (state, action) => {
            state.posts = action.payload
        },

        //get post from the state by comparing the id from the action
        // getPost: (state, action) => {
        //     state.post = state.posts.find(item => item.id === action.payload);
        // },

        //getting post from firebase instead from the state
        getPost: (state, action) => {
            state.post = action.payload;
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((item) => item.id !== action.payload)
        }
    },
});

export const { getPosts, deletePost, getPost} = postsSlice.actions;
export const selectPosts = (state) => state.posts.posts;
export const selectPost = (state) => state.posts.post;
export default postsSlice.reducer;