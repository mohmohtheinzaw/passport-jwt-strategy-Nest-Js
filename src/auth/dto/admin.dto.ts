import { ApiProperty } from "@nestjs/swagger";

export class RegisterAdmin {
    @ApiProperty()
    name:string

    @ApiProperty()
    email:string

    @ApiProperty()
    password:string
}

export class LoginAdmin{
    @ApiProperty({default:"admin@gmail.com"})
    email:string

    @ApiProperty({default:"adminpassword"})
    password:string
}