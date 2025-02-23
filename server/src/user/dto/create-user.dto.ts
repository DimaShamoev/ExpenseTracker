import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string

    @MinLength(6, {message: 'Password Must Be More Than 6 Symbols'})
    password: string

}
