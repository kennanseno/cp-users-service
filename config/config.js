'use strict';
var path = require('path');

module.exports = function() {

  function pgConfig() {
    return {
      name: process.env.POSTGRES_NAME,
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      port: process.env.POSTGRES_PORT || 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD
    }
  }

  function esConfig() {
    return {
      connection: {
        host : (process.env.ES_HOST || '127.0.0.1') + ':9200',
        index: process.env.ES_INDEX,
        sniffOnStart: false,
        sniffInterval: false
      }
    };
  }

  return {
    'postgresql-store': pgConfig(),
    elasticsearch: esConfig(),
    'email-notifications': {
      sendemail:true,
      email: {
        'invite-parent-guardian-en_US':{
          subject:'Invitation to become a Parent/Guardian'
        },
        'invite-parent-guardian-de_DE':{
          subject:'Invitation to become a Parent/Guardian in german'
        },
        'auth-create-reset-en_US': {
          subject:'CoderDojo Password Reset'
        },
        'auth-create-reset-de_DE': {
          subject:'CoderDojo Password Reset German'
        },
        'invite-ninja-over-13-en_US': {
          subject:'Approve Parent Request'
        },
        'invite-ninja-over-13-de_DE': {
          subject:'Approve Parent Request'
        }
      }
    },
    mail: {
      folder: path.resolve(__dirname + '/../email-templates'),
      mail: {
        from:'no-reply@coderdojo.com'
      },
      config: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
        // service: 'Gmail',
        // auth: {
        //   user: 'youremail@example.com',
        //   pass: 'yourpass'
        // }
      }
    },
    'recaptcha_secret_key': process.env.RECAPTCHA_SECRET_KEY,
    transport: {
      type: 'web',
      web: {
        host: '0.0.0.0',
        port: 10303
      }
    },
    oauth2: {
      clients: {
        coderdojoadultforums: process.env.CODERDOJO_FORUMS_SECRET || 'ilikecode'
      }
    },
    napi: {
      master_token: 'dc729193-f80c-4c5f-b75c-7a70f16b6e7e'
    }
  };
}
