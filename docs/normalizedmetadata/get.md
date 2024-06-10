Get APIs
--------

# Get Patient Attributes - GET to /patients/[id]/normalizedmetadata
  - Body is a DICOM dataset of patient level attributes.  
  - Patient level attributes are defined as those that belong to patient modules as defined by [PS3.3 C.7.1](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.html#sect_C.7.1)

# Get Study Attributes - GET to /studies/[id]/normalizedmetadata
  - Body is a DICOM dataset of study level attributes.  
  - Study level attributes are those that belong to study modules as defined by [PS3.3 C.7.2](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.2.html)

# Get Series Attributes - GET to /studies/[id]/series/[id]/nornalizedmetadata
  - Body is a DICOM dataset of series level attributes
  - Series level attributes are those that belong to the series modules as defined by [PS 3.3 C.7.3](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.3.html)

# Get Instance Attributes - GET to /studies/[id]/series/[id]/instances/[id]/nornalizedmetadata
  - Body is a DICOM dataset of instance level attributes 
  - Instance level attributes are those that do not belong to the patient, study or series level attributes as defined above
