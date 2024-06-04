
var assert = require('assert');
const http = require('./http')

describe('Update instance', function () {
  describe('Happy Paths', function () {
    it('should update the instance uid', async function () {
        // arrange
        const studyUid= "1.2.3.4.5";
        const seriesUid = "1.2.3.4.5.6"
        const instanceUid = "1.2.3.4.5.6.7";
        const newInstanceUid = "1.2.3.4.5.7";
        const body = {
            "00080018" : {
                "vr": "UI",
                "Value": newInstanceUid 
            }
        }

        // act
        return(http.put(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`, body).then((result) => {
          //assert
          //assert.equals(result, undefined);
        }));
    });
    it('should update the instance number', async function () {
      // arrange
      const studyUid= "1.2.3.4.5";
      const seriesUid = "1.2.3.4.5.6"
      const instanceUid = "1.2.3.4.5.6.7";
      const body = {
          "00200013" : {
              "vr": "IS",
              "Value": "100" 
          },
      }

      //act
      const old = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`)
      const result = await http.put(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`, body)
      const current = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`)

      // assert
      //assert.notEqual(result, undefined);
    });
    it('should move the instance to another series', async function () {
      // arrange
      const studyUid= "1.2.3.4.5";
      const seriesUid = "1.2.3.4.5.6"
      const instanceUid = "1.2.3.4.5.6.7";
      const newSeriesUid = "1.2.3.4.5.7";
      const body = {
          "0020000E" : {
              "vr": "UI",
              "Value":newSeriesUid 
          },
      }

      //act
      const old = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`)
      const result = await http.put(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`, body)
      const current = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`)

      // assert
      //assert.notEqual(result, undefined);
    });
  });
  describe('failure scenarios', function () {
    it('update to non existant study should fail', async function () {
      // arrange
      const studyUid = "1.1.1.1.1.1.1.1.1.1.1";
      const seriesUid = "1.2.3.4.5.6";
      const instanceUid = "1.2.3.4.5.6.7";
      const body = {
          "0008103E" : {
              "vr": "LO",
              "Value": "New Series Description" 
          },
      }

      // act
      return(http.putThrows(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`, body).then((result) => {
        //assert
        //assert.notEqual(result, undefined);
      }));
    });

    it('update to non existant series should fail', async function () {
      // arrange
      const studyUid= "1.2.3.4.5";
      const seriesUid = "1.1.1.1.1.1.1.1.1.1.1";
      const instanceUid = "1.2.3.4.5.6.7";
      const body = {
          "0008103E" : {
              "vr": "LO",
              "Value": "New Series Description" 
          },
      }

      // act
      return(http.putThrows(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`, body).then((result) => {
        //assert
        //assert.notEqual(result, undefined);
      }));
    });
    it('should throw moving to non existent study', async function () {
      // arrange
      const studyUid = "1.2.3.4.5";
      const seriesUid = "1.2.3.4.5.6";
      const instanceUid = "1.2.3.4.5.6.7";
      const newStudyUid = "1.1.1.1.1.1.1.1.";
      const newSeriesUid = "1.1.1.1.1";
      const body = {
          "0020000D" : {
              "vr": "UI",
              "Value": newStudyUid
          },
          "0020000E" : {
              "vr": "UI",
              "Value": newSeriesUid
          },
      }

      //act
      const old = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`)
      const result = await http.putThrows(`studies/${studyUid}/series/${seriesUid}/${instanceUid}`, body)

      // assert
      //assert.notEqual(result, undefined);
    });
    it('should throw moving to non existent series', async function () {
      // arrange
      const studyUid = "1.2.3.4.5";
      const seriesUid = "1.2.3.4.5.6";
      const instanceUid = "1.2.3.4.5.6.7";
      const newSeriesUid = "1.1.1.1.1.1.1.1.";
      const body = {
          "0020000D" : {
              "vr": "UI",
              "Value": studyUid 
          },
          "0020000E" : {
              "vr": "UI",
              "Value": newSeriesUid
          },
      }

      //act
      const old = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`)
      const result = await http.putThrows(`studies/${studyUid}/series/${seriesUid}/${instanceUid}`, body)

      // assert
      //assert.notEqual(result, undefined);
    });
  });
});
