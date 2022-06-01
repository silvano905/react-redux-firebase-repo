import React, {Fragment, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {auth} from '../../config-firebase/firebase'
import { updateProfile, updateEmail } from 'firebase/auth'

import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {login} from "../../redux/user/userSlice";

//end material ui

const EditForm = ({id, displayName, email, pic}) => {
    const dispatch = useDispatch()


    const [formData, setFormData] = useState({
        show: false,
        showInfo: true,
        id:'',
        displayName: null,
        email: null,
        pic: null
    });

    useEffect(() => {
        setFormData({...formData, displayName: displayName, email: email, id: id, pic: pic})

    }, []);



    const payReady = (e) => {
        e.preventDefault();
        updateEmail(auth.currentUser, formData.email).then()
        updateProfile(auth.currentUser, {
            displayName: formData.displayName
        }).then()
        dispatch(login({
            email: formData.email,
            id: auth.currentUser.uid,
            displayName: formData.displayName,
            profileUrl: formData.pic
        }))
        // dispatch(editUser(id, formData));
        // history.push('/')
    };

    return (
        <Fragment>

                <form onSubmit={payReady}>
                    <FormControl>
                        <TextField
                            name='displayName'
                            value={formData.displayName}
                            onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            fullWidth
                        />
                    </FormControl>

                    {/*    <FormControl>*/}
                    {/*        <TextField*/}
                    {/*            label="Email"*/}
                    {/*            name='email'*/}
                    {/*            value={formData.email}*/}
                    {/*            onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}*/}
                    {/*            fullWidth*/}
                    {/*        />*/}
                    {/*    </FormControl>*/}

                    <div>
                        <Button style={{margin: '20px 0 10px'}} type='submit' variant="contained" color="primary">
                            Send
                        </Button>
                    </div>
                </form>

        </Fragment>
    );

};

export default EditForm;