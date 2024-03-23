import { StrictMode } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { run } from './App/run';
import { rootRoute } from './public/Root';
import { invitationRoute } from './public/view/Invitation/Invitation';
import { loginRoute } from './public/view/Login/Login';
import { forgotRoute } from './public/view/Reset/Forgot';
import { resetRoute } from './public/view/Reset/Reset';

const routeTree = rootRoute.addChildren([
  loginRoute,
  forgotRoute,
  resetRoute,
  invitationRoute,
]);

const router = createRouter({
  routeTree,
  basepath: '/public',
});

function Public() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

run({
  component: Public,
});
