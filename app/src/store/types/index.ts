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
    services: { type: string }
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

// deployment
export interface deployment {
    author: string
    message: string
    completed: string
    active: boolean
}

// source control
export interface sourceControl {
    repo: string
    branch: string
}