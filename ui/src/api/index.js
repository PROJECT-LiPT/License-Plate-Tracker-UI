import axios from 'axios';
//url depends on python flask app host server.
const url = 'http://127.0.0.1:5000/prediction/';

//api for fetching asynch prediction endpoints from backend
// export const fetchLp = () => axios.post(url);

//api for uploading images to server
export const uploadLp = (newLp) => axios.post(url, newLp, {
    //for caching images
    headers: {
        'Content-Transfer-Encoding':'base64',
        'Content-Type':'image/jpeg',
        'Cache-Control': 'public, max-age=604800'
    }
});
