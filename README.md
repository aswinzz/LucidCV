# LucidCV

<img align="right" title="CV" src="./lucidcv.png">

LucidCV is a simple CV maker which collects data from the user and creates a CV for the user.
You can select the CV theme that you need and after creating the CV you can download a copy of it.
Those who wish to contribute are welcome :smile: .

## How to setup locally

* Install nodejs and npm
* run `git clone https://github.com/aswinzz/LucidCV.git`
* Enter into the cloned folder
* run `sudo npm install`
* run `sudo npm start`
* Go to `localhost:3000` in your browser

## How It Works

The user enters the data and after the form is submitted a json file is created and depending on the selected theme and the json data CV is prepared.

- File Structure :
  * The folder `Public` contains the css,javascripts and images needed for the website
  * The folder `Views` contains the code of homepage and cv templates,they are in ejs format(embedded javascript).
    - index.ejs : contains the code for homepage which contains the form that takes the details of the users.I have used materialize css as the frontend framework.
    - resume.ejs : What this code does is, format the json data obtained from the user into a CV.
  * The folder `routes` contains a file `index.js` this file creates the json file when the user submits the form using a POST request and formats the resume.ejs file.

## TODO

* See todo.md for features to be added

Happy Contributing 😊
=======
Anyone who wish to contribute to this repo can add yourself in the contributors.md and can start solving issues. You can also create issues for the problems that you came across in the project.

## How to contribute?
  * First, verify if there's no one already working on solving the issue.
  * Star and Fork the repository to start working on it.
  * Clone the repository in your local machine using $ git clone git@github.com:YOUR-GITHUB-USER-NAME/LucidCV.git
  * Visit your fork on (https://github.com/YOUR-USER-NAME/LucidCV) and create a pull request for your changes.
  * Make sure your pull request describes what you changed and references the issue that you're fixing.

## How to integrate theme into website ?
  * First , create a file in views folder name as theme1(2,3..).ejs for reference you can use resume.ejs.
  * Goto index.ejs file and a option of your file just like given example below.
  * Now integrate your theme into website by going to routes->index.js and configure the portion shown below with your theme
  * Congrats you integrated your theme to website !

 <div>
  <img align="center" title="Options" src="./readmeImg/options.png">
 </div>
 <div>
  <img align="center" title="addFile" src="./readmeImg/addFile.png">
 </div>
