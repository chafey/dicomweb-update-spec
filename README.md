# dicomweb-update-spec
Proposal for a set of APIs to support updating of DICOM instances via DICOMweb

Status: Requesting feedback from community (Jun 6, 2024)

## Use Cases

- Synchronize attributes shared with EHR/RIS (Patient name/id/gender/dob, study description, procedure code)
- De-identify data
- QC Workflows 
  - correct fat fingered data (patient name, patient id) so it will reconcile with the EHR/RIS
  - Correct data imported from third party so it will reconcile with the EHR/RIS (e.g. foreign images)
  - delete bad data (e.g. patient moved)
  - merge two studies together (e.g. time delayed studies)
  - move instances from one study into another study (e.g. procedure was not completed on scanner before second patient was scanned)
- Modernize data (e.g. remove private attribute with custom annotations and create new presentation state instance with those annotations)
- Changing the transfer syntax of stored sop instances (transcoding)



## APIs
### Replace APIS

- Replace all Patient Level Attributes - PUT to /patients/[id]/normalizedmetadata.
  - Body is a [DICOM JSON Model](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/chapter_E.html) of patient level attributes.  
  - Patient level attributes are defined as those that belong to patient modules as defined by [PS3.3 C.7.1](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.html#sect_C.7.1)
  - Will cause all instances to be updated that have the same PatientID
  - Any patient level attribute can be set including PatientID
  - Attempting to set other level attributes (Study/Series/Instance) will generate an error 

- Replace all Study Level Attributes - PUT to /studies/[id]/normalizedmetadata
  - Body is a [DICOM JSON Model](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/chapter_E.html) of study level attributes.  
  - Study level attributes are those that belong to study modules as defined by [PS3.3 C.7.2](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.2.html)
  - Will cause all instances to be updated that have the same StudyInstanceUid
  - Any study level attribute can be set including StudyInstanceUID
  - Study Instance UID can be changed
  - Attempting to set other level attributes (Patient/Series/Instance) will generate an error 

- Replace all Series Level Attributes - PUT to /studies/[id]/series/[id]/normalizedmetadata
  - Body is a [DICOM JSON Model](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/chapter_E.html) of series level attributes.  
  - Series level attributes are those that belong to the series modules as defined by [PS 3.3 C.7.3](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.3.html)
  - Will cause all instances to be updated that have the same SeriesUid and StudyUid
  - SeriesUID can be changed
  - Attempting to set other level attributes (Patient/Study/Instance) will generate an error 

- Replace all SOP Instance Level Attributes - PUT to /studies/[id]/series/[id]/instances/[id]/nornalizedmetadata
  - Body is a [DICOM JSON Model](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/chapter_E.html) of instance level attributes.  
  - Instance level attributes are those that do not belong to the patient, study or series level attributes as defined above
  - Will cause the instances to be updated that has the same StudyInstanceUID, SeriesInstanceUid and SOPInstanceUID
  - SOPInstanceUID can be changed
  - TransferSyntaxUID can be changed if the server supports transcoding and this instance can be transcoded to the requested transfer syntax
  - Attempting to set other level attributes (Patient/Study/Series) will generate an error 

### Update APIs

- Update Patient Level Attributes - PATCH to /patients/[id]/normalizedmetadata.
  - Body is a [JSON document](docs/updateSchema.md) of patient level attributes to update and remove 
  - Patient level attributes are defined as those that belong to patient modules as defined by [PS3.3 C.7.1](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.html#sect_C.7.1)
  - Will cause all instances to be updated that have the same PatientID
  - Any patient level attribute can be set including PatientID
  - Attempting to set other level attributes (Study/Series/Instance) will generate an error 

- Update Study Level Attributes - PATCH to /studies/[id]/normalizedmetadata.
  - Body is a [JSON document](docs/updateSchema.md) of study level attributes to update and remove 
  - Study level attributes are those that belong to study modules as defined by [PS3.3 C.7.2](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.2.html)
  - Will cause all instances to be updated that have the same Study Instance UID 
  - Any study level attribute can be set including Study Instance UID 
  - Study Instance UID can be changed
  - Attempting to set other level attributes (Patient/Series/Instance) will generate an error 

- Update Series Level Attributes - PATCH to /studies/[id]/series/[id]/normalizedmetadata.
  - Body is a [JSON document](docs/updateSchema.md) of instance level attributes to update and remove 
  - Series level attributes are those that belong to the series modules as defined by [PS 3.3 C.7.3](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.3.html)
  - Will cause all instances to be updated that have the same Study UID and Series UID 
  - Any series level attribute can be set including Series UID 
  - SeriesUID can be changed
  - Attempting to set other level attributes (Patient/Study/Instance) will generate an error 

- Update Instance Level Attributes - PATCH to /studies/[id]/series/[id]/instances/[id]/normalizedmetadata.
  - Body is a [JSON document](docs/updateSchema.md) of instance level attributes to update and remove 
  - Instance level attributes are those that do not belong to the patient, study or series level attributes as defined above
  - Will cause the instance to be updated that has the same Study UID, Series UID, SOP InstanceUID 
  - SOPInstanceUID can be changed
  - TransferSyntaxUID can be changed if the server supports transcoding and this instance can be transcoded to the requested transfer syntax
  - Attempting to set other level attributes (Patient/Study/Series) will generate an error 

- Update all Study Instances - PATCH to /studies/[id]/metadata
  - Body is an array of [JSON documents](docs/updateSchema.md) for each instance in the study of attributes to update and remove 
  - All instance JSON documents shall have the same change for attributes at the patient/study/level.  An error is thrown otherwise
  - PatientId can be changed
  - Attempting to set Study UID, Series UID or SOP InstanceUID will generate an error 

### Move APIs

- Move Study to a new or existing Patient - POST to /studies/[id]/move
  - Body is a DICOM dataset of attributes 
  - Body must include new PatientID
  - Body may include a new Study Instance UID
  - If patient does not exist, it will be created using attributes from the prior patient 

- Move Series to a different patient and study - POST to /studies/[id]/series/[id]/move
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body must include new study uid
  - Body may include a new series uid
  - If patient and study do not exist, they will be created using attributes from the prior patient/study

- Move Instance to a new patient, study and series - POST to /studies/[id]/series/[id]/instances[id]/move
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body must include new study uid
  - Body must include new series uid
  - Body may include a new sop instance uid
  - If patient, study or series do not exist, they will be created using attribtues from the prior patient/study/series
 
### Delete APIs

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
    - A: The existing metadata endpoints return the metadata for all instances at that level (study, series) which can be very large (>10GB for large studies).  Most update/replace use cases only effect a few attributes so working with a smaller document is easier 

- Q: How would you merge two patients?  
    - A: Use Move Study to move all studies from patient A to patient B

- Q: Is there a way to update attributes at different levels with a single atomic operation?
    - A: Yes, use the PATCH to /studies/[id]

- Q: Why did you break out patient attributes separate from study attributes?
    - A: One of the most common update operation is to synchronize patient level attributes with an external system (EHR/RIS).  The patients endpoint allows this change to be atomically for all studies associated with a single patient
