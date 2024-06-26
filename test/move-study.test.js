
var assert = require('assert');
const http = require('./http')

describe('Move Study', function () {
  describe('Happy Paths', function () {
    it('should create new patient', async function () {
      // arrange
      const studyUid = "1.2.3.4.5";
      const newPatientId = "ABC123";
      const body = [{}];
      body[0]["00100020"] = {
        "vr": "LO",
         "Value": newPatientId 
      };  

      //act
      return http.post(`studies/${studyUid}/move`, body).then(async (result) => {
        const newPatient = await http.get(`patients/${newPatientId}/normalizedmetadata`);
        // assert
        // verify using QIDO?
        //assert.equal(newStudy)
      });
     });
    it('TODO: should move the study to an existing patient', async function () { });
    it('TODO: should move the study to an existing patient and change the study instance uid', async function () { });
  });
  describe('failure scenarios', function () {
    it('TODO: should throw if patient id not provided', async function () { });
    it('TODO: should throw if study uid not provided', async function () { });
  });
});