import { IResponseUserData, IUserData, IUser } from "../Types/types";
import { instance } from "../api/axios.api";

export const AuthService = {
    async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
        const { data } = await instance.post<IResponseUserData>("user", userData)
        return data
    },
    async login(userData: IUserData): Promise<IUser | undefined> {
        const { data } = await instance.post<IUser>('auth/login', userData)
        return data;
    },
    async getProfile(): Promise<IUser | undefined> {
        const { data } = await instance.get<IUser>('auth/profile')

        if(data) return data
    }
}