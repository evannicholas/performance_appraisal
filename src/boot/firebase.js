import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export default async ({ store }) => {

    var firebaseConfig = {
        apiKey: "AIzaSyDD_Dl0zB4bcZMqGjBYQFO8LnM9ofSk7Q4",
        authDomain: "performance-appraisal-90864.firebaseapp.com",
        projectId: "performance-appraisal-90864",
        storageBucket: "performance-appraisal-90864.appspot.com",
        messagingSenderId: "211212214948",
        appId: "1:211212214948:web:9f2fdccf7d48cd50db7c31"
    };

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            // console.log(user.displayName);
            store.commit("main/setCurrentUser", {
                email: user.email,
                name: user.displayName,
            });
        } else {
            store.commit("main/setCurrentUser", null);
        }
    });
}
