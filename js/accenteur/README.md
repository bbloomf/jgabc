Vendored from https://github.com/BrRoman/accenteur at commit
cf3793f9a00502e80a0095e36391c544c0b79464.

engine.js combines static/js/data.js and static/js/accenteur_core.js unchanged
inside an IIFE, exposing only window.Accenteur.accentify to avoid global collisions.
See LICENSE.md for the upstream MIT license.
