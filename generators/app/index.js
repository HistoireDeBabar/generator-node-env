'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-node-env') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please enter the name of your project',
        default: 'universal-webapp',
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Please enter a description of your project',
        default: 'universal-webapp',
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Please enter the author of this project',
        default: '',
      },
      {
        type: 'input',
        name: 'projectRepo',
        message: 'Please enter the repository of this project',
        default: '',
      },
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.directory('./src/', './src');
    this.directory('./test/', './test');
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.props.projectName,
        projectDescription: this.props.projectDescription,
        projectAuthor: this.props.projectAuthor,
        projectRepo: this.props.projectRepo,
      }
    );
    var files = ['index.js', 'gulpfile.js'];
    for (var i = 0; i < files.length; i++) {
      this.fs.copy(
        this.templatePath(files[i]),
        this.destinationPath(files[i])
      );
    }
    // Copy all dot files.
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationRoot()
    );
  },

  install: function () {
    this.installDependencies({ bower: false });
  }
});
