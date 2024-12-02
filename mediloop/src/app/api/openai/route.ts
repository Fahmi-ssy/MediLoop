import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.json();
        
        const prompt = `
Based on the following health-related information:
${Object.entries(formData)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}

Please provide recommendations in EXACTLY this format (maintain the exact headers and bullet points):

1. To-Do List:
- First specific action item
- Second specific action item
- Third specific action item

2. Lifestyle Changes:
- First specific lifestyle change
- Second specific lifestyle change
- Third specific lifestyle change

3. Recommended Products:
- First specific product recommendation
- Second specific product recommendation
- Third specific product recommendation`;

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

        if (!response.ok) {
            throw new Error(`OpenAI Error: ${response.statusText}`);
        }

        const data = await response.json();
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