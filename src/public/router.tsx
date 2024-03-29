import { createRouter } from '@tanstack/react-router';

import { rootRoute } from '../App/App';
import { homeRoute, publicRoute } from './publicRoute';
import { loginRoute } from './view/Login/Login';
import { forgotRoute } from './view/Reset/Forgot';
import { resetRoute } from './view/Reset/Reset';

export const publicTree = publicRoute.addChildren([
  homeRoute,
  loginRoute,
  forgotRoute,
  resetRoute,
]);

const routeTree = rootRoute.addChildren([publicTree]);

export const router = createRouter({
  routeTree,
  basepath: '/',
});
