import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Parse JSON data sent from the client
        const formData = await request.json();

        // Construct the OpenAI prompt dynamically
        const prompt = `
            A user has submitted the following health-related answers:
            
            ${Object.entries(formData)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')}
            
            Based on this data, please recommend:
            1. A personalized to-do list for improving their condition.
            2. Lifestyle habit changes they should adopt.
            3. Specific products or remedies they should consider.
        `;

        // Send the request to OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure this is set in your environment
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
            throw new Error(`OpenAI API error: ${response.statusText}`);
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
