/*
 * Light/dark theme switching shared by all pages.  Load this synchronously in
 * <head> (after the stylesheets) so <html> already carries the right class
 * before the first paint.
 *
 * Dark mode is on when the device prefers a dark color scheme, unless the user
 * has turned it off with the in-app toggle (persisted in
 * localStorage.disableDarkMode).  The toggle itself is only shown while the
 * device is in dark mode, since that is the only time the setting changes
 * anything.
 */
(function (window, document) {
  'use strict';

  var STORAGE_KEY = 'disableDarkMode';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function systemPrefersDark() {
    return !!(media && media.matches);
  }

  function isDarkModeDisabled() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  function isDark() {
    return systemPrefersDark() && !isDarkModeDisabled();
  }

  function setDarkModeDisabled(disabled) {
    try {
      if (disabled) window.localStorage.setItem(STORAGE_KEY, 'true');
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // storage unavailable: the change still applies for this page load
    }
    applyTheme();
  }

  function updateToggles() {
    var toggles = document.querySelectorAll('.dark-mode-toggle');
    var show = systemPrefersDark();
    var dark = isDark();
    for (var i = 0; i < toggles.length; ++i) {
      var toggle = toggles[i];
      toggle.hidden = !show;
      toggle.classList.toggle('active', dark);
      toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
      toggle.title = 'Dark mode: ' + (dark ? 'On' : 'Off');
    }
  }

  // cordova-android 15+ exposes window.statusbar.setBackgroundColor (SystemBarPlugin);
  // keep the status bar strip in step with the page so it doesn't stand out.
  function syncStatusBar(dark) {
    var statusbar = window.statusbar;
    if (!statusbar || typeof statusbar.setBackgroundColor !== 'function') return;
    try {
      statusbar.setBackgroundColor(dark ? '#000000' : '#ffffff');
    } catch (e) {
      // not running inside the Android app
    }
  }

  function applyTheme() {
    var dark = isDark();
    root.classList.toggle('dark', dark);
    updateToggles();
    syncStatusBar(dark);
    try {
      document.dispatchEvent(new CustomEvent('themechange', { detail: { dark: dark } }));
    } catch (e) {
      // CustomEvent unsupported: nothing listens in that case anyway
    }
  }

  function onToggleClick(e) {
    e.preventDefault();
    setDarkModeDisabled(isDark());
  }

  // Before the body exists: just get the class right so there is no flash.
  root.classList.toggle('dark', isDark());

  document.addEventListener('DOMContentLoaded', function () {
    var toggles = document.querySelectorAll('.dark-mode-toggle');
    for (var i = 0; i < toggles.length; ++i) {
      toggles[i].addEventListener('click', onToggleClick);
    }
    applyTheme();
  });
  document.addEventListener('deviceready', function () {
    applyTheme();
  }, false);
  if (media) {
    if (media.addEventListener) media.addEventListener('change', applyTheme);
    else if (media.addListener) media.addListener(applyTheme);
  }

  window.jgabcTheme = {
    isDark: isDark,
    systemPrefersDark: systemPrefersDark,
    isDarkModeDisabled: isDarkModeDisabled,
    setDarkModeDisabled: setDarkModeDisabled,
    refresh: applyTheme
  };
})(window, document);
