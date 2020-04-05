import { Cookies } from 'react-cookie';
import fetch from 'isomorphic-unfetch';
import { getGatewayUsers } from '../utils/gateways';

const saveUserDetails = ({ body, onComplete, onError, onFinally }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  fetch(`${getGatewayUsers()}/${body.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then(() => {
      if (onComplete) onComplete();
    })
    .catch((error) => {
      if (onError) onError(error?.details?.[0] || error);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
};

export default saveUserDetails;
