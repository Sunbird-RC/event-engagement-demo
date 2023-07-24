export interface Exhibit {
  boothNumber: string,
  did: string,
  shortDescription: string,
  fullDescription: string,
  logoURL:string,
  videoURL: string,
  name:string,
  organization:string,
  osCreatedAt: string,
  osCreatedBy:string,
  osOwner:[string],
  osUpdatedAt:string,
  osUpdatedBy:string, 
  osid:string, 
  qrId:string, 
  pdfLink: string,
  pptLink: string
  qrRequired: boolean,
  imageLinks: [string],
  quizConfig: {
    title: string,
    description: string,
    osCreatedAt : string,
    osCreatedBy : string,
    osUpdatedAt : string,
    osUpdatedBy : string,
    osid : string,
    questions: [
      {
        question: string,
        correctAnswer: string,
        options: [
          string
        ],
        osCreatedAt: string
        osCreatedBy: string
        osUpdatedAt: string
        osUpdatedBy: string
        osid: string
      }
    ]
  }
}

export interface ExhibitDetailsResponse {
  boothNumber: string,
  did: string,
  shortDescription: string,
  fullDescription: string,
  logoURL:string,
  videoURL: string,
  name:string,
  organization:string,
  osCreatedAt: string,
  osCreatedBy:string,
  osOwner:[string],
  osUpdatedAt:string,
  osUpdatedBy:string, 
  osid:string, 
  qrId:string, 
  pdfLink: string,
  pptLink: string
  qrRequired: boolean,
  imageLinks: [string],
  quizConfig: {
    title: string,
    description: string,
    osCreatedAt : string,
    osCreatedBy : string,
    osUpdatedAt : string,
    osUpdatedBy : string,
    osid : string,
    questions: [
      {
        question: string,
        correctAnswer: string,
        options: [
          string
        ],
        osCreatedAt: string
        osCreatedBy: string
        osUpdatedAt: string
        osUpdatedBy: string
        osid: string
      }
    ]
  }
}