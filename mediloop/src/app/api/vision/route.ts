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

    // Convert base64 to URL if needed
    const imageUrl = imageData.startsWith('data:') ? imageData : `data:image/jpeg;base64,${imageData}`;

    // Validate the base64 string
    if (!imageUrl.includes('base64')) {
      throw new Error('Invalid image format');
    }

    console.log('Sending request to OpenAI Vision API...');
    
    console.log('Image URL length:', imageUrl.length);
    console.log('Image URL prefix:', imageUrl.substring(0, 50) + '...');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a medical assistant analyzing prescription images and health information."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please analyze this medical prescription or report image along with the following health information:\n${
                Object.entries(formData)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join('\n')
              }\n\nPlease provide recommendations in the following format:\n\n1. To-Do List:\n- First todo item based on the prescription/report\n- Second todo item\n- Third todo item\n\n2. Lifestyle Changes:\n- First lifestyle change considering the prescription/report\n- Second lifestyle change\n- Third lifestyle change\n\n3. Recommended Products:\n- First product recommendation from the prescription/report\n- Second product recommendation\n- Third product recommendation`
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

    console.log('Received response from OpenAI');

    if (!response.choices[0]?.message?.content) {
      throw new Error('No analysis received from OpenAI');
    }

    return NextResponse.json({
      analysis: response.choices[0].message.content,
    });
  } catch (error) {
    console.error('Detailed error in vision route:', error);
    
    // Return a more specific error message
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to analyze image',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
