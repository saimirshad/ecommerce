import React from "react";
import { client } from "@/lib/sanityClient";
import Image from "next/image";
import { Image as IImage } from "sanity";
import Wrapper from "@/app/components/shared/Wrapper";
import { urlForImage } from "../../../sanity/lib/image";
import Link from "next/link";

const getProductData = async () => {
  const res = await client.fetch(
    `*[_type == "product" && category._ref in *[_type=="category" && name=="Male"]._id ]`
  );
  return res;
};

interface IProduct {
  id: string;
  title: string;
  description: string;
  image: IImage;
  price: number;
}

const Male = async () => {
  const data: IProduct[] = await getProductData();

  return (
    <div>
      <Wrapper>
        <div className="grid grid-cols-3 cursor-pointer ml-52 gap-x-4 gap-y-8 max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:ml-0">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.title.replaceAll(" ", "-")}`}
            >
              <div className="max-h-[300px] mb-44">
                <Image
                  src={urlForImage(item.image).url()}
                  alt="ProductImage"
                  width={300}
                  height={300}
                />
                <h2 className="text-lg font-semibold text-black">
                  {item.title}
                </h2>
                <h2 className="font-semibold text-gray-500 text-md">
                  {item.description}
                </h2>
                <span className="text-xl font-bold text-black ">
                  ${item.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Male;
