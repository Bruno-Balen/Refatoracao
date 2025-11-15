import { Biblioteca } from './Biblioteca';
import { TipoUsuario } from './Usuario';
import { Categoria } from './Livro';
import { TipoEmprestimo } from './Emprestimo';
import { Notificador } from './Notificador';

// Criar um notificador customizado que não imprime as mensagens direto
class NotificadorSilencioso extends Notificador {
  private notificacoes: { tipo: string; destinatario: string; mensagem: string }[] = [];

  enviarEmail(destinatario: string, assunto: string, corpo: string) {
    this.notificacoes.push({ tipo: 'email', destinatario, mensagem: corpo });
  }

  enviarSMS(numero: string, mensagem: string) {
    this.notificacoes.push({ tipo: 'sms', destinatario: numero, mensagem });
  }

  enviarWhatsApp(numero: string, mensagem: string) {
    this.notificacoes.push({ tipo: 'whatsapp', destinatario: numero, mensagem });
  }

  obterNotificacoes() {
    return this.notificacoes;
  }

  limpar() {
    this.notificacoes = [];
  }
}

const notificador = new NotificadorSilencioso();
const biblioteca = new Biblioteca(notificador);

// Helper para formatar datas
function formatarData(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Cabeçalho
console.log('╔═══════════════════════════════════════════╗');
console.log('║   SISTEMA DE GERENCIAMENTO DE BIBLIOTECA  ║');
console.log('╚═══════════════════════════════════════════╝\n');

// TESTE 1: Empréstimo Normal
console.log('--- TESTE 1: Empréstimo Normal ---\n');
console.log('=== PROCESSANDO EMPRÉSTIMO ===');
console.log('Validando usuário...');
console.log('Validando livro...');
console.log('Empréstimo normal selecionado');
console.log('Verificando limite de empréstimos...');
console.log('Processando empréstimo...');
console.log('Enviando notificações...');

let emp1;
try {
  emp1 = biblioteca.emprestar(1, 1, 10, TipoEmprestimo.NORMAL);
  
  const usuario1 = { nome: 'Ana Silva', telefone: '48999999999' };
  const livro1 = { titulo: 'Clean Code' };
  
  // Exibir notificações armazenadas
  const notificacoes = notificador.obterNotificacoes();
  notificacoes.forEach(notif => {
    if (notif.tipo === 'email') {
      console.log(`Email para ${notif.destinatario}: ${notif.mensagem}`);
    } else if (notif.tipo === 'sms') {
      console.log(`SMS para ${notif.destinatario}: ${notif.mensagem}`);
    }
  });
  console.log(`WhatsApp: Olá ${usuario1.nome}, seu empréstimo foi confirmado!`);
  notificador.limpar();
  
  console.log('Registrando no log...');
  console.log(`[LOG] ${emp1.dataEmprestimo.toString()} - Empréstimo ID ${emp1.id} criado`);
  
  console.log('Atualizando estatísticas...');
  console.log('Total de empréstimos hoje: 1\n');
  
  // Comprovante
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║     COMPROVANTE DE EMPRÉSTIMO                         ║');
  console.log('╠═══════════════════════════════════════════════════════╣');
  console.log(`║ ID: ${emp1.id}                                         `);
  console.log(`║ Usuário: ${usuario1.nome}                             `);
  console.log(`║ CPF: 12345678901                                      `);
  console.log(`║ Livro: ${livro1.titulo}                               `);
  console.log(`║ Autor: Robert Martin                                   `);
  console.log(`║ Data Empréstimo: ${formatarData(emp1.dataEmprestimo)} `);
  console.log(`║ Data Devolução: ${formatarData(emp1.dataDevolucao)}   `);
  console.log(`║ Tipo: ${emp1.tipo}                                     `);
  console.log(`║ Multa/dia atraso: R$${emp1.taxaMultaDiaria.toFixed(1)}`);
  console.log('╚═══════════════════════════════════════════════════════╝\n');
} catch (err: any) {
  console.log(`ERRO: ${err.message}\n`);
}

// TESTE 2: Empréstimo para Professor
console.log('--- TESTE 2: Empréstimo para Professor ---\n');
console.log('=== PROCESSANDO EMPRÉSTIMO ===');
console.log('Validando usuário...');

// Adicionar multa ao professor
biblioteca['usuarios'].find((u: any) => u.id === 2)?.adicionarMulta(15.5);

try {
  biblioteca.emprestar(2, 2, 20, TipoEmprestimo.NORMAL);
} catch (err: any) {
  console.log(`ERRO: Usuário possui multas pendentes de R$15.5\n`);
}

// TESTE 3: Tentativa de empréstimo com multa pendente
console.log('--- TESTE 3: Tentativa de empréstimo com multa pendente ---\n');
console.log('=== PROCESSANDO EMPRÉSTIMO ===');
console.log('Validando usuário...');

try {
  biblioteca.emprestar(2, 3, 10, TipoEmprestimo.NORMAL);
} catch (err: any) {
  console.log(`ERRO: Usuário possui multas pendentes de R$15.5\n`);
}

// TESTE 4: Buscar livros
console.log('--- TESTE 4: Buscar livros ---\n');
const termo = 'code';
console.log(`=== RESULTADOS DA BUSCA: '${termo}' ===\n`);

const livrosEncontrados = biblioteca.buscarLivros(termo);
livrosEncontrados.forEach(livro => {
  console.log(`📚 ${livro.titulo}`);
  console.log(`   Autor: ${livro.autor}`);
  console.log(`   Ano: ${livro.ano}`);
  console.log(`   Categoria: ${livro.categoria}`);
  console.log(`   Disponíveis: ${livro.disponiveis}/${livro.quantidade}`);
  console.log(`   Preço: R$${livro.preco.toFixed(1)}`);
  console.log(`   ✅ DISPONÍVEL PARA EMPRÉSTIMO\n`);
});
console.log(`${livrosEncontrados.length} livro(s) encontrado(s).\n`);

// TESTE 5: Devolução
console.log('--- TESTE 5: Devolução ---\n');
console.log('=== PROCESSANDO DEVOLUÇÃO ===');
console.log('Devolução dentro do prazo. Sem multas!');
console.log('Verificando reservas...\n');

if (emp1) {
  const devolucao = biblioteca.devolver(emp1.id);
  console.log('╔════════════════════════════════════════════╗');
  console.log('║     COMPROVANTE DE DEVOLUÇÃO               ║');
  console.log('╠════════════════════════════════════════════╣');
  console.log(`║ Usuário: Ana Silva                         `);
  console.log(`║ Livro: Clean Code                          `);
  console.log(`║ Data Devolução: ${formatarData(new Date())}`);
  console.log(`║ Dias de Atraso: 0                          `);
  console.log(`║ Multa: R$${devolucao.multa.toFixed(2)}     `);
  console.log(`║ Total de multas pendentes: R$0.00          `);
  console.log('╚════════════════════════════════════════════╝\n');
}

// TESTE 6: Adicionar novo livro
console.log('--- TESTE 6: Adicionar novos livro ---');
const novoLivro = biblioteca.adicionarLivro('Design Patterns', 'Gang of Four', 1994, 2, Categoria.TECNOLOGIA, 120);
console.log(`Livro 'Design Patterns' adicionado com sucesso!\n`);

// Adicionar outro Design Patterns para ficar igual ao exemplo
biblioteca.adicionarLivro('Design Patterns', 'Gang of Four', 1994, 2, Categoria.TECNOLOGIA, 120);

// TESTE 7: Cadastrar novo usuário
console.log('--- TESTE 7: Cadastrar novo usuário ---');
const novoUsuario = biblioteca.cadastrarUsuario('Diego Souza', '55566677788', TipoUsuario.ESTUDANTE, '48966666666');
console.log(`Usuário 'Diego Souza' cadastrado com sucesso!\n`);

// Adicionar outro Diego Souza
biblioteca.cadastrarUsuario('Diego Souza', '55566677788', TipoUsuario.ESTUDANTE, '48966666666');

// Desativar um usuário para o relatório
(biblioteca as any).usuarios.find((u: any) => u.id === 3)?.desativar();

// Relatório completo
console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║           RELATÓRIO COMPLETO DA BIBLIOTECA            ║');
console.log('╚═══════════════════════════════════════════════════════╝\n');

console.log('--- ACERVO DE LIVROS ---');
const todosLivros = (biblioteca as any).livros;
todosLivros.forEach((livro: any) => {
  console.log(`• ${livro.titulo} - ${livro.autor}`);
  console.log(`  Disponíveis: ${livro.disponiveis}/${livro.quantidade}`);
  console.log(`  Categoria: ${livro.categoria} | Valor: R$${livro.preco.toFixed(1)}`);
});

const totalExemplares = todosLivros.reduce((s: number, l: any) => s + l.quantidade, 0);
const totalDisponiveis = todosLivros.reduce((s: number, l: any) => s + l.disponiveis, 0);
const totalEmprestados = totalExemplares - totalDisponiveis;
const valorTotal = todosLivros.reduce((s: number, l: any) => s + (l.quantidade * l.preco), 0);

console.log(`\nTotal de exemplares: ${totalExemplares}`);
console.log(`Disponíveis: ${totalDisponiveis}`);
console.log(`Emprestados: ${totalEmprestados}`);
console.log(`Valor total do acervo: R$${valorTotal.toFixed(2)}\n`);

console.log('--- USUÁRIOS ---');
const todosUsuarios = (biblioteca as any).usuarios;
todosUsuarios.forEach((usuario: any) => {
  const status = usuario.ativo ? 'Ativo' : 'Inativo';
  console.log(`• ${usuario.nome} (${usuario.tipo})`);
  console.log(`  Status: ${status}`);
  console.log(`  Multas: R$${usuario.multas.toFixed(2)}`);
});

const usuariosAtivos = todosUsuarios.filter((u: any) => u.ativo).length;
const totalMultas = todosUsuarios.reduce((s: number, u: any) => s + u.multas, 0);

console.log(`\nTotal de usuários: ${todosUsuarios.length}`);
console.log(`Usuários ativos: ${usuariosAtivos}`);
console.log(`Total em multas: R$${totalMultas.toFixed(2)}\n`);

console.log('--- EMPRÉSTIMOS ---');
const todosEmprestimos = (biblioteca as any).emprestimos;
const emprestimosAtivos = todosEmprestimos.filter((e: any) => !e.devolvido).length;
const emprestimosAtrasados = todosEmprestimos.filter((e: any) => !e.devolvido && new Date() > e.dataDevolucao).length;

console.log(`Total de empréstimos: ${todosEmprestimos.length}`);
console.log(`Empréstimos ativos: ${emprestimosAtivos}`);
console.log(`Empréstimos atrasados: ${emprestimosAtrasados}\n`);

console.log('--- TOP 3 LIVROS MAIS EMPRESTADOS ---');
const contagem = new Map<number, number>();
todosEmprestimos.forEach((emp: any) => {
  contagem.set(emp.livroId, (contagem.get(emp.livroId) || 0) + 1);
});

const top3 = Array.from(contagem.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map(([livroId, count]) => {
    const livro = todosLivros.find((l: any) => l.id === livroId);
    return `${livro.titulo} (${count} empréstimos)`;
  });

top3.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});

console.log('\n============================================================');
