// https://github.com/bit101/tones
// this file also includes tones.js
(function(window) {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    unmute(context);
    var tones = {
        context: context,
        attack: 100,
        release: 300,
        volume: 0.33,
        type: "custom",


        playFrequency: function(freq, options) {
            options = options || {};
            var attack = options.attack || this.attack || 1;
            var release = options.release || this.release || 1;
            var length = options.length || this.length || 0;
            var envelope = this.context.createGain();
            envelope.connect(this.context.destination);

            envelope.gain.setValueAtTime(0, this.context.currentTime);
            envelope.gain.setTargetAtTime(this.volume, this.context.currentTime, attack / 3000);
            var stopAndDisconnect = function() {
                osc.stop(0);
                osc.disconnect(envelope);
                envelope.gain.cancelScheduledValues(tones.context.currentTime);
                envelope.disconnect(tones.context.destination);
            };
            if(!options.start) {
                envelope.gain.setTargetAtTime(0, this.context.currentTime + (length + attack) / 1000, release / 3000);
                setTimeout(stopAndDisconnect, (attack + length + release * 2));
            }

            var osc = this.context.createOscillator();
            osc.frequency.setValueAtTime(freq, this.context.currentTime);
            if(this.type != 'custom') {
                osc.type = this.type;
            } else {
                osc.setPeriodicWave(wave);
            }
            osc.connect(envelope);
            osc.start(0);

            if(options.start) {
                var context = this.context;
                return function() {
                    envelope.gain.setTargetAtTime(0, context.currentTime, release / 3000);
                    setTimeout(stopAndDisconnect, release * 2);
                }
            }
        },

        /** 
         * Usage: 
         * notes.play(440);     // plays 440 hz tone
         * notes.play("c");     // plays note c in default 4th octave
         * notes.play("c#");    // plays note c sharp in default 4th octave
         * notes.play("eb");    // plays note e flat in default 4th octave
         * notes.play("c", 2);  // plays note c in 2nd octave
         */
        play: function(freqOrNote, octave, transpose) {
            if(typeof freqOrNote === "number") {
                return this.playFrequency(freqOrNote, octave);
            }
            else if(typeof freqOrNote === "string") {
                if(octave == null) {
                    octave = 4;
                }
                this.playFrequency(this.map[octave * 12 + this.octaveMap[freqOrNote.toLowerCase()]]);
            } else if(freqOrNote.toInt) {
                return this.playFrequency(this.map[freqOrNote.toInt() + (transpose || 0)], octave);
            }
        },

        getNoteName: function(pitch, transpose) {
            pitch = pitch.transpose(transpose);
            return this.octave[pitch.step] + pitch.octave;
        },

        octave: ["c","c#","d","d#","e","f","f#","g","g#","a","a#","b"],

        octaveMap: {
            "c": 0,
            "c#": 1,
            "db": 1,
            "d": 2,
            "d#": 3,
            "eb": 3,
            "e": 4,
            "f": 5,
            "f#": 6,
            "gb": 6,
            "g": 7,
            "g#": 8,
            "ab": 8,
            "a": 9,
            "a#": 10,
            "bb": 10,
            "b": 11
        },

        noteName: [
            "C",
            "C♯ / D♭",
            "D",
            "D♯ / E♭",
            "E",
            "F",
            "F♯ / G♭",
            "G",
            "G♯ / A♭",
            "A",
            "A♯ / B♭",
            "B"
        ],

        getTimeMS: function() {
            return this.context.currentTime * 1000;
        },

        makeToneMap: function(pitch, tone, octave) {
            pitch *= Math.pow(2, 9 - octave);
            var map;
            octave = 9;
            map = makeOctaveMap(pitch, tone);
            for(octave--; octave >= 0; octave--) {
                map = map.slice(0,12).map(function(tone) {
                    return tone / 2;
                }).concat(map);
            }
            return map;
        }
    };

    const pythagoreanOctave = [
        1,
        256 / 243,
        9 / 8,
        32 / 27,
        81 / 64,
        4 / 3,
        1024 / 729,
        // above is diminished fifth; below is augmented fourth:
        // 729, 512,
        3 / 2,
        128 / 81,
        27 / 16,
        16 / 9,
        243 / 128,
    ]

    function makeOctaveMap(pitch, tone) {
        var map = [];
        for(var i = 0; i < 12; ++i) {
            map[i] = pitch * Math.pow(2, (i - tone) / 12);
        }
        return map;
    }

    tones.map = tones.makeToneMap(440, 9, 4);

    // need to create a node in order to kick off the timer in Chrome.
    tones.context.createGain();

    var wave = tones.context.createPeriodicWave(new Float32Array([0,.3,.03,.05]), new Float32Array([0,0,0,0]));


    if (typeof define === "function" && define.amd) {
        define(tones);
    } else {
       window.tones = tones;
    }

}(window));




/**
 * @file unmute.ts
 * @author Spencer Evans evans.spencer@gmail.com
 * https://github.com/swevans/unmute/blob/master/unmute.js
 *
 * unmute is a disgusting hack that helps..
 * 	1) automatically resume web audio contexts on user interaction
 * 	2) automatically pause and resume web audio when the page is hidden.
 * 	3) ios only: web audio play on the media channel rather than the ringer channel
 * 	4) ios only: disable the media playback widget and airplay when:
 *
 * WebAudio is automatically resumed by checking context state and resuming whenever possible.
 *
 * WebAudio pausing is accomplished by watching the page visilibility API. When on iOS, page focus
 * is also used to determine if the page is in the foreground because Apple's page vis api implementation is buggy.
 *
 * iOS Only: Forcing WebAudio onto the media channel (instead of the ringer channel) works by playing
 * a short, high-quality, silent html audio track continuously when web audio is playing.
 *
 * iOS Only: Hiding the media playback widgets on iOS is accomplished by completely nuking the silent
 * html audio track whenever the app isn't in the foreground.
 *
 * iOS detection is done by looking at the user agent for iPhone, iPod, iPad. This detects the phones fine, but
 * apple likes to pretend their new iPads are computers (lol right..). Newer iPads are detected by finding
 * mac osx in the user agent and then checking for touch support by testing navigator.maxTouchPoints > 0.
 *
 * This is all really gross and apple should really fix their janky browser.
 * This code isn't optimized in any fashion, it is just whipped up to help someone out on stack overflow, its just meant as an example.
 */
/**
 * Enables unmute.
 * @param context {AudioContext} A reference to the web audio context to "unmute".
 * @param allowBackgroundPlayback Optional. Default false. Allows audio to continue to play in the background. This is not recommended because it will burn battery and display playback controls on the iOS lockscreen.
 * @param forceIOSBehavior Optional. Default false. Forces behavior to that which is on iOS. This *could* be used in the event the iOS detection fails (which it shouldn't). It is strongly recommended NOT to use this.
 * @returns An object containing a dispose function which can be used to dispose of the unmute controller.
 */
function unmute(
  context,
  allowBackgroundPlayback = false,
  forceIOSBehavior = false,
) {
  //#region Helpers
  // Determine the page visibility api
  var pageVisibilityAPI =
    document.hidden !== undefined
      ? { hidden: () => document.hidden, visibilitychange: 'visibilitychange' }
      : document.webkitHidden !== undefined
      ? {
          hidden: () => document.webkitHidden,
          visibilitychange: 'webkitvisibilitychange',
        }
      : document.mozHidden !== undefined
      ? {
          hidden: () => document.mozHidden,
          visibilitychange: 'mozvisibilitychange',
        }
      : document.msHidden !== undefined
      ? {
          hidden: () => document.msHidden,
          visibilitychange: 'msvisibilitychange',
        }
      : undefined;
  /**
   * Helpers to add a bunch of event listeners
   * @param {EventTarget} target 
   * @param {string[]} events 
   * @param {EventListenerOrEventListenerObject} handler 
   * @param {boolean?} capture 
   * @param {boolean?} passive 
   */
  function addEventListeners(
    target,
    events,
    handler,
    capture,
    passive,
  ) {
    for (var i = 0; i < events.length; ++i)
      target.addEventListener(events[i], handler, {
        capture: capture,
        passive: passive,
      });
  }
  /**
   * Helpers to remove a bunch of event listeners
   * @param {EventTarget} target 
   * @param {string[]} events 
   * @param {EventListenerOrEventListenerObject} handler 
   * @param {boolean?} capture 
   * @param {boolean?} passive 
   */
  function removeEventListeners(
    target,
    events,
    handler,
    capture,
    passive,
  ) {
    for (var i = 0; i < events.length; ++i)
      target.removeEventListener(events[i], handler, {
        capture: capture,
      });
  }
  /**
   * Helper no-operation function to ignore promises safely
   */
  function noop() {}
  //#endregion
  //#region iOS Detection
  var ua = navigator.userAgent.toLowerCase();
  var isIOS =
    forceIOSBehavior ||
    (ua.indexOf('iphone') >= 0 && ua.indexOf('like iphone') < 0) ||
    (ua.indexOf('ipad') >= 0 && ua.indexOf('like ipad') < 0) ||
    (ua.indexOf('ipod') >= 0 && ua.indexOf('like ipod') < 0) ||
    (ua.indexOf('mac os x') >= 0 && navigator.maxTouchPoints > 0); // New ipads show up as macs in user agent, but they have a touch screen
  //#endregion
  //#region Playback Allowed State
  /** Indicates if audio should be allowed to play. */
  var allowPlayback = true; // Assume page is visible and focused by default
  /**
   * Updates playback state.
   */
  function updatePlaybackState() {
    // Check if should be active
    var shouldAllowPlayback =
      allowBackgroundPlayback || // always be active if noPause is indicated
      ((!pageVisibilityAPI || !pageVisibilityAPI.hidden()) && // can be active if no page vis api, or page not hidden
        (!isIOS || document.hasFocus())) // if ios, then document must also be focused because their page vis api is buggy
        ? true
        : false;
    // Change state
    if (shouldAllowPlayback !== allowPlayback) {
      allowPlayback = shouldAllowPlayback;
      // Update the channel state
      updateChannelState(false);
      // The playback allowed state has changed, update the context state to suspend / resume accordingly
      updateContextState();
    }
  }
  /**
   * Handle visibility api events.
   */
  function doc_visChange() {
    updatePlaybackState();
  }
  if (pageVisibilityAPI)
    addEventListeners(
      document,
      [pageVisibilityAPI.visibilitychange],
      doc_visChange,
      true,
      true,
    );
  /**
   * Handles blur events (only used on iOS because it doesn't dispatch vis change events properly).
   * @param {Event} evt
   */
  function win_focusChange(evt) {
    if (evt && evt.target !== window) return; // ignore bubbles
    updatePlaybackState();
  }
  if (isIOS)
    addEventListeners(window, ['focus', 'blur'], win_focusChange, true, true);
  //#endregion
  //#region WebAudio Context State
  /**
   * Updates the context state.
   * NOTE: apple supports (and poorly at that) the proposed "interrupted" state spec, just ignore that for now.
   */
  function updateContextState() {
    if (allowPlayback) {
      // Want to be running, so try resuming if necessary
      if (context.state !== 'running' && context.state !== 'closed') {
        // do nothing if the context was closed to avoid errors... can't check for the suspended state because of apple's crappy interrupted implementation
        // Can only resume after a media playback (input) event has occurred
        if (hasMediaPlaybackEventOccurred) {
          let p = context.resume();
          if (p) p.then(noop, noop).catch(noop);
        }
      }
    } else {
      // Want to be suspended, so try suspending
      if (context.state === 'running') {
        let p = context.suspend();
        if (p) p.then(noop, noop).catch(noop);
      }
    }
  }
  /**
   * Handles context statechange events.
   * @param {Event & { unmute_handled?: true }} evt The event.
   */
  function context_statechange(evt) {
    // Check if the event was already handled since we're listening for it both ways
    if (!evt || !evt.unmute_handled) {
      // Mark handled
      evt.unmute_handled = true;
      // The context may have auto changed to some undesired state, so immediately check again if we want to change it
      updateContextState();
    }
  }
  addEventListeners(context, ['statechange'], context_statechange, true, true); // NOTE: IIRC some devices don't support the onstatechange event callback, so handle it both ways
  if (!context.onstatechange) context.onstatechange = context_statechange; // NOTE: IIRC older androids don't support the statechange event via addeventlistener, so handle it both ways
  //#endregion
  //#region HTML Audio Channel State
  /** The html audio element that forces web audio playback onto the media channel instead of the ringer channel.
   * @type {HTMLAudioElement | null}
  */
  var channelTag = null;
  /**
   * A utility function for decompressing the base64 silence string. A poor-mans implementation of huffman decoding.
   * @param {number} count The number of times the string is repeated in the string segment.
   * @param {string} repeatStr The string to repeat.
   * @returns The
   */
  function huffman(count, repeatStr) {
    var e = repeatStr;
    for (; count > 1; count--) e += repeatStr;
    return e;
  }
  /**
   * A very short bit of silence to be played with <audio>, which forces AudioContext onto the ringer channel.
   * NOTE: The silence MP3 must be high quality, when web audio sounds are played in parallel the web audio sound is mixed to match the bitrate of the html sound.
   * This file is 0.01 seconds of silence VBR220-260 Joint Stereo 859B
   * The str below is a "compressed" version using poor mans huffman encoding, saves about 0.5kb
   */
  var silence =
    'data:audio/mpeg;base64,//uQx' +
    huffman(23, 'A') +
    'WGluZwAAAA8AAAACAAACcQCA' +
    huffman(16, 'gICA') +
    huffman(66, '/') +
    '8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkI' +
    huffman(320, 'A') +
    '//sQxAADgnABGiAAQBCqgCRMAAgEAH' +
    huffman(15, '/') +
    '7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq' +
    huffman(18, '/') +
    '9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAw' +
    huffman(97, 'V') +
    'Q==';
  /**
   * Updates the html audio channel control.
   * @param {boolean} isMediaPlaybackEvent Indicates if being called from within a media playback event handler.
   */
  function updateChannelState(isMediaPlaybackEvent) {
    // Totally unnecessary outside of iOS
    if (isIOS) {
      if (allowPlayback) {
        // We want to be playing back on the media channel, but can only do so from an allowed input event
        if (isMediaPlaybackEvent) {
          // Create a new channel tag if necessary
          if (!channelTag) {
            var tmp = document.createElement('div');
            tmp.innerHTML = "<audio x-webkit-airplay='deny'></audio>"; // Airplay like controls on other devices, prevents casting of the tag, doesn't work on modern iOS
            channelTag = tmp.children.item(0);
            channelTag.controls = false;
            channelTag.disableRemotePlayback = true; // Airplay like controls on other devices, prevents casting of the tag, doesn't work on modern iOS
            channelTag.preload = 'auto';
            channelTag.src = silence;
            channelTag.loop = true;
            channelTag.load();
          }
          // Play the channel tag
          if (channelTag.paused) {
            var p = channelTag.play();
            if (p) p.then(noop, destroyChannelTag).catch(destroyChannelTag); // If playback fails the tag is pretty much trash and needs to be recreated on next media playback event
          }
        }
      } else {
        // We don't want to be allowing playback at all at the moment, so destroy the channel tag to halt playback and hide those silly iOS media controls
        destroyChannelTag();
      }
    }
  }
  /**
   * Complete unloads / destroys the channel tag.
   */
  function destroyChannelTag() {
    if (channelTag) {
      // Change src to nothing and trigger a load, this is required to actually hide / clear the iOS playback controls
      channelTag.src = 'about:blank';
      channelTag.load();
      channelTag = null;
    }
  }
  //#endregion
  //#region Input
  /** The event types that can trigger media playback. */
  var mediaPlaybackEvents = [
    'click',
    'contextmenu',
    'auxclick',
    'dblclick',
    'mousedown',
    'mouseup',
    'touchend',
    'keydown',
    'keyup',
  ];
  /** Tracks if a media playback event has occurred */
  var hasMediaPlaybackEventOccurred = false;
  /**
   * Handles events that can begin media playback.
   */
  function win_mediaPlaybackEvent() {
    hasMediaPlaybackEventOccurred = true;
    // This is an opportunity to resume the html audio channel control
    updateChannelState(true);
    // This is an opportunity to resume the context if paused
    updateContextState();
  }
  addEventListeners(
    window,
    mediaPlaybackEvents,
    win_mediaPlaybackEvent,
    true,
    true,
  );
  //#endregion
  return {
    /**
     * Disposes unmute, relinquishing all control of media playback.
     */
    dispose: function () {
      // Stop / clean up the channel tag
      destroyChannelTag();
      // Remove all listeners
      if (pageVisibilityAPI)
        removeEventListeners(
          document,
          [pageVisibilityAPI.visibilitychange],
          doc_visChange,
          true,
          true,
        );
      if (isIOS)
        removeEventListeners(
          window,
          ['focus', 'blur'],
          win_focusChange,
          true,
          true,
        );
      removeEventListeners(
        window,
        mediaPlaybackEvents,
        win_mediaPlaybackEvent,
        true,
        true,
      );
      removeEventListeners(
        context,
        ['statechange'],
        context_statechange,
        true,
        true,
      );
      if (context.onstatechange === context_statechange)
        context.onstatechange = null;
    },
  };
}
