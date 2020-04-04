import React from 'react';
import {
  FormattedMessage,
  FormattedNumber,
  defineMessages,
  useIntl,
} from 'react-intl';
import withAuth from '../hocs/withAuth';

const { description } = defineMessages({
  description: {
    id: 'description',
    defaultMessage: 'This is a description lol',
  },
});

const Index = () => {
  const intl = useIntl();

  return (
    <div>
      <p>
        <FormattedMessage
          id="greeting"
          defaultMessage="Hello Hopl! I did a push!"
        />
      </p>
      <p>{intl.formatMessage(description)}</p>
      <p>
        <FormattedNumber value={1000} />
      </p>
    </div>
  );
};

export default withAuth({
  WrappedComponent: Index,
  redirectTo: '/login',
  shouldBeLoggedIn: true,
});
