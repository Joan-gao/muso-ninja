import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { collection, addDoc as firestoreAddDoc } from 'firebase/firestore'

const useCollection = (collectionName) => {
    const error = ref(null)
    const isPending = ref(false)

    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true

        try {
            const collRef = collection(projectFirestore, collectionName)
            const res = await firestoreAddDoc(collRef, doc)
            isPending.value = false
            return res
        } catch (err){
            console.log(err.message)
            error.value = 'could not send the message'
            isPending.value = false
        }
    }

    return { error, addDoc, isPending }

}

export default useCollection
