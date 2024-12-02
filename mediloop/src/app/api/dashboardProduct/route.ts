import ProductModel from "@/db/models/ProductModels";
import { getEmbedding } from "../embedding/route";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query")?.trim(); 
    const searchQuery = url.searchParams.get("search")?.trim(); 
    const page = parseInt(url.searchParams.get("page") || "1", 10); 
    const limit = parseInt(url.searchParams.get("limit") || "10", 10); 

    let products;

    if (searchQuery) {
      
      products = await ProductModel.searchByNameOrDescription(searchQuery);
    } else if (query) {
      
      products = await ProductModel.getAll(page, limit, query);
    } else {
      
      products = await ProductModel.getAll(page, limit);
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    return new Response(
      JSON.stringify({ message: "Error fetching products" }),
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
    
    // Generate embedding for the product
    const textToEmbed = `${productData.name} ${productData.description} ${productData.usage}`;
    let embedding;
    try {
      embedding = await getEmbedding(textToEmbed);
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw new Error("Failed to generate product embedding");
    }
    
    // Add embedding to product data
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
