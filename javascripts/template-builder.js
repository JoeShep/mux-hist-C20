"use strict";

let $ = require('jquery');
let formTemplate = require('../templates/form.hbs');
let songsListTemplate = require('../templates/song-list.hbs');

function makeSongList(songList) {
  console.log("songlist", songList);
  return songsListTemplate({songs: songList});
}

function buildSongForm(song) {
  let songItem = {
    title: "",
    artist: "",
    year: "",
    album: "",
    btnText: "save song",
    btnClass: "save_new_btn"
  };
  let songData = song || songItem;
  return formTemplate(songData);
}

module.exports = {
  makeSongList,
  buildSongForm
};
