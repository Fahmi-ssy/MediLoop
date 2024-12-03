import ProductModel from "@/db/models/ProductModels";
import { NextResponse } from "next/server";
import { getEmbedding } from "../../embedding/route";

export async function GET(
    request: Request,
    {params}: {params: {name: string}}
){
    const product = await ProductModel.getByName(params.name);
    return Response.json(product);
}

export async function DELETE(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const result = await ProductModel.deleteOne({ name: params.name });

    if (!result || result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const productData = await request.json();
    
    // Generate new embedding for updated product
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

    const result = await ProductModel.updateOne(
      { name: params.name },
      { $set: productWithEmbedding }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product updated successfully"
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}