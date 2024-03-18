export interface IUser {
    email: string;
    password: string;
}

export interface ICreateUser extends IUser {
    fullName: string;
    gender: 'MALE' | 'FEMALE' | 'NOT_SPECIFY';
    age: number | undefined;
    profile_image: string;
}

export interface ILoginUser extends IUser {
    remember: boolean;
}