import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should proxy through your backend
});

export const analyzeSentiment = async (query: string, context: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI sentiment analysis assistant. Analyze the following context and answer questions about sentiment trends, patterns, and insights. Context: ${context}`
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};

export const generateInsights = async (data: any) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an AI insights generator. Generate concise, actionable insights from the following sentiment data."
        },
        {
          role: "user",
          content: JSON.stringify(data)
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating insights:', error);
    throw error;
  }
}; 