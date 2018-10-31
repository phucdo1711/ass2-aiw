import axios from 'axios';

export const  apikey = 'vOcbQD8kYomITGgMAw5iKwsjyEaxy34w';

export const reqAw = async (url, query) => {
  const BASE_URL = 'http://dataservice.accuweather.com';
  try {
    const res = await axios.get(`${BASE_URL}${url}?apikey=${apikey}${query}&language=vi`)
    if (res.data) return res.data
  } catch (error) {
    return false;
  }
  return false;
}
