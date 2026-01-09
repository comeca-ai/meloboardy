import { openai } from "@ai-sdk/openai";
import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";

// Para ambiente de teste, usa mock
export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : null;

// Modelo padrão do Caramelo - GPT-4o
const DEFAULT_MODEL = "gpt-4o";

export function getLanguageModel(modelId?: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("chat-model");
  }

  // Usa GPT-4o como padrão para o Caramelo
  return openai(modelId || DEFAULT_MODEL);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  // GPT-4o-mini para títulos (mais rápido e barato)
  return openai("gpt-4o-mini");
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }
  // GPT-4o-mini para artifacts
  return openai("gpt-4o-mini");
}
