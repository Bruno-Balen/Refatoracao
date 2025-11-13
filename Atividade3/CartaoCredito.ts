// Implementação do meio de pagamento Cartão de Crédito.
// Para demonstrar diferença entre débito e crédito, aqui permitimos usar um
// limite de crédito que autoriza a conta a ficar negativa até um certo valor.

import { MeioPagamento } from './MeioPagamento';
import { ContaBancaria } from './ContaBancaria';

export class CartaoCredito implements MeioPagamento {
    public nome = 'Cartão de Crédito';
    private numero: string;
    private titular: string
    private validade: string; 
    private cvv: string;
    private limiteCredito: number;

    constructor(numero: string, titular: string, validade: string, cvv: string, limiteCredito: number) {
        this.numero = numero;
        this.titular = titular;
        this.validade = validade;
        this.cvv = cvv;
        this.limiteCredito = limiteCredito;
    }

    // processarPagamento aqui tenta cobrar usando a conta vinculada. Se o saldo
    // for insuficiente, permite que a conta utilize o limite de crédito (ou seja,
    // o saldo pode ficar negativo até o valor do limite). Isso demonstra abstração
    // e variação de regra entre meios de pagamento.
    public processarPagamento(conta: ContaBancaria, valor: number, dados?: any): boolean {

        // validações básicas do cartão
        if (!this.numero || this.numero.replace(/\s+/g, '').length < 12){ 
            return false;
        }
        if (!this.cvv || this.cvv.length < 3) {
             return false;
        }

        const [mesStr, anoStr] = this.validade.split('/');
        const mes = parseInt(mesStr, 10);
        const ano = parseInt(anoStr, 10);
        const fimMes = new Date(ano, mes, 0);

        // verifica se a data é válida e não expirou
        if (isNaN(fimMes.getTime()) || new Date() > fimMes) {
            return false;
        }

        // Aqui o cartão de crédito permite usar o limite caso o saldo seja insuficiente.
        const descricao = `Pagamento crédito (cartão ${this.numero.slice(-4)})`;
        const sucesso = conta.debitar(valor, true, this.limiteCredito, descricao);
        return sucesso;
    }
}
