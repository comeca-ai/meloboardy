import type { Geo } from "@vercel/functions";
import type { ArtifactKind } from "@/components/artifact";
import { carameloSystemPrompt, carameloTitlePrompt } from "./caramelo-prompt";

export const artifactsPrompt = `
Artifacts é um modo especial de interface que ajuda usuários com criação de conteúdo. Quando aberto, aparece do lado direito da tela.

Quando pedirem código, use artifacts. Especifique a linguagem, ex: \`\`\`python\`código aqui\`\`\`.

**Quando usar \`createDocument\`:**
- Para conteúdo substancial (>10 linhas) ou código
- Para conteúdo que o usuário vai salvar/reusar
- Quando pedirem explicitamente para criar documento

**Quando NÃO usar \`createDocument\`:**
- Para respostas informativas/explicativas
- Para respostas conversacionais
- Quando pedirem para manter no chat

**Usando \`updateDocument\`:**
- Use reescrita completa para mudanças grandes
- Use updates pontuais só para mudanças isoladas

NÃO atualize documento logo após criar. Espere feedback do usuário.
`;

export const regularPrompt = carameloSystemPrompt;

export type RequestHints = {
  latitude: Geo["latitude"];
  longitude: Geo["longitude"];
  city: Geo["city"];
  country: Geo["country"];
};

export const getRequestPromptFromHints = (requestHints: RequestHints) => `\
Origem da requisição do usuário:
- cidade: ${requestHints.city || "desconhecida"}
- país: ${requestHints.country || "desconhecido"}
`;

export const systemPrompt = ({
  selectedChatModel,
  requestHints,
}: {
  selectedChatModel: string;
  requestHints: RequestHints;
}) => {
  const requestPrompt = getRequestPromptFromHints(requestHints);

  // Para o Caramelo, sempre usa o prompt principal
  // Não precisa de artifacts na maioria dos casos
  return `${carameloSystemPrompt}\n\n${requestPrompt}`;
};

export const codePrompt = `
Você é um gerador de código Python que cria snippets auto-contidos e executáveis. Ao escrever código:

1. Cada snippet deve ser completo e rodar sozinho
2. Prefira usar print() para mostrar outputs
3. Inclua comentários explicativos
4. Mantenha snippets concisos (até 15 linhas)
5. Evite dependências externas - use biblioteca padrão
6. Trate erros graciosamente
7. Retorne output que demonstre a funcionalidade
8. Não use input() ou funções interativas
9. Não acesse arquivos ou rede
10. Não use loops infinitos
`;

export const sheetPrompt = `
Você é um assistente de criação de planilhas. Crie planilhas em formato CSV baseado no prompt. A planilha deve conter headers e dados relevantes.
`;

export const updateDocumentPrompt = (
  currentContent: string | null,
  type: ArtifactKind
) => {
  let mediaType = "documento";

  if (type === "code") {
    mediaType = "código";
  } else if (type === "sheet") {
    mediaType = "planilha";
  }

  return `Melhore o seguinte ${mediaType} baseado no prompt:

${currentContent}`;
};

export const titlePrompt = carameloTitlePrompt;
