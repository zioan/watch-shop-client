import { useContext, useState } from 'react';
import ImageContext from '../../context/ImageContext';

function NewImage({ setImageNameHandler }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const { uploadImage, createImageInDB } = useContext(ImageContext);

  const saveFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    createImageInDB(fileName);
    uploadImage(formData);
    if (setImageNameHandler) {
      setImageNameHandler(fileName);
    }
  };
  return (
    <>
      <label htmlFor='image' className='block mt-2'>
        Upload new image
      </label>
      <input type='file' onChange={saveFile} className='my-2' />
      <button className='btn' onClick={uploadFile}>
        Upload
      </button>
    </>
  );
}

export default NewImage;
