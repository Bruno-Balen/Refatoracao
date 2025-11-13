// Interface que define um método genérico para processar pagamentos.
// A abstração permite que várias implementações (Cartão, Boleto, Pix) sejam usadas
// de forma intercambiável por uma ContaBancaria.

import { ContaBancaria } from './ContaBancaria';

export interface MeioPagamento {
    // processarPagamento tenta executar o pagamento a partir da conta informada.
    // Retorna true em caso de sucesso, false em caso de falha (validação ou fundos).
    processarPagamento(conta: ContaBancaria, valor: number, dados?: any): boolean;

    nome: string;
}
