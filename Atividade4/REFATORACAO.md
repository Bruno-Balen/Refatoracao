# Refatoração - Atividade 4

Resumo das mudanças e oportunidades de refatoração encontradas.

O que foi feito
- Separei em classes: `Livro`, `Usuario`, `Emprestimo` e `Biblioteca`.
- Adicionei um serviço de notificação `Notificador` para retirar lógica de comunicação do fluxo principal.
- Removi código de formatação misturado com regras de negócio. O runner (`index.ts`) contém apenas exemplos de uso.

- Funções muito longas: o código original tinha métodos que faziam validação, cálculo, atualização de estado e formatação ao mesmo tempo.
- Dados hardcoded: o construtor carregava dados fixos. Em produção, deve-se usar um repositório, injeção de dependência ou banco.
- Falta de encapsulamento: campos públicos permitiam inconsistência de estado (por exemplo, `disponiveis` era manipulado diretamente).
- Mistura de responsabilidades: notificações, formatação e persistência estavam no mesmo lugar.

Consequências de não aplicar OOP e boas práticas a longo prazo
- Código difícil de manter: mudanças em uma regra propagam bugs por todo o código porque não há pontos únicos de alteração.
- Maior probabilidade de bugs por estado inconsistente (por exemplo, quantidade e disponíveis fora de sincronia).
- Menor reuso: não é possível reaproveitar partes da classes em outros contextos (API, CLI, UI) sem copiar código.
- Risco de segurança e integridade: sem validações centrais, dados incorretos podem ser salvos, gerando cobranças indevidas ou empréstimos inválidos.

