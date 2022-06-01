import React from 'react';
import { useParams } from 'react-router-dom';
import {getPost, selectPost} from "../../redux/post/postSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import { onSnapshot, doc } from 'firebase/firestore'
import {db} from '../../config-firebase/firebase'
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(45deg, #f8f9fa 30%, #e9ecef 90%)',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginTop: 8
}));

function PostDetail() {
    const params = useParams();
    const dispatch = useDispatch()

    //getting post from firebase
    const post = useSelector(selectPost)

    useEffect(()=>{
        let obj = doc(db, 'posts', params.postId)
        const unsubDoc = onSnapshot(obj, (doc) => {
            dispatch(getPost(doc.data()))
        })

    }, [params.postId])

    if(post){
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={11} sm={11} lg={7}>
                    <Item>
                        <h1>Product Detail</h1>
                        <p>{post.message}</p>
                        {post.image&&<img src={post.image} alt="post image" style={{height: 100}}/>}

                    </Item>
                </Grid>
            </Grid>
        );
    }else {
        return (
            <p>loading....</p>
        )
    }
}

export default PostDetail;