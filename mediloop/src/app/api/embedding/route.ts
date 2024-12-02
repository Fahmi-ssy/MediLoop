import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
const MDB_CONNECTION_STRING = process.env.URI_MONGODB as string;

async function getEmbedding(query: string): Promise<number[]> {
  const url = 'https://api.openai.com/v1/embeddings';
    console.log(query, "<--- query")
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: query,
      model: 'text-embedding-ada-002',
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.data[0].embedding;
  } else {
    throw new Error(`Failed to get embedding. Status code: ${response.status}`);
  }
}

async function findSimilarDocuments(
  embedding: number[]
): Promise<Product[]> {
  const client = new MongoClient(MDB_CONNECTION_STRING);
  console.log(embedding, "<--- embedding")

  try {
    await client.connect();
    const db = client.db('MediLoop');
    const collection = db.collection('products');

    const documents = await collection
      .aggregate<Product>([
        {
          $vectorSearch: {
            queryVector: embedding,
            path: 'product_embedding',
            numCandidates: 100,
            limit: 5,
            index: 'default',
          },
        },
        {
            $project: {
                product_embedding: 0
            }
        }
      ])
      .toArray();

    return documents;
  } finally {
    await client.close();
  }
}

interface QueryRequestBody {
  query: string;
}

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const { query } = await req.json()

  try {
    const embedding = await getEmbedding(query);
    console.log(embedding, "<--- embedding sini");
    
    const documents = await findSimilarDocuments(embedding);
    // Return the documents for Postman to be able to see the data
    return NextResponse.json({ documents }, { status: 200 });
  } catch (error: any) {
    // Handle the error and return a response
    console.error('Error finding similar documents:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
