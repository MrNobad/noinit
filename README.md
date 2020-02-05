# noinit-git_init_on_steroids

Noinit "Git init" on steroids.

The app will do:

Initialise the local repository by running git init
Create a remote repository, for example on Github or Bitbucket; typically by * leaving the command-line and firing up a web browser
Add the remote
Create a .gitignore file
Add your project files
Commit the initial set of files
Push up to the remote repository

Require to run in the project directory: npm install chalk clear clui figlet inquirer minimist preferences github lodash simple-git touch --save
