const axios = require('axios').default;

//Giphy API GET request with axios to find best gif matching inputted string
const getGif = async (category) => {

  const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
    params: {
        api_key: process.env.GIPHY_API_KEY,
        q: category,
        limit: 1,
        lang: 'en'
        }
    });

  const gifUrl = response.data.data[0].images.original.url;

  return(gifUrl)
}

module.exports = { getGif }