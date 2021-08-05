/*
Copyright SecureKey Technologies Inc. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0
*/

// Lazy load the component
function load(component) {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${component}.vue`);
}

export default [
  {
    path: '',
    name: 'DashboardLayout',
    component: load('layout/DashboardLayout'),
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: load('Dashboard'),
        meta: { requiresAuth: true },
      },
      {
        path: 'logout',
        name: 'logout',
        component: load('Logout'),
      },
      {
        path: 'WebWallet',
        name: 'web-wallet',
        component: load('demos/WebWallet'),
      },
      {
        path: 'DIDManagement',
        name: 'did-management',
        component: load('DIDManagement'),
        meta: { requiresAuth: true },
      },
      {
        path: 'connections',
        name: 'connections',
        component: load('demos/Connections'),
        meta: { requiresAuth: true },
      },
      {
        path: 'relationships',
        name: 'relationships',
        component: load('demos/Relationships'),
        meta: { requiresAuth: true },
      },
      {
        path: 'issue-credential',
        name: 'issue-credential',
        component: load('demos/IssueCredential'),
        meta: { requiresAuth: true },
      },
      {
        path: 'present-proof',
        name: 'present-proof',
        component: load('demos/PresentProof'),
        meta: { requiresAuth: true },
      },
      {
        path: 'worker',
        name: 'chapi-worker',
        component: load('WalletWorker'),
        meta: { showNav: false, hideFooter: true },
      },
      {
        path: 'StoreInWallet',
        name: 'chapi-store',
        component: load('StoreInWallet'),
        meta: { blockNoAuth: true, showNav: false, hideFooter: true },
      },
      {
        path: 'GetFromWallet',
        name: 'chapi-get',
        component: load('GetFromWallet'),
        meta: { blockNoAuth: true, showNav: false, hideFooter: true },
      },
    ],
  },
  {
    path: 'login',
    name: 'login',
    component: load('Login'),
  },
  {
    path: 'loginhandle',
    name: 'loginhandle',
    component: load('LoginHandle'),
    props: (route) => ({ provider: route.query.provider }),
  },
  {
    path: 'signin',
    name: 'signin',
    component: load('Signin'),
  },
  {
    path: 'signup',
    name: 'signup',
    component: load('Signup'),
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: load('PageNotFound'),
  },
  {
    path: 'needauth',
    name: 'block-no-auth',
    component: load('BlockNoAuth'),
  },
];