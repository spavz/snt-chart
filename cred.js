var firebase = require('firebase');
var db = firebase.initializeApp({
    apiKey: "AIzaSyARtKwQPQ6h1ZqwOtjb2T6Mfp8CLX8yBb4",
    authDomain: "snt-hackathon.firebaseapp.com",
    databaseURL: "https://snt-hackathon.firebaseio.com",
    projectId: "snt-hackathon",
    storageBucket: "snt-hackathon.appspot.com",
    messagingSenderId: "574673774825",
    appId: "1:574673774825:web:d9aec68343b5932d"
})
    .firestore().collection('sensors')


db.add(
    {
        name: 'Tokyo',
        country: 'Japan'
    }
)