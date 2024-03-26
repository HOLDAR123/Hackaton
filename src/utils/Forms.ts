export type ILoginForm = {
    email: string,
    password: string
}

export type IConfirmForm = {
    password: string
    confirmPassword: string
}

export type IStatusesForm = {
    title: string
    color: string
}

export type IProfileForm = {
    name?: string;
    picture?: Blob | string;
    password?: string;
    confirmPassword?: string
}