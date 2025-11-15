export enum Categoria {
  TECNOLOGIA = 'tecnologia',
  FICCAO = 'ficcao',
  HISTORIA = 'historia',
  FANTASIA = 'fantasia',
  OUTRA = 'outra'
}

export class Livro {
  public readonly id: number;
  public titulo: string;
  public autor: string;
  public ano: number; 
  public categoria: Categoria;
  public preco: number;
  private _quantidade: number;
 private _emprestimosAtivos = 0;

  constructor( id: number,  titulo: string,  autor: string,  ano: number,  _quantidade: number, categoria: Categoria, preco: number = 0) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
    this._quantidade = _quantidade;
    this.preco = preco;
    this.categoria = categoria;
  }

  get quantidade() {
    return this._quantidade;
  }

  get disponiveis() {
    return this._quantidade - this._emprestimosAtivos;
  }

  emprestar(): boolean {
    
    if (this.disponiveis <= 0) {
      return false;
    }
    
    this._emprestimosAtivos++;
    
    return true;
  }

  devolver(): void {
    
    if (this._emprestimosAtivos > 0) {
      this._emprestimosAtivos--;
    }

  }

  aumentarEstoque(qtd: number) {
    if (qtd <= 0) return;
    this._quantidade += qtd;
  }
}
