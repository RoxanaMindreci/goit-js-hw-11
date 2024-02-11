import { btnLoadMore, form } from './index.js';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42305187-02a2e72a7a4174c10933080a2';

// *Service request  -------------------------------------------------
async function servicePixabay(page = 1) {
  const inputValue = form.elements.searchQuery.value.trim();
  axios.defaults.params = {
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  };
  if (inputValue === '') {
    return;
  }
  const { data } = await axios.get(BASE_URL);
  if (data.totalHits === 0) {
    return;
  }
  if (data.hits.length < data.total) {
    btnLoadMore.classList.replace('load-more-hidden', 'load-more');
  }

  return data;
}
export { servicePixabay };