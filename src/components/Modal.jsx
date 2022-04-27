function Modal({ children, modalNumber, type }) {
  return (
    <>
      <label htmlFor={modalNumber} className='btn modal-button'>
        {type}
      </label>

      <input type='checkbox' id={modalNumber} className='modal-toggle' />
      <label htmlFor={modalNumber} className='modal cursor-pointer'>
        <label className='modal-box relative'>
          <div className=' mx-auto'>{children}</div>
        </label>
      </label>
    </>
  );
}

export default Modal;
