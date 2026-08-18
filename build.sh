#!/bin/bash
export ORG_GRADLE_PROJECT_cdvMinSdkVersion=21
export ANDROID_HOME=~/Library/Android/sdk
PATH="/usr/bin:$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools:$ANDROID_HOME/emulator"
# export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home
# export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
#export ORG_GRADLE_PROJECT_cdvReleaseSigningPropertiesFile=../../../key.properties
cordova build --release --device ios
ALTOOL_PW="$(cat appid-secret.key)" xcrun altool --upload-app --show-progress -f platforms/ios/build/Release-iphoneos/Chant\ Tools.ipa -u bhb123@gmail.com -p @env:ALTOOL_PW
open platforms/android/app/build/outputs/apk/release
sh open-new-release.sh