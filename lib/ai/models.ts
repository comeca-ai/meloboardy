// Caramelo usa Claude como modelo principal
export const DEFAULT_CHAT_MODEL = "claude-sonnet-4-20250514";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "claude-sonnet-4-20250514",
    name: "Claude Sonnet 4",
    provider: "anthropic",
    description: "Modelo principal do Caramelo - balanceado e inteligente",
  },
  {
    id: "claude-3-5-haiku-20241022",
    name: "Claude Haiku",
    provider: "anthropic",
    description: "Rápido e econômico para tarefas simples",
  },
];

// Group models by provider for UI
export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
