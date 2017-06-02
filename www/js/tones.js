// https://github.com/bit101/tones
(function(window) {
    var tones = {
        context: new (window.AudioContext || window.webkitAudioContext)(),
        attack: 100,
        release: 200,
        volume: 1,
        type: "sine",


        playFrequency: function(freq, options) {
            options = options || {};
            var attack = options.attack || this.attack || 1;
            var release = options.release || this.release || 1;
            var length = options.length || this.length || 0;
            var envelope = this.context.createGain();
            envelope.connect(this.context.destination);

            envelope.gain.setValueAtTime(0, this.context.currentTime);
            envelope.gain.setTargetAtTime(this.volume, this.context.currentTime, attack / 1000);
            if(this.release) {
                envelope.gain.setTargetAtTime(0, this.context.currentTime + (length + attack) / 1000, release / 1000);
                setTimeout(function() {
                    osc.stop(0);
                    osc.disconnect(envelope);
                    envelope.gain.cancelScheduledValues(tones.context.currentTime);
                    envelope.disconnect(tones.context.destination);

                }, (attack + length + release) * 10);
            }

            var osc = this.context.createOscillator();
            osc.frequency.setValueAtTime(freq, this.context.currentTime);
            osc.type = this.type;
            osc.connect(envelope);
            osc.start(0);
        },

        /** 
         * Usage: 
         * notes.play(440);     // plays 440 hz tone
         * notes.play("c");     // plays note c in default 4th octave
         * notes.play("c#");    // plays note c sharp in default 4th octave
         * notes.play("eb");    // plays note e flat in default 4th octave
         * notes.play("c", 2);  // plays note c in 2nd octave
         */
        play: function(freqOrNote, octave) {
            if(typeof freqOrNote === "number") {
                this.playFrequency(freqOrNote);
            }
            else if(typeof freqOrNote === "string") {
                if(octave == null) {
                    octave = 4;
                }
                this.playFrequency(this.map[octave][this.octaveMap[freqOrNote.toLowerCase()]]);
            }
        },

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

        getTimeMS: function() {
            return this.context.currentTime * 1000;
        },

        makeToneMap: function(pitch, tone, octave) {
            pitch *= Math.pow(2, 9 - octave);
            var map = [];
            octave = 9;
            map.unshift(makeOctaveMap(pitch, tone));
            for(octave--; octave >= 0; octave--) {
                map.unshift(map[0].map(function(tone) {
                    return tone / 2;
                }));
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

    if (typeof define === "function" && define.amd) {
        define(tones);
    } else {
       window.tones = tones;
    }

}(window));