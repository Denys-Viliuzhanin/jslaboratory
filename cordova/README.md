
Cordova Sample Projects
===========================

#Install Cordova

```bash
npm install -g cordova
```

#Create new Projects

```bash
cordova create hello com.example.hello HelloWorld
```

#Add platform

See all available platforms
```bash
cordova platform ls
```

Add platform
```bash
cordova platform add <PLATFORM>
```

Please take a look several examples
```bash
cordova platform add browser
cordova platform add ios
cordova platform add android
```

#Build Project

To build all platforms use
```bash
cordova build
```

To build one platform use
```bash
cordova build ios
```

#Run application

To run application for specific platform please use
```bash
cordova run <PLATFORM>
```

Please take a look several examples

```bash
cordova run browser
cordova run android
```
