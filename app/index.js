'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var sdkVersions = [
    'API level 1: Android 1.0',
    'API level 2: Android 1.1',
    'API level 3: Android 1.5, NDK 1  (Cupcake)',
    'API level 4: Android 1.6, NDK 2  (Donut)',
    'API level 5: Android 2.0 (Eclair)',
    'API level 6: Android 2.0.1 (Eclair)',
    'API level 7: Android 2.1, NDK 3  (Eclair)',
    'API level 8: Android 2.2.x, NDK 4  (Froyo)',
    'API level 9: Android 2.3 - 2.3.2, NDK 5 (Gingerbread)',
    'API level 10: Android 2.3.3 - 2.3.7: (Gingerbread)',
    'API level 11: Android 3.0: (Honeycomb)',
    'API level 12: Android 3.1, NDK 6 (Honeycomb)',
    'API level 13: Android 3.2.x (Honeycomb)',
    'API level 14: Android 4.0.1 - 4.0.2, NDK 7 (Ice Cream Sandwich)',
    'API level 15: Android 4.0.3 - 4.0.4, NDK 8 (Ice Cream Sandwich)',
    'API level 16: Android 4.1.x (Jelly Bean)',
    'API level 17: Android 4.2.x (Jelly Bean)',
    'API level 18: Android 4.3.x (Jelly Bean)',
    'API level 19: Android 4.4 - 4.4.2 (KitKat)'
  ].map(function(name, value) {
    return {name: name, value: value};
});

var AndroidGradleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.log("\n");
      this.log("Finished creating your " + chalk.red.bold(this.appName) + " Android+Gradle application.");
      this.log("Please update the " + chalk.yellow.bold('local.properties') + " with the Android SDK path");
      this.log("\nOpen your favorite IDE and have fun building your next great app.");
      this.log("\n");
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('This generator will allow you to create a minimal Android project with Gradle support.'));

    var prompts = [
    {
      name: 'appName',
      message: 'What is the name of your Android application?',
      default: 'Hello World'
    },
    {
      name: 'packageName',
      message: 'What is the package name?',
      default: 'com.example.mobile.app'
    },
    {
      name: 'minApiLevel',
      message: 'Minimum required Android SDK:',
      type: 'list',
      choices: sdkVersions,
      default: 18
    }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.packageName = props.packageName;
      this.minApiLevel = props.minApiLevel;
      this.minAndroidSDK = (this.minApiLevel + 1);

      if(this.packageName !== undefined) {
        this.packageFolder = this.packageName.replace(/\./g, '/');
      }

      if(this.appName !== undefined) {
          this.className = this._.classify(this._.slugify(this._.humanize(props.appName.replace(/ /g, ''))));
          this.projectName = this._.camelize(this.className);
      }

      done();
    }.bind(this));
  },

  app: function () {
    var _appDir = [
      'AndroidApp',
      'AndroidApp/assets',
      'AndroidApp/bin',
      'AndroidApp/gen',
      'AndroidApp/src',
      'AndroidApp/tests',
      'AndroidApp/tests/res',
      'AndroidApp/tests/src',
    ];

    this.log('\n' + chalk.green('Creating ') + 'project directories:');
    var _appDirLength = _appDir.length;

    for(var idx = 0; idx < _appDirLength; idx++) {
      this.mkdir(_appDir[idx]);
      this.log('\t' + chalk.green('create ') + _appDir[idx]);
    }

    this.log('\n' + chalk.green('Creating ') + 'android resources:');
    this.directory('res', 'AndroidApp/res');

    this.log('\n' + chalk.green('Creating ') + 'android libs:');
    this.directory('libs', 'AndroidApp/libs');

    this.log('\n' + chalk.green('Creating ') + 'android configurations:');
    this.template('config/android/_AndroidManifest.xml', 'AndroidApp/AndroidManifest.xml');
    this.template('config/android/_build.gradle', 'AndroidApp/build.gradle');
    this.template('config/android/_proguard-project.txt', 'AndroidApp/proguard-project.txt');
    this.template('config/android/_project.properties', 'AndroidApp/project.properties');
  }
});

module.exports = AndroidGradleGenerator;

/*
 * Method copies the project configration files from the template/config/project
 * directory to the project's root directory.
 */
AndroidGradleGenerator.prototype.projectConfigFiles = function projectConfigFiles() {
  var _configs = [
    'editorconfig',
    'jshintrc',
    'gitignore',
    'checkstyle.xml',
    'eclipse-formatter.xml',
    'findbugs-exclude.xml'
  ];

  this.log('\n' + chalk.green('Creating ') + 'project configuration files:');
  var _configLength = _configs.length;

  for(var idx = 0; idx < _configLength; idx++) {
      var s = _configs[idx];
      if(s.substring(s.length - 3) === 'xml')
        this.copy('config/project/_' + _configs[idx], _configs[idx]);
      else
        this.copy('config/project/_' + _configs[idx], '.' + _configs[idx]);
  }
};

/*
 * Method copies the gradle configration files form the template/config/gradle
 * directory to the project's root directory
 */
AndroidGradleGenerator.prototype.gradleConfigFiles = function gradleConfigFiles() {
  var _configs = [
    'build.gradle',
    'gradle.properties',
    'local.properties',
    'settings.gradle'
  ];

  this.log('\n' + chalk.green('Creating ') + 'gradle configuration files:');
  var _configLength = _configs.length;

  for(var idx = 0; idx < _configLength; idx++) {
      this.template('config/gradle/_' + _configs[idx], _configs[idx]);
  }
};

/*
 * Method copies the android resource files
 */
AndroidGradleGenerator.prototype.androidResFiles = function androidResFiles() {
  this.log('\n' + chalk.green('Creating ') + 'android resource files:');

  this.template('config/android/_strings.xml', 'AndroidApp/res/values/strings.xml');
  this.template('config/android/_main.xml', 'AndroidApp/res/menu/main.xml');

  this.template('config/android/_fragment_main.xml', 'AndroidApp/res/layout/fragment_main.xml');
  this.template('config/android/_activity_main.xml', 'AndroidApp/res/layout/activity_main.xml');

  this.copy('config/android/web_hi_res_512.png', 'AndroidApp/web_hi_res_512.png');
};

/*
 * Method copies the android source files
 */
AndroidGradleGenerator.prototype.androidSrcFiles = function androidSrcFiles() {
  this.log('\n' + chalk.green('Creating ') + 'android source files:');

  var srcDir = 'AndroidApp/src/' + this.packageFolder + '/';
  this.template('src/main/_MainActivity.java', srcDir + 'MainActivity.java');

  srcDir += 'common/logger/';
  this.template('src/main/common/logger/_Log.java', srcDir + 'Log.java');
  this.template('src/main/common/logger/_LogFragment.java', srcDir + 'LogFragment.java');
  this.template('src/main/common/logger/_LogNode.java', srcDir + 'LogNode.java');
  this.template('src/main/common/logger/_LogView.java', srcDir + 'LogView.java');
  this.template('src/main/common/logger/_LogWrapper.java', srcDir + 'LogWrapper.java');
  this.template('src/main/common/logger/_MessageOnlyLogFilter.java', srcDir + 'MessageOnlyLogFilter.java');
};
