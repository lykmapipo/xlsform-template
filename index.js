'use strict';

//dependencies
var _ = require('lodash');
var xlsx = new require('xlsx-tools');
var fs = require('fs');

//survey worksheet default headers
var surveyHeaders = [
    'type', 'name', 'label', 'hint', 'constraint',
    'constraintMessage', 'required', 'default',
    'relevant', 'readOnly', 'appearance'
];

//choices worksheet default headers
var choicesHeaders = ['listName', 'name', 'label'];

//settings worksheet default headers
var settingsHeaders = [
    'formTitle', 'formId',
    'defaultLanguage', 'instanceName'
];

//default form setting
var setting = {
    formTitle: 'XLSForm',
    formId: 'Form ID',
    defaultLanguage: 'English'
};

//default meta questions
var meta = [{
    type: 'start',
    name: 'start'
}, {
    type: 'end',
    name: 'end'
}, {
    type: 'today',
    name: 'today'
}, {
    type: 'deviceid',
    name: 'deviceid'
}, {
    type: 'simserial',
    name: 'simserial'
}, {
    type: 'phonenumber',
    name: 'phonenumber'
}];


/**
 * @constructor
 * @description build xlsform template with common setup 
 * @param {Object} options template options
 * @return {Object} template instance
 */
function Template(options) {
    //normalize options
    options = options || {};

    //extend defaults
    this.surveyHeaders =
        _.compact(_.union(surveyHeaders, options.surveyHeaders));

    this.choicesHeaders =
        _.compact(_.union(choicesHeaders, options.choicesHeaders));

    this.settingsHeaders =
        _.compact(_.union(settingsHeaders, options.settingsHeaders));

    //extend meta questions
    meta = _.compact(_.union(meta, options.meta));

    //extend form settings
    setting = _.merge(setting, options.setting);

    //prepare template workbook
    this.workbook = xlsx.workbook();

    //prepare worksheets
    this.survey = xlsx.worksheet('survey');
    this.choices = xlsx.worksheet('choices');
    this.settings = xlsx.worksheet('settings');

    //add workbook sheets
    this.workbook.addSheet(this.survey);
    this.workbook.addSheet(this.choices);
    this.workbook.addSheet(this.settings);

    //build survey worksheet header
    this.survey.setHeader(_.map(this.surveyHeaders, _.snakeCase));

    //build default preloader/meta questions rowa
    _.forEach(meta, function(_meta) {
        this.survey.addRow(_meta);
    }.bind(this));

    //build choices worksheet header
    this.choices.setHeader(_.map(this.choicesHeaders, _.snakeCase));

    //build settings worksheet header
    this.settings.setHeader(_.map(this.settingsHeaders, _.snakeCase));

    //build settings rows
    setting = _.map(setting, function(value, key) {
        var conf = {};
        conf[_.snakeCase(key)] = value;
        return conf;
    });
    setting = _.reduce(setting, function(result, n) {
        return _.merge(result, n);
    }, {});
    this.settings.addRow(setting);

}


/**
 * @function
 * @description write current workbook content into file
 * @param  {Object}   filename full qualified name of the file to write
 * @param  {Object}   options  file write options to be passed to `fs.writeFile`
 * @param  {Function} done     a callback to invoke on success or failure
 * @public
 */
Template.prototype.writeFile = function(filename, options, done) {
    //normalize arguments
    if (filename && _.isFunction(filename)) {
        done = filename;
        filename = Date.now() + '.xls';
    }

    if (filename && !_.isFunction(filename) && options && _.isFunction(options)) {
        done = options;
        options = {};
    }

    //prepare data
    var data = new Buffer(this.workbook.write(), 'binary');

    //write data to a file
    fs.writeFile(filename, data, options, done);
};


/**
 * @function
 * @description download current workbook content through http response
 * @param  {Object} response valid http request
 * @param  {Object} options  options to set on response
 * @public
 */
Template.prototype.download = function(response, options) {
    //merge options with default
    options = _.merge({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        filename: Date.now() + '.xls'
    }, options);

    //prepare data
    var data = new Buffer(this.workbook.write(), 'binary');

    //set response type
    response.type(options.type);

    //set file name
    response.attachment(options.filename);

    //respond with the template
    response.send(data);

};


//export xlsform template
module.exports = exports = Template;