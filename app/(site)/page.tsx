"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchProduct } from "@/redux/slice/productSice";
import { useRouter } from "next/navigation";

export default function Home() {
  const productRef: any = useRef(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector(
    (state: RootState) => state.product
  );
  useEffect(() => {
    if (productRef.current === false && products.length == 0) {
      dispatch(fetchProduct());
    }
    return () => {
      productRef.current = true;
    };
  }, []);

  return (
    <main className="min-h-screen  ">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap ">
            {products?.map((item: any) => (
              <div
                className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-lg hover:bg-gray-50"
                key={item.id}
              >
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-top w-full h-full block"
                    src={item.image}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {item.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.title}
                  </h2>
                  <p className="mt-1">${item.price}</p>
                </div>
                <span
                  onClick={() => router.push(`/details/${item.id}`)}
                  className="text-green-500 inline-flex items-center mt-3 cursor-pointer"
                >
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
