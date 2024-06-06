const http = require('./http')

describe('Patch/Update Study', function () {
  describe('Happy Paths', function () {
    it('should update the study description', async () => {
      // arrange
      const studyUid = "1.2.3.4.5";
      const body = {
        updatableAttributes : [
            {
                "00081030" : {
                    "vr": "LO",
                    "Value": "New Study Description" 
                }
            }
        ]
      };

      //act
      return http.patch(`studies/${studyUid}/normalizedmetadata`, body).then(async (result) => {
        const newStudy = await http.get(`studies/${studyUid}/normalizedmetadata`);
        // assert
        // assert.deepEqual(newStudy, study);
      });
    });

    it('should update the patient id', async function () { });
  });
  describe('failure scenarios', function () {
    it('should throw if patient does not exist', async function () { });
  });
});
