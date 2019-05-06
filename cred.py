import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
firebase_admin.initialize_app(None, {
    'apiKey': "AIzaSyARtKwQPQ6h1ZqwOtjb2T6Mfp8CLX8yBb4",
    'authDomain': "snt-hackathon.firebaseapp.com",
    'databaseURL': "https://snt-hackathon.firebaseio.com",
    'projectId': "snt-hackathon",
    'storageBucket': "snt-hackathon.appspot.com",
    'messagingSenderId': "574673774825",
    'appId': "1:574673774825:web:d9aec68343b5932d"
})
db = firestore.client()



# write operation 
row = {
    u'first': u'Ada',
    u'last': u'Lovelace',
    u'born': 1815
}
db.collection(u'sensors').add(row)
  