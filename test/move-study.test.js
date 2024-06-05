
var assert = require('assert');
const http = require('./http')

describe('Move Series', function () {
  describe('Happy Paths', function () {
    it('should create new patient', async function () { });
    it('should move the study to an existing patient', async function () { });
    it('should move the study to an existing patient and change the study instance uid', async function () { });
  });
  describe('failure scenarios', function () {
    it('should throw if patient id not provided', async function () { });
    it('should throw if study uid not provided', async function () { });
  });
});