// https://github.com/bit101/tones
(function(window) {

    var tones = {
        context: new (window.AudioContext || window.webkitAudioContext)(),
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