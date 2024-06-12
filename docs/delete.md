Delete APIs
-----------

# Delete Patient 
  - HTTP Verb: DELETE 
  - URI Template: /patients/[id]
  - HTTP Headers:
    - Request
      - If-Match: String representing the version of the resource this patch is made against (Etag from GET)
  - Behavior
    - Deletes all instances with the specified PatientId

# Delete Study 
  - HTTP Verb: DELETE 
  - URI Template: /studies/[id]
  - HTTP Headers:
    - Request
      - If-Match: String representing the version of the resource this patch is made against (Etag from GET)
  - Behavior
    - Deletes all instance for the specified study uid

# Delete Series 
  - HTTP Verb: DELETE 
  - URI Template: /studies/[id]/series/[id]
  - HTTP Headers:
    - Request
      - If-Match: String representing the version of the resource this patch is made against (Etag from GET)
  - Behavior
    - Deletes all instance for the specified study uid and series uid.  

# Delete Instance 
  - HTTP Verb: DELETE 
  - URI Template: /studies/[id]/series/[id]/instances/[id]
  - HTTP Headers:
    - Request
      - If-Match: String representing the version of the resource this patch is made against (Etag from GET)
  - Behavior
    - Deletes the specified instance