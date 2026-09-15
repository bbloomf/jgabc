/*
 * Light/dark theme switching shared by all pages.  Load this synchronously in
 * <head> (after the stylesheets) so <html> already carries the right class
 * before the first paint.
 *
 * Dark mode follows the device's preferred color scheme until the user picks a
 * side with the toggle.  Only a choice that disagrees with the device is
 * stored (localStorage.darkMode, "true" or "false"); toggling back to what the
 * device asks for clears it, so the page follows the device again.
 */
(function (window, document) {
  'use strict';

  var STORAGE_KEY = 'darkMode';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function systemPrefersDark() {
    return !!(media && media.matches);
  }

  // "true"/"false" when the user has overridden the device, otherwise null.
  function storedChoice() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      return stored === 'true' || stored === 'false' ? stored : null;
    } catch (e) {
      return null;
    }
  }

  function isDark() {
    var stored = storedChoice();
    return stored === null ? systemPrefersDark() : stored === 'true';
  }

  function setDark(dark) {
    try {
      if (dark === systemPrefersDark()) window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, dark ? 'true' : 'false');
    } catch (e) {
      // storage unavailable: the change still applies for this page load
    }
    applyTheme();
  }

  function updateToggles() {
    var toggles = document.querySelectorAll('.dark-mode-toggle');
    var dark = isDark();
    for (var i = 0; i < toggles.length; ++i) {
      var toggle = toggles[i];
      // the markup ships hidden so the button never shows without this script
      toggle.hidden = false;
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
    setDark(!isDark());
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
    setDark: setDark,
    refresh: applyTheme
  };
})(window, document);
