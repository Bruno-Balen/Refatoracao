// Implementação de uma conta bancária com encapsulamento dos dados sensíveis
export interface Movimentacao {
    data: Date;
    tipo: 'deposito' | 'debito' | 'transferencia' | 'recebimento' | 'boleto' | 'pix' | 'cartao';
    descricao: string;
    valor: number;
}

// A ContaBancaria é responsável por gerenciar saldo e histórico.
// Atributos importantes encapsulados: número da conta, titular, saldo e histórico.
// Métodos públicos controlam como o saldo pode ser alterado (depositar/debitar).
export class ContaBancaria {
    private numeroConta: string;
    private titular: string;
    private saldo: number;
    private historico: Movimentacao[];

    //constructor
    constructor(numeroConta: string, titular: string, saldoInicial: number = 0) {
        this.numeroConta = numeroConta;
        this.titular = titular;
        this.saldo = saldoInicial;
        this.historico = [];

        // registrar abertura como movimentação de depósito
        if (saldoInicial > 0) {
            this.adicionarMovimentacao({
                data: new Date(),
                tipo: 'deposito',
                descricao: 'Saldo inicial',
                valor: saldoInicial,
            });
        }
    }

    public getNumeroConta(): string {
        return this.numeroConta;
    }

    public getTitular(): string {
        return this.titular;
    }


    public getSaldo(): number {
        return this.saldo;
    }

    public getHistorico(): Movimentacao[] {
        return this.historico.map(m => ({ ...m }));
    }

    // Método para depositar
    public depositar(valor: number, descricao: string = 'Depósito'): void {

        //Caso o valor de deqpósito seja menor ou igual a zero, lança um erro
        if (valor <= 0) { 
            throw new Error('Valor de depósito deve ser positivo');
        }

        this.saldo += valor;
        this.adicionarMovimentacao({ data: new Date(), tipo: 'deposito', descricao, valor });
    }

    // Método para debitar do saldo. Se permitirChequeEspecial=true então o cliente
    // pode usar um limite (por exemplo via cartão de crédito) para ir além do saldo.
    // Esse método preserva a regra de negócio de alteração de saldo dentro da classe.
    public debitar(valor: number, permitirChequeEspecial: boolean = false, limite: number = 0, descricao: string = 'Débito'): boolean {
        if (valor <= 0) return false;

        if (this.saldo >= valor) {
            this.saldo -= valor;
            this.adicionarMovimentacao({ data: new Date(), tipo: 'debito', descricao, valor });
            return true;
        }

        if (permitirChequeEspecial && this.saldo + limite >= valor) {
            
            // permite saldo ficar negativo até o limite
            this.saldo -= valor;
            this.adicionarMovimentacao({ data: new Date(), tipo: 'debito', descricao: descricao + ' (usando limite)', valor });
            return true;
        }

        return false; // saldo insuficiente
    }

    // Método para transferências internas
    public transferirPara(destino: ContaBancaria, valor: number, descricao: string = 'Transferência'): boolean {
       
        if (valor <= 0) {
            return false;
        }

        const sucesso = this.debitar(valor, false, 0, descricao + ` para ${destino.getNumeroConta()}`);
        
        if (!sucesso){
             return false;
        }

        destino.depositar(valor, 'Recebido por transferência de ' + this.numeroConta);
        return true;
    }

    // Método só usado internamente para registrar movimentações, mantive privado para proteger a integridade do histórico.
    private adicionarMovimentacao(m: Movimentacao) {
        this.historico.push(m);
    }
}
