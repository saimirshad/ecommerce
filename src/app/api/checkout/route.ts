import { NextRequest, NextResponse } from "next/server";
import {db, orderTable} from '@/lib/drizzle'

export const POST = async(request: NextRequest) => {
   const {name, email, address , payment_method} = await request.json()
   if(!name){
    return  NextResponse.json({msg:"Please provide name", status :401 })
   }
   if(!email){
    return  NextResponse.json({msg:"Please provide email", status :401 })
   }
   if(!address){
    return  NextResponse.json({msg:"Please provide address", status :401 })
   }
   if(!payment_method){
    return  NextResponse.json({msg:"Please provide paymnet method", status :401 })
   }

   if(payment_method == 'creditCard'){
    //process credit card payments here 
    console.log('hi stripe')
   }else {
    // process other types of payments
    
   }

   try {
    const res = await db.insert(orderTable).values({
        name: name,
        email: email,
        address: address,
        payment_method: payment_method
    }).returning()


    
    return NextResponse.json({ res, status:200 })
}catch (error) {
    console.log(error)
    return NextResponse.json({ error })
}

   

}