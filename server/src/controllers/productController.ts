import { Request, Response } from "express";
import Product from "../models/Product";
import { logAdminAction } from "../utils/logAdminActivity";
import { isValidZipUrl } from "../utils/validateFileUrl";

// Extend Request type to include admin for logging
type AdminRequest = Request & { admin?: { id: string } };

export const createProduct = async (req: AdminRequest, res: Response) => {
  const { name, description, price, zipUrl } = req.body;

  if (zipUrl && !isValidZipUrl(zipUrl)) {
    return res.status(400).json({ error: "Invalid ZIP or PDF file URL" });
  }

  const product = await Product.create({ name, description, price, zipUrl });

  await logAdminAction(req, "CREATE_PRODUCT", { productId: product._id });
  res.status(201).json(product);
};

export const getAllProducts = async (req: Request, res: Response) => {
  const { search, page = 1, limit = 10 } = req.query;

  const query: any = {};
  if (search) {
    query.name = { $regex: search.toString(), $options: "i" };
  }

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip((+page - 1) * +limit)
    .limit(+limit);

  const total = await Product.countDocuments(query);

  res.json({ products, total });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  res.json(product);
};

export const updateProduct = async (req: AdminRequest, res: Response) => {
  const { zipUrl } = req.body;

  if (zipUrl && !isValidZipUrl(zipUrl)) {
    return res.status(400).json({ error: "Invalid ZIP or PDF file URL" });
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!product) return res.status(404).json({ error: "Product not found" });

  await logAdminAction(req, "UPDATE_PRODUCT", { productId: product._id });
  res.json(product);
};

export const deleteProduct = async (req: AdminRequest, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  await logAdminAction(req, "DELETE_PRODUCT", { productId: product._id });
  res.json({ message: "Product deleted" });
};
