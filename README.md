# mobile-food-truck-finder-web
mobile food truck find web client implementation
This is the main repository for the client framework!

Please read the information below at least once to understand how to work with this project.

Since the repository is IDE agnostic, there is an non IDE specific workflow described below, however the recommended IDE is Visual Studio Code, and specific workflow for working in that is also available further down this document.

## Prerequisites
* You will need to install GIT and Node.js to work in this repository, latest available versions should work (check with team members to verify if latest version is stable or not):
 * [GIT](https://git-for-windows.github.io/)
 * [Node.js 10.15.3 LTS](https://nodejs.org/dist/v10.15.3/node-v10.15.3-x64.msi)

 ## Environment file
  serviceUrl : 'Web api Base URL',
  cityCoordinate:{
    lat : //latitude of the city,
    lon://longitude of the city,
    maxDistance : //maximum distance of two locations within the city
  },
  testCoordinate:{ //For testing purpose
    lat : //test latitude,
    lon: //test longitude
  },
};

 ## Workflow
---

* Start Git Bash, this comes installed with GIT and is required to be able to use our tooling.

* Create a branch for your development, this can be done with the command `git checkout -b <myBranch>`, consider the branch only to be alive as long as your current task that you are working on are. For the next task you will have to create a new branch. A small note, the command listed is actually a shortcut for two commands `git branch <myBranch>` will create your branch and `git checkout <myBranch>` will switch to your branch.
* From the project root issue the command `npm i` to install dependencies for the project.
* Start development by issuing the command `npm run start.` This will start the  development server, and also start building a dev version of the application and put the build in watch mode so that it retriggers when you edit files
* Open a browser session and point it to<br/>
  `http://localhost:4200`
* In Google Chrome press F12 to bring up the development tools, this will allow debugging and also help with disabling caching in the browser. In the source tab you can press Ctrl-P to search for source code files and open them to be able to debug.
* Lint and test your code by running the command `ng lint` this will make sure your code follows the best practices that can be defined in linting tooling.
* When it comes time to merge your branch into master, you will have to create a merge request, first do this:
* Make sure you have commited all your changes in your branch
* Make sure you have the latest master branch checked out by issuing the commands  `git checkout master` `git pull` `git checkout <myBranch>`
* Push your branch to the server by issuing the command `git push origin <myBranch>` if you have already done this and then rebased your branch and wants to push again, you will get conflicts trying to do this, you can solve the conflicts by adding the -f force flag to the command making it `git push origin <myBranch> -f` Not that this will make it problematic if someone else has checked out your branch, so the best thing is to make sure that you are not pushing your branch until it is ready to merge.

### Local server notes

* To start just the server, without starting compilation/watches etc., use `npm start`. 

* To stop a running server, press Ctrl + C in the window in which it is running or issue the command `npm stop`

* To restart a running server, run `npm restart` (or `npm restart 2` if you for example know you want to use the second database in the list). Could be useful for switching between databases.
### Building a production version of the code

To build the client-framework for production (will minify code and also do a "ahead-of-time" angular compilation) you should run the following command `npm run build -prod` this is about three times slower than a normal dev build. 




