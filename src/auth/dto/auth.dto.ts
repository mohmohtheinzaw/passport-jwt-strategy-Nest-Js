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

export class CustomerRequest{
    @ApiProperty()
    phone:string
}

export class LoginCustomer{
    @ApiProperty()
    phone:string

    @ApiProperty()
    code:string
}

export class CustomerRegister{
    // @ApiProperty()
    // firstName:string

    // @ApiProperty()
    // lastName:string
    @ApiProperty()
    name:string

    @ApiProperty()
    phone:string

    @ApiProperty()
    code:string

}