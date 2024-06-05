
var assert = require('assert');
const http = require('./http')

describe('Update Series', function () {
  describe('Happy Paths', function () {
    it('should update the series uid', async function () {
        /*
        // arrange
        const studyUid= "1.2.3.4.5";
        const seriesUid = "1.2.3.4.5.6"
        const newSeriesUid = "1.2.3.4.5.7";
        const body = {
            "00200000E" : {
                "vr": "UI",
                "Value": newSeriesUid 
            }
        }

        // act
        return(http.put(`studies/${studyUid}/series/${seriesUid}`, body).then((result) => {
          //assert
          //assert.equals(result, undefined);
        }));
        */
    });
    it('should update the series description', async function () {
      /*
      // arrange
      const studyUid = "1.2.3.4.5";
      const seriesUid = "1.2.3.4.5.6";
      const body = {
          "0008103E" : {
              "vr": "LO",
              "Value": "New Series Description" 
          },
      }

      //act
      const old = await http.get(`studies/${studyUid}/series/${seriesUid}`)
      const result = await http.put(`studies/${studyUid}/series/${seriesUid}`, body)
      const current = await http.get(`studies/${studyUid}/series/${seriesUid}`)

      // assert
      //assert.notEqual(result, undefined);
      */
    });
  });
  describe('failure scenarios', function () {
    it('update to non existant study should fail', async function () {
      /*
      // arrange
      const studyUid = "1.1.1.1.1.1.1.1.1.1.1";
      const seriesUid = "1.2.3.4.5.6";
      const body = {
          "0008103E" : {
              "vr": "LO",
              "Value": "New Series Description" 
          },
      }

      // act
      return(http.putThrows(`studies/${studyUid}/series/${seriesUid}`, body).then((result) => {
        //assert
        //assert.notEqual(result, undefined);
      }));
    });
    it('update to non existant series should fail', async function () {
      // arrange
      const studyUid= "1.2.3.4.5";
      const seriesUid = "1.1.1.1.1.1.1.1.1.1.1";
      const body = {
          "0008103E" : {
              "vr": "LO",
              "Value": "New Series Description" 
          },
      }

      // act
      return(http.putThrows(`studies/${studyUid}/series/${seriesUid}`, body).then((result) => {
        //assert
        //assert.notEqual(result, undefined);
      }));
    */
    });
  });
});
