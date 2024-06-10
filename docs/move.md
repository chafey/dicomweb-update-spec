Move APIs
---------

# Move Study to a new or existing Patient - POST to /studies/[id]/move
  - Body is a DICOM dataset of attributes 
  - Body must include new PatientID
    - If no patient with his id exists, a new patient is created and its attributes are copied from the series' original patient 
    - If a patient with this id does exist, the series will inherit the new patient's attributes.

# Move Series to a different patient and study - POST to /studies/[id]/series/[id]/move
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id.  
    - If no patient with his id exists, a new patient is created and its attributes are copied from the series' original patient 
    - If a patient with this id does exist, the series will inherit the new patient's attributes.
  - Body must include new study uid.  
    - If no study exists with this id, a new study is created and its attributes are copied from the series' original study attributes.
    - If a study exists with this id, the series will inherit the new studies attributes.

# Move Instance to a new patient, study and series - POST to /studies/[id]/series/[id]/instances[id]/move
  - Body is a DICOM dataset of attributes 
  - Body must include new patient id.  
    - If no patient with his id exists, a new patient is created and its attributes are copied from the series' original patient 
    - If a patient with this id does exist, the series will inherit the new patient's attributes.
  - Body must include a study uid.  
    - If no study exists with this id, a new study is created and its attributes are copied from the series' original study attributes.
    - If a study exists with this id, the series will inherit the new studies attributes.
  - Body must include a series instance uid.  
    - If no series exists with this id, a new series is created and its attributes are copied from the instaces original series 
    - If a series exists with this id, the instance will inherit the new series attributes.