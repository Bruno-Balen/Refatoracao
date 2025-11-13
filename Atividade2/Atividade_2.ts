import { Funcionario } from './Funcionario';
import { Gerente } from './Gerente';
import { Desenvolvedor } from './Desenvolvedor';
import { Estagiario } from './Estagiario';
/*
Criei uma lista `Funcionario[]` que contém objetos de
diferentes subclasses (Gerente, Desenvolvedor e Estagiário). Quando eu percorro
essa lista e chamo `calcularSalario()` em cada elemento, a implementação específica
daquele objeto é executada, ou seja, chamo a mesma função e obtenho resultados
diferentes dependendo do tipo real do objeto. Isso demonstra polimorfismo.
*/

const funcionarios: Funcionario[] = [];

// Cria 4 Gerentes
funcionarios.push(new Gerente('Ana Souza', 8000, 'G-1001'));
funcionarios.push(new Gerente('Carlos Pereira', 9000, 'G-1002'));
funcionarios.push(new Gerente('Beatriz Lima', 8500, 'G-1003'));
funcionarios.push(new Gerente('Ricardo Alves', 9500, 'G-1004'));

// Cria 4 Desenvolvedores 
funcionarios.push(new Desenvolvedor('Mariana Costa', 4000, 'D-2001', 1));
funcionarios.push(new Desenvolvedor('Lucas Fernandes', 4500, 'D-2002', 3));
funcionarios.push(new Desenvolvedor('Paula Ribeiro', 4200, 'D-2003', 2));
funcionarios.push(new Desenvolvedor('Eduardo Santos', 4800, 'D-2004', 0));

// Cria 4 Estagiários
funcionarios.push(new Estagiario('Tiago Gomes', 1200, 'E-3001'));
funcionarios.push(new Estagiario('Sofia Martins', 1300, 'E-3002'));
funcionarios.push(new Estagiario('Rafael Duarte', 1100, 'E-3003'));
funcionarios.push(new Estagiario('Lara Nunes', 1250, 'E-3004'));

// Simulação: percorre e loga resultados demonstrando polimorfismo
console.log('\n=== Lista de Funcionários e Seus Salários Calculados ===\n');
for (const f of funcionarios) {
    // Mostro o tipo concreto do objeto para que fique claro qual implementação
    // de `calcularSalario()` está sendo usada em cada caso.
    console.log(`Tipo: ${f.constructor.name} | Nome: ${f.nome} | ID: ${f.identificacao}`);
    console.log(`  Salário base: R$ ${f.salario.toFixed(2)}`);
    console.log(`  Salário calculado (calcularSalario): R$ ${f.calcularSalario().toFixed(2)}`);
    console.log('');
}

console.log('Fim da simulação.');
