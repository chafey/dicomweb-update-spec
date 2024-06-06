const http = require('./http')

describe('Replace Study', function () {
  describe('Happy Paths', function () {
    it('should update the study description', async () => {
      // arrange
      const studyUid = "1.2.3.4.5";
      const study = await http.get('studies/${studyUid}/normalizedmetadata')
      study[0]["00081030"] = {
        "vr": "LO",
        "Value": "New Study Description" 
      };

      //act
      return http.put(`studies/${studyUid}/normalizedmetadata`, study).then(async (result) => {
        const newStudy = await http.get(`studies/${studyUid}/normalizedmetadata`);
        // assert
        // assert.deepEqual(newStudy, study);
      });
    });

    it('should update the study uid', async function () {
        // arrange
        const studyUid= "1.2.3.4.5";
        const newStudyUid= "1.2.3.4.6";
        const study = await http.get('studies/${studyUid}/normalizedmetadata');
        study[0]["00200000D"] = {
          "vr": "UI",
          "Value": newStudyUid 
        };

        // act
        return(http.put(`studies/${studyUid}`, study).then((result) => {
          //assert
          //assert.equals(result, undefined);
        }));
    });
  });
  describe('failure scenarios', function () {
    it('should throw if study does not exist', async function () {
      /*
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
    */
    });
  });
});
