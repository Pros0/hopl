import { Cookies } from 'react-cookie';
import fetcher from '../utils/fetcher';
import { getGatewayUsersLogin } from '../utils/gateways';

const login = ({ body, onComplete, onError, onFinally }) =>
  fetcher(getGatewayUsersLogin(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((resp) => {
      if (resp.error) {
        if (onError)
          onError(
            resp.error?.details?.[0]
              ? { error: resp?.error?.details?.[0] }
              : resp,
          );
      } else if (!resp.token) {
        if (onError) onError({ error: { message: 'Error logging in.' } });
      } else {
        const cookies = new Cookies();
        cookies.set('token', resp.token);
        if (onComplete) onComplete(resp);
      }
    })
    .catch((error) => {
      if (onError) onError(error?.details?.[0] || error);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });

export default login;
