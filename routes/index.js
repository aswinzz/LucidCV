var express = require('express');
var router = express.Router();
var jbuilder = require('jbuilder');
const axios = require('axios');
const fs = require('fs');
/*Making it public so can be accessed in future because we want to update it*/
let userData ;//for storing data of user and updating purpose
var users;//for storing users
let userKey;//for storing key of the user
//making output var global
  var output = null;
  var theme = null;


/* GET home page. */

/*-----Since we are storing data of user thats why homepage would be sign in page---------*/
router.get('/', function(req, res, next) {
  res.render('signIn', { title: 'SignIn' });
});

/*------router for signup page--------------*/
router.get('/signUp', function(req, res, next) {
  console.log(req);
      res.render('signUp', { title: 'SignUp' });
});

/*route for cv page*/
router.get('/LucidCV', function(req, res, next) {
      res.render('index', { title: 'LucidCV' });
});


/*-------router for storing info of user-------*/
router.post('/cv', function(req, res, next) {
  var user = req.body;
  // console.log("--------------------USER-------------------------------- " , user);
  /*Creaating JSON object to be sent to firebase*/
  console.log("name : ",user.username);
  console.log("name : ",user.password);
   userData ={
    name : user.username,
    password : user.password,
    cv : {}
  };
  console.log("userData",userData);
  if(req.body.for ==='signUp')
  {
    /* making a post request  to firebase for storing data of user */
      axios.post('https://lucidcv-ae651.firebaseio.com/users.json',userData)
        .then(response=>{
          // console.log("--------------------------SUCCESS----------------",response);
          userKey=response.data.name;
          res.send({
            text : "Success"
          });
        })
        .catch(error=>{
          // console.log("ERROR",error);
          res.send({
            text : "failure"
          });
        })
  }

  else if(req.body.for ==='signIn')
  {
    let foundUser = false;
    /* making a post request  to firebase for checking data of user */
    axios.get('https://lucidcv-ae651.firebaseio.com/users.json')
    .then(response=>{
        /*Storing users in a variable*/
        users = response.data;
        console.log(users);
        /*Converting the object into in array*/
        const arrayUsers = Object.keys(users);
        /*Searching for user in the database if exist set userFound to true*/
            for(let i in arrayUsers)
              {
                let key = arrayUsers[i];
                // console.log("key",key);
                // console.log("user[key]",users[key]);
                if(users[key].username === userData.username && users[key].password === userData.password)
                {
                  console.log("--------------------USER FOUND-----------------------------");
                  userData.cv = users[key].cv;
                  output = userData.cv;
                  userKey = key;
                  res.send({
                    text : "Success"
                  });
                  foundUser=true;
                  break;
                }
              }
              if(!foundUser)
              {
                res.send({
                  text : "failure"
                });
              }
    })
    .catch(e=>{
      console.log(e);
      res.send({
        text : "failure"
      });
    })
  }

});








//making output var global
  var output = null;
  var theme = null;

router.post('/LucidCV', function(req, res, next) {
  var tempOutput = null;
  if(output !== null)
  {
    console.log("-------------SETTING TEMP OUTPUT-------------------");
    tempOutput = output;
  }
  else{
    console.log("---------------------SETTING OUTPUT TO NULL-----------");
    output = null;
  }

    output = jbuilder.encode(function(json) {

     json.set('header', function(json) {
       json.set('avatar', req.body.avatar);
       json.set('name', req.body.name);
       json.set('job', req.body.job);
       json.set('bio', req.body.bio);
       json.set('email', req.body.email);

       json.set('icon', function(json) {
         json.set('github', req.body.github);
         json.set('linkdin', req.body.linkedin);
         json.set('facebook', req.body.facebook);
         json.set('twitter', req.body.twitter);
         json.set('website', req.body.website);
       });
     });

     json.set('language', function(json) {
       var language1 = {lang: req.body.l1 ,perc: req.body.p1};
       var language=[language1];
       if(req.body.l2!=null){
         language.push({lang: req.body.l2 ,perc: req.body.p2});
       }
       if(req.body.l3!=null){
         language.push({lang: req.body.l3,perc: req.body.p3});
       }
       if(req.body.l4!=null){
         language.push({lang: req.body.l4,perc: req.body.p4});
       }
       if(req.body.l5!=null){
         language.push({lang: req.body.l5,perc: req.body.p5});
       }
       if(req.body.l6!=null){
         language.push({lang: req.body.l6,perc: req.body.p6});
       }
       if(req.body.l7!=null){
         language.push({lang: req.body.l7,perc: req.body.p7});
       }
       if(req.body.l8!=null){
         language.push({lang: req.body.l8,perc: req.body.p8});
       }
       if(req.body.l9!=null){
         language.push({lang: req.body.l9,perc: req.body.p9});
       }
       if(req.body.l10!=null){
         language.push({lang: req.body.l10,perc: req.body.p10});
       }
         json.extract(language, 'lang', 'perc');
     });



     json.set('projects', function(json) {
       var project1 = {name: req.body.namep ,link: req.body.link ,desc:req.body.bio1};
       var project=[project1];
       if(req.body.cname2!=null){
         project.push({name: req.body.name2 ,link: req.body.link2 ,desc:req.body.bio1});
       }
       if(req.body.cname3!=null){
         project.push({name: req.body.name3 ,link: req.body.link3 ,desc:req.body.bio1});
       }
         json.extract(project, 'name', 'link', 'desc');
     });

     json.set('experience', function(json) {
       var experience1 = {name: req.body.cname ,job: req.body.cjob,date:{start: req.body.csdate,end: req.body.cedate}};
       var experience=[experience1];
       if(req.body.cname2!=null){
         experience.push({name: req.body.cname2 ,job: req.body.cjob2,date:{start: req.body.csdate2,end: req.body.cedate2}});
       }
       if(req.body.cname3!=null){
         experience.push({name: req.body.cname3 ,job: req.body.cjob3,date:{start: req.body.csdate3,end: req.body.cedate3}});
       }
          json.extract(experience, 'name','job', 'date');
     });

     json.set('eduandcert', function(json) {
       json.set('edu', function(json) {
         var edu1 = {title: req.body.ename ,name: req.body.ecourse ,date:{start: req.body.esdate,end: req.body.eedate}};
         var edu=[edu1];
         if(req.body.ename2!=null){
           edu.push({title: req.body.ename2 ,name: req.body.ecourse ,date:{start: req.body.esdate2,end: req.body.eedate2}});
         }
         if(req.body.ename3!=null){
           edu.push({title: req.body.ename3 ,name: req.body.ecourse ,date:{start: req.body.esdate3,end: req.body.eedate3}});
         }
           json.extract(edu, 'title',  'name', 'date');
       });
     });
   });

  // console.log(output);
  console.log("---------------------req body theme---------------------------",req.body.theme);
  console.log("OUTPUT VARIALBE BEFORE THEME CHANGE---------",output);
  console.log("TEMP OUTPUT VARIABLE BEFORE THEME CHANGE -------------",tempOutput);


  /*Adding logic for storing theme to a variable and then using it !*/
  /*This will store the value when we will first submit the form */
  if(theme === null && req.body.theme)
  {
    console.log("--------------CASE 1 --------------");
    // console.log("-----------ENTER THE BOTH NULL CASE !--------- ");
    theme = req.body.theme ;
  }

/* store the value when we will update the value from the theme*/
  if(theme !== null && req.body.theme)
  {
    console.log("--------------CASE 2 --------------");
    // console.log("-----------SETTING THEME FOR THE SECOND TIME------------------------");
    output = tempOutput;
    theme = req.body.theme;
  }
/*when the second request is made this makes req.body.theme undefined so it will store the value in it */
  if (theme !== null && !(req.body.theme))
  {
    console.log("--------------CASE 3 --------------");
    // console.log("---------------SETTING REQ>THEME to THEME------------------------------");
    req.body.theme = theme;
  }

  // console.log(output);
  fs.writeFileSync('cv.json', output);


 /*In output variable the user data will be stored so if the user so we need to define a function that update the userData variable and update the database*/
  // updateUserDataAndDatabase();

  console.log("OUTPUT VARIALBE AFTER THEME CHANGE---------",output);
  console.log("TEMP OUTPUT VARIABLE AFTER THEME CHANGE -------------",tempOutput);
  if(req.body.theme === "theme1"){
    res.render('resume',{out:JSON.parse(output)});
  }
  else if(req.body.theme === "theme2"){
    console.log("matched");
    res.render('theme2',{out:JSON.parse(output)});
  }
  else if(req.body.theme ==="theme3"){
    res.render('theme3',{out:JSON.parse(output)});
  }
  else if(req.body.theme ==="theme4"){
    res.render('theme4',{out:JSON.parse(output)});
  }
  else if(req.body.theme ==="theme5"){
    res.render('theme5',{out:JSON.parse(output)});
  }
  else if(req.body.theme ==="theme6"){
    res.render('theme6',{out:JSON.parse(output)});
  }
  else if(req.body.theme ==="theme7"){
    res.render('theme7',{out:JSON.parse(output)});
  }
  else{
    //default
      res.render('resume',{out:JSON.parse(output)});
  }

});



router.get('*', function(req, res, next) {
  res.render("404");
});

/*function for updating user*/
const updateUserDataAndDatabase =()=>{
  userData.cv = output;
  var url = "https://lucidcv-ae651.firebaseio.com/users/"+userKey+".json";
  console.log(url);
  axios.patch(url,userData)
  .then(response=>{
    console.log("-------RESPONSE FROM DB -----Success");
  })
  .catch(e=>{
    console.log("ERROR");
  })
}





module.exports = router;
