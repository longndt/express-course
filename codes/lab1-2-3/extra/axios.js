const axios = require('axios');

const fetchAPI = async (endpoint) => {
   try {
      const response = await axios.get(endpoint);
      if (response.data) {
         return response.data;
      } else {
         throw new Error('Unexpected response structure from API.');
      }
   } catch (error) {
      console.error('Error while fetching data:', error);
   }
}

router.get('/provinces', async (req, res) => {
   try {
      const provincesEndpoint = 'https://vn-public-apis.fpo.vn/provinces/getAll';
      const provinces = await fetchAPI(provincesEndpoint);

      res.render('demo', { provinces });
   } catch (error) {
      res.status(500).send(error.message);
   }
});