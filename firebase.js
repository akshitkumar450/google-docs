import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCB6PwbohhxfS91MtXkiWeSohFp7NLwCzk",
    authDomain: "docs-clone-efeaa.firebaseapp.com",
    projectId: "docs-clone-efeaa",
    storageBucket: "docs-clone-efeaa.appspot.com",
    // databaseURL: "https://docs-clone-efeaa.firebaseio.com",
    messagingSenderId: "713674158809",
    appId: "1:713674158809:web:665b0417c11388cb8004c8",
    measurementId: "G-2LS4N67QQY"
};

// nextjs thing
// because nextjs using SSR our app might be already initailized and bcz of that we dont want to initialize the app again so check before doing it
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const db = app.firestore();

export { db };