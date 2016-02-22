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
        formId:'registration_form',
        version:'1.0.0'
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
                    formId:'registration_form',
                    version:'1.0.0'
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
                    version:'1.0.0',
                    defaultLanguage: 'English'
                }
            });
```

## Literature Reviewed
- [XLSForm](http://xlsform.org/)


## Licence

The MIT License (MIT)

Copyright (c) 2015 lykmapipo, kusanya & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
