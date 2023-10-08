import axios from "axios";


export default defineEventHandler(async (event) => {
    try {
        const response = await axios.get(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php`
          );
        console.log(response.data)
        const cards = response.data
        return { cards }
    }
    catch (err) {
        console.log(err)
    }
})