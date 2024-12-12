import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsString()
    @IsNotEmpty()
    uid: string;

    @IsEmail()
    email: string;
}
