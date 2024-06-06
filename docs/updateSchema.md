# Update Schema

The update document contains two attributes one for what to update (updatableAttributes) and another for what to remove (removableAttributes).  Both are [DICOM JSON Model](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/chapter_E.html) documents.  
The vr and Value fields are optional for both.  
In the case of updatableAttributes, a missing VR means it is unchanged.  Likewise, a missing Value means it is unchanged.  
In the case of removableAttributes, the vr is ignored and the Value is ignored except for Sequence attributes.

## Examples

Document to:
- set the Insance Create Date value to "20240606".  The VR is not specified so is unchanged
- set the LUT Data VR to "US".  The data is not specified so it is unchanged
- set the Coding Scheme External Id VR to ST and value to "ICD9" in the first item in the Coding Scheme Identification Sequence.
- remove the private attribute "20010010"
- remove the Coding Scheme Uid from the first item in the Coding Scheme Identification Sequence

```json
{
    "updatableAttributes" : [
        {
            "00080012": {
                "Value": "20240606"
            },
            "00283006": {
                "vr": "US",
            },
            "00080110" : {
                "Value": [
                    {
                        "00080114": {
                            "vr": "ST",
                            "Value": "ICD9"
                        }
                    }
                ]
            }
        }
    ],
    "removableAttributes" : [
        {
            "20010010" : {}
        },
        {
            "00080110" : {
                "Value": [
                    {
                        "0008010C": { }
                    }
                ]
            }
        }

    ]
}
```