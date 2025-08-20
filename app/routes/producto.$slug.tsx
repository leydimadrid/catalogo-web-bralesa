import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import prisma from "../utils/prisma.server";
import { getEnv } from "../utils/env.server";

export const loader: LoaderFunction = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      images: {
        orderBy: { order: "asc" },
      },
    },
  });
  // Exponer variable de entorno al cliente
  const env = getEnv();
  return { product, ENV: env };
};

export default function ProductDetail() {
  const { product, ENV } = useLoaderData<typeof loader>();
  if (!product)
    return <div className="text-center py-12">Producto no encontrado</div>;

  // Exponer variable de entorno al cliente
  const whatsappNumber = ENV?.WHATSAPP_NUMBER || "";
  const whatsappMessage = `Hola! Me interesa el ${product.name} que vi en tu catálogo 💎\n\nPrecio: $${product.price}\nReferencia: ${product.id}\n\n¿Está disponible? 🤔`;
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Galería de imágenes múltiple */}
        <Gallery
          images={product.images}
          principal={product.image}
          name={product.name}
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-pink-600 mb-4">
            ${product.price}
          </p>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-pink-400 mr-2">
              {product.available ? "⚡️ Disponible" : "❌ Agotado"}
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-pink-700 bg-pink-100">
              {product.material}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Categoría: {product.category?.name}
          </p>
          {/* Botón WhatsApp y compartir */}
          <div className="flex gap-3 mt-8">
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white py-2 px-5 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              💬 WhatsApp
            </a>
            <button
              className="bg-yellow-400 text-white py-2 px-5 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center gap-2"
              onClick={() =>
                navigator.share &&
                navigator.share({
                  title: product.name,
                  url: window.location.href,
                })
              }
            >
              📤 Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de galería múltiple
import { useState } from "react";

function Gallery({
  images,
  principal,
  name,
}: {
  images: any[];
  principal: string;
  name: string;
}) {
  const allImages = principal
    ? [{ imageUrl: principal, altText: name }, ...images]
    : images;
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square w-full relative">
        <img
          src={allImages[selected]?.imageUrl || "/placeholder.png"}
          alt={allImages[selected]?.altText || name}
          className="w-full h-full object-cover rounded-lg shadow"
        />
      </div>
      <div className="flex gap-2 justify-center mt-2">
        {allImages.map((img, idx) => (
          <button
            key={idx}
            className={`w-16 h-16 rounded-lg border-2 ${
              selected === idx ? "border-pink-500" : "border-transparent"
            }`}
            onClick={() => setSelected(idx)}
          >
            <img
              src={img.imageUrl}
              alt={img.altText || name}
              className="w-full h-full object-cover rounded-md"
            />
          </button>
        ))}
      </div>
      {/* Dots para navegación mobile */}
      <div className="flex justify-center gap-1 mt-2">
        {allImages.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full ${
              selected === idx ? "bg-pink-500" : "bg-pink-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
