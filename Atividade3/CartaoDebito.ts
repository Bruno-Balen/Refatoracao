// Implementação do meio de pagamento Cartão de Débito.

import { MeioPagamento } from './MeioPagamento';
import { ContaBancaria } from './ContaBancaria';

export class CartaoDebito implements MeioPagamento {
    public nome = 'Cartão de Débito';
    private numero: string;
    private titular: string;
    private validade: string; 
    private cvv: string;
    private pin: string;

    constructor(numero: string, titular: string, validade: string, cvv: string, pin: string) {
        this.numero = numero;
        this.titular = titular;
        this.validade = validade;
        this.cvv = cvv;
        this.pin = pin;
    }

    public processarPagamento(conta: ContaBancaria, valor: number, dados?: any): boolean {
        // validações básicas do cartão
        if (!this.numero || this.numero.replace(/\s+/g, '').length < 12){
             return false;
        }
        if (!this.cvv || this.cvv.length < 3) {
            return false;
        }

        // validade: checar se não expirou
        const [mesStr, anoStr] = this.validade.split('/'); 
        const mes = parseInt(mesStr, 10); // mês de 1 a 12
        const ano = parseInt(anoStr, 10); // ano com 4 dígitos
        const dataValidade = new Date(ano, mes - 1, 1); // primeiro dia do mês seguinte
        const fimMes = new Date(ano, mes, 0);

        if (isNaN(dataValidade.getTime()) || new Date() > fimMes){ 
            return false;
        }

        // PIN: comparar com o passado em dados
        if (!dados || dados.pin !== this.pin) {
            // falha de autenticação
            return false;
        }

        // Se passou nas validações, tenta debitar da conta normalmente
        const descricao = `Pagamento débito (cartão ${this.numero.slice(-4)})`;
        const sucesso = conta.debitar(valor, false, 0, descricao);
        return sucesso;
    }
}
