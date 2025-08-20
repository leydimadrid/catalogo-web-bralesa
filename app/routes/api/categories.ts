import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import prisma from "../../utils/prisma.server";

export const loader: LoaderFunction = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    select: { id: true, name: true, slug: true },
  });
  return json(categories);
};
