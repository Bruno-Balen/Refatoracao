// A classe Livro representa um livro físico na biblioteca
// Ela mantém informações básicas do livro e controla sua disponibilidade
export class Livro {
    private titulo: string;
    private autor: string;  
    private editora: string;
    private anoPublicacao: number;
    private disponivel: boolean;

    constructor(titulo: string, autor: string, editora: string, anoPublicacao: number, disponivel: boolean) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = disponivel;
    }

    // Método que tenta emprestar o livro
    // Retorna true se o empréstimo foi bem sucedido e false caso contrário
    public emprestar(): boolean {
        if (this.disponivel) {
            this.disponivel = false;
            console.log(`Livro "${this.titulo}" emprestado com sucesso.`);
            return true;
        }
        console.log(`Livro "${this.titulo}" não está disponível para empréstimo.`);
        return false;
    }

    // Método que marca o livro como devolvido e disponível para novos empréstimos
    public devolver(): void {
        this.disponivel = true;
        console.log(`Livro "${this.titulo}" foi devolvido e está disponível.`);
    }

    public getTitulo(): string {
        return this.titulo;
    }
}