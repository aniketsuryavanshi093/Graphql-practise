import { ReactNode } from "react"

export type RoutesType = {
    path: string
    name: string,
    exact: boolean,
    component: ReactNode
    redirectRoute: boolean
} 
