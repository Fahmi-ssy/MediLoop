export async function POST(request: Request) {
    const body = await request.json();
    const { messages, model, temperature, maxTokens } = body;
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: model || 'gpt-3.5-turbo',
                messages,
                temperature: temperature || 0.7,
                max_tokens: maxTokens || 1000,
            }),
        });

        const data = await response.json();

        return Response.json(data);
    } catch (error) {
        console.error('OpenAI API error:', error);
        return Response.json(
            { error: 'Failed to fetch from OpenAI API' },
            { status: 500 }
        );
    }
}
    
