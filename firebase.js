// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Toast from "react-native-toast-message";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw9ePm6V0xK7_TeAM4NW7m6OzTeW1YPSg",
  authDomain: "party-finder-3e8d2.firebaseapp.com",
  projectId: "party-finder-3e8d2",
  storageBucket: "party-finder-3e8d2.appspot.com",
  messagingSenderId: "3812287322",
  appId: "1:3812287322:web:f7c930f002662d06810963",
  measurementId: "G-7BGQ6XMHPY",
};

// Initialize Firebase
app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const reauthenticate = (currentPassword) => {
  var user = firebase.auth().currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  return user.reauthenticateWithCredential(cred);
};

const changePassword = (currentPassword, newPassword) => {
  reauthenticate(currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser;
      user
        .updatePassword(newPassword)
        .then(() => {
          Toast.show({
            type: "success",
            position: "top",
            text1: "Adatok frissültek",
            text2: "Sikeresen megváltoztattad a jelszavad!",
            visibilityTime: 3500,
            autoHide: true,
          });
          console.log("password updated");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeEmail = (currentPassword, newEmail) => {
  reauthenticate(currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser;
      user
        .updateEmail(newEmail)
        .then(() => {
          Toast.show({
            type: "success",
            position: "top",
            text1: "Adatok frissültek",
            text2: "Sikeresen megváltoztattad az e-mail címed!",
            visibilityTime: 3500,
            autoHide: true,
          });
          console.log("email updated");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeName = (currentPassword, newName) => {
  reauthenticate(currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser;
      user
        .updateProfile({ displayName: newName })
        .then(() => {
          Toast.show({
            type: "success",
            position: "top",
            text1: "Adatok frissültek",
            text2: "Sikeresen megváltoztattad a neved!",
            visibilityTime: 3500,
            autoHide: true,
          });
          console.log("name updated");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export { auth, firestore, changePassword, changeEmail, changeName };
