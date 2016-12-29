(function() {
     function SongPlayer() {
          var SongPlayer = {};

          var currentSong = null;

          /**
          *@desc holds current song number
          *@type {number}
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
                 currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
             });

             currentSong = song;
          };
          
          /**
           * @function playSong
           * @desc sets song.playing to true and plays current song
           * @param {Object} song
           */
           
           var playSong = function(song) {
               currentBuzzObject.play();
               song.playing = true;
           };
           
           /**
            * @function SongPlayer.play
            * @desc plays the current or chosen song
            * @params {Object} song
            */

          SongPlayer.play = function(song) {
              if (currentSong !== song) {
                setSong(song);
                playSong(song);
              } else if (currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      currentBuzzObject.play();
                  }
              }
          };
          
          /**
           * @function SongPlayer.pause
           * @desc pauses currently playing song and sets play boolean to false
           * @param {Object} song
           */

          SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();