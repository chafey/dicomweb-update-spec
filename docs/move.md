Move APIs
---------

- Move Study to a new or existing Patient - POST to /studies/[id]/move
  - Body is a DICOM dataset of attributes 
  - Body must include new PatientID
  - If patient does not exist, it will be created using attributes from the prior patient 

- Move Series to a different patient and study - POST to /studies/[id]/series/[id]/move
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body must include new study uid
  - If patient and study do not exist, they will be created using attributes from the prior patient/study

- Move Instance to a new patient, study and series - POST to /studies/[id]/series/[id]/instances[id]/move
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id
  - Body must include new study uid
  - Body must include new series uid
  - If patient, study or series do not exist, they will be created using attribtues from the prior patient/study/series