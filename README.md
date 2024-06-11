# dicomweb-update-spec
Proposal for a set of APIs to support updating of DICOM instances via DICOMweb

Status: Requesting feedback from community
Last Update: Jun 11, 2024 

## Use Cases

- Synchronize attributes shared with EHR/RIS (Patient name/id/gender/dob, study description, procedure code)
  - Change patient name for all of a patients studies
  - Change patient name for patient studies only after they were married (preserve maiden name in DICOM)
- De-identify data
- QC Workflows 
  - correct fat fingered data (patient name, patient id) so it will reconcile with the EHR/RIS
  - Correct data imported from third party so it will reconcile with the EHR/RIS (e.g. foreign images)
  - delete bad data (e.g. patient moved)
  - merge two studies together (e.g. time delayed studies)
  - move instances from one study into another study (e.g. procedure was not completed on scanner before second patient was scanned)
- Modernize data (e.g. remove private attribute with custom annotations and create new presentation state instance with those annotations)
- Changing the transfer syntax of stored sop instances (transcoding)

## APIs

All APIs will use standard HTTP status codes as defined by the [DICOM standard](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/sect_8.5.html)

### Normalized Metadata

These APIs allow you to replace, update and get subsets of DICOM data.  The allowed subsets are the patient, study, series and
instance level as defined by the DICOM standard in [PS3.3 C.7](https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.html).  These would be used by most of the use cases listed at the top of this document.  All private attributes 
are considered instance level attributes.  ETAG is used to detect and prevent update conflicts. 

* [GET](docs/normalizedmetadata/get.md)
* [PATCH (update)](docs/normalizedmetadata/patch.md)
* [PUT (replace)](docs/normalizedmetadata/put.md)

### Metadata

This API allows you to update one or more instances in a study or series.  This can be useful for updating instance level attributes for multiple instances at a time (e.g. removing private attributes) 

* [PATCH (update)](docs/metadata-update.md)
 
 ### Move

These APIs allow you to "reparent" a study, series or instance.  This can be useful for merge/split use cases.  Note that
the instances are not copied or cloned, they are moved.  After the move is complete, the instance are no longer available 
via the prior resource paths. 

[Move APIs](docs/move.md)

### Delete

These APIs allow you to permanently delete a patient, study, series or instance

[Delete APIs](docs/delete.md)

## FAQ

- Q: Why did you introduce a normalizedmetadata endpoint?
    - A: The existing metadata endpoints return the metadata for all instances at that level (study, series) which can be very large (>10GB for large studies).  Most update/replace use cases only effect a few attributes so working with a smaller document is easier 

- Q: How would you merge two patients?  
    - A: Use Move Study to move all studies from patient A to patient B.  See the unit test ["should move patient 2s images from patient 1s study (split use case). Assumes patient 2 already has a study in the db"](test/move-series.test.js)

- Q: Is there a way to update attributes at different levels with a single atomic operation?
    - A: Yes, see the [Metadata Update/PATCH APIs](docs/metadata-update.md)

- Q: Why did you break out patient attributes separate from study attributes?
    - A: One of the most common update operation is to synchronize patient level attributes with an external system (EHR/RIS).  The patients endpoint allows this change to be atomically for all studies associated with a single patient

## TODO

- Include the IssuerOfPatientId as part of the patient resource key somehow?