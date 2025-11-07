// A classe Membro representa um usuário da biblioteca
// Ela controla os livros que o membro tem emprestado e gerencia empréstimos/devoluções
class Membro {
    private nome: string;
    private identificacao: string;
    private livrosEmprestados: Livro[];

    constructor(nome: string, identificacao: string) {
        this.nome = nome;
        this.identificacao = identificacao;
        this.livrosEmprestados = []; 
    }

    // Tenta pegar um livro emprestado
    // Retorna true se o empréstimo foi bem sucedido
    public pegarEmprestado(livro: Livro): boolean {
        if (livro.emprestar()) {
            this.livrosEmprestados.push(livro);
            console.log(`${this.nome} pegou emprestado o livro "${livro.getTitulo()}"`);
            return true;
        }
        return false;
    }

    // Devolve um livro que estava emprestado
    public devolverLivro(livro: Livro): void {
        const index = this.livrosEmprestados.indexOf(livro);
        if (index !== -1) {
            livro.devolver();
            this.livrosEmprestados.splice(index, 1);
            console.log(`${this.nome} devolveu o livro "${livro.getTitulo()}"`);
        } else {
            console.log(`${this.nome} não possui o livro "${livro.getTitulo()}" emprestado`);
        }
    }

    public getNome(): string {
        return this.nome;
    }
}