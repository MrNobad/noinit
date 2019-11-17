const CLI = require('clui');
const Configstore = require('configstore');
const Octokit = require('@octokit/rest');
const Spinner = CLI.Spinner;

const inquirer = require('./inquirer');
const pkg = require('../package.json');

const conf = new Configstore(pkg.name);

let octokit;

module.exports = {
  getInstance: () => {
    return octokit;
  },

  githubAuth: (token) => {
    octokit = new Octokit({
      auth: token
    });
  },


  getStoredGithubToken: () => {
    return conf.get('github.token');
  },

  setGithubCredentials: async () => {
    const credentials = await inquirer.askGithubCredentials();
    octokit = new Octokit({
      auth: {
        username: credentials.username,
        password: credentials.password,
      }
    });
  },

  registerNewToken: async () => {
    const status = new Spinner('Authenticating yersel, please hoad yer horses...');
    status.start();

    try {
      const response = await octokit.oauthAuthorizations.createAuthorization({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'Noinit, the command-line tool for initializing Git repos'
      });
      const token = response.data.token;
      if(token) {
        conf.set('github.token', token);
        return token;
      } else {
        throw new Error("Missing Token", "Github token wisnae found in the response");
      }
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  }
};
