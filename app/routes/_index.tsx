import type { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData, Link } from "@remix-run/react";
import prisma from "../utils/prisma.server";

export const loader: LoaderFunction = async () => {
  // Simulación: destacados = primeros 4, nuevos = últimos 8, categorías = todas
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);
  return json({
    featured: products.slice(0, 4),
    newProducts: products.slice(0, 8),
    categories,
  });
};

import { useState } from "react";

export default function Index() {
  const { featured, newProducts, categories } = useLoaderData<typeof loader>();
  const [search, setSearch] = useState("");

  function filterProduct(product: any) {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(s) ||
      (product.material && product.material.toLowerCase().includes(s)) ||
      (product.category?.name &&
        product.category.name.toLowerCase().includes(s)) ||
      String(product.price).includes(s)
    );
  }

  const filteredFeatured = featured.filter(filterProduct);
  const filteredNew = newProducts.filter(filterProduct);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Búsqueda */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          className="border rounded px-4 py-2 w-full max-w-md text-sm shadow"
          placeholder="Buscar producto por nombre, material o categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categorías */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2">
          <span className="text-xl">📂</span> Categorías
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              to={`/categoria/${cat.slug}`}
              className="flex flex-col items-center p-3 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl min-w-[90px] shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              {/* Si tienes imagen de categoría, reemplaza el span por <img src={cat.image_url} ... /> */}
              <span className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-lg mb-1">
                {cat.name[0]}
              </span>
              <span className="text-xs font-medium text-pink-700">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2">
          <span className="text-xl">⭐</span> Productos destacados
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filteredFeatured.length === 0 ? (
            <li className="col-span-4 text-center text-gray-400 py-8">
              No hay productos destacados que coincidan.
            </li>
          ) : (
            filteredFeatured.map((product: any) => (
              <li
                key={product.id}
                className="bg-gradient-to-br from-pink-50 to-white rounded-lg shadow-sm overflow-hidden transition-transform duration-200 hover:shadow-lg hover:scale-105"
              >
                <Link
                  to={`/producto/${product.slug}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-36 object-cover object-center bg-pink-100"
                    />
                    {/* Indicador visual de stock */}
                    <div className="absolute top-2 right-2">
                      {product.status === "available" && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-green-500">
                          ⚡️ Disponible
                        </span>
                      )}
                      {product.status === "on_order" && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-yellow-400">
                          🔄 Bajo pedido
                        </span>
                      )}
                      {product.status === "low_stock" && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-orange-400">
                          ⚠️ Pocas unidades
                        </span>
                      )}
                      {product.status === "out_of_stock" && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-red-500">
                          ❌ Agotado
                        </span>
                      )}
                      {!product.status && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-pink-400">
                          {product.available ? "⚡️" : "❌"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-pink-600 font-bold">${product.price}</p>
                    <p className="text-xs text-gray-500">
                      {product.category?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {product.material || ""}
                    </p>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Nuevos productos */}
      <section>
        <h2 className="text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2">
          <span className="text-xl">🆕</span> Nuevos productos
        </h2>
        <ul className="product-grid flex flex-wrap gap-8">
          {filteredNew.length === 0 ? (
            <li className="w-full text-center text-gray-400 py-8">
              No hay productos nuevos que coincidan.
            </li>
          ) : (
            filteredNew.map((product: any) => (
              <li
                key={product.id}
                className="bg-gradient-to-br from-pink-50 to-white rounded-lg shadow-sm overflow-hidden transition-transform duration-200 hover:shadow-lg hover:scale-105"
              >
                <Link
                  to={`/producto/${product.slug}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      className="w-96 h-36 object-cover object-center bg-pink-100"
                    />
                    {/* Indicador visual de stock */}
                    <div className="absolute top-2 right-2">
                      {product.status === "available" && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-green-500">
                          ⚡️ Disponible
                        </span>
                      )}
                      {product.status === "on_order" && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-yellow-400">
                          🔄 Bajo pedido
                        </span>
                      )}
                      {product.status === "low_stock" && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-orange-400">
                          ⚠️ Pocas unidades
                        </span>
                      )}
                      {product.status === "out_of_stock" && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-red-500">
                          ❌ Agotado
                        </span>
                      )}
                      {!product.status && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-pink-400">
                          {product.available ? "⚡️" : "❌"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-pink-600 font-bold">${product.price}</p>
                    <p className="text-xs text-gray-500">
                      {product.category?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {product.material || ""}
                    </p>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
