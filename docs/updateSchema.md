# Update Schema

The update document contains 

## Examples

Document to set the Insance Create Date and remove the private tqg "00210010"
```json
{
    "updatableAttributes" : {
        {
            "00080012": {
                "vr": "DA",
                "Value": "20240606"
            }
        }
    },
    "removableAttributes" : {
        "00210010" : {}
    }
}
```