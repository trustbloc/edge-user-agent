/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

import * as Agent from '@trustbloc/agent-sdk-web';
import { WalletUser } from '@trustbloc/wallet-sdk';
import { toRaw } from 'vue';
import { clearGnapStoreData, getGnapKeyPair } from '@/mixins/gnap/store';

const axios = require('axios').default;

export const parseTIme = (ns) => parseInt(ns) * 60 * 10 ** 9;

export default {
  state: {
    username: null,
    setupStatus: null,
    profile: null,
    loggedIn: false,
    logInSuspended: false,
    chapi: false,
    selectedVaultId: null,
    selectedCredentialId: null,
    gnapSessionToken: null,
    gnapRequestAccessrResp: null,
  },
  mutations: {
    setUser(state, val) {
      state.username = val;
      if (val !== null) {
        localStorage.setItem('user', val);
      }
    },
    setProfile(state, val) {
      state.profile = val;
      if (val !== null) {
        localStorage.setItem('profile', JSON.stringify(val));
      }
    },
    setUserPreference(state, val) {
      state.preference = val;
      if (val !== null) {
        localStorage.setItem('preference', JSON.stringify(val));
      }
    },
    setUserSetupStatus(state, val) {
      state.setupStatus = val;
      if (val !== null) {
        localStorage.setItem('setupStatus', val);
      }
    },
    setCHAPI(state, val) {
      state.chapi = val;
      if (val !== null) {
        localStorage.setItem('chapi', JSON.stringify(val));
      }
    },
    setUserLoggedIn(state) {
      state.loggedIn = true;
    },
    setLogInSuspended(state) {
      state.logInSuspended = true;
    },
    setSelectedVaultId(state, val) {
      state.selectedVaultId = val;
      if (val !== null) {
        localStorage.setItem('selectedVaultId', val);
      }
    },
    setSelectedCredentialId(state, val) {
      state.selectedCredentialId = val;
      if (val !== null) {
        localStorage.setItem('selectedCredentialId', val);
      }
    },
    setSessionToken(state, val) {
      state.gnapSessionToken = val;
      localStorage.setItem('gnapSessionToken', JSON.stringify(val));
    },
    setGnapAccessReqResp(state, val) {
      state.gnapRequestAccessrResp = val;
      localStorage.setItem('gnapRequestAccessrResp', JSON.stringify(val));
    },
    clearUser(state) {
      state.username = null;
      state.setupStatus = null;
      state.profile = null;
      state.loggedIn = false;
      state.chapi = false;
      state.selectedVaultId = null;
      state.selectedCredentialId = null;
      state.gnapSessionToken = null;

      localStorage.removeItem('user');
      localStorage.removeItem('setupStatus');
      localStorage.removeItem('profile');
      localStorage.removeItem('preference');
      localStorage.removeItem('chapi');
      localStorage.removeItem('selectedVaultId');
      localStorage.removeItem('selectedCredentialId');

      clearGnapStoreData();
    },
    loadUser(state) {
      state.username = localStorage.getItem('user');
      state.setupStatus = localStorage.getItem('setupStatus');
      state.profile = JSON.parse(localStorage.getItem('profile'));
      state.preference = JSON.parse(localStorage.getItem('preference'));
      state.chapi = JSON.parse(localStorage.getItem('chapi'));
      state.selectedVaultId = localStorage.getItem('selectedVaultId');
      state.selectedCredentialId = localStorage.getItem('selectedCredentialId');
    },
  },
  actions: {
    async refreshUserPreference({ commit, state, rootGetters }, profile = state.profile) {
      if (!profile) {
        console.error('failed to refresh user preference, profile not found.');
        throw 'invalid operation, user profile not set';
      }

      let { user, token } = profile;
      let walletUser = new WalletUser({ agent: rootGetters['agent/getInstance'], user });
      try {
        let { content } = await walletUser.getPreferences(token);
        commit('setUserPreference', content);
      } catch (e) {
        console.error('user preference not found, may be user yet to get registered', e);
      }
    },
    async loadOIDCUser({ commit, dispatch, getters }) {
      let userInfo = await fetch(getters.serverURL + '/oidc/userinfo', {
        method: 'GET',
        credentials: 'include',
      });

      if (userInfo.ok) {
        let profile = await userInfo.json();
        console.log('received user data: ' + JSON.stringify(profile, null, 2));

        commit('setUser', profile.sub);

        await dispatch('agent/init');

        /*
                  TODO should be uncommented once token expiry with aries agent wasm on refresh is fixed.
                  Wallet should be unlocked once during login, works fine with agent server based universal wallet.
                  Agent-Wasm destroys token cache on refresh and wallet expires token.
                  */
        // await dispatch('agent/unlockWallet')
      }
    },
    async logout({ commit, dispatch, getters }) {
      await fetch(getters.serverURL + '/oidc/logout', {
        method: 'GET',
        credentials: 'include',
      });
      await dispatch('agent/destroy');
      commit('clearUser');
    },
    loadUser({ commit }) {
      commit('loadUser');
    },
    startUserSetup({ commit }) {
      commit('setUserSetupStatus', 'inprogress');
    },
    completeUserSetup({ commit }, failure) {
      commit('setUserSetupStatus', failure ? 'failed' : 'success');
    },
    updateUserProfile({ commit }, profile) {
      commit('setProfile', profile);
    },
    updateUserOnboard({ commit }) {
      commit('setUserLoggedIn');
    },
    updateLoginSuspended({ commit }) {
      commit('setLogInSuspended');
    },
    activateCHAPI({ commit }) {
      commit('setCHAPI', true);
    },
    updateSelectedVaultId({ commit }, selectedVaultId) {
      commit('setSelectedVaultId', selectedVaultId);
    },
    updateSelectedCredentialId({ commit }, selectedCredentialId) {
      commit('setSelectedCredentialId', selectedCredentialId);
    },
    updateSessionToken({ commit }, gnapSessionToken) {
      commit('setSessionToken', gnapSessionToken);
    },
    updateGnapReqAccessResp({ commit }, gnapRequestAccessrResp) {
      commit('setGnapAccessReqResp', gnapRequestAccessrResp);
    },
  },
  getters: {
    getCurrentUser(state) {
      return state.username
        ? {
            username: state.username,
            setupStatus: state.setupStatus,
            profile: toRaw(state.profile),
            preference: toRaw(state.preference),
          }
        : undefined;
    },
    isUserLoggedIn(state) {
      return state.loggedIn;
    },
    isLoginSuspended(state) {
      return state.logInSuspended;
    },
    isCHAPI(state) {
      return state.chapi;
    },
    getSelectedVaultId(state) {
      return state.selectedVaultId;
    },
    getSelectedCredentialId(state) {
      return state.selectedCredentialId;
    },
    getGnapSessionToken(state) {
      state.gnapSessionToken = localStorage.getItem('gnapSessionToken');
      return JSON.parse(state.gnapSessionToken);
    },
    getGnapReqAccessResp(state) {
      state.gnapRequestAccessrResp = localStorage.getItem('gnapRequestAccessrResp');
      return JSON.parse(state.gnapRequestAccessrResp);
    },
  },
  modules: {
    agent: {
      namespaced: true,
      state: {
        instance: null,
        notifiers: null,
        agentName: null,
      },
      mutations: {
        setInstance(state, { instance, user }) {
          state.instance = instance;
          state.agentName = user;
        },
        addNotifier(state, notifier) {
          if (state.notifiers) {
            state.notifiers.push(notifier);
          } else {
            state.notifiers = [notifier];
          }
        },
        startNotifier(state, notifier) {
          state.instance.startNotifier(notifier.callback, notifier.topics);
        },
        startAllNotifiers(state) {
          if (!state.notifiers) {
            return;
          }
          state.notifiers.forEach(function (notifier) {
            state.instance.startNotifier(notifier.callback, notifier.topics);
          });
        },
      },
      actions: {
        async init({ commit, rootState, state, rootGetters, dispatch }, gnapOpts = {}) {
          if (state.instance && state.agentName == rootState.user.username) {
            return;
          }

          if (!rootState.user.username && !gnapOpts.subjectId) {
            console.error('user should be logged in to initialize agent instance');
            throw 'invalid user state';
          }

          const gnapKeyPair = await getGnapKeyPair();
          const signingKey = await window.crypto.subtle.exportKey('jwk', gnapKeyPair.privateKey);

          let opts = {};
          Object.assign(opts, rootGetters.getAgentOpts, {
            'agent-default-label': rootState.user.username,
            'db-namespace': rootState.user.username,
            'gnap-signing-jwk': JSON.stringify(signingKey),
            'gnap-access-token': gnapOpts?.accessToken || '',
            'gnap-user-subject': gnapOpts?.subjectId || '',
          });
          console.log('what is opts', rootGetters.hubAuthURL);
          try {
            let agent = await new Agent.Framework(opts);
            let profileOpts = {};
            console.log('what is my hub-auth bootstrap val', gnapOpts?.accessToken);
            // TODO to be moved from here to 'loadOIDCUser' in case server based universal wallet.
            await axios
              .get('https://localhost:8044' + '/bootstrap', {
                headers: { Authorization: `GNAP ${gnapOpts?.accessToken}` },
              })
              .then((resp) => {
                let { data } = resp;
                console.log('received bootstrap data ' + JSON.stringify(data, null, 2));
                profileOpts = data;
                console.log('what is profile opts', profileOpts);
                commit('updateProfileOpts', profileOpts);
              })
              .catch((err) => {
                console.log('error fetching bootstrap data: errMsg=', err);
                console.log(
                  "Note: If you haven't logged in yet and you just got a 403 error, then it's expected"
                );

                // http 400 denotes expired cookie at server - logout the user and make user to signin
                if (err.response && err.response.status === 400) {
                  dispatch('logout');
                }
              });
            await dispatch('unlockWallet');
            commit('startAllNotifiers');
            commit('setInstance', { instance: agent, user: rootState.user.username });
          } catch (e) {
            console.error(e);
          }
        },
        async unlockWallet({ state, rootGetters, dispatch }) {
          // create wallet profile if it doesn't exist
          let { user } = rootGetters.getProfileOpts.bootstrap;
          let walletUser = new WalletUser({ agent: state.instance, user });
          if (!(await walletUser.profileExists())) {
            await walletUser.createWalletProfile(profileCreationOpts(rootGetters.getProfileOpts));
          }

          let { token } = await walletUser.unlock(profileUnlockOpts(rootGetters.getProfileOpts));

          await Promise.all([
            dispatch('updateUserProfile', { user, token }, { root: true }),
            dispatch('refreshUserPreference', { user, token }, { root: true }),
          ]);
        },
        flushStore({ state }) {
          console.debug('flushing store', state.instance);
          if (state.instance) {
            state.instance.store.flush();
            console.debug('flushed store.');
          }
        },
        async destroy({ commit, state, rootGetters, dispatch }) {
          let { user } = rootGetters.getCurrentUser.profile;

          let walletUser = new WalletUser({ agent: state.instance, user });
          walletUser.lock();

          if (state.instance) {
            await dispatch('flushStore');
            state.instance.destroy();
          }
          commit('setInstance', {});
        },
        addNotifier({ commit, state }, notifier) {
          commit('addNotifier', notifier);
          if (state.instance) {
            commit('startNotifier', notifier);
          }
        },
      },
      getters: {
        getInstance(state) {
          return state.instance;
        },
        isInitialized(state) {
          return state.instance != null;
        },
      },
    },
  },
};

// options for creating wallet profile
function profileCreationOpts(opts) {
  let { bootstrap, config } = opts;
  let keyStoreURL, localKMSPassphrase, edvConfiguration;
  // webkms
  if (config.kmsType == 'webkms') {
    keyStoreURL = bootstrap.opsKeyStoreURL;
  }

  // local
  if (config.kmsType == 'local') {
    localKMSPassphrase = config.localKMSScret;
  }

  // edv
  if (config.storageType == 'edv') {
    edvConfiguration = {
      serverURL: bootstrap.userEDVServer,
      vaultID: bootstrap.userEDVVaultID,
      encryptionKID: bootstrap.userEDVEncKID,
      macKID: bootstrap.userEDVMACKID,
    };
  }

  return { keyStoreURL, localKMSPassphrase, edvConfiguration };
}

function profileUnlockOpts(opts) {
  let { bootstrap, userConfig, config } = opts;

  let webKMSAuth, localKMSPassphrase, edvUnlocks;
  // webkms
  if (config.kmsType == 'webkms') {
    webKMSAuth = {
      authToken: userConfig.accessToken,
      secretShare: userConfig.walletSecretShare,
      capability: bootstrap.opsKMSCapability,
      authzKeyStoreURL: bootstrap.authzKeyStoreURL,
    };
  }

  // local
  if (config.kmsType == 'local') {
    localKMSPassphrase = config.localKMSScret;
  }

  // edv
  if (config.storageType == 'edv') {
    edvUnlocks = {
      authToken: userConfig.accessToken,
      secretShare: userConfig.walletSecretShare,
      capability: bootstrap.edvCapability,
      authzKeyStoreURL: bootstrap.authzKeyStoreURL,
    };
  }

  return { webKMSAuth, localKMSPassphrase, edvUnlocks, expiry: parseTIme(bootstrap.tokenExpiry) };
}
