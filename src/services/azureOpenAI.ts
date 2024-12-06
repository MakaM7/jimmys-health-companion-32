interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const generateMedicalResponse = async (userMessage: string, apiKey: string) => {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: "You are MediGuide, a medical AI assistant. Provide health insights in a structured format with sections for Condition, Common Causes, Recommended Medications, Active Ingredients, Natural Alternatives, Prevention Guidelines, and Specialist Referral. Always include medical disclaimers."
    },
    {
      role: 'user',
      content: userMessage
    }
  ];

  try {
    const response = await fetch(
      'https://gptmodelbargain.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-08-01-preview',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          messages,
          temperature: 0.7,
          max_tokens: 800,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};