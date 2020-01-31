# UI 

## App

Path: `/app`


| Field                       | DataType            | Description         |
| --------------------------- | ------------------- | -------------------------------------- |
| patientId                   | Number              | Id of currently selected patient. |



## Patient Event Templates

Path: `/patientEventTemplates/{id}`

    {id} - Id of patient


| Field                       | DataType            | Description         |
| --------------------------- | ------------------- | -------------------------------------- |
| templates                   | Array               | Array of `PatientEventTemplate`s. |



## Event Template Selection

Path: `/eventTemplateSelection`


| Field                       | DataType            | Description         |
| --------------------------- | ------------------- | -------------------------------------- |
| searchQuery                 | String              | Search query of event template selection |
| searchRequestInProgress     | Boolean             | `true` when search request is in progress |
| searchFailureReason         | String              | Event templates search failure message |
| searchResult                | Array               | Contains array of matched EventTemplate ids |
| selection                   | Array               | Contains array of EventTemplate id, selected |
| pageLoadFailed              | Boolean             | `true` when failed to load search template list page |

# Models

## Event Templates

Path: `/eventTemplates/{id}`

    {id} - Id of template

| Field                 | DataType      | Description         |
| --------------------- | ------------- | ----------------- |
| id                    | Number        | Id of template    |
| title                 | String        | Title of template |
| description           | String        | Description of template |
| sensors               |  Array        | Contains array of used sensors. e.g [{sensorId: 123, name: 'Bed movement'}] |


### PatientEventTemplate

| Field                 | DataType      | Description         |
| --------------------- | ------------- | ----------------- |
| id                    | Number        | Id of patient     |
| patientId             | Number        | Id of patient     |
| eventTemplateId       | Number        | Id of event template |
| active                | Boolean       | `true` when event template is activated for this patient |
| eventSettings         | Object        | Contains list of event settings. e.g { eventId1: {}, eventId2: {}} |
| paramSettings         | Object        | Contains list of event settings. e.g { paramsetId1: {}, paramsetId2: {}} |



## Patients

Path: `/patients/{id}`

    {id} - Id of patient

| Field                       | DataType            | Description         |
| --------------------------- | ------------------- | -------------------------------------- |
| patientId                   | Number              | Id of patient. |
| firstName                   | String              | First name of patient. |
| lastName                    | String              | Last name of patient. |



## Devices

Path: `/devices/{id}`

    {id} - Id of device

| Field                       | DataType            | Description         |
| --------------------------- | ------------------- | -------------------------------------- |
| id                          | Number              | Id of device. |
| name                        | String              | Name of device |


## Event template categories

Path: `/eventTemplateCategories/{id}`

    {id} - Id of device

| Field                       | DataType            | Description         |
| --------------------------- | ------------------- | -------------------------------------- |
| id                          | Number              | Id of event template category. |
| name                        | String              | Name of event template category. |