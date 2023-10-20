import axios from "axios";
import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";


export default defineEventHandler(async (event) => {
    try {
        const favouritesCollectionRef = collection($db, 'favourites');
        const q = query(favouritesCollectionRef, where(username, '==', favCard));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            // No matching documents found, add the data
            await addDoc(favouritesCollectionRef, {
              [username]: favCard
            });
            console.log('Data added to favourites collection.');
          } else {
            // Matching document found, delete it
            const docToDelete = querySnapshot.docs[0];
            await deleteDoc(docToDelete.ref);
            console.log('Data removed from favourites collection.');
          }
    }
    catch (err) {
        console.log(err)
    }
})