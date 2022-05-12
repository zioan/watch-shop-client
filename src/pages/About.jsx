function About() {
  return (
    <section className='mx-2'>
      <h2 className='text-xl mb-6'>
        Watch Store is a shopping application built with React and Tailwind CSS,
        while the backend is powered by Node and MySQL.
      </h2>
      <h3 className=' text-lg font-bold'>Application features:</h3>
      <h4 className=' text-base font-bold mt-2'>Customers:</h4>
      <ul className=' list-disc'>
        <li className='ml-8'>can register and place a new order</li>
        <li className='ml-8'>track order status</li>
        <li className='ml-8'>
          update personal information and credentials (email and password
          update)
        </li>
      </ul>

      <h4 className=' text-base font-bold mt-2'>Administrator:</h4>
      <ul className=' list-disc'>
        <li className='ml-8'>
          can update personal information and credentials (email and password
          update)
        </li>
        <li className='ml-8'>
          check and update new orders, check completed orders
        </li>
        <li className='ml-8'>create, update and delete new products</li>
      </ul>
    </section>
  );
}

export default About;
