import axios from 'axios';
import { token } from './token';

const baseUrl = 'http://localhost:4000/api/books'

const getUserBooks = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const getUserBook = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const create = async (newBook) => {
  const response = await axios.post(baseUrl, newBook, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const update = async (updatedBook) => {
  const response = await axios.put(
    `${baseUrl}/${updatedBook.id}`, 
    updatedBook,
    { 
      new: true, 
      headers: {
        Authorization: `Bearer ${token}`
      }
    }, 
  );
  return response.data;
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export default { getUserBooks, getUserBook, create, update, remove };