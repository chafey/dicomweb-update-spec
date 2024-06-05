# dicomweb-update-spec
Proposal for a set of APIs to support updating of DICOM instances via DICOMweb

Status: WIP (Jun 5, 2024)

## Update APIS

- Update Patient Attribute - PUT to /patients/[id]/normalizedmetadata.
  - Body is a DICOM dataset of patient level attributes.  
  - Patient level attributes are defined as those that belong to patient modules as defined by [PS3.3 C.7.1](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.html#sect_C.7.1)
  - Will cause all instances to be updated that have the same PatientID
  - Any patient level attribute can be set including PatientID
  - Attemnpting to set other level attributes (Study/Series/Instance) will generate an error 

- Update Study Attribute - PUT to /studies/[id]/normalizedmetadata
  - Body is a DICOM dataset of study level attributes.  
  - Study level attributes are those that belong to study modules as defined by [PS3.3 C.7.2](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.2.html)
  - Will cause all instances to be updated that have the same StudyInstanceUid
  - Any study level attribute can be set including StudyInstanceUID
  - Attemnpting to set other level attributes (Patient/Series/Instance) will generate an error 

- Update Series Attribute - PUT to /studies/[id]/series/[id]/normalizedmetadata
  - Body is a DICOM dataset of series level attributes
  - Series level attributes are those that belong to the series modules as defined by [PS 3.3 C.7.3](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.3.html)
  - Will cause all instances to be updated that have the same SeriesUid and StudyUid
  - SeriesUID can be changed
  - Attemnpting to set other level attributes (Patient/Study/Instance) will generate an error 

- Update SOP Instance Attribute - PUT to /studies/[id]/series/[id]/instances/[id]/nornalizedmetadata
  - Body is a DICOM dataset of instance level attributes - Instance level attributes are those that do not belong to the patient, study or series level attributes as defined above
  - Will cause the instances to be updated that has the same StudyInstanceUID, SeriesInstanceUid and SOPInstanceUID
  - SOPInstanceUID can be changed
  - Attemnpting to set other level attributes (Patient/Study/Series) will generate an error 

## Move APIs

- Move Study to a new or existing Patient - POST to /studies/[id]
  - Body is a DICOM dataset of attributes 
  - Body must include new PatientID
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
 
## Get APIs

- Get Patient Attributes - GET to /patients/[id]/normalizedmetadata
  - Body is a DICOM dataset of patient level attributes.  
  - Patient level attributes are defined as those that belong to patient modules as defined by [PS3.3 C.7.1](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.html#sect_C.7.1)

- Get Study Attributes - GET to /studies/[id]/normalizedmetadata
  - Body is a DICOM dataset of study level attributes.  
  - Study level attributes are those that belong to study modules as defined by [PS3.3 C.7.2](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.2.html)

- Get Series Attributes - GET to /studies/[id]/series/[id]/nornalizedmetadata
  - Body is a DICOM dataset of series level attributes
  - Series level attributes are those that belong to the series modules as defined by [PS 3.3 C.7.3](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.3.html)

- Get Instance Attributes - GET to /studies/[id]/series/[id]/instances/[id]/nornalizedmetadata
  - Body is a DICOM dataset of instance level attributes 
  - Instance level attributes are those that do not belong to the patient, study or series level attributes as defined above

## FAQ

- Q: Why did you introduce a normalizedmetadata endpoint?
- A: The normalized endpoints allow clients to work with small subsets of a very large dataset more easily (the existing metadata endpoints return all attributees and the payload can be very large)

- Q: How would you merge two patients?  
- A: Use Move Study to move all studies from patient A to patient B

- Q: Why do you need to provide ALL attributes when updating a resource instead of just the changes
- A1: The DICOM JSON model does not have a way to represent a removed attribute so there would be no way to do that.
- A2: HTTP PATCH would be more appropriate for changing a few attributes.  PUT is for updating/replacing the entire resource

