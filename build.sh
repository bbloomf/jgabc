#!/bin/bash
export ORG_GRADLE_PROJECT_cdvMinSdkVersion=19
#export ORG_GRADLE_PROJECT_cdvReleaseSigningPropertiesFile=../../../key.properties
cordova build --release --device
# /Applications/Xcode.app/Contents/Applications/Application\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Versions/A/Support/altool --upload-app -f platforms/ios/build/device/Chant\ Tools.ipa -u bhb.123@gmail.com
/Applications/Transporter.app/Contents/itms/bin/iTMSTransporter -m upload -assetFile platforms/ios/build/device/Chant\ Tools.ipa -u bhb123@gmail.com -p @file:appid-secret.key