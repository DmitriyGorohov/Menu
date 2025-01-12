interface IBaseColors {
    [key: string]: string | IBaseColors;
}

export interface IColors extends IBaseColors {
    black: string
    white: string
    redButton: string;
    background: string;
    gray: string;
}
