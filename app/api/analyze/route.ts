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
          content: `You are a visual diagnostic assistant. You are analyzing stool images (human or animal, in toilet or on ground) for educational and health-related purposes. You are allowed to describe the visual characteristics of the stool based on the Bristol Stool Chart (types 1–7), including color and consistency. Do not offer medical advice. If the image is unclear or not a stool sample, explain that clearly.`,
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
