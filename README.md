# inventari-app

1. Add export ANDROID_SDK_ROOT=$HOME/Android/Sdk
2. cp {,.}env
3. Change on .env the server address
4. Put in application tag of AndroidManifest.xml: android:usesCleartextTraffic="true"
5. Put permission after INTERNET permission: <uses-permission android:name="android.permission.CAMERA" />
6. ionic cap add android if not exists
7. ionic cap copy android --prod (To compile apk)
8. Open Android Studio and upgrade gradle
9. Change on gradle-wrapper.propierties: distributionUrl=https\://services.gradle.org/distributions/gradle-7.4-all.zip
10. 
11. ionic cap run android --livereload --external