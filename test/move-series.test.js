
var assert = require('assert');
const http = require('./http')

describe('Move Series', function () {
  describe('Happy Paths', function () {
    it('should create new patient', async function () { });
    it('should create new patient and study', async function () { });
    it('should move the series to an existing patient/study', async function () { });
    it('should move the series to an existing patient/study and change the series instance uid', async function () { });
    it('should move patient 2s images from patient 1s study (split use case). Assumes patient 2 already has a study in the db', async function() {
        const currentStudyUid = "1.2.3.4.1"
        const newStudyUid = "1.2.3.4.2"; // hard coded for unit test, normally this would be generated
        const newPatientId = "PATIENT2MRN"; // hard coded for unit test, normally this would be looked up in the EHR/RIS or PACS DB
        const patient2SeriesUids = ["1.2.3.4.1.1", "1.2.3.4.1.2"];
        // Move each of patient 2's series to a new study/patient.  Series UID Is not changed (but could be)
        for(const seriesUid of patient2SeriesUids) {
            await http.post(`/studies/${currentStudyUid}/series/${seriesUid}/move`, 
                [
                    {
                        "0002000D" : {
                            "vr": "UID",
                            "Value":newStudyUid 
                        },
                        "00100020" : {
                            "vr": "LO",
                            "Value": newPatientId 
                        }
                    }
                ] 
            );
        }
        // NOTE - If patient 2 didn't alreayd have studies in the database, the above would create a new study and patient using the
        // patient and study attributes from patient 1.  These could then be updated to patient 2's demographics via UPDATE/PATCH
        // to /patients/${newPatientId}/normalizedmetadata
    });
  });
  describe('failure scenarios', function () {
    it('should throw if patient id not provided', async function () { });
    it('should throw if study uid not provided', async function () { });
  });
});
