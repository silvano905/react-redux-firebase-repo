import React from 'react';
import { Link } from 'react-router-dom';
import Moment from "react-moment";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {db, deleteImage} from '../../config-firebase/firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'

const Item = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(45deg, #f8f9fa 30%, #e9ecef 90%)',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginTop: 8
}));

function Post({message, url, id, userProfileImage, user, date, currentUser}) {
    let t
    let f
    if(date!==null){
        t = new Timestamp(date.seconds, date.nanoseconds)
        f = t.toDate()
    }

    const deleteComment = (e) => {
        e.preventDefault()
        const docRef = doc(db, 'posts', id)
        deleteDoc(docRef)
            .then()

        //if the post has an image delete it from firebase storage
        if(url){
            //we are importing the function from config-firebase folder
            deleteImage(url).then()
        }

    }

    return (
        <Link to={'/posts/'+ id} style={{textDecoration: 'none', color: 'inherit'}}>
            <Item>
                <div style={{display: "flex"}}>
                    <Avatar src={userProfileImage} sx={{ width: 24, height: 24 }} style={{marginTop: 12, marginLeft: 10}}/>
                    <p style={{marginLeft: 5}}>{user}</p>
                </div>

                <p>{message}</p>
                {date!==null&&<p><Moment fromNow>{f}</Moment></p>}
                {/*<img src={url} alt="image" style={{height: 100}}/>*/}

                {currentUser&&currentUser.displayName===user&&
                    <IconButton aria-label="delete comment" component="span">
                        <DeleteIcon onClick={deleteComment}/>
                    </IconButton>
                }
            </Item>
        </Link>
    );
}

export default Post;