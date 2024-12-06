import { generateMedicalResponse } from './azureOpenAI';

export const translateContent = async (content: string, language: string, apiKey: string) => {
  // Extract sections from the original content
  const sections = content.split('\n\n');
  const translationPrompt = `Translate the following medical information to ${language}, maintaining the exact same format with sections for Condition, Common Causes, Active Ingredients, Natural Alternatives, Prevention Guidelines, and Specialist Referral. Keep all section headers in English but translate the content. Here's the content to translate:\n\n${content}`;
  
  return generateMedicalResponse(translationPrompt, apiKey);
};

export const analyzeNewSymptoms = async (currentCondition: string, newSymptoms: string, apiKey: string) => {
  const prompt = `Given the current condition:\n${currentCondition}\n\nAnalyze these additional symptoms:\n${newSymptoms}\n\nProvide an updated analysis.`;
  return generateMedicalResponse(prompt, apiKey);
};

export const getMorePreventionDetails = async (condition: string, apiKey: string) => {
  const prompt = `Provide detailed prevention guidelines for the following condition:\n${condition}\n\nInclude lifestyle changes, dietary recommendations, and preventive measures.`;
  return generateMedicalResponse(prompt, apiKey);
};

export const getMoreNaturalAlternatives = async (activeIngredients: string, apiKey: string) => {
  const prompt = `Given these active ingredients:\n${activeIngredients}\n\nProvide 5 additional natural alternatives with specific preparation methods for each.`;
  return generateMedicalResponse(prompt, apiKey);
};

export const findSpecialist = async (condition: string, location: { lat: number; lng: number }, apiKey: string) => {
  const prompt = `For the condition: ${condition}\n\nRecommend medical specialists and types of healthcare providers to consult. Include what to look for in a specialist and key questions to ask during consultation.`;
  return generateMedicalResponse(prompt, apiKey);
};