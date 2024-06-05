var assert = require('assert');
const http = require('./http')

describe('Update Patient', function () {
  describe('Happy Paths', function () {
    it('should update the patient id', async function () {
        // arrange
        const patientId = "PATIENTIDTOUPDATE";
        const newPatientId = "NEWPATIENTID";
        const patient = http.get(`patients/${patientId}/normalizedmetadata`);
        patient["00100020"] = {
          "vr": "LO",
           "Value":  "ABC123"
        };

        // act
        return http.post(`patients/${patientId}`, patient).then(async (result) => {
          const updatedPatient = await http.get(`patients/${patientId}`)
          //assert
          //assert.equals(result, undefined);
        });
    });

    it('should update the patient name and date of birth', async function () {
      // arrange
      const patientId = "PATIENTIDTOUPDATE";
      const patient = http.get(`patients/${patientId}/normalizedmetadata`);
      // patient name
      patient["00100010"] = {
          "vr": "PN",
          "Value": "DOE^JOHN" 
      };
      // birthdate
      patient["00100030"] = { 
          "vr": "DA",
          "Value": "DOE^JOHN" 
      };

      //act
      return http.post(`patients/${patientId}`, patient).then(async (result) => {
        const updatedPatient = await http.get(`patients/${patientId}`)
        // assert
        //assert.notEqual(result, undefined);
      })

    });
  });
  describe('failure scenarios', function () {
    it('update to non existant patient should fail', async function () {
      /*
      // arrange
      const patientId = "DOESNOTEXIST";
      const patient = http.get(`patients/${patientId}/normalizedmetadata`);
      const body = {
          "00100010" : {
              "vr": "PN",
              "Value": "DOE^JOHN" 
          },
      }

      // act
      return(http.postThrows(`patients/${patientId}`, body).then((result) => {
        //assert
        //assert.notEqual(result, undefined);
      }));
    */
    });
  });
});
