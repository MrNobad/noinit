const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
  askGithubCredentials: () => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter your Github Username or Email address:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Username or Email address.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your Password:',
        validate: function ( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Password.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },

  askRepoDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Come on, enter a name for the repository.';
          }
        }
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or Private:',
        choices: [ 'public', 'private' ],
        default: 'public'
      }
    ];
    return inquirer.prompt(questions);
  },

  askIgnoreFiles: (filelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'ignore',
        message: 'Select the files and/or folders ye want tae ignore:',
        choices: filelist,
        default: ['node_modules', 'bower_components']
      }
    ];
    return inquirer.prompt(questions);
  }
};
