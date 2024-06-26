
var assert = require('assert');
const http = require('./http')

describe('Replace Series', function () {
  describe('Happy Paths', function () {
    it('should update the series description', async function () {
      // arrange
      const studyUid = "1.2.3.4.5";
      const seriesUid = "1.2.3.4.5.6";
      const series = await http.get(`studies/${studyUid}/series/${seriesUid}/normalizedmetadata`);
      series[0]["0008103E"] =  {
        "vr": "LO",
        "Value": "New Series Description" 
      };

      //act
      return http.put(`studies/${studyUid}/series/${seriesUid}/normalizedmetadata`, series).then(async (result) => {
        const newSeries = await http.get(`studies/${studyUid}/series/${seriesUid}/normalizedmetadata`)
        // assert
        //assert.deepEqual(newSeries, series);
      })
    });
    it('should update the series uid', async function () {
      // arrange
      const studyUid = "1.2.3.4.5";
      const seriesUid = "1.2.3.4.5.6";
      const series = await http.get(`studies/${studyUid}/series/${seriesUid}/normalizedmetadata`);
      series[0]["0020000E"] =  {
        "vr": "UI",
        "Value": "1.2.3.4.5.7" 
      };

      //act
      return http.put(`studies/${studyUid}/series/${seriesUid}/normalizedmetadata`, series).then(async (result) => {
        const newSeries = await http.get(`studies/${studyUid}/series/${seriesUid}/normalizedmetadata`)
        // assert
        //assert.deepEqual(newSeries, series);
      })
    });
  });
  describe('failure scenarios', function () {
    it('TODO: update to non existant study should fail', async function () {
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
