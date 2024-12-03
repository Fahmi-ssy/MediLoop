import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { imageData, formData } = await request.json();

    if (!imageData) {
      throw new Error('No image data provided');
    }

    const imageUrl = imageData.startsWith('data:') ? imageData : `data:image/jpeg;base64,${imageData}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a medical assistant analyzing prescription images and health information. First analyze the image in detail, then provide specific recommendations."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please analyze this medical prescription or report image and provide:
1. A detailed description of what you see in the image
2. Based on the image and the following health information, provide recommendations:
${Object.entries(formData)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Format your response exactly like this:
IMAGE ANALYSIS:
[Your detailed image analysis here]

RECOMMENDATIONS:
1. To-Do List:
- First todo item
- Second todo item
- Third todo item

2. Lifestyle Changes:
- First lifestyle change
- Second lifestyle change
- Third lifestyle change

3. Recommended Products:
- First product recommendation
- Second product recommendation
- Third product recommendation`
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No analysis received from OpenAI');
    }

    const parts = content.split('RECOMMENDATIONS:');
    const imageAnalysis = parts[0]?.replace('IMAGE ANALYSIS:', '').trim() || '';
    const recommendations = parts[1]?.trim() || '';

    return NextResponse.json({
      analysis: recommendations,
      imageAnalysis: imageAnalysis
    });
  } catch (error) {
    console.error('Detailed error in vision route:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to analyze image',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
