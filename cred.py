import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('./model-calling-239818-f2f7f1c21162.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


# write operation 
row = {
    u'first': u'Ada',
    u'last': u'Lovelace',
    u'born': 1815
}
db.collection(u'sensors').add(row)
  