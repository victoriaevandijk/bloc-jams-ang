(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};

          /**
          * @desc Current album
          * @type
          */

          var currentAlbum = Fixtures.getAlbum();

          /**
          * @function getSongIndex
          * @desc gets the index of the song
          * @param {Object} song
          */

          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          };

          /**
          *@desc holds current song number
          *@type {number}
          */

          SongPlayer.currentSong = null;

          /**
          *@desc Buzz object audio file
          *@type {Object}
          */
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */

          var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
             });

// Set newly selected song as the currentSong
             SongPlayer.currentSong = song;
          };

          /**
          *@function playSong
          *@desc sets song.playing to true and plays current song
          *@param {Object} song
          */

          var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
          };

          /**
          *@function SongPlayer.play
          *@desc plays the current or selected song
          @params {Object} song
          */

          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      currentBuzzObject.play();
                  }
              }
          };

          /**
          @function SongPlayer.pause
          @desc pauses the song that is currently playing while setting the play boolean to false
          @param {Object} song
          */

          SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
          };

          /**
          * @function SongPlayer.previous
          * @desc changes to prior song
          */

          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;

              if (currentSongIndex < 0) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }

          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();