(function() {
     function SongPlayer($rootScope, Fixtures) {
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


          /**
          *@function getSongIndex
          *@desc returns index of song in current album
          @param {Object} song
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
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
          
          SongPlayer.currentTime = null;

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
                 stopSong(SongPlayer.currentSong);
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
             });
             
             currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();
                });
             });

             // Set newly selected song as the currentSong
             SongPlayer.currentSong = song;
          };

          /**
          *@function stopSong
          *@desc stops the current song
          *@param {Object} song
          */

          var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
          }

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
                  stopSong(SongPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }

          };

          /**
          *@function next
          *@desc plays the next song
          */
          SongPlayer.next = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;

              if (currentSongIndex > currentAlbum.songs.length) {
                  stopSong(SongPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };
          
          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
          SongPlayer.setCurrentTime = function(time) {
              if (currentBuzzObject) {
                  currentBuzzObject.setTime(time);
              }
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();