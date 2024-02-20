import { ApiProperty } from "@nestjs/swagger";
import { PAYMENTTYPE } from "@prisma/client";


export class Item {
    @ApiProperty()
    id:string

    @ApiProperty()
    quantity:number

}
export class CreateOrder{
    @ApiProperty({type:[Item]})
    items:Item[]

    @ApiProperty()
    totalCost:number

    @ApiProperty()
    paymentMethod:PAYMENTTYPE

    @ApiProperty()
    address:string

    @ApiProperty({required:false})
    deliveryCharges?:number

    @ApiProperty()
    deliveredDate? :Date

}