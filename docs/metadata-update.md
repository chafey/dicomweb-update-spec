Metadata
--------

# Update all Study Instances - PATCH to /studies/[id]/metadata
  - Body is an array of [JSON documents](docs/updateSchema.md) for each instance in the study of attributes to update and remove 
  - All instance JSON documents shall have the same change for attributes at the patient/study/level.  An error is thrown otherwise
  - PatientId can be changed
  - Attempting to set Study UID, Series UID or SOP InstanceUID will generate an error 