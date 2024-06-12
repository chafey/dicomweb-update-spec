Metadata
--------

Patch documents will be comply with [RFC 7396](https://www.rfc-editor.org/rfc/rfc7396)

# Update all Study Instances 
  - HTTP Verb: PATCH 
  - URI Template: /studies/[id]/metadata
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
  - Request body is an array of [JSON patch documents](https://www.rfc-editor.org/rfc/rfc7396) for each instance in the study of attributes to update and remove 
    - The JSON patch document must include every instance in the study.  An error will be returned if this is not the case.
        - NOTE: RFC 7396 does not support sparse array updates and the DICOM JSON Model represents instances as array entry 
  - Behavior
   - All instance JSON documents shall have the same change for attributes at the patient/study/level.  An error is thrown otherwise
   - PatientId can be changed
   - Attempting to set Study UID, Series UID or SOP InstanceUID will generate an error 

# Update all Series Instances 
  - HTTP Verb: PATCH 
  - URI Template: /studies/[id]/series/[id]/metadata
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
  - HTTP Request body is an array of [JSON patch documents](https://www.rfc-editor.org/rfc/rfc7396) for each instance in the series of attributes to update and remove 
    - The JSON patch document must include every instance in the series.  An error will be returned if this is not the case.
        - NOTE: RFC 7396 does not support sparse array updates and the DICOM JSON Model represents instances as array entry 
  - Behavior
    - All instance JSON documents shall have the same change for attributes at the patient/study/level.  An error is thrown otherwise

# Update Instance 
  - HTTP Verb: PATCH 
  - URI Template: /studies/[id]/series/[id]/instances/[id]/metadata
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
  - HTTP Request body is an array of [JSON patch documents](https://www.rfc-editor.org/rfc/rfc7396) attributes to update or remove for the instance 
    - NOTE: RFC 7396 does not support sparse array updates and the DICOM JSON Model represents instances as array entry 