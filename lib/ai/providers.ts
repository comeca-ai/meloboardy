import { anthropic } from "@ai-sdk/anthropic";
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

// Modelo padrão do Caramelo
const DEFAULT_MODEL = "claude-sonnet-4-20250514";

export function getLanguageModel(modelId?: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("chat-model");
  }

  // Usa Claude Sonnet como padrão para o Caramelo
  return anthropic(modelId || DEFAULT_MODEL);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  // Haiku para títulos (mais rápido e barato)
  return anthropic("claude-3-5-haiku-20241022");
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }
  // Haiku para artifacts
  return anthropic("claude-3-5-haiku-20241022");
}
