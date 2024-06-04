# dicomweb-update-spec
Proposal for a set of APIs to support updating of DICOM instances via DICOMweb

## Update APIS

- Update Patient Attribute - PUT to /patients/[id]/metadata.
  - Body is a DICOM dataset of attributes to change/add/remove
  - Will cause all instances to be updated that have the same PatientID
  - PatientID can be changed

- Update Study Attribute - PUT to /studies/[id]/metadata
  - Body is a DICOM dataset of attributes to change/add/remove
  - Will cause all instances to be updated that have the same StudyInstanceUid
  - StudyInstanceUID can be changed
  - PatientID can be changed to another existing Patient
    - Existing patient attributes will be applied to all instances in this study
    - If existing patient does not exist, call will fail

- Update Series Attribute - PUT to /studies/[id]/series/[id]/metadata
  - Body is a DICOM dataset of attributes to change/add/remove
  - Will cause all instances to be updated that have the same SeriesUid and StudyUid
  - SeriesUID can be changed
  - StudyUID can be changed to another existing Study
    - Existing patient/study attributes will be applied to all instances in this series
    - If existing study does not exist, call will fail

- Update SOP Instance Attribute - PUT to /studies/[id]/series/[id]/instances/[id]/metadata
  - Body is a DICOM dataset of attributes to change/add/remove
  - Will cause the instances to be updated that has the same StudyInstanceUID, SeriesInstanceUid and SOPInstanceUID
  - SOPInstanceUID can be changed
  - SeriesUID can be changed to another existing Series.
    - Must include StudyUID as well
    - Existing patient/study/series attributes will be applied to instance
    - If existing study or series does not exist, call will fail

- Move Study to a new Patient - POST to /studies/[id]
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body may include any patient level attributes to update (new patient will inherit old patient attributes by default)

- Move Series to a new patient and study - POST to /studies/[id]/series/[id]
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body must include new study uid
  - Body may include any patient level attributes to update (new patient will inherit old patient attributes by default)
  - Body may include any study level attributes to update (new study will inherit old study attributes by default)

- Move Instance to a new patient, study and series - POST to /studies/[id]/series/[id]/instances[id]
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body must include new study uid
  - Body must include new series uid
  - Body may include any patient level attributes to update (new patient will inherit old patient attributes by default)
  - Body may include any study level attributes to update (new study will inherit old study attributes by default)
  - Body may include any series level attributes to update (new series will inherit old series attributes by default)
 
## Delete APIs

- Delete Patient - DELETE to /patients/[id]
  - Deletes all instances with the PatientId

- Delete Study - DELETE to /studies/[id]
  - Deletes all instance for the specified study

- Delete Series - DELETE to /studies/[id]/series/[id]
  - Deletes all instance for the specified series.  

- Delete Instance - DELETE to /studies/[id]/series/[id]/instances/[id]
  - Deletes the specified instance
 