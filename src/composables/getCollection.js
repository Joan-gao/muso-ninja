import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'

const getCollection = (collectionName, q) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = collection(projectFirestore, collectionName)

    if (q) {
        collectionRef = query(collectionRef, where(...q), orderBy('createdAt'))
    } else {
        collectionRef = query(collectionRef, orderBy('createdAt'))
    }
    
    const unsub = onSnapshot(collectionRef, (snap) => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    })

    return { documents, error }
}

export default getCollection
