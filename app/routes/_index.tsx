import type { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import prisma from "../utils/prisma.server";

export const loader: LoaderFunction = async () => {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return json({ products });
};

export default function Index() {
  const { products } = useLoaderData<typeof loader>();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Catálogo de productos</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <li key={product.id} className="bg-white rounded shadow p-4">
            <div className="font-semibold">{product.name}</div>
            <div className="text-pink-600 font-bold">${product.price}</div>
            <div className="text-xs text-gray-500">
              {product.category?.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
