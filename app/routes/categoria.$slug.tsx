import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import prisma from "../utils/prisma.server";
import { useState } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return { category };
};

export default function Categoria() {
  const { category } = useLoaderData<typeof loader>();
  type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    available: boolean;
    material: string;
    status?: string; // Puede ser undefined si aún no está en todos los registros
  };
  const [priceFilter, setPriceFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [search, setSearch] = useState("");

  const filteredProducts = (category.products as Product[]).filter(
    (product) => {
      let pass = true;
      // Filtro por búsqueda simple
      if (search) {
        const s = search.toLowerCase();
        pass =
          product.name.toLowerCase().includes(s) ||
          product.material.toLowerCase().includes(s) ||
          String(product.price).includes(s);
      }
      // Filtro por precio
      if (priceFilter === "0-20000") pass = pass && product.price <= 20000;
      if (priceFilter === "20000-40000")
        pass = pass && product.price > 20000 && product.price <= 40000;
      if (priceFilter === "40000") pass = pass && product.price > 40000;
      // Filtro por material
      if (materialFilter) pass = pass && product.material === materialFilter;
      // Filtro por disponibilidad
      if (availabilityFilter === "disponible") pass = pass && product.available;
      if (availabilityFilter === "agotado") pass = pass && !product.available;
      return pass;
    }
  );
  if (!category)
    return (
      <div className="py-8 text-center text-gray-500">
        Categoría no encontrada
      </div>
    );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">{category.name}</h1>
      {/* Búsqueda y filtros base (UI) */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          className="border rounded px-3 py-2 text-sm w-56"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 text-sm"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">Precio</option>
          <option value="0-20000">$0 - $20k</option>
          <option value="20000-40000">$20k - $40k</option>
          <option value="40000">$40k+</option>
        </select>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
        >
          <option value="">Material</option>
          <option value="Acero">Acero</option>
          <option value="Oro">Oro</option>
          <option value="Plata">Plata</option>
          <option value="Fantasía">Fantasía</option>
        </select>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="">Disponibilidad</option>
          <option value="disponible">Disponible</option>
          <option value="agotado">Agotado</option>
        </select>
      </div>
      {/* Grid de productos filtrados */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">
          No hay productos que coincidan con los filtros.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
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
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-pink-600 mt-1">
                  ${product.price}
                </p>
                <p className="text-xs text-gray-500">{product.material}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
