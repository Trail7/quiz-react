import axios from "axios";

export default axios.create({
    baseURL: 'https://my-quizdets-default-rtdb.europe-west1.firebasedatabase.app'
})