// Implementação do Pix que realiza transferência entre contas.
// O Pix guarda a chave de destino e referencia a ContaBancaria destino, assim o
// processarPagamento vai debitar a conta origem e creditar a conta destino.

import { MeioPagamento } from './MeioPagamento';
import { ContaBancaria } from './ContaBancaria';

export class Pix implements MeioPagamento {
    public nome = 'Pix';
    private chaveDestino: string;
    private contaDestino: ContaBancaria;

    constructor(chaveDestino: string, contaDestino: ContaBancaria) {
        this.chaveDestino = chaveDestino;
        this.contaDestino = contaDestino;
    }

    public processarPagamento(conta: ContaBancaria, valor: number, dados?: any): boolean {
        if (!dados || !dados.chave) return false;
        if (dados.chave !== this.chaveDestino) return false;

        // tenta debitar da conta origem
        const descricaoOrigem = `Pix para ${this.contaDestino.getNumeroConta()} (chave ${this.chaveDestino})`;
        const sucessoDebito = conta.debitar(valor, false, 0, descricaoOrigem);

        if (!sucessoDebito) {

        return false;
        }
        // credita na conta destino
        this.contaDestino.depositar(valor, `Recebido via Pix de ${conta.getNumeroConta()}`);
        return true;
    }
}
