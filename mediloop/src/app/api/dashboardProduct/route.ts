
import ProductModel from "@/db/models/ProductModels";

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
