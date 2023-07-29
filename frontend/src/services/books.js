import axios from 'axios';

const baseUrl = 'http://localhost:3001/books'

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBook) => {
  const response = await axios.post(baseUrl, newBook);
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, create, remove };