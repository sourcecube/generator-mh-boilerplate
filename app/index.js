'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var mhBoilerplateGenerator = yeoman.generators.Base.extend({

  init: function() {
    this.pkg = require('../package.json');
  },

  askFor: function() {
    var done = this.async();

    console.log(this.yeoman);

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Name the project (name of the theme folder in Wordpress)',
        default: 'mh-boilerplate'
      },{
        type: 'input',
        name: 'projectDescription',
        message: 'Short description of the Project`',
        default: 'undefined'
      },{
        type: 'confirm',
        name: 'projectProxyQuestion',
        message: 'Do you already know the vhost for your Project?',
        default: false
      },{
        when: function(response) {
          return response.projectProxyQuestion;
        },
        type: 'input',
        name: 'projectProxy',
        message: 'Enter the vhost for your Project',
        default: 'project.dev'
      },{
        type: 'list',
        name: 'projectUsage',
        message: 'Which purpose does this Project have? Choose the appropriate option',
        choices: [
          "HTML Protoypes",
          "Wordpress",
          "Craft",
          "laravel"
        ]
      },{
        type: 'input',
        name: 'projectVersion',
        message: 'Project Version Number',
        default: '0.0.1'
      },{
        type: 'input',
        name: 'projectAuthor',
        message: 'Project Author or company',
        default: 'undefined'
      },{
        type: 'input',
        name: 'projectMail',
        message: 'Mailadress of the author',
        default: 'undefined'
      },{
        type: 'input',
        name: 'projectUrl',
        message: 'Author URl',
        default: 'http://...'
      },{
        type: 'input',
        name: 'projectRepo',
        message: 'Git Repo URL',
        default: 'http://...'
      }
    ];

    this.prompt(prompts, function(props) {
      var proxyUsage = props.projectProxyQuestion;

      this.projectName = props.projectName;
      this.projectDescription = props.projectDescription;
      if (proxyUsage) {
        this.projectProxy = props.projectProy;
      }
      console.log(this.projectProxy);
      this.projectUsage = props.projectUsage;
      this.projectVersion = props.projectVersion;
      this.projectAuthor = props.projectAuthor;
      this.projectMail = props.projectMail;
      this.projectUrl = props.projectUrl;
      this.projectRepo = props.projectRepo;
      done();
    }.bind(this));
  },

  app: function() {
    // move src folder
    this.directory('src/js/', 'src/js/');
    this.directory('src/scss/', 'src/scss/');
    this.directory('src/images/', 'src/images/');
    this.directory('src/templates/', 'src/templates/');

  },

  projectfiles: function() {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('_gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },

  install: function () {
    // this.installDependencies();
    var proxy;
    if (this.projectProxy) {
      proxy = this.projectProxy;
    } else {
      proxy = 'localhost';
    }

    if (this.projectUsage == 'laravel') {
      this.spawnCommand('laravel', ['new', 'dist']);
    } else if (this.projectUsage == 'Wordpress') {
      this.spawnCommand('wp', ['core', 'download', '--path=dist/', '--locale=de_DE', '--skip-themes=["twentythirteen", "twentyfourteen"]', '--skip-plugins' ]);
    }

    // this.spawnCommand('git', ['init']);
  }
});

module.exports = mhBoilerplateGenerator;
