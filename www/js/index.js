/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("pause", this.onPause, false);
        document.addEventListener("resume", this.onResume, false);
        document.addEventListener("DOMContentLoaded", function(event) {
            document.getElementById("shareUrl").addEventListener("click", app.shareUrl, false);
          });
    },

    // pause Event Handler
    onPause: function() {
        // Store current url in local storage
        if(location.hash && location.pathname.match(/\/propers\.html$/)) {
            localStorage.savedHash = location.hash;
            localStorage.savedTime = new Date().getTime();
        } else {
            delete localStorage.savedHash;
            delete localStorage.savedTime;
        }
    },

    // resume Event Handler
    onResume: function() {
        // check for url in local storage
        if(localStorage.savedHash && (new Date().getTime() - localStorage.savedTime < 7200000)) {
            if(location.hash != localStorage.savedHash) location = 'propers.html' + localStorage.savedHash;
        }
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        
        window.plugins.webintent.getUri(function(url) {
            if(url) app.handleUrl(url);
            else app.onResume();
        }); 
        window.plugins.webintent.onNewIntent(function(url) {
            if(url) app.handleUrl(url);
            else app.onResume();
        });
    },

    handleUrl: function(url) {
        if(!url) {
            app.onResume();
            return;
        }
        var urlRegex = /\/\/bbloomf.github.io\/jgabc\/(.*)$/i;
        var match = urlRegex.exec(url);
        if(match) {
            location = match[1];
        } else {
            if(!location.pathname.match(/\/propers\.html$/)) location = 'propers.html';
        }
    },

    shareUrl: function(e) {
        e.preventDefault();

        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        var options = {
          //message: 'http://bbloomf.github.io/jgabc/propers.html' + location.hash,
          //subject: 'the subject', // fi. for email
          url: 'http://bbloomf.github.io/jgabc/propers.html' + location.hash,
          chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
        }

        var onSuccess = function(result) {
          console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
          console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }

        var onError = function(msg) {
          console.log("Sharing failed with message: " + msg);
        }

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();