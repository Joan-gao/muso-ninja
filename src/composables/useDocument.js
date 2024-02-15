import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { collection, doc, deleteDoc as firestoredeleteDoc, updateDoc as firestoreupdateDoc} from 'firebase/firestore'

const useDocument = (collectionName, id) => {
    const error = ref(null)
    const isPending = ref(false)

    const collectionRef = collection(projectFirestore, collectionName)
    let documentRef = doc(collectionRef, id)

    const deleteDoc = async () => {
        error.value = null
        isPending.value = true
        try {
            const res = await firestoredeleteDoc(documentRef)
            isPending.value = false
            return res
        } catch (err){
            console.log(err.message)
            error.value = 'could not delete the document'
            isPending.value = false
        }
    }

    const updateDoc = async (updates) => {
        error.value = null
        isPending.value = true
        try {
            const res = await firestoreupdateDoc(documentRef, updates)
            isPending.value = false
            return res
        } catch (err){
            console.log(err.message)
            error.value = 'could not update the document'
            isPending.value = false
        }
    }

    return { error, deleteDoc, isPending, updateDoc }

}

export default useDocument
