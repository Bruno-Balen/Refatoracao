export enum TipoUsuario {
  ESTUDANTE = 'estudante',
  PROFESSOR = 'professor',
  COMUM = 'comum'
}

export class Usuario {
  private _multas = 0;
  private _ativo = true;
  public readonly id: number;
  public nome: string;
  public cpf: string;
  public tipo: TipoUsuario;
  public telefone?: string;

  constructor( id: number, nome: string,  cpf: string,   tipo: TipoUsuario,   telefone?: string) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.tipo = tipo;
    this.telefone = telefone;
  }

  get multas() {
    return this._multas;
  }

  get ativo() {
    return this._ativo;
  }

  adicionarMulta(valor: number) {
    if (valor <= 0) return;
    this._multas += valor;
  }

  pagarMulta(valor: number) {
    if (valor <= 0) return;
    this._multas = Math.max(0, this._multas - valor);
  }

  desativar() {
    this._ativo = false;
  }

  ativar() {
    this._ativo = true;
  }
}
