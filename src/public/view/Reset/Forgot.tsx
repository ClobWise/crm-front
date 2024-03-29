import { Flex, Heading, Divider, Link } from '@adobe/react-spectrum';
import Login from '@spectrum-icons/workflow/Login';
import { useMutation } from '@tanstack/react-query';
import { createRoute, useLinkProps } from '@tanstack/react-router';
import ky from 'ky';

import { AuthView } from '../../component/AuthView';
import { publicRoute } from '../../publicRoute';
import { loginRoute } from '../Login/Login';
import { EmailSent } from './Acknowledgement';
import { ForgotForm, type Credentials } from './ForgotForm';

export const forgotRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/forgot-password',
  component: Forgot,
});

async function forgot(userEmail: Credentials): Promise<any> {
  const response = await ky
    .post('/auth/forgot-password', {
      json: {
        username: userEmail.email,
      },
    })
    .json();

  return response;
}

export function Forgot() {
  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn: forgot,
  });

  const handleChange = (userEmail: Credentials) => {
    mutate(userEmail);
  };

  const loginHref = useLinkProps({ to: loginRoute.to }).href;

  return (
    <AuthView className='forgot-view'>
      <Flex direction='column'>
        <Login size='XXL' alignSelf={'center'} marginBottom={'size-400'} />
        <Heading level={1} alignSelf='self-start'>
          Forgot Password?
        </Heading>
        {isSuccess ? (
          <EmailSent />
        ) : (
          <ForgotForm inProgress={isPending} onSubmit={handleChange} />
        )}
        <Divider size='S' marginTop={'size-400'} marginBottom={'size-200'} />
        <Link href={loginHref} isQuiet variant='secondary'>
          Back to Login
        </Link>
      </Flex>
    </AuthView>
  );
}
