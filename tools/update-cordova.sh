#!/bin/bash
# Brings the cordova branch up to the latest release on master, in this checkout:
#
#   npm run update-cordova
#
# Run it on master once the release is pushed: `npm version patch` (whose postversion pushes master
# and its tag).  It checks out cordova, merges origin/master, and commits the version from
# package.json into config.xml, leaving you on cordova to run ./build.sh.
set -euo pipefail

fail() {
  echo "update-cordova: $1" >&2
  exit 1
}

# All in a function, so bash has read every line before checking out cordova changes this file.
main() {
  cd "$(git rev-parse --show-toplevel)"
  git diff --quiet HEAD || fail "commit or stash your changes first"

  git fetch origin
  if git rev-parse -q --verify refs/heads/master >/dev/null &&
      [ "$(git rev-parse master)" != "$(git rev-parse origin/master)" ]; then
    fail "master and origin/master differ; push the release to master first"
  fi

  local version
  version="$(git show origin/master:package.json | node -p 'JSON.parse(require("fs").readFileSync(0, "utf8")).version')"
  # ./build.sh makes the GitHub release on this tag.
  git ls-remote --exit-code --tags origin "refs/tags/v$version" >/dev/null ||
    fail "there is no tag v$version; push it from master first (git push --tags)"

  git checkout cordova
  git merge --ff-only origin/cordova
  # Most of master's files are under www/ on cordova; git's rename detection puts master's changes there.
  git merge --no-edit -m "Merge branch 'master' into cordova" origin/master ||
    fail "resolve the merge, commit it, and run this again"

  # The before_prepare hook does this at build time too, but commit it so config.xml says what was built.
  node -e 'require("./hooks/sync-config-version.js")({opts: {projectRoot: process.cwd()}})'
  git add config.xml
  git diff --cached --quiet || git commit -q -m "chore: Bump config.xml to $version"

  echo
  echo "cordova is at $version. Next:"
  echo "  ./build.sh"
  echo "  git push origin cordova"
  echo "  git checkout master"
}

main "$@"
exit
