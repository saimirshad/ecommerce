import { NextApiRequest,NextApiResponse } from "next";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


const key = 'sk_test_51KmFBzIBJu9wdzvAZYHNeSe53hAhz03tDDKnTpJmFCLCgm5bvLlro9AwzbBwftXgEcEn74QkiRZICAFKAUVSvaud00tAznZvA0'
const stripe = new Stripe(key , {
  
  apiVersion: "2023-08-16"
  
})

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const user_id = cookies().get("user_id");
    const body = await req.json();
  

    // Create a customer if needed
    let customer;
    if (body.user_id) {
      customer = await stripe.customers.create({
        metadata: {
          userId: body.user_id,
        },
      });
    }

    const lineItems = body.data.cartItems.map((item:any) => {
      return ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image]
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity
      })
    })

    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer: customer ? customer.id : undefined,
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/Cart`,
    });

  

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error });
  }
};



  // export const POST = async (req: NextRequest, res: NextResponse) => {
  //   const user_id = cookies().get("user_id");
  //   const body = await req.json();
  //   console.log(body);
    
  //   try {
  //     if (body.length > 0 && body.user_id) {
  //       const customer = await stripe.customers.create({
  //         metadata: {
  //           userId: body.user_id,
  //         },
  //       });
  
  //       const session = await stripe.checkout.sessions.create({
  //         submit_type: "pay",
  //         mode: "payment",
  //         payment_method_types: ["card"],
  //         billing_address_collection: "auto",
  //         shipping_options: [
  //           {
  //             shipping_rate: "shr_1NgUSLIBJu9wdzvA8Ez9rXUI",
  //           },
  //           {
  //             shipping_rate: "shr_1NgUSLIBJu9wdzvA8Ez9rXUI",
  //           },
  //         ],
  //         invoice_creation: {
  //           enabled: true,
  //         },
  
          // line_items: body.data.cartItems.map((item: any) => {
          //   return {
          //     price_data: {
          //       currency: "usd",
          //       product_data: {
          //         name: item.name,
          //         images: [item.image],
          //       },
          //       unit_amount: item.price * 100,
          //     },
          //     quantity: item.quantity,
          //     adjustable_quantity: {
          //       enabled: true,
          //       minimum: 1,
          //       maximum: 10,
          //     },
          //   };
          // }),
  
  //         customer: customer.id,
  
  //         success_url: `${req.headers.get("origin")}/success`,
  //         cancel_url: `${req.headers.get("origin")}/cart`,
  //       });
  //       console.log(session)
  //       return NextResponse.json({ session });
  //     } else {
  //       return NextResponse.json({
  //         message: "product info missing",
  //       });
  //     }
  //   } catch (error) {
  //     // Handle the error here
  //     console.error("Error creating session:", error);
  //     return NextResponse.json({ error });
  //   }
  // };
  



