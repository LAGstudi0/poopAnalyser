import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { base64Image } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-4o' if you're enabled for it
      messages: [
        {
          role: 'system',
          content: `
        You're a visual diagnostic assistant. Analyze the photo of a stool sample (toilet, ground, or surface) using the Bristol Stool Chart.
        
        Respond strictly in JSON format with this structure:
        
        {
          "bristolType": {
            "type": "Type 3",
            "description": "Like a sausage but with cracks on its surface."
          },
          "color": {
            "assessment": "Medium brown",
            "description": "Typical healthy stool color."
          },
          "consistency": {
            "rating": "Firm",
            "description": "Holds shape well, not too dry or wet."
          },
          "additionalNotes": "No signs of unusual features."
        }
        
        Only return valid JSON. Do not add explanation or commentary outside the JSON.
        `,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please analyze this stool photo.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const result = response.choices[0].message?.content;
    console.log('🧠 AI RAW RESPONSE:\n', result);
    return NextResponse.json({ result });
  } catch (err) {
    console.error('[API ERROR]', err);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
