class Membro {
    private nome: string;
    private identificacao: string;
    private livrosEmprestados!: Livro[];

    constructor(nome: string, identificacao: string) {
        this.nome = nome;
        this.identificacao = identificacao;
    }

    public pegarEmprestado(livro: Livro): boolean {
        
        this.livrosEmprestados.push(livro);

        return true;
    }

    public devolverLivro(livro: Livro): void {
        const index = this.livrosEmprestados.indexOf(livro);
        if (index !== -1) {
            this.livrosEmprestados.splice(index, 1);
        }
    }
}