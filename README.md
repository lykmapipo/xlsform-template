xlsform-template
================

[![Build Status](https://travis-ci.org/lykmapipo/xlsform-template.svg?branch=master)](https://travis-ci.org/lykmapipo/xlsform-template)

Utilities create [XLSForm](http://xlsform.org/) template for [nodejs](https://github.com/nodejs)

It will generate `excel` workbook contains `survey`, `choices` and `settings` worksheets with the most commonly used `xlsform fields`

## Installation
```sh
$ npm install --save xlsform-template
```

## Usage
```js
var template = new require('xlsform-template')({
    setting:{
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
                setting:{
                    formTitle:'Registration',
                    formId:'registration_form'
                }
            });

            template.download(response, {
                filename: filename
            });

        });

```

## Literature Reviewed
- [XLSForm](http://xlsform.org/)