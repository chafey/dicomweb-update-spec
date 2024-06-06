
var assert = require('assert');
const http = require('./http')

describe('Update instance', function () {
  describe('Happy Paths', function () {
    it('should update the instance number', async function () {
      // arrange
      const studyUid= "1.2.3.4.5";
      const seriesUid = "1.2.3.4.5.6"
      const instanceUid = "1.2.3.4.5.6.7";
      const instance = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}/normalizedmetadata`)
      instance[0]["00200013"] =  {
        "vr": "IS",
        "Value": "100" 
      };

      //act
      return http.put(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`, instance).then(async (result) => {
        const instance = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}/normalizedmetadata`)
        //assert
        //assert.deepEqual(newInstance, instance);
      })
    });
    it('should update the instance uid', async function () {
      // arrange
      const studyUid= "1.2.3.4.5";
      const seriesUid = "1.2.3.4.5.6"
      const instanceUid = "1.2.3.4.5.6.7";
      const instance = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}/normalizedmetadata`)
      instance[0]["00080018"] =  {
        "vr": "UI",
        "Value": "1.2.3.4.5.6.8" 
      };

      //act
      return http.put(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`, instance).then(async (result) => {
        const instance = await http.get(`studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}/normalizedmetadata`)
        //assert
        //assert.deepEqual(newInstance, instance);
      })
    });
  });
  describe('failure scenarios', function () {
    it('update to non existant study should fail', async function () {
      /*
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
      */
    });
    it('update to non existant instance should fail', async function () {
      /*
      // arrange
      const studyUid= "1.2.3.4.5";
      const seriesUid= "1.2.3.4.5.6";
      const instanceUid = "1.1.1.1.1.1.1.1.1.1.1";
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
      */
    });
  });
});
