# generator-android-gradle [![Build Status](https://secure.travis-ci.org/olakra/generator-android-gradle.png?branch=master)](https://travis-ci.org/olakra/generator-android-gradle)

## Getting Started

### What is android-gradle?

android-gradle is a [Yeoman](http://yeoman.io) generator, used to create an [Android](http://developer.android.com) + [Gradle](http://www.gradle.org/) project.

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-android-gradle from npm, run:

```
$ npm install -g generator-android-gradle
```

Finally, initiate the generator:

```
$ yo android-gradle
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Post Installation Configuration

Once the installation has completed successfully the **local.properties** file needs to be updated to point to your Android SDK directory.

In my environment, I have the sdk installed on : ** /opt/lib/android/android-sdk-macosx **
thus my local.properties looks like

```
sdk.dir=/opt/lib/android/android-sdk-macosx
```

## Building and Running the app

### Building the project using gradle

Once the local.properties file has been updated, **gradle** is available on the shell, execute:

```
$ gradle build
```
This compiles and builds the apk files in the **AndroidApp/builds/apk** directory

### Starting the emulator

To start the emulator execute: 

```
$ android avd
```
If configured correctly, this would start the avd allowing you to start the emulator

### Installing the app

To install and run the app on the emulator execute: 

```
$ adb install AndroidApp/build/apk/AndroidApp-debug-unaligned.apk
```

This will create the **Hello World** app on the emulator. 

## License

MIT
