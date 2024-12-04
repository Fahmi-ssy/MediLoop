import { NextResponse } from 'next/server';
import RecommendationModel from '@/db/models/RecommendationModels';
import { cookies } from 'next/headers';
import { verifyWithJose } from '@/db/helpers/jwt';

export async function POST(request: Request) {
  try {
    const recommendationData = await request.json();
    console.log('Received recommendation data:', recommendationData);
    
    if (!recommendationData.userId) {
      console.error('No userId provided in recommendation data');
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }
    
    const savedRecommendation = await RecommendationModel.create(recommendationData);
    console.log('Saved recommendation result:', savedRecommendation);

    return NextResponse.json({
      success: true,
      data: savedRecommendation
    });

  } catch (error) {
    console.error('Detailed error saving recommendation:', error);
    return NextResponse.json(
      { error: 'Failed to save recommendation', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const auth = cookies().get('Authorization')?.value;
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [type, token] = auth.split(' ');
    if (type !== 'Bearer') {
      return NextResponse.json({ error: 'Invalid token type' }, { status: 401 });
    }

    const verified = await verifyWithJose(token);
    
    // Get userId from URL parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }
    
    if (verified._id !== userId) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    const recommendations = await RecommendationModel.findByUserId(userId);
    
    return NextResponse.json({
      success: true,
      data: recommendations
    });

  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Recommendation ID is required' },
        { status: 400 }
      );
    }

    const result = await RecommendationModel.collection().deleteOne({
      _id: new Object(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Recommendation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Recommendation deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting recommendation:', error);
    return NextResponse.json(
      { error: 'Failed to delete recommendation' },
      { status: 500 }
    );
  }
}