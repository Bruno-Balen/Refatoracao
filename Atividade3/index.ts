// Arquivo de simulação que cria 4 contas e faz pagamentos usando os 4 meios.

import { ContaBancaria } from './ContaBancaria';
import { CartaoDebito } from './CartaoDebito';
import { CartaoCredito } from './CartaoCredito';
import { BoletoBancario } from './BoletoBancario';
import { Pix } from './Pix';

// Criando 4 contas bancárias diferentes
const conta1 = new ContaBancaria('0001', 'Alice', 1000);
const conta2 = new ContaBancaria('0002', 'Bruno', 200);
const conta3 = new ContaBancaria('0003', 'Carla', 50);
const conta4 = new ContaBancaria('0004', 'Diego', 500);

// Instanciando meios de pagamento
const cartaoDebito = new CartaoDebito('1234 5678 9012 3456', 'Alice', '12/2026', '123', '1111');
const cartaoCredito = new CartaoCredito('4111 1111 1111 1111', 'Bruno', '11/2027', '321', 300); // limite 300
const boleto = new BoletoBancario('23793381286000000000123456789012345678901234', '2099-12-31');
const pixParaDiego = new Pix('diego@pix', conta4);

// Função auxiliar para tentar um pagamento e logar o resultado
function tentarPagamento(meio: { nome: string; processarPagamento: (c: ContaBancaria, v: number, d?: any) => boolean }, origem: ContaBancaria, valor: number, dados?: any) {
    const sucesso = meio.processarPagamento(origem, valor, dados);
    console.log(`${meio.nome} - Valor: R$ ${valor.toFixed(2)} - Conta: ${origem.getNumeroConta()} - Resultado: ${sucesso ? 'SUCESSO' : 'FALHA'}`);
}

console.log('--- Início da simulação de pagamentos ---');

// 1) Débito: Alice paga R$ 150 com cartão de débito
tentarPagamento(cartaoDebito, conta1, 150, { pin: '1111' });

// 2) Crédito: Bruno tenta pagar R$ 400 com cartão de crédito (limite 300) -> deve falhar
// depois tenta pagar R$ 250 (dentro do limite) -> pode usar limite e deixar saldo negativo
tentarPagamento(cartaoCredito, conta2, 400);
tentarPagamento(cartaoCredito, conta2, 250);

// 3) Boleto: Carla tenta pagar R$ 40 com boleto vencimento OK -> deve falhar se fundos insuficientes
// Carla tem R$50 então o pagamento deve passar
tentarPagamento(boleto, conta3, 40);

// 4) Pix: Alice envia R$ 200 por Pix para Diego
tentarPagamento(pixParaDiego, conta1, 200, { chave: 'diego@pix' });

console.log('\n--- Históricos finais ---');
const contas = [conta1, conta2, conta3, conta4];
for (const c of contas) {
    console.log(`Conta ${c.getNumeroConta()} - Titular: ${c.getTitular()} - Saldo: R$ ${c.getSaldo().toFixed(2)}`);
    const hist = c.getHistorico();
    for (const m of hist) {
        console.log(`  [${m.data.toISOString()}] ${m.tipo.toUpperCase()} - R$ ${m.valor.toFixed(2)} - ${m.descricao}`);
    }
    console.log('');
}

console.log('--- Fim da simulação ---');
