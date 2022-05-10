import { useContext } from 'react';
import OrderContext from '../../context/OrderContext';

function UserOrder() {
  const {} = useContext(OrderContext);
  return (
    <>
      <h2>UserOrder</h2>
    </>
  );
}

export default UserOrder;
