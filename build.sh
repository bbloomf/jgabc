#!/bin/bash
export ORG_GRADLE_PROJECT_cdvMinSdkVersion=19
export ANDROID_HOME=~/Library/Android/sdk
PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools:$ANDROID_HOME/emulator
# export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home
# export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
#export ORG_GRADLE_PROJECT_cdvReleaseSigningPropertiesFile=../../../key.properties
cordova build --release --device
# /Applications/Xcode.app/Contents/Applications/Application\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Versions/A/Support/altool --upload-app -f platforms/ios/build/device/Chant\ Tools.ipa -u bhb.123@gmail.com
/Applications/Transporter.app/Contents/itms/bin/iTMSTransporter -m upload -assetFile platforms/ios/build/device/Chant\ Tools.ipa -u bhb123@gmail.com -p @file:appid-secret.key
open platforms/android/app/build/outputs/apk/release
sh open-new-release.sh