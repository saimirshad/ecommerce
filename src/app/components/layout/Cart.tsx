"use client";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import { client } from "@/lib/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { getStripePromise } from "@/lib/stripe";

interface dbProduct {
  _id: string;
  image: IImage;
  price: number;
  quantity: number;
  title: string;
}

const Cart = () => {
  const [increase, setIncrease] = useState(1);
  const [data, setData] = useState<any>({});
  const [price, setPrice] = useState(0);

  function handleAdd() {
    setIncrease(increase + 1);
  }

  function handleSub() {
    if (increase > 1) {
      setIncrease(increase - 1);
    }
  }
  const cookies = new Cookies();
  const user_id = cookies.get("user_id");

  const dataFetch = async () => {
    const res = await fetch(
      `https://e-commerce-rouge-iota.vercel.app/api/cart?user_id=${user_id}`
    );
    const data = await res.json();

    return data;
  };
  useEffect(() => {
    const fetchData = async () => {
      const productData = await dataFetch();
      setData(productData);
    };
    fetchData();
  }, []);

  const handleStripeCheckout = async () => {
    console.log("hello");
    const stripe = await getStripePromise();
    const res = await fetch(
      "https://e-commerce-rouge-iota.vercel.app/api/checkout_sessions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({ user_id, data }),
      }
    );

    const result = await res.json();
    console.log(result);
    if (result.session) {
      stripe?.redirectToCheckout({ sessionId: result.session.id });
    }
  };
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Shopping Cart</h1>
      <section>
        {data.res?.map((item: any, index: number) => (
          <div
            className="flex flex-col items-center content-end justify-between my-40"
            key={index}
          >
            <div className="flex flex-col gap-16 mt-8 lg:flex-row">
              <div className="flex-[3_1] space-y-10">
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col w-full gap-4 sm:flex-row">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width="224"
                      height="208"
                      className="xl:w-64 w-52 h-52 rounded-xl"
                    />
                    <div className="w-full space-y-4">
                      <div className="flex justify-between">
                        <h2 className="text-xl text-[#212121] font-light"></h2>
                      </div>
                      <h4 className="font-medium text-[#666]">{item.title}</h4>
                      <h4 className="font-medium">Delivery Estimation</h4>
                      <h4 className="font-medium text-[#ffc700]">
                        5 Working Days
                      </h4>
                      <div className="flex justify-between">
                        <h4 className="text-xl font-semibold tracking-widest">
                          {item.quantity > 1
                            ? item.price * item.quantity
                            : item.price * increase}
                        </h4>

                        <div className="flex items-center gap-3">
                          <div
                            className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full cursor-pointer"
                            onClick={handleSub}
                          >
                            -
                          </div>
                          <span>{increase > 1 ? increase : item.quantity}</span>
                          <div
                            className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full cursor-pointer"
                            onClick={handleAdd}
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </Link> */}
          </div>
        ))}
        <div className="bg-[#fbfcff] flex-1 flex flex-col gap-8 p-8">
          <h4 className="text-xl font-bold">Order Summary</h4>
          <div className="flex justify-between">
            <h4>Quantity</h4>
            <h4>{data.totalQuantity}</h4>
          </div>
          <div className="flex justify-between">
            <h4>Sub Total</h4>
            <h4>{data.totalAmount}</h4>
          </div>
          {/* <Link href={"/Checkout"}> */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleStripeCheckout}
              className="py-3 text-sm font-semibold text-white bg-black disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Process to Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
