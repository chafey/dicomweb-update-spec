Replace APIS
------------

# Replace all Patient Level Attributes 
  - HTTP Verb: PUT
  - URI Template: /patients/[id]/normalizedmetadata
  - HTTP Headers:
    - Request
      - Accept: application/json
      - If-Match: String representing the version of the resource this patch is made against (Etag from GET)
      - DICOMIssuerPatientID: Optional parameter to further qualify the study 
      - DICOMPatientName: Optional parameter to further qualify the study 
    - Response
      - Content-Type: application/json
      - Etag: string that uniquely identifies the updated version of the resource 
  - HTTP Request body is a [DICOM JSON Model](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/chapter_E.html) of patient level attributes.  
    - Patient level attributes are defined as those that belong to patient modules as defined by [PS3.3 C.7.1](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.html#sect_C.7.1)
  - Behavior
    - Will cause all instances to be updated that have the same PatientID
    - Any patient level attribute can be set including PatientID
    - Attempting to set other level attributes (Study/Series/Instance) will generate an error 

# Replace all Study Level Attributes 
  - HTTP Verb: PUT
  - URI Template: /studies/[id]/normalizedmetadata
  - HTTP Headers:
    - Request
      - Accept: application/json
      - If-Match: String representing the version of the resource this patch is made against (Etag from GET)
      - DICOMPatientID: Optional parameter to further qualify the study 
      - DICOMIssuerPatientID: Optional parameter to further qualify the study 
      - DICOMPatientName: Optional parameter to further qualify the study 
    - Response
      - Content-Type: application/json
      - Etag: string that uniquely identifies the updated version of the resource 
  - HTTP Request body is a [DICOM JSON Model](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/chapter_E.html) of study level attributes.  
    - Study level attributes are those that belong to study modules as defined by [PS3.3 C.7.2](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.2.html)
  - Behavior
    - Will cause all instances to be updated that have the same StudyInstanceUid
    - Any study level attribute can be set including StudyInstanceUID
    - Study Instance UID can be changed
    - Attempting to set other level attributes (Patient/Series/Instance) will generate an error 

# Replace all Series Level Attributes 
  - HTTP Verb: PUT
  - URI Template: /studies/[id]/series/[id]/normalizedmetadata
  - HTTP Headers:
    - Request
      - Accept: application/json
      - If-Match: String representing the version of the resource this patch is made against (Etag from GET)
      - DICOMPatientID: Optional parameter to further qualify the study 
      - DICOMIssuerPatientID: Optional parameter to further qualify the study 
      - DICOMPatientName: Optional parameter to further qualify the study 
    - Response
      - Content-Type: application/json
      - Etag: string that uniquely identifies the updated version of the resource 
  - HTTP Request body is a [DICOM JSON Model](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/chapter_E.html) of series level attributes.  
    - Series level attributes are those that belong to the series modules as defined by [PS 3.3 C.7.3](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.3.html)
  - Behavior
    - Will cause all instances to be updated that have the same SeriesUid and StudyUid
    - SeriesUID can be changed
    - Attempting to set other level attributes (Patient/Study/Instance) will generate an error 

# Replace all SOP Instance Level Attributes 
  - HTTP Verb: PUT
  - URI Template: /studies/[id]/series/[id]/instances/[id]/normalizedmetadata
  - HTTP Headers:
    - Request
      - Accept: application/json
      - If-Match: String representing the version of the resource this patch is made against (Etag from GET)
      - DICOMPatientID: Optional parameter to further qualify the study 
      - DICOMIssuerPatientID: Optional parameter to further qualify the study 
      - DICOMPatientName: Optional parameter to further qualify the study 
    - Response
      - Content-Type: application/json
      - Etag: string that uniquely identifies the updated version of the resource 
  - HTTP Request body is a [DICOM JSON Model](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/chapter_E.html) of instance level attributes.  
    - Instance level attributes are those that do not belong to the patient, study or series level attributes as defined above
  - Behavior
    - Will cause the instances to be updated that has the same StudyInstanceUID, SeriesInstanceUid and SOPInstanceUID
    - SOPInstanceUID can be changed
    - TransferSyntaxUID can be changed if the server supports transcoding and this instance can be transcoded to the requested transfer syntax
    - Attempting to set other level attributes (Patient/Study/Series) will generate an error 