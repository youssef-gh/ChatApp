import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp(  {
    apiKey: "AIzaSyCRr7wELf8pr3_eT9928wCc0k4zA0qjkgc",
    authDomain: "unitchat-8786f.firebaseapp.com",
    projectId: "unitchat-8786f",
    storageBucket: "unitchat-8786f.appspot.com",
    messagingSenderId: "398882327807",
    appId: "1:398882327807:web:aeb5352e764335b2f8d0ca"
  }).auth();