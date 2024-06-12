Move APIs
---------

# Move Study to a new or existing Patient 
  - HTTP Verb: POST 
  - URI Template: /studies/[id]/move
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
  - HTTP Request body is a DICOM dataset of attributes 
    - Body must include new PatientID 
  - Behavior
    - If no patient with his id exists, a new patient is created and its attributes are copied from the series' original patient 
    - If a patient with this id does exist, the series will inherit the new patient's attributes.

# Move Series to a different patient and study 
  - HTTP Verb: POST 
  - URI Template: /studies/[id]/series/id]/move
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
    - HTTP Request body is a DICOM dataset of attributes 
        - Body must include new patient id.  
        - Body must include new study uid.  
    - Behavior
        - If no patient with the patient id in the request body exists, a new patient is created and its attributes are copied from the series' original patient 
        - If a patient with the patient id in the request body, the series will inherit the existing  patient's attributes.
        - If no study exists with the study uid in the request body, a new study is created and its attributes are copied from the series' original study attributes.
        - If a study exists with the study uid in the request body, the series will inherit the existing study's attributes.

# Move Instance to a new patient, study and series 
  - HTTP Verb: POST 
  - URI Template: /studies/[id]/series/[id]/instances/[id]/move
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
  - HTTP Request body is a DICOM dataset of attributes 
    - Body must include new patient id.  
    - Body must include a study uid.  
    - Body must include a series instance uid.  
  - Behavior
    - If no study exists with this id, a new study is created and its attributes are copied from the series' original study attributes.
    - If a study exists with this id, the series will inherit the new studies attributes.
    - If no series exists with this id, a new series is created and its attributes are copied from the instaces original series 
    - If a series exists with this id, the instance will inherit the new series attributes.
    - If no patient with his id exists, a new patient is created and its attributes are copied from the series' original patient 
    - If a patient with this id does exist, the series will inherit the new patient's attributes.