/*
Copyright SecureKey Technologies Inc. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0
*/

const { alias } = require('./alias.config');
const path = require('path');
const fs = require('fs');

module.exports = {
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
  },
  runtimeCompiler: true,

  configureWebpack: {
    resolve: {
      alias,
    },
  },

  devServer: {
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(path.join(__dirname, '../../test/fixtures/keys/tls/ec-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../../test/fixtures/keys/tls/ec-pubCert.pem')),
      },
    },
    client: {
      webSocketURL: 'ws://0.0.0.0:9098/ws',
    },
  },

  pluginOptions: {
    i18n: {
      locale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
      localeDir: 'translations',
      enableInSFC: true,
    },
  },
};
