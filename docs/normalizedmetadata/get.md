Get APIs
--------

# Get Patient Attributes 
  - HTTP Verb: GET
  - URI Template: /patients/[id]/normalizedmetadata
  - HTTP Headers:
    - Request
      - Accept: application/json
    - Response
      - Content-Type: application/json
      - Etag: string that uniquely identifies this version of the resource 
  - HTTP Response body is a DICOM dataset of patient level attributes.  
    - Patient level attributes are defined as those that belong to patient modules as defined by [PS3.3 C.7.1](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.html#sect_C.7.1)
  - Error codes of note:
    - 200 (Success) - Body includes the patient resource in JSON
    - 404 (Not Found) - Patient resource does not exist

# Get Study Attributes 
  - HTTP Verb: GET
  - URI Template: /studies/[id]/normalizedmetadata
  - HTTP Headers:
    - Request
      - Accept: application/json
    - Response
      - Content-Type: application/json
      - Etag: string that uniquely identifies this version of the resource 
  - HTTP Response body is a DICOM dataset of study level attributes.  
    - Study level attributes are those that belong to study modules as defined by [PS3.3 C.7.2](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.2.html)
  - Error codes of note:
    - 200 (Success) - Body includes the patient resource in JSON
    - 404 (Not Found) - Patient resource does not exist

# Get Series Attributes 
  - HTTP Verb: GET
  - URI Template: /studies/[id]/series/[id]/normalizedmetadata
  - HTTP Headers:
    - Request
      - Accept: application/json
    - Response
      - Content-Type: application/json
      - Etag: string that uniquely identifies this version of the resource 
  - HTTP Response body is a DICOM dataset of series level attributes
    - Series level attributes are those that belong to the series modules as defined by [PS 3.3 C.7.3](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.3.html)
  - Error codes of note:
    - 200 (Success) - Body includes the instance resource in JSON
    - 404 (Not Found) - Patient resource does not exist

# Get Instance Attributes 
  - HTTP Verb: GET
  - URI Template: /studies/[id]/series/[id]/instances/normalizedmetadata
  - HTTP Headers:
    - Request
      - Accept: application/json
    - Response
      - Content-Type: application/json
      - Etag: string that uniquely identifies this version of the resource 
  - HTTP Response Body is a DICOM dataset of instance level attributes 
    - Instance level attributes are those that do not belong to the patient, study or series level attributes as defined above
  - Error codes of note:
    - 200 (Success) - Body includes the instance resource in JSON
    - 404 (Not Found) - Patient resource does not exist
