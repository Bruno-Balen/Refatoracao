export enum TipoEmprestimo {
  NORMAL = 'normal',
  RENOVACAO = 'renovacao',
  EXPRESSO = 'expresso'
}

export interface EmprestimoData {
  id: number;
  usuarioId: number;
  livroId: number;
  dataEmprestimo: Date;
  dataDevolucao: Date;
  devolvido: boolean;
  tipo: TipoEmprestimo;
  taxaMultaDiaria: number;
}

export class Emprestimo implements EmprestimoData {
    public id: number;
    public usuarioId: number;
    public livroId: number;
    public dataEmprestimo: Date;
    public dataDevolucao: Date;
    public devolvido: boolean;
    public tipo: TipoEmprestimo;
    public taxaMultaDiaria: number;

  constructor( id: number, usuarioId: number, livroId: number, dataEmprestimo: Date, dataDevolucao: Date, devolvido: boolean, tipo: TipoEmprestimo, taxaMultaDiaria: number) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.livroId = livroId;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
    this.devolvido = devolvido;
    this.tipo = tipo;
    this.taxaMultaDiaria = taxaMultaDiaria;
  }
}
