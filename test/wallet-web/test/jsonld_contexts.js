/*
Copyright SecureKey Technologies Inc. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0
*/

const citizenshipVocab = JSON.parse(`{
  "@context": {
    "@version": 1.1,
    "@protected": true,

    "name": "http://schema.org/name",
    "description": "http://schema.org/description",
    "identifier": "http://schema.org/identifier",
    "image": {"@id": "http://schema.org/image", "@type": "@id"},

    "PermanentResidentCard": {
      "@id": "https://w3id.org/citizenship#PermanentResidentCard",
      "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "description": "http://schema.org/description",
        "name": "http://schema.org/name",
        "identifier": "http://schema.org/identifier",
        "image": {"@id": "http://schema.org/image", "@type": "@id"}
      }
    },

    "PermanentResident": {
      "@id": "https://w3id.org/citizenship#PermanentResident",
      "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "ctzn": "https://w3id.org/citizenship#",
        "schema": "http://schema.org/",
        "xsd": "http://www.w3.org/2001/XMLSchema#",

        "birthCountry": "ctzn:birthCountry",
        "birthDate": {"@id": "schema:birthDate", "@type": "xsd:dateTime"},
        "commuterClassification": "ctzn:commuterClassification",
        "familyName": "schema:familyName",
        "gender": "schema:gender",
        "givenName": "schema:givenName",
        "lprCategory": "ctzn:lprCategory",
        "lprNumber": "ctzn:lprNumber",
        "residentSince": {"@id": "ctzn:residentSince", "@type": "xsd:dateTime"}
      }
    },

    "Person": "http://schema.org/Person"
  }
}`)

const examplesExtVocab = JSON.parse(`{
  "@context": {
    "@version": 1.1,
    "id": "@id",
    "type": "@type",
    "ex": "https://example.org/examples#",
    "name": "http://schema.org/name",
    "description": "http://schema.org/description",
    "image": {
      "@id": "http://schema.org/image",
      "@type": "@id"
    },
    "hetc": "https://w3c-ccg.github.io/vc-json-schemas/example/cmtr/v0.2/cmtr-v0.2#",
    "StudentCard": {
      "@id": "ex:StudentCard",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "ex": "https://example.org/examples#",
        "name": "http://schema.org/name",
        "description": "http://schema.org/description",
        "name": {
          "@id": "ex:name",
          "@type": "xsd:string"
        },
        "email": {
          "@id": "ex:email",
          "@type": "xsd:string"
        },
        "semester": {
          "@id": "ex:semester",
          "@type": "xsd:string"
        },
        "studentid": {
          "@id": "ex:studentid",
          "@type": "xsd:string"
        },
        "university": {
          "@id": "ex:university",
          "@type": "xsd:string"
        }
      }
    },
    "PRCard": {
      "@id": "ex:PRCard",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "ex": "https://example.org/examples#",
        "birthcountry": {
          "@id": "ex:birthcountry",
          "@type": "xsd:string"
        },
        "birthdate": {
          "@id": "ex:birthdate",
          "@type": "xsd:birthdate"
        },
        "familyname": {
          "@id": "ex:familyname",
          "@type": "xsd:string"
        },
        "gender": {
          "@id": "ex:gender",
          "@type": "xsd:string"
        },
        "image": {
          "@id": "ex:image",
          "@type": "xsd:string"
        },
        "lprcategory": {
          "@id": "ex:lprcategory",
          "@type": "xsd:string"
        },
        "lprnumber": {
          "@id": "ex:lprnumber",
          "@type": "xsd:string"
        },
        "name": {
          "@id": "ex:name",
          "@type": "xsd:string"
        },
        "residentsince": {
          "@id": "ex:residentsince",
          "@type": "xsd:string"
        }
      }
    },
    "TravelCard": {
      "@id": "ex:TravelCard",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "ex": "https://example.org/examples#",
        "cardexpires": {
          "@id": "ex:cardexpires",
          "@type": "xsd:string"
        },
        "country": {
          "@id": "ex:country",
          "@type": "xsd:birthdate"
        },
        "dob": {
          "@id": "ex:dob",
          "@type": "xsd:string"
        },
        "issuedate": {
          "@id": "ex:issuedate",
          "@type": "xsd:string"
        },
        "name": "http://schema.org/name",
        "sex": {
          "@id": "ex:sex",
          "@type": "xsd:string"
        },
        "lprnumber": {
          "@id": "ex:lprnumber",
          "@type": "xsd:string"
        },
        "travelcardid": {
          "@id": "ex:travelcardid",
          "@type": "xsd:string"
        }
      }
    },
    "CertifiedMillTestReport": {
      "@id": "ex:CertifiedMillTestReport",
      "@context": {
        "@version": 1.1,
        "@protected": true
      }
    },
    "cmtr": {
      "@id": "hetc:cmtr",
      "@type": "@json"
    },
    "DIDConnection": {
      "@id": "ex:DIDConnection",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "ex": "https://example.org/examples#",
        "threadID": {
          "@id": "ex:threadID",
          "@type": "xsd:string"
        },
        "inviteeDID": {
          "@id": "ex:inviteeDID",
          "@type": "xsd:birthdate"
        },
        "inviterDID": {
          "@id": "ex:inviterDID",
          "@type": "xsd:string"
        },
        "inviterLabel": {
          "@id": "ex:inviterLabel",
          "@type": "xsd:string"
        },
        "connectionState": {
          "@id": "ex:connectionState",
          "@type": "xsd:string"
        }
      }
    },
    "CreditCardStatement": {
      "@id": "ex:CreditCardStatement",
      "@context": {
        "@version": 1.1,
        "id": "@id",
        "type": "@type",
        "ex": "https://example.org/examples#",
        "credentialSubject": {
          "@id": "ex:credentialSubject",
          "@context": {
            "@version": 1.1,
            "@protected": true,
            "stmt": "schema:Invoice"
          }
        }
      }
    }
  }
}`)

const issuerManifestVocab = JSON.parse(`{
  "@context": {
    "@version": 1.1,
    "@protected": true,

    "name": "http://schema.org/name",
    "ex": "https://example.org/examples#",

    "IssuerManifestCredential": {
      "@id": "ex:IssuerManifestCredential",
      "@context": {
        "@version": 1.1,
        "@protected": true,

        "id": "@id",
        "type": "@type",

        "schema": "http://schema.org/",
        "contexts": "schema:url"
      }
    }
  }
}`)

const credentialExamplesVocab = JSON.parse(`{
  "@context": [{
    "@version": 1.1
  },"https://www.w3.org/ns/odrl.jsonld", {
    "ex": "https://example.org/examples#",
    "schema": "http://schema.org/",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",

    "3rdPartyCorrelation": "ex:3rdPartyCorrelation",
    "AllVerifiers": "ex:AllVerifiers",
    "Archival": "ex:Archival",
    "BachelorDegree": "ex:BachelorDegree",
    "Child": "ex:Child",
    "CLCredentialDefinition2019": "ex:CLCredentialDefinition2019",
    "CLSignature2019": "ex:CLSignature2019",
    "IssuerPolicy": "ex:IssuerPolicy",
    "HolderPolicy": "ex:HolderPolicy",
    "Mother": "ex:Mother",
    "RelationshipCredential": "ex:RelationshipCredential",
    "UniversityDegreeCredential": "ex:UniversityDegreeCredential",
    "ZkpExampleSchema2018": "ex:ZkpExampleSchema2018",

    "issuerData": "ex:issuerData",
    "attributes": "ex:attributes",
    "signature": "ex:signature",
    "signatureCorrectnessProof": "ex:signatureCorrectnessProof",
    "primaryProof": "ex:primaryProof",
    "nonRevocationProof": "ex:nonRevocationProof",

    "alumniOf": {"@id": "schema:alumniOf", "@type": "rdf:HTML"},
    "child": {"@id": "ex:child", "@type": "@id"},
    "degree": "ex:degree",
    "degreeType": "ex:degreeType",
    "degreeSchool": "ex:degreeSchool",
    "college": "ex:college",
    "name": {"@id": "schema:name", "@type": "rdf:HTML"},
    "givenName": "schema:givenName",
    "familyName": "schema:familyName",
    "parent": {"@id": "ex:parent", "@type": "@id"},
    "referenceId": "ex:referenceId",
    "documentPresence": "ex:documentPresence",
    "evidenceDocument": "ex:evidenceDocument",
    "spouse": "schema:spouse",
    "subjectPresence": "ex:subjectPresence",
    "verifier": {"@id": "ex:verifier", "@type": "@id"}
  }]
}`)

const examplesVocab = JSON.parse(`{
    "@context": {
      "@version": 1.1,

      "id": "@id",
      "type": "@type",

      "ex": "https://example.org/examples#",

      "image": {"@id": "http://schema.org/image", "@type": "@id"},

      "CredentialStatusList2017": "ex:CredentialStatusList2017",
      "DocumentVerification": "ex:DocumentVerification",
      "SupportingActivity": "ex:SupportingActivity"
    }
}`)

const odrlVocab = JSON.parse(`{
 "@context": {
    "odrl":    "http://www.w3.org/ns/odrl/2/",
    "rdf":     "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs":    "http://www.w3.org/2000/01/rdf-schema#",
    "owl":     "http://www.w3.org/2002/07/owl#",
    "skos":    "http://www.w3.org/2004/02/skos/core#",
    "dct":     "http://purl.org/dc/terms/",
    "xsd":     "http://www.w3.org/2001/XMLSchema#",
    "vcard":   "http://www.w3.org/2006/vcard/ns#",
    "foaf":    "http://xmlns.com/foaf/0.1/",
    "schema":  "http://schema.org/",
    "cc":      "http://creativecommons.org/ns#",

    "uid":     "@id",
    "type":    "@type",

    "Policy":           "odrl:Policy",
    "Rule":             "odrl:Rule",
    "profile":          {"@type": "@id", "@id": "odrl:profile"},

    "inheritFrom":      {"@type": "@id", "@id": "odrl:inheritFrom"},

    "ConflictTerm":     "odrl:ConflictTerm",
    "conflict":         {"@type": "@vocab", "@id": "odrl:conflict"},
    "perm":             "odrl:perm",
    "prohibit":         "odrl:prohibit",
    "invalid":          "odrl:invalid",

    "Agreement":           "odrl:Agreement",
    "Assertion":           "odrl:Assertion",
    "Offer":               "odrl:Offer",
    "Privacy":             "odrl:Privacy",
    "Request":             "odrl:Request",
    "Set":                 "odrl:Set",
    "Ticket":              "odrl:Ticket",

    "Asset":               "odrl:Asset",
    "AssetCollection":     "odrl:AssetCollection",
    "relation":            {"@type": "@id", "@id": "odrl:relation"},
    "hasPolicy":           {"@type": "@id", "@id": "odrl:hasPolicy"},

    "target":             {"@type": "@id", "@id": "odrl:target"},
    "output":             {"@type": "@id", "@id": "odrl:output"},
    
    "partOf":            {"@type": "@id", "@id": "odrl:partOf"},
    "source":            {"@type": "@id", "@id": "odrl:source"},

    "Party":              "odrl:Party",
    "PartyCollection":    "odrl:PartyCollection",
    "function":           {"@type": "@vocab", "@id": "odrl:function"},
    "PartyScope":         "odrl:PartyScope",

    "assignee":             {"@type": "@id", "@id": "odrl:assignee"},
    "assigner":             {"@type": "@id", "@id": "odrl:assigner"},
    "assigneeOf":           {"@type": "@id", "@id": "odrl:assigneeOf"},
    "assignerOf":           {"@type": "@id", "@id": "odrl:assignerOf"},
    "attributedParty":      {"@type": "@id", "@id": "odrl:attributedParty"},
    "attributingParty":     {"@type": "@id", "@id": "odrl:attributingParty"},
    "compensatedParty":     {"@type": "@id", "@id": "odrl:compensatedParty"},
    "compensatingParty":    {"@type": "@id", "@id": "odrl:compensatingParty"},
    "consentingParty":      {"@type": "@id", "@id": "odrl:consentingParty"},
    "consentedParty":       {"@type": "@id", "@id": "odrl:consentedParty"},
    "informedParty":        {"@type": "@id", "@id": "odrl:informedParty"},
    "informingParty":       {"@type": "@id", "@id": "odrl:informingParty"},
    "trackingParty":        {"@type": "@id", "@id": "odrl:trackingParty"},
    "trackedParty":         {"@type": "@id", "@id": "odrl:trackedParty"},
    "contractingParty":     {"@type": "@id", "@id": "odrl:contractingParty"},
    "contractedParty":      {"@type": "@id", "@id": "odrl:contractedParty"},

    "Action":                "odrl:Action",
    "action":                {"@type": "@vocab", "@id": "odrl:action"},
    "includedIn":            {"@type": "@id", "@id": "odrl:includedIn"},
    "implies":               {"@type": "@id", "@id": "odrl:implies"},
    
    "Permission":            "odrl:Permission",
    "permission":            {"@type": "@id", "@id": "odrl:permission"},

    "Prohibition":           "odrl:Prohibition",
    "prohibition":           {"@type": "@id", "@id": "odrl:prohibition"},

    "obligation":            {"@type": "@id", "@id": "odrl:obligation"},

    "use":                   "odrl:use",
    "grantUse":              "odrl:grantUse",
    "aggregate":             "odrl:aggregate",
    "annotate":              "odrl:annotate",
    "anonymize":             "odrl:anonymize",
    "archive":               "odrl:archive",
    "concurrentUse":         "odrl:concurrentUse",
    "derive":                "odrl:derive",
    "digitize":              "odrl:digitize",
    "display":               "odrl:display",
    "distribute":            "odrl:distribute",
    "execute":               "odrl:execute",
    "extract":               "odrl:extract",
    "give":                  "odrl:give",
    "index":                 "odrl:index",
    "install":               "odrl:install",
    "modify":                "odrl:modify",
    "move":                  "odrl:move",
    "play":                  "odrl:play",
    "present":               "odrl:present",
    "print":                 "odrl:print",
    "read":                  "odrl:read",
    "reproduce":             "odrl:reproduce",
    "sell":                  "odrl:sell",
    "stream":                "odrl:stream",
    "textToSpeech":          "odrl:textToSpeech",
    "transfer":              "odrl:transfer",
    "transform":             "odrl:transform",
    "translate":             "odrl:translate",
    
    "Duty":                 "odrl:Duty",
    "duty":                 {"@type": "@id", "@id": "odrl:duty"},
    "consequence":          {"@type": "@id", "@id": "odrl:consequence"},
    "remedy":               {"@type": "@id", "@id": "odrl:remedy"},

    "acceptTracking":       "odrl:acceptTracking",
    "attribute":            "odrl:attribute",
    "compensate":           "odrl:compensate",
    "delete":               "odrl:delete",
    "ensureExclusivity":    "odrl:ensureExclusivity",
    "include":              "odrl:include",
    "inform":               "odrl:inform",
    "nextPolicy":           "odrl:nextPolicy",
    "obtainConsent":        "odrl:obtainConsent",
    "reviewPolicy":         "odrl:reviewPolicy",
    "uninstall":            "odrl:uninstall",
    "watermark":            "odrl:watermark",
    
    "Constraint":           "odrl:Constraint",
    "LogicalConstraint":    "odrl:LogicalConstraint",
    "constraint":           {"@type": "@id", "@id": "odrl:constraint"},
    "refinement":           {"@type": "@id", "@id": "odrl:refinement"},
    "Operator":             "odrl:Operator",
    "operator":             {"@type": "@vocab", "@id": "odrl:operator"},
    "RightOperand":         "odrl:RightOperand",
    "rightOperand":         "odrl:rightOperand",
    "rightOperandReference":{"@type": "xsd:anyURI", "@id": "odrl:rightOperandReference"},
    "LeftOperand":          "odrl:LeftOperand",
    "leftOperand":          {"@type": "@vocab", "@id": "odrl:leftOperand"},
    "unit":                 "odrl:unit",
    "dataType":             {"@type": "xsd:anyType", "@id": "odrl:datatype"},
    "status":               "odrl:status",

    "absolutePosition":        "odrl:absolutePosition",
    "absoluteSpatialPosition": "odrl:absoluteSpatialPosition",
    "absoluteTemporalPosition":"odrl:absoluteTemporalPosition",
    "absoluteSize":            "odrl:absoluteSize",
    "count":                   "odrl:count",
    "dateTime":                "odrl:dateTime",
    "delayPeriod":             "odrl:delayPeriod",
    "deliveryChannel":         "odrl:deliveryChannel",
    "elapsedTime":             "odrl:elapsedTime",
    "event":                   "odrl:event",
    "fileFormat":              "odrl:fileFormat",
    "industry":                "odrl:industry:",
    "language":                "odrl:language",
    "media":                   "odrl:media",
    "meteredTime":             "odrl:meteredTime",
    "payAmount":               "odrl:payAmount",
    "percentage":              "odrl:percentage",
    "product":                 "odrl:product",
    "purpose":                 "odrl:purpose",
    "recipient":               "odrl:recipient",
    "relativePosition":        "odrl:relativePosition",
    "relativeSpatialPosition": "odrl:relativeSpatialPosition",
    "relativeTemporalPosition":"odrl:relativeTemporalPosition",
    "relativeSize":            "odrl:relativeSize",
    "resolution":              "odrl:resolution",
    "spatial":                 "odrl:spatial",
    "spatialCoordinates":      "odrl:spatialCoordinates",
    "systemDevice":            "odrl:systemDevice",
    "timeInterval":            "odrl:timeInterval",
    "unitOfCount":             "odrl:unitOfCount",
    "version":                 "odrl:version",
    "virtualLocation":         "odrl:virtualLocation",

    "eq":                   "odrl:eq",
    "gt":                   "odrl:gt",
    "gteq":                 "odrl:gteq",
    "lt":                   "odrl:lt",
    "lteq":                 "odrl:lteq",
    "neq":                  "odrl:neg",
    "isA":                  "odrl:isA",
    "hasPart":              "odrl:hasPart",
    "isPartOf":             "odrl:isPartOf",
    "isAllOf":              "odrl:isAllOf",
    "isAnyOf":              "odrl:isAnyOf",
    "isNoneOf":             "odrl:isNoneOf",
    "or":                   "odrl:or",
    "xone":                 "odrl:xone",
    "and":                  "odrl:and",
    "andSequence":          "odrl:andSequence",

    "policyUsage":                "odrl:policyUsage"
    
    }
}`)

export async function addJSONLDContexts(agent) {
    return agent.context.add({
        documents: [
            {
                url: "https://w3id.org/citizenship/v1",
                documentURL: "https://w3c-ccg.github.io/citizenship-vocab/contexts/citizenship-v1.jsonld",
                content: citizenshipVocab
            },
            {
                url: "https://trustbloc.github.io/context/vc/issuer-manifest-credential-v1.jsonld",
                content: issuerManifestVocab
            },
            {
                url: "https://www.w3.org/ns/odrl.jsonld",
                content: odrlVocab
            },
            {
                url: "https://www.w3.org/2018/credentials/examples/v1",
                content: credentialExamplesVocab
            },
            {
                url: "https://trustbloc.github.io/context/vc/examples-v1.jsonld",
                content: examplesVocab
            },
            {
                url: "https://trustbloc.github.io/context/vc/examples-ext-v1.jsonld",
                content: examplesExtVocab
            }
        ]
    })
}
