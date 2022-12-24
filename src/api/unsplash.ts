
const UNSPLASH_API_URL = 'https://api.unsplash.com';
const UNSPLASH_ACCESS_KEY = '3MbvBQ3q70-kt6ECQPMWI5FOYwWF4VG_NlST8pwujRg';

export const getImages = () => {
  return fetch(`${UNSPLASH_API_URL}/photos/random?orientation=landscape&order_by=popular`, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
    }
  })
    .then((response) => response.json())
    .then((data) => {
      // data contains the random photo's metadata and URLs
      console.log(data);

      // You can use the URLs to display the photo in your app
      return data.urls.full; // Full-size image URL

    })
}