var assert = require('assert');
const http = require('./http')

describe('Update Patient', function () {
  describe('Happy Paths', function () {
    it('should update the patient id', async function () {
        // arrange
        const patientId = "PATIENTIDTOUPDATE";
        const newPatientId = "NEWPATIENTID";
        const body = {
            "00100020" : {
                "vr": "LO",
                "Value":  newPatientId
            }
        }

        // act
        return(http.post(`patients/${patientId}`, body).then((result) => {
          //assert
          //assert.equals(result, undefined);
        }));
    });
    it('should update the patient name and date of birth', async function () {
      // arrange
      const patientId = "PATIENTIDTOUPDATE";
      const body = {
          "00100010" : {
              "vr": "PN",
              "Value": "DOE^JOHN" 
          },
          "00100030" : {
              "vr": "DA",
              "Value": "19730211"
          }
      }

      //act
      const oldPatient = await http.get(`patients/${patientId}`)
      const result = await http.post(`patients/${patientId}`, body)
      const updatedPatient = await http.get(`patients/${patientId}`)

      // assert
      //assert.notEqual(result, undefined);
    });
  });
  describe('failure scenarios', function () {
    it('update to non existant patient id should fail', async function () {
      // arrange
      const patientId = "DOESNOTEXIST";
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
    });
  });
});
