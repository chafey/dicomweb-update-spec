
var assert = require('assert');
const http = require('./http')

describe('Update Study', function () {
  describe('Happy Paths', function () {
    it('should update the study uid', async function () {
        // arrange
        const studyUid= "1.2.3.4.5";
        const newStudyUid= "1.2.3.4.6";
        const body = {
            "00200000D" : {
                "vr": "UI",
                "Value": newStudyUid 
            }
        }

        // act
        return(http.put(`studies/${studyUid}`, body).then((result) => {
          //assert
          //assert.equals(result, undefined);
        }));
    });
    it('should update the study description', async function () {
      // arrange
      const studyUid = "1.2.3.4.5";
      const body = {
          "00081030" : {
              "vr": "LO",
              "Value": "New Study Description" 
          },
      }

      //act
      const old = await http.get(`studies/${studyUid}`)
      const result = await http.put(`studies/${studyUid}`, body)
      const current = await http.get(`studies/${studyUid}`)

      // assert
      //assert.notEqual(result, undefined);
    })
    it('should move the study to a different existing patient', async function () {
      // arrange
      const newPatientId = "NEWPATIENTID";
      const studyUid = "1.2.3.4.5";
      const body = {
        "00100020" : {
            "vr": "LO",
            "Value":  newPatientId
        }
      }

      //act
      const old = await http.get(`studies/${studyUid}`)
      const result = await http.put(`studies/${studyUid}`, body)
      const current = await http.get(`studies/${studyUid}`)

      // assert
      //assert.notEqual(result, undefined);
    });
  });
  describe('failure scenarios', function () {
    it('should throw if study does not exist', async function () {
      // arrange
      const studyUid = "1.1.1.1.1.1.1.1.1.1.1";
      const body = {
          "00081030" : {
              "vr": "LO",
              "Value": "New Study Description" 
          },
      }

      // act
      return(http.putThrows(`studies/${studyUid}`, body).then((result) => {
        //assert
        //assert.notEqual(result, undefined);
      }));
    });
    it('should throw if study moved to a non existant patient', async function () {
      // arrange
      const badPatientId = "DOESNOTEXIST";
      const studyUid = "1.2.3.4.5";
      const body = {
        "00100020" : {
            "vr": "LO",
            "Value": badPatientId 
        }
      }

      //act
      const old = await http.get(`studies/${studyUid}`)
      const result = await http.putThrows(`studies/${studyUid}`, body)

      // assert
      //assert.notEqual(result, undefined);
    });
  });
});
