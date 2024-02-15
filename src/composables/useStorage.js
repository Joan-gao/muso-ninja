import { projectStorage } from "@/firebase/config"
import getUser from "./getUser"
import { ref as vueRef } from 'vue'
import { ref as firebaseRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

const { user } = getUser()

const useStorage = () => {
    const error = vueRef(null)
    const url = vueRef(null)
    const filePath = vueRef(null)

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = firebaseRef(projectStorage, filePath.value)

        try {
            const res = await uploadBytesResumable(storageRef, file)
            console.log('Upload Response:', res)
            url.value = await getDownloadURL(storageRef)
        } catch(err) {
            console.log(err.message)
            error.value = err
        }
    }

    const deleteImage = async (path) => {
        const storageRef = firebaseRef(projectStorage, path)

        try {
           await deleteObject(storageRef)
        } catch(err) {
            console.log(err.message)
            error.value = err.message
        }

    }

    return {url, filePath, error, uploadImage, deleteImage}
}

export default useStorage