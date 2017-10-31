# SecurityPanel


## Development Simulator

1. Make sure `npm install` has been run and there is a `node_modules` folder
1. For Windows run `npm run security-windows` else run `npm run security`
1. Run/open the app on a [device](https://facebook.github.io/react-native/docs/running-on-device.html)


## Build and install apk on device (Android)

1. Options
    1. Option 1: Navigate to the android folder (`cd android`) then run `.\gradlew assembleRelease` (Prod) or `.\gradlew assembleReleaseStaging` (Staging)
    1. Option 2: Open Android Studio as Administrator -> Click `Build` tab -> `Generate Signed APK...` -> Enter `password` -> `Next` -> Select Build Type (either `release` or `releaseStaging`) -> Check both boxes -> `Finish`
1. To install navigate to the apk folder `cd .\app\build\outputs\apk\release\` or `cd .\app\build\outputs\apk\releaseStaging\`
1. For Release/Production build run `adb install .\app-release_{VERSION}.apk` and for Staging run `adb install .\app-releaseStaging_{VERSION}.apk`


## CodePush (Android)

1. Once changes have been made, saved, and tested, navigate to the root of this project and run `code-push release-react SecurityPanel-Android android` to push changes to staging
1. Once changes have been checked on a staging build and a production push is desired, navigate to the root of this project and run `code-push promote SecurityPanel-Android Staging Production -t '*'`
