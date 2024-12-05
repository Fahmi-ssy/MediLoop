import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { imageData, formData } = await request.json();

    if (!imageData) {
      throw new Error("No image data provided");
    }

    const imageUrl = imageData;
    console.log(imageUrl, "aaaaaaaaaaa");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a medical assistant analyzing prescription images and health information. First analyze the image in detail, then provide specific analysis",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `What is in this image?`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No analysis received from OpenAI");
    }

    const parts = content.split("RECOMMENDATIONS:");
    const imageAnalysis = parts[0]?.replace("IMAGE ANALYSIS:", "").trim() || "";
    const recommendations = parts[1]?.trim() || "";

    return NextResponse.json({
      analysis: recommendations,
      imageAnalysis: imageAnalysis,
    });
  } catch (error) {
    console.error("Detailed error in vision route:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to analyze image",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
