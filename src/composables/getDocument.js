import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { collection, onSnapshot, doc } from 'firebase/firestore'

const getDocument = (collectionName, id) => {
    const document = ref(null)
    const error = ref(null)

    const collectionRef = collection(projectFirestore, collectionName)
    let documentRef = doc(collectionRef, id)
    
    const unsub = onSnapshot(documentRef, (doc) => {
        if(doc.data()) {
            document.value = {...doc.data(), id: doc.id}
            error.value = null
        }else{
            error.value = 'that document does not exist'
        }
    }, (err) => {
        console.log(err.message)
        error.value = 'could not fetch the document'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    })

    return { document, error }
}

export default getDocument
