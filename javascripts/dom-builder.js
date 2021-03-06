'use strict';
let $ = require('jquery');
let db = require('./song-factory');
let templates = require('./template-builder');

// Helper function to build a song obj from form data.
function buildSongObj() {
    let songObj = {
    title: $("#form--title").val(),
    artist: $("#form--artist").val(),
    album: $("#form--album").val(),
    year: $("#form--year").val()
  };
  return songObj;
}

// Using the REST API
function loadSongsToDOM() {
  console.log("loading songs");
  $(".uiContainer--wrapper").html("");
  db.getSongs()
  .then(function(songData) {
    console.log("raw data", songData);
    var idArr = Object.keys(songData);
    console.log("idArr", idArr);
    idArr.forEach(function(key) {
      songData[key].id = key;
    });
    console.log("songs objects with id added", songData);
    let songList = templates.makeSongList(songData);
    $(".uiContainer--wrapper").html(songList);
  });
}

function attachEvents() {
  // Load the new song form
  $("#add-song").click(function() {
    console.log("clicked add song");
    var songForm = templates.buildSongForm();
    $(".uiContainer--wrapper").html(songForm);
  });

  // display song list
  $('#see-list').click(loadSongsToDOM);

  // Send newSong data to db then reload DOM with updated song data
  $(document).on("click", ".save_new_btn", function() {
    let songObj = buildSongObj();
    db.addSong(songObj)
    .then(function(SongId){
      console.log("song saved", SongId);
      loadSongsToDOM();
    });
  });

// Load and populate form for editing a song
  $(document).on("click", ".edit-btn", function() {
    console.log("edit clicked");
    let songId = $(this).data("edit-id");
    db.getSong(songId)
    .then(function(song) {
          song.id = songId;
          let editForm = templates.buildSongForm(song);
          $(".uiContainer--wrapper").html(editForm);
      });
  });

//Save edited song to FB then reload DOM with updated song data
  $(document).on("click", ".save_edit_btn", function() {
    let songObj = buildSongObj(),
        songId = $(this).attr("id");
    console.log("song id", songId);
    db.editSong(songObj, songId)
    .then(function(data){
      console.log("song saved", data);
      loadSongsToDOM();
    });
  });

  // Remove song then reload the DOM w/out new song
  $(document).on("click", ".delete-btn", function () {
    console.log("btn clicked", $(this).data("delete-id"));
    db.deleteSong($(this).data("delete-id"))
    .then(function() {
      loadSongsToDOM();
    });
  });
}

module.exports = {loadSongsToDOM, attachEvents};
