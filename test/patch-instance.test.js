const http = require('./http')

describe('Patch/Update Instance', function () {
  describe('Happy Paths', function () {
    it('should update the instance number ', async () => {
      // arrange
      const studyUid = "1.2.3.4.5";
      const body = [
        {
            "00200013" : {
                "vr": "IS",
                "Value": "100" 
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
    it('TODO: should change the transfer syntax', async () => {});
    it('TODO: should update the sop instance uid', async function () { });
    it('TODO: should remove private attribute', async function () { });
    it('TODO: should remove an item from a sequence', async function () { });
  });
  describe('failure scenarios', function () {
    it('TODO: should throw if patient does not exist', async function () { });
  });
});
