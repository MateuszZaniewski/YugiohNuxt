import { collection, getFirestore, query, where } from "firebase/firestore";


export default defineEventHandler(async (event) => {
    try {
        const db = getFirestore()
        const colRef = collection(db, 'cards')
        const q = query(colRef)
        return {
            data : q
        }
    }
    catch (err) {
        console.log(err)
    }
})