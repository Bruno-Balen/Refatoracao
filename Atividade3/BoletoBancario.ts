// Implementação do boleto, exige código de barras e data de vencimento.

import { MeioPagamento } from './MeioPagamento';
import { ContaBancaria } from './ContaBancaria';

export class BoletoBancario implements MeioPagamento {
    public nome = 'Boleto Bancário';
    private codigoBarras: string;
    private vencimento: string; 

    constructor(codigoBarras: string, vencimento: string) {
        this.codigoBarras = codigoBarras;
        this.vencimento = vencimento;
    }

    public processarPagamento(conta: ContaBancaria, valor: number): boolean {

        // validação do código de barras (mínimo 20 dígitos numéricos)
        if (!this.codigoBarras || this.codigoBarras.replace(/\D/g, '').length < 20){
             return false;
        }

        const dataVenc = new Date(this.vencimento);

        // verifica se a data é válida
        if (isNaN(dataVenc.getTime())){
             return false;
        }

        // verifica se não está vencido
        if (new Date() > dataVenc){
             return false;
         }

        const descricao = `Pagamento boleto (${this.codigoBarras.slice(-8)})`;
        const sucesso = conta.debitar(valor, false, 0, descricao);
        return sucesso;
    }
}
