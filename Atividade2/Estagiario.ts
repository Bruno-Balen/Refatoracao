import { Funcionario } from './Funcionario';

export class Estagiario extends Funcionario {
    /*
     Regra do Estagiário: salário fixo, sem bônus.
     Retorno exatamente o valor do salário que foi definido,
     porque estagiários não recebem os mesmos adicionais que cargos superiores.
     Mesmo assim, eu herdo de `Funcionario` porque, um estagiário também é um funcionário.
     */
    calcularSalario(): number {
        return this.salario; // salário fixo
    }
}
