const tasks = [
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y000007qBoFEAU',
      },
      Id: 'a0A1y000007qBoFEAU',
      Name: 'New task',
      DueDate: '2023-09-27',
      StartDate: '2023-09-26',
      Status: 'Not Started',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: undefined,
      Hour: 8,
      Assignee: '0051y00000NlOGQAA3',
      Team: null,
      CreatedDate: '2023-09-25T06:38:43.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-09-25T06:38:43.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
      Rank: '123123123|0',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y000007qBoAEAU',
      },
      Id: 'a0A1y000007qBoAEAU',
      Name: 'New task',
      DueDate: '2023-09-30',
      StartDate: '2023-09-29',
      Status: 'Not Started',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: undefined,
      Hour: 8,
      Assignee: null,
      Team: 'a0C1y0000028W8iEAE',
      CreatedDate: '2023-09-25T06:38:42.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-09-25T06:38:46.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
      Rank: '1231211123|0',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y000007qBoKEAU',
      },
      Id: 'a0A1y000007qBoKEAU',
      Name: 'New task',
      DueDate: '2023-09-27',
      StartDate: '2023-09-26',
      Status: 'Done',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: null,
      Hour: 8,
      Assignee: null,
      Team: 'a0C1y0000028W8sEAE',
      CreatedDate: '2023-09-25T06:38:43.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-09-25T06:38:43.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y0000080HV1EAM',
      },
      Id: 'a0A1y0000080HV1EAM',
      Name: 'New task',
      DueDate: '2023-10-04',
      StartDate: '2023-10-04',
      Status: 'Not Started',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: null,
      Hour: 8,
      Assignee: '0051y00000NlOGVAA3',
      Team: null,
      CreatedDate: '2023-10-03T02:21:04.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-10-03T02:21:04.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y0000080HUxEAM',
      },
      Id: 'a0A1y0000080HUxEAM',
      Name: 'New task',
      DueDate: '2023-10-04',
      StartDate: '2023-10-04',
      Status: 'In Progress',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: null,
      Hour: 8,
      Assignee: '0051y00000NlOGVAA3',
      Team: null,
      CreatedDate: '2023-10-03T02:20:56.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-10-03T02:20:56.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y0000080HUwEAM',
      },
      Id: 'a0A1y0000080HUwEAM',
      Name: 'New task',
      DueDate: '2023-10-04',
      StartDate: '2023-10-04',
      Status: 'Not Started',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: null,
      Hour: 8,
      Assignee: '0051y00000NlOGYAA3',
      Team: null,
      CreatedDate: '2023-10-03T02:20:39.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-10-03T02:20:39.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
      Rank: '1231211123|1',
    },
  ];


  const statuses = [
    {
      attributes: null,
      label: 'Not Started',
      validFor: [],
      value: 'Not Started',
    },
    {
      attributes: null,
      label: 'In progress',
      validFor: [],
      value: 'In progress',
    },
    {
      attributes: null,
      label: 'Review',
      validFor: [],
      value: 'Review',
    },
    {
      attributes: null,
      label: 'Completed',
      validFor: [],
      value: 'Completed',
    },
  ]


const columns = [{
  Id: '1',
  Name: '1',
  Type: "Status",
  Value: "Not Started",
  color: "#3B82F6",
  max: 10,
  Rank: "123123123|0"
},
{
  Id: '2',
  Name: '2',
  Type: "Status",
  Value: "In progress",
  color: "#3B82F6",
  max: 10,
  Rank: "123123123|0"
},
{
  Id: '3',
  Name: '3',
  Type: "Status",
  Value: "Review",
  color: "#3B82F6",
  max: 10,
  Rank: "123123123|0"
},
{
  Id: '4',
  Name: '4',
  Type: "Status",
  Value: "Completed",
  color: "#3B82F6",
  max: 10,
  Rank: "123123123|0"
}
]

  export default  {
    tasks,
    statuses,
    columns
  }