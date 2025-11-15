import { Livro, Categoria } from './Livro';
import { Usuario, TipoUsuario } from './Usuario';
import { Emprestimo, TipoEmprestimo } from './Emprestimo';
import { Notificador } from './Notificador';

export class Biblioteca {
  private livros: Livro[] = [];
  private usuarios: Usuario[] = [];
  private emprestimos: Emprestimo[] = [];
  private notificador: Notificador;

  constructor(notificador?: Notificador) {
    this.notificador = notificador ?? new Notificador();
    this.seedDados();
  }

  private seedDados() {
    // dados iniciais 
    this.livros.push(new Livro(1, 'Clean Code', 'Robert Martin', 2008, 3, Categoria.TECNOLOGIA, 89.9));
    this.livros.push(new Livro(2, '1984', 'George Orwell', 1949, 2, Categoria.FICCAO, 45));
    this.livros.push(new Livro(3, 'Sapiens', 'Yuval Harari', 2011, 4, Categoria.HISTORIA, 65.5));
    this.livros.push(new Livro(4, 'O Hobbit', 'Tolkien', 1937, 2, Categoria.FANTASIA, 55));

    this.usuarios.push(new Usuario(1, 'Ana Silva', '12345678901', TipoUsuario.ESTUDANTE, '48999999999'));
    this.usuarios.push(new Usuario(2, 'Carlos Santos', '98765432100', TipoUsuario.PROFESSOR, '48988888888'));
    this.usuarios.push(new Usuario(3, 'Beatriz Costa', '11122233344', TipoUsuario.COMUM, '48977777777'));
  }

  cadastrarUsuario(nome: string, cpf: string, tipo: TipoUsuario, telefone?: string) {
    const id = this.usuarios.length + 1;
    const u = new Usuario(id, nome, cpf, tipo, telefone);
    this.usuarios.push(u);
    return u;
  }

  adicionarLivro(titulo: string, autor: string, ano: number, quantidade: number, categoria: Categoria, preco = 0) {
    const id = this.livros.length + 1;
    const l = new Livro(id, titulo, autor, ano, quantidade, categoria, preco);
    this.livros.push(l);
    return l;
  }

  buscarLivros(termo: string) {
    const q = termo.trim().toLowerCase();
    return this.livros.filter(l => l.titulo.toLowerCase().includes(q) || l.autor.toLowerCase().includes(q));
  }

  private encontrarUsuario(id: number) {
    return this.usuarios.find(u => u.id === id) ?? null;
  }

  private encontrarLivro(id: number) {
    return this.livros.find(l => l.id === id) ?? null;
  }

  emprestar(usuarioId: number, livroId: number, dias: number, tipo: TipoEmprestimo = TipoEmprestimo.NORMAL) {
    const usuario = this.encontrarUsuario(usuarioId);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    
    if (!usuario.ativo) {
      throw new Error('Usuário inativo');
    }
    
    if (usuario.multas > 0) {
      throw new Error('Usuário possui multas pendentes');
    }

    const livro = this.encontrarLivro(livroId);
    if (!livro) {
      throw new Error('Livro não encontrado');
    }
    if (livro.disponiveis <= 0) {
      throw new Error('Livro indisponível');
    }


    const regras = this.calcularRegras(usuario.tipo, tipo);
    if (dias > regras.diasPermitidos) {
      throw new Error(`Período solicitado excede o permitido (${regras.diasPermitidos} dias)`);
    }

    // limite de empréstimos simultâneos
    const emprestimosAtivos = this.emprestimos.filter(e => e.usuarioId === usuarioId && !e.devolvido).length;
    const limite = this.limitePorTipo(usuario.tipo);

    if (emprestimosAtivos >= limite) {
      throw new Error(`Limite de empréstimos atingido (${limite})`);
    }

    // processa empréstimo
    const sucesso = livro.emprestar();
    if (!sucesso) {
      throw new Error('Não foi possível emprestar o livro');
    }

    const id = this.emprestimos.length + 1;
    const dataEmp = new Date();
    const dataDev = new Date();
    dataDev.setDate(dataDev.getDate() + dias);

    const emprestimo = new Emprestimo(id, usuarioId, livroId, dataEmp, dataDev, false, tipo, regras.taxaMultaDiaria);
    this.emprestimos.push(emprestimo);

    // notificações separadas por serviço
    this.notificador.enviarEmail(usuario.cpf + '@exemplo.com', 'Empréstimo realizado', `Livro '${livro.titulo}' deve ser devolvido em ${dataDev.toLocaleDateString()}`);
    if (usuario.telefone) {
      this.notificador.enviarSMS(usuario.telefone, `Empréstimo: ${livro.titulo} até ${dataDev.toLocaleDateString()}`);
    }

    return emprestimo;
  }

  devolver(emprestimoId: number) {
    const emp = this.emprestimos.find(e => e.id === emprestimoId);
    if (!emp) {
      throw new Error('Empréstimo não encontrado');
    }  
     
    if (emp.devolvido) {
      throw new Error('Empréstimo já devolvido');
    }

    const livro = this.encontrarLivro(emp.livroId);
    const usuario = this.encontrarUsuario(emp.usuarioId);

    if (!livro || !usuario) {
      throw new Error('Dados inconsistentes no empréstimo');
    }

    const agora = new Date();
    let multa = 0;
    if (agora > emp.dataDevolucao) {
      const diasAtraso = Math.floor((agora.getTime() - emp.dataDevolucao.getTime()) / (1000 * 60 * 60 * 24));
      multa = diasAtraso * emp.taxaMultaDiaria;
      usuario.adicionarMulta(multa);
      this.notificador.enviarEmail(usuario.cpf + '@exemplo.com', 'Multa aplicada', `Multa de R$${multa.toFixed(2)} aplicada`);
    }

    emp.devolvido = true;
    livro.devolver();

    return { emprestimo: emp, multa };
  }

  gerarRelatorio() {
    return {
      totalLivros: this.livros.reduce((s, l) => s + l.quantidade, 0),
      livrosDisponiveis: this.livros.reduce((s, l) => s + l.disponiveis, 0),
      totalUsuarios: this.usuarios.length,
      emprestimosTotais: this.emprestimos.length
    };
  }

  private calcularRegras(tipoUsuario: TipoUsuario, tipoEmprestimo: TipoEmprestimo) {
    // retorna diasPermitidos e taxaMultaDiaria
    const regras: { diasPermitidos: number; taxaMultaDiaria: number } = { diasPermitidos: 7, taxaMultaDiaria: 1 };
    if (tipoEmprestimo === TipoEmprestimo.EXPRESSO){ 
      return { diasPermitidos: 1, taxaMultaDiaria: 5 };
    }

    if (tipoUsuario === TipoUsuario.ESTUDANTE) {
      regras.diasPermitidos = tipoEmprestimo === TipoEmprestimo.RENOVACAO ? 7 : 14;
      regras.taxaMultaDiaria = 0.5;
    } else if (tipoUsuario === TipoUsuario.PROFESSOR) {
      regras.diasPermitidos = tipoEmprestimo === TipoEmprestimo.RENOVACAO ? 15 : 30;
      regras.taxaMultaDiaria = 0.3;
    } else {
      regras.diasPermitidos = tipoEmprestimo === TipoEmprestimo.RENOVACAO ? 3 : 7;
      regras.taxaMultaDiaria = 1.0;
    }

    return regras;
  }

  private limitePorTipo(tipo: TipoUsuario) {
    if (tipo === TipoUsuario.ESTUDANTE) return 3;
    if (tipo === TipoUsuario.PROFESSOR) return 5;
    return 2;
  }
}
