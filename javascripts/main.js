"use strict";

let $ = require('jquery'),
    db = require("./song-factory"),
    login = require("./user"),
    songController = require('./dom-builder'),
    currentUser = null,
    // firebase = require("./firebaseConfig")
    templates = require('./template-builder');

songController.loadSongsToDOM();
songController.attachEvents();

// User login section. Should ideally be in its own module
$("#auth-btn").click(function() {
  console.log("clicked auth");
  login()
  .then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("logged in user", user.uid );
    db.getSongs(templates.makeSongList);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    alert(errorMessage);
  });
});
