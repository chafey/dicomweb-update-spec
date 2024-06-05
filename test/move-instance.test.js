
var assert = require('assert');
const http = require('./http')

describe('Move Instance', function () {
  describe('Happy Paths', function () {
    it('should create new patient', async function () { });
    it('should create new patient and study', async function () { });
    it('should create new patient, study and series', async function () { });
    it('should move the instance to an existing patient/study/series', async function () { });
    it('should move the instance to an existing patient/study/series and change the sop instance uid', async function () { });
  });
  describe('failure scenarios', function () {
    it('should throw if patient id not provided', async function () { });
    it('should throw if study uid not provided', async function () { });
    it('should throw if series uid not provided', async function () { });
  });
});
