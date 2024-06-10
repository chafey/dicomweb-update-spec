Update APIs
-----------

Patch documents will be comply with the [RFC Standard](https://www.rfc-editor.org/rfc/rfc7396)

# Update Patient Level Attributes - PATCH to /patients/[id]/normalizedmetadata.
  - Body is a [JSON document](docs/updateSchema.md) of patient level attributes to update and remove 
  - Patient level attributes are defined as those that belong to patient modules as defined by [PS3.3 C.7.1](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.html#sect_C.7.1)
  - Will cause all instances to be updated that have the same PatientID
  - Any patient level attribute can be set including PatientID
  - Attempting to set other level attributes (Study/Series/Instance) will generate an error 

# Update Study Level Attributes - PATCH to /studies/[id]/normalizedmetadata.
  - Body is a [JSON document](docs/updateSchema.md) of study level attributes to update and remove 
  - Study level attributes are those that belong to study modules as defined by [PS3.3 C.7.2](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.2.html)
  - Will cause all instances to be updated that have the same Study Instance UID 
  - Any study level attribute can be set including Study Instance UID 
  - Study Instance UID can be changed
  - Attempting to set other level attributes (Patient/Series/Instance) will generate an error 

# Update Series Level Attributes - PATCH to /studies/[id]/series/[id]/normalizedmetadata.
  - Body is a [JSON document](docs/updateSchema.md) of instance level attributes to update and remove 
  - Series level attributes are those that belong to the series modules as defined by [PS 3.3 C.7.3](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.3.html)
  - Will cause all instances to be updated that have the same Study UID and Series UID 
  - Any series level attribute can be set including Series UID 
  - SeriesUID can be changed
  - Attempting to set other level attributes (Patient/Study/Instance) will generate an error 

# Update Instance Level Attributes - PATCH to /studies/[id]/series/[id]/instances/[id]/normalizedmetadata.
  - Body is a [JSON document](docs/updateSchema.md) of instance level attributes to update and remove 
  - Instance level attributes are those that do not belong to the patient, study or series level attributes as defined above
  - Will cause the instance to be updated that has the same Study UID, Series UID, SOP InstanceUID 
  - SOPInstanceUID can be changed
  - TransferSyntaxUID can be changed if the server supports transcoding and this instance can be transcoded to the requested transfer syntax
  - Attempting to set other level attributes (Patient/Study/Series) will generate an error 

