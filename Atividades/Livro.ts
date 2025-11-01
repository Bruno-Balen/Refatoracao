class Livro {
    private titulo: string;
    private autor: string;  
    private anoPublicacao: number;
    private disponivel: boolean;

    constructor(titulo: string, autor: string, anoPublicacao: number, disponivel: boolean) {
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = disponivel;
    }

    public empresatar(): boolean {
        if (this.disponivel) {
            this.disponivel = false;
            return true;
        }
        return false;
    }

    public devolver(): void {
        this.disponivel = true;
    }
}