import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import server from '../util/server';

// This context is responsible for storing and deleting images
// Physical image fetching is handled in components based on image name retieved form DB

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getImages();
  }, []);

  // Get images (object-names) from DB
  const getImages = async () => {
    try {
      const imageRes = await axios.get(`${server}/images/all`);

      // Return image names from db
      setImages(imageRes.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  // create image (name) in DB
  const createImageInDB = async (fileName) => {
    const imageData = {
      name: fileName,
    };

    try {
      const imageRes = await axios.post(`${server}/images/add`, imageData);
      getImages();
      setError('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  // upload image in static folder
  const uploadImage = async (formData) => {
    try {
      const res = await axios.post(`${server}/images/upload`, formData);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // delete image (name) from DB
  const deleteImageFromDB = async (id) => {
    try {
      await axios.delete(`${server}/images/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // delete physical image from static folder
  const deleteImageFile = async (imageName) => {
    try {
      await axios.delete(`${server}/images/remove/${imageName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        getImages,
        createImageInDB,
        deleteImageFromDB,
        deleteImageFile,
        uploadImage,
        error,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;
