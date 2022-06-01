import React, { useState } from "react";
import './SelectFile.css'
import { imageUploadPost, db } from '../../config-firebase/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function PostForm({user}) {
    const [formData, setFormData] = useState({
        message: '',
        image: null
    });

    const setImage = (e) => {
        e.preventDefault()
        setFormData({...formData, image: e.target.files[0]})
    }

    const {message, image} = formData

    const postArticle = (e) => {
        e.preventDefault()

        let p = collection(db, 'posts')
        if(image){
            imageUploadPost(image).then((imageUrl) =>{
                addDoc(p,{
                    user: user?user.displayName:'anonymous',
                    userProfilePic: user?user.photoURL:'',
                    message: message,
                    image: imageUrl,
                    timestamp: serverTimestamp()
                }).then()
                setFormData({...formData, message: '', image: null})
            }).catch(err=>{
                console.log(err.message)
            })
        }else {
            addDoc(p,{
                user: user?user.displayName:'anonymous',
                userProfilePic: user?user.photoURL:'',
                message: message,
                image: null,
                timestamp: serverTimestamp()
            }).then()
            setFormData({...formData, message: '', image: null})
        }
    }

    return (
        <form onSubmit={postArticle} style={{marginTop: 10}}>
            <div>
                <FormControl fullWidth>
                    <TextField
                        label="Message"
                        name='message'
                        multiline
                        rows={2}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        fullWidth
                    />
                </FormControl>
            </div>


            <div style={{textAlign: "center"}}>
                <FormControl style={{margin: 5}}>
                    <div className="file-input">
                        <input onChange={setImage} type="file" id="file" className="file"/>
                        <label htmlFor="file" style={{textAlign: "center"}}>
                            Select profile image (optional)
                            {image&&<p className="file-name">{image.name}</p>}
                        </label>
                    </div>
                </FormControl>
            </div>

            <div style={{textAlign: "center", marginTop: 20}}>
                <Button size='small' type='submit' variant="contained" color="primary">
                    Send
                </Button>
            </div>

        </form>
    );
}

export default PostForm;