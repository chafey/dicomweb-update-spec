Metadata
--------

Patch documents will be comply with [RFC 7396](https://www.rfc-editor.org/rfc/rfc7396)

# Update all Study Instances - PATCH to /studies/[id]/metadata
  - Body is an array of [JSON patch documents](https://www.rfc-editor.org/rfc/rfc7396) for each instance in the study of attributes to update and remove 
  - The JSON patch document must include every instance in the study.  An error will be returned if this is not the case.
    - NOTE: RFC 7396 does not support sparse array updates and the DICOM JSON Model represents instances as array entry 
  - All instance JSON documents shall have the same change for attributes at the patient/study/level.  An error is thrown otherwise
  - PatientId can be changed
  - Attempting to set Study UID, Series UID or SOP InstanceUID will generate an error 
