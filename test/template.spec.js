'use strict';

//dependencies
var path = require('path');
var fs = require('fs');
var express = require('express');
var request = require('supertest');
var del = require('del');
var mkdir = require('mkdir-p');
var chai = require('chai');
chai.use(require('chai-fs'));
var expect = require('chai').expect;
var generatedPath = path.join(__dirname, 'fixture', 'generated');
var sample = path.join(__dirname, 'fixture', 'sample.xls');

//xlsform template builder
var Template = require(path.join(__dirname, '..'));

describe('xlsform template', function() {

    beforeEach(function() {
        mkdir.sync(generatedPath);
    });

    afterEach(function() {
        //cleanup file
        del.sync([generatedPath + '**']);
    });

    it('should be functional constructor', function() {
        expect(Template).to.be.a('function');
    });

    it('should be able to build and write xlsform template in specified path', function(done) {
        var filename =
            path.join(generatedPath, Date.now() + '.xls');

        var template = new Template();

        template.writeFile(filename, function(error) {

            expect(error).to.not.exist;
            expect(filename).to.be.a.file().and.not.empty;

            expect(fs.readFileSync(filename).toString('base64').substr(0, 12))
                .to.be.equal(fs.readFileSync(sample).toString('base64').substr(0, 12));

            done();
        });
    });

    it('should be able to build and download xlsform template in specified http path', function(done) {
        var filename = Date.now() + '.xls';

        var app = express();
        app.get('/xlsform', function(request, response) {
            var template = new Template();
            template.download(response, {
                filename: filename
            });
        });

        function binaryParser(response, callback) {
            response.setEncoding('binary');
            response.data = '';
            response.on('data', function(chunk) {
                response.data += chunk;
            });
            response.on('end', function() {
                callback(null, new Buffer(response.data, 'binary'));
            });
        }

        request(app)
            .get('/xlsform')
            .expect(200)
            .parse(binaryParser)
            .end(function(error, response) {

                expect(error).to.not.exist;

                expect(response.headers['content-type'])
                    .to.equal('application/vnd.ms-excel');

                expect(response.headers['content-disposition']).to.exist;

                expect(response.headers['content-disposition'])
                    .to.be.equal('attachment; filename="' + filename + '"');

                expect(response.body.toString('base64').substr(0, 12))
                    .to.be.equal(fs.readFileSync(sample).toString('base64').substr(0, 12));

                done(error, response);

            });
    });

});