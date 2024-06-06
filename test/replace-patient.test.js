const http = require('./http')

describe('Replace Patient', function () {
  describe('Happy Paths', function () {
    it('should update the patient name and date of birth', async function () {
      // arrange
      const patientId = "PATIENTIDTOUPDATE";
      const patient = await http.get(`patients/${patientId}/normalizedmetadata`);
      // patient name
      patient[0]["00100010"] = {
          "vr": "PN",
          "Value": "DOE^JOHN" 
      };
      // birthdate
      patient[0]["00100030"] = { 
          "vr": "DA",
          "Value": "DOE^JOHN" 
      };

      //act
      return http.post(`patients/${patientId}`, patient).then(async (result) => {
        const updatedPatient = await http.get(`patients/${patientId}`)
        // assert
        //assert.deepEqual(patient, updatedPatient);
      })

    });
    it('should update the patient id', async function () {
        // arrange
        const patientId = "PATIENTIDTOUPDATE";
        const newPatientId = "ABC123";
        const patient = await http.get(`patients/${patientId}/normalizedmetadata`);
        patient[0]["00100020"] = {
          "vr": "LO",
           "Value": newPatientId 
        };

        // act
        return http.post(`patients/${patientId}`, patient).then(async (result) => {
          const updatedPatient = await http.get(`patients/${newPatientId}`)
          // assert
          //assert.deepEqual(patient, updatedPatient);
        });
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
