xlsform-template
=================

[![Build Status](https://travis-ci.org/lykmapipo/xlsform-template.svg?branch=master)](https://travis-ci.org/lykmapipo/xlsform-template)

Utilities create [XLSForm](http://xlsform.org/) template for [nodejs](https://github.com/nodejs)

It generate `excel` workbook contains `survey`, `choices` and `settings` worksheets contains most commonly used `xlsform fields`

## Installation
```sh
$ npm install --save xlsform-template
```

## Usage
```js
var template = new require('xlsform-template')({
    settings:{
        formTitle:'Registration',
        formId:'registration_form'
    }
});

//write template to file
template.writeFile(_<filename>_, function(error,result) {
    ...
});

//download it on http request
app.get('/xlsform', function(request, response) {
            var template = new Template({
                settings:{
                    formTitle:'Registration',
                    formId:'registration_form'
                }
            });

            template.download(response, {
                filename: filename
            });

        });

```

## Options

## Settings
Must be a valid and allowed `setting` column in `XLSForm`. They must be in camelcase e.g for `form_id` should be provided as `formId`

Example
```js
var template = new Template({
                settings:{
                    formTitle:'Registration',
                    formId:'registration_form',
                    instanceName:'<value>' or `<expression>`,
                    defaultLanguage: 'English'
                }
            });
```

## Literature Reviewed
- [XLSForm](http://xlsform.org/)