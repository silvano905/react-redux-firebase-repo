import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth'

import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";


//TODO
//enter your firebase config
const firebaseConfig = {
    apiKey: "AIzaSyACjbbhj1GRh_qV-FQ_vMEpUWoLiknyZPY",
    authDomain: "example-a766d.firebaseapp.com",
    projectId: "example-a766d",
    storageBucket: "example-a766d.appspot.com",
    messagingSenderId: "32943062514",
    appId: "1:32943062514:web:9e3164a50db420cc9fbf6b"
};

initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()
const storage = getStorage();

const imageUploadPost = async (file) => {
    const fileRef = ref(storage, file.name+ '.png');

    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    return photoURL
}

const imageUploadUser = async (file, user, displayName) => {
    const fileRef = ref(storage, user.user.uid + '.png');

    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    await updateProfile(user.user, {photoURL: photoURL, displayName: displayName})
    return photoURL
}

const deleteImage = async (file) => {
    let r = ref(storage, file)
    await deleteObject(r)
}


export {db, auth, imageUploadUser, imageUploadPost, deleteImage}


