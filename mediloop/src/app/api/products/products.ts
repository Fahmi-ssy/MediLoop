import { NextApiRequest, NextApiResponse } from "next";
import ProductModel from "@/db/models/ProductModels";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const query = (req.query.query as string) || undefined;

      const products = await ProductModel.getAll(page, limit, query);
      res.status(200).json(products);
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
