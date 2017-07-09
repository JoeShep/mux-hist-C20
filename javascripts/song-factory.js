"use strict";

let $ = require('jquery'),
    fbURL = "https://fir-101-6198a.firebaseio.com";
    // firebase = require("./firebaseConfig");

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function getSongs(callback) {
  return new Promise( function( resolve, reject) {
    $.ajax({
      url: `${fbURL}/songs.json`//<.json is important!
    }).done(function(songData) {
      console.log("songData", songData );
      resolve(songData);
    });
  });
}

function addSong(songFormObj) {
  return new Promise( function (resolve, reject) {
    $.ajax({
      url: `${fbURL}/songs.json`,
      type: "POST",
      data: JSON.stringify(songFormObj),
      dataType: "json"
    }).done(function(songId) {
      resolve(songId);
    });
  });
}

function deleteSong(songId) {
  console.log("song id", songId );
  return new Promise( function (resolve, reject) {
    $.ajax({
      url: `${fbURL}/songs/${songId}.json`,
      method: "DELETE"
    }).done(function() {
      resolve();
    });
  });
}

function getSong(songId) {
  console.log("song id sent to getSong", songId );
  return new Promise(function( resolve, reject) {
    $.ajax({
      url: `${fbURL}/songs/${songId}.json`
    }).done(function(songData) {
      resolve(songData);
    });
  });
}

function editSong(songFormObj, songId) {
  console.log("songId in EditSong", songId );
  return new Promise( function (resolve, reject) {
    $.ajax({
      url: `${fbURL}/songs/${songId}.json`,
      type: "PUT",
      data: JSON.stringify(songFormObj)
    }).done(function(data) {
      resolve(data);
    });
  });
}

module.exports = {
  getSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};

// ****************************************
// DB interaction using Firebase SDK
// ****************************************

// function getSongs(callback) {
//   firebase.database().ref('songs').on('value', function(songData) {
//     console.log("Sumthin happened");
//     callback(songData.val());
//   });
// }

// function addSong(newSong) {
//   console.log("new song", newSong );
//   return firebase.database().ref('songs').push(newSong);
// }

// function deleteSong(songId) {
//   return firebase.database().ref(`songs/${songId}`).remove();
// }

// function getSong(songId) {
//   console.log("song id", songId );
//   return firebase.database().ref(`songs/${songId}`).once('value');
// }

// function editSong(songFormObj, songId) {
//   console.log("songId in EditSong", songId );
//   return firebase.database().ref(`songs/${songId}`).update(songFormObj);
// }

// module.exports = {
//   getSongs,
//   addSong,
//   getSong,
//   deleteSong,
//   editSong
// };
