import { NextResponse } from 'next/server';
import ProductModel from '@/db/models/ProductModels';
import { getEmbedding } from '../embedding/route';

export async function POST(request: Request) {
  try {
    const { products } = await request.json();

    // Process each product and add embeddings
    const productsWithEmbeddings = await Promise.all(
      products.map(async (product: any) => {
        const textToEmbed = `${product.name} ${product.description} ${product.usage}`;
        const embedding = await getEmbedding(textToEmbed);
        return {
          ...product,
          product_embedding: embedding
        };
      })
    );

    // Bulk insert into database
    const result = await ProductModel.collection().insertMany(productsWithEmbeddings);

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount
    }, { status: 201 });

  } catch (error) {
    console.error('Error in bulk import:', error);
    return NextResponse.json(
      { error: 'Failed to import products' },
      { status: 500 }
    );
  }
}