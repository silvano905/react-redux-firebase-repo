import React, {useState, useEffect} from 'react';
import PostForm from "../components/posts/PostForm";
import Post from "../components/posts/Post";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../redux/user/userSlice";
import {getPosts, selectPosts} from "../redux/post/postSlice";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../config-firebase/firebase";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: 15,
    color: theme.palette.text.secondary,
    marginBottom: 15,
    background: '#fdfffc',
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
}));

function Home(props) {
    const currentUser = useSelector(selectUser)
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false);
    const posts = useSelector(selectPosts)

    useEffect(()=>{
        // if(!posts){
        let p = collection(db, 'posts')
        let order = query(p, orderBy('timestamp', 'desc'))
        onSnapshot(order, (snapshot) => {
            // setPosts(
            //     snapshot.docs.map(doc => ({
            //         data: doc.data(), id: doc.id
            //     }))
            // )
            dispatch(
                getPosts(
                    snapshot.docs.map(doc => ({
                        data: doc.data(), id: doc.id
                    }))
                )
            )
        })
        // }
    }, [])


    return (
        <Grid container direction="row" justifyContent="space-evenly" alignItems="center">

            <Grid item xs={11} sm={11} lg={7}>
                <Item>
                    <PostForm user={currentUser}/>
                </Item>
            </Grid>

            <Grid item xs={11} sm={11} lg={7}>
                {posts.length>0&&posts.map(({id, data: {message, image, userProfilePic, user, timestamp}})=>(
                    <Post
                        key={id}
                        message={message}
                        url={image}
                        id={id}
                        userProfileImage={userProfilePic}
                        user={user}
                        currentUser={currentUser}
                        date={timestamp}
                    />
                ))}
            </Grid>

        </Grid>
    );
}

export default Home;