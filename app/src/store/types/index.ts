import { Url } from 'url';

// user
export interface user {
    email: string
    organization: string
    name: string
}

// message
export interface messsage {
    message: string
}

// application service
export interface appServices {
    appServices: appService[]
}
export interface appService {
    name: string
    resourceGroup: string
    countInstances: number
    status: string
    size: string
    countServices: number
    services: string
}

// api applications
export interface apiApps {
    apiApps: application[]
}

// client applications
export interface clientApps {
    clientApps: application[]
}

// serverless applications
export interface serverlessApps {
    serverlessApps: application[]
}

// application
export interface application {
    name: string
    status: string
    url: string
    resourceGroup: string
}

// metrics
export interface metrics {
    type: string
    unit: string
    startTime: string
    endTime: string
    metrics: metric[]
}
export interface metric {
    timestamp: string
    average: string
}