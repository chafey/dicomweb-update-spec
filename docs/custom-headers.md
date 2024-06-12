Custom Headers
--------------

The following HTTP Headers may be used to further qualify patients/studies/series/instances according to [RFC 6648](https://datatracker.ietf.org/doc/html/rfc6648)

- DICOMIssuerOfPatientID
- DICOMPatientName
- DICOMPatientID

When one or more of these custom headers are present, the API behavior will be to only match entities (patients, studies, series, instances) which also have matching values for these attributes.  Examples:

1. WADO-RS Retrieve Entire Study
    - VERB: GET
    - URI: /studies/1.2.3453453459394948234
    - HTTP Request Headers:
        - DICOMPatientID : ABC123 
        - DICOMIssuerOfPatientID: METROHOSPITAL
    - Behavior: Will only return instances that match on the following attribute:
        - StudyInstanceUID = 1.2.3453453459394948234 
        - PatientId = ABC123
        - IssuerOfPatientId = METROHOSPITAL

2. Update Patient Normalized Metadata
    - VERB: GET
    - URI: /patients/ABC123
    - HTTP Request Headers:
        - DICOMIssuerOfPatientID: METROHOSPITAL
    - Behavior: Will only return normalized metadata for patients that match on
        - PatientId = ABC123
        - IssuerOfPatientId = METROHOSPITAL
