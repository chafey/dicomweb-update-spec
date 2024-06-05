# dicomweb-update-spec
Proposal for a set of APIs to support updating of DICOM instances via DICOMweb

## Update APIS

- Update Patient Attribute - PUT to /patients/[id]/metadata.
  - Body is a DICOM dataset of attributes
  - Will cause all instances to be updated that have the same PatientID
  - PatientID can be changed

- Update Study Attribute - PUT to /studies/[id]/metadata
  - Body is a DICOM dataset of attributes
  - Will cause all instances to be updated that have the same StudyInstanceUid
  - StudyInstanceUID can be changed
  - Patient level attributes cannot be changed

- Update Series Attribute - PUT to /studies/[id]/series/[id]/metadata
  - Body is a DICOM dataset of attributes
  - Will cause all instances to be updated that have the same SeriesUid and StudyUid
  - SeriesUID can be changed
  - Patient and study level attributes cannot be changed

- Update SOP Instance Attribute - PUT to /studies/[id]/series/[id]/instances/[id]/metadata
  - Body is a DICOM dataset of attributes
  - Will cause the instances to be updated that has the same StudyInstanceUID, SeriesInstanceUid and SOPInstanceUID
  - SOPInstanceUID can be changed
  - Patient, Study and Series level attributes cannot be changed

## Move APIs

- Move Study to a new or existing Patient - POST to /studies/[id]
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body may include a new Study Instance UID
  - If patient does not exist, it will be created using attributes from the prior patient 

- Move Series to a different patient and study - POST to /studies/[id]/series/[id]
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body must include new study uid
  - Body may include a new series uid
  - If patient and study do not exist, they will be created using attributes from the prior patient/study

- Move Instance to a new patient, study and series - POST to /studies/[id]/series/[id]/instances[id]
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body must include new study uid
  - Body must include new series uid
  - Body may include a new sop instance uid
  - If patient, study or series do not exist, they will be created using attribtues from the prior patient/study/series
 
## Delete APIs

- Delete Patient - DELETE to /patients/[id]
  - Deletes all instances with the PatientId

- Delete Study - DELETE to /studies/[id]
  - Deletes all instance for the specified study

- Delete Series - DELETE to /studies/[id]/series/[id]
  - Deletes all instance for the specified series.  

- Delete Instance - DELETE to /studies/[id]/series/[id]/instances/[id]
  - Deletes the specified instance
 

## FAQ

- Q: How would you merge two patients?  
- A: Use Move Study to move all studies from patient A to patient B

- Q: Why do you need to provide ALL attributes when updating a resource instead of just the changes
- A1: The DICOM JSON model does not have a way to represent a removed attribute so there would be no way to do that.
- A2: HTTP PATCH would be more appropriate for changing a few attributes.  PUT is for updating/replacing the entire resource

