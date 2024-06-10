const http = require('./http')

describe('Patch/Update Series', function () {
  describe('Happy Paths', function () {
    it('should update the series description', async () => {
      // arrange
      const studyUid = "1.2.3.4.5";
      const body = [
        {
            "0008103E" :  {
                "vr": "LO",
                "Value": "New Series Description" 
            }
        }
      ];

      //act
      return http.patch(`studies/${studyUid}/normalizedmetadata`, body).then(async (result) => {
        const newStudy = await http.get(`studies/${studyUid}/normalizedmetadata`);
        // assert
        // assert.deepEqual(newStudy, study);
      });
    });
    it('TODO: should update the series instance uid', async function () { });
    it('TODO: should remove the series date and series time', async function () { });
  });
  describe('failure scenarios', function () {
    it('TODO: should throw if patient does not exist', async function () { });
  });
});
