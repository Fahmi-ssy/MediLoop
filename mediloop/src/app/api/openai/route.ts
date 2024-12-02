import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Parse JSON data sent from the client
        const formData = await request.json();

        // Construct the OpenAI prompt dynamically
        const prompt = `
            Based on the following health-related information:
            ${Object.entries(formData)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')}
            
            Please provide recommendations in the following format:
            
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
            - Third product recommendation
            
            Please ensure each section starts with the number and contains bullet points starting with "-" for each item.
        `;

        // Send the request to OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
                temperature: 0.7,
            }),
        });

        // Handle OpenAI's response
        if (!response.ok) {
            throw new Error(`Open API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Return AI recommendations to the client
        return NextResponse.json({
            recommendations: data.choices[0].message.content,
        });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        return NextResponse.json(
            { error: 'Failed to generate recommendations' },
            { status: 500 }
        );
    }
}