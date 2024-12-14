import ProductModel from "@/db/models/ProductModels";
import { getEmbedding } from "../embedding/route";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const query = searchParams.get("query") || "";
    const sort = searchParams.get("sort") || "desc";

    const products = await ProductModel.getAll(page, limit, query, sort);

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json();
    
    const textToEmbed = `${productData.name} ${productData.description} ${productData.usage}`;
    let embedding;
    try {
      embedding = await getEmbedding(textToEmbed);
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw new Error("Failed to generate product embedding");
    }
    
    const productWithEmbedding = {
      ...productData,
      product_embedding: embedding
    };

    const newProduct = await ProductModel.create(productWithEmbedding);
    
    if (!newProduct.acknowledged) {
      throw new Error("Failed to create product in database");
    }

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error adding product:", err);
    return new Response(
      JSON.stringify({ 
        message: "Error adding product",
        details: err instanceof Error ? err.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const productData = await request.json();
    const { name, description, usage, price, image } = productData;

    if (!name || !description || !usage || !price || !image) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const textToEmbed = `${name} ${description} ${usage}`;
    let embedding;
    try {
      embedding = await getEmbedding(textToEmbed);
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw new Error("Failed to generate product embedding");
    }

    const productWithEmbedding = {
      ...productData,
      product_embedding: embedding
    };

    const result = await ProductModel.updateOne(
      { name },
      { $set: productWithEmbedding }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Product not found' }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Product updated successfully' }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Error updating product:", err);
    return new Response(
      JSON.stringify({ 
        message: "Error updating product",
        details: err instanceof Error ? err.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
