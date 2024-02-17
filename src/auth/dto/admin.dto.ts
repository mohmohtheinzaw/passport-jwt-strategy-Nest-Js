import { ApiProperty } from "@nestjs/swagger";

export class RegisterAdmin {
    @ApiProperty()
    name:string

    @ApiProperty()
    email:string

    @ApiProperty()
    password:string
}