import {ReactNode} from "react";

export interface ITheme {
    children?: ReactNode,
    darkMode: boolean,
}

export interface IThemeState {
    darkMode: boolean
}