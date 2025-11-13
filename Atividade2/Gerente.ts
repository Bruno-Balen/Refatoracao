import { Funcionario } from './Funcionario';

export class Gerente extends Funcionario {
    /*
     *o gerente recebe o salário base mais 20% de bônus.
     *pego o salário que já vem da classe pai e acrescent0 20% porque o cargo tem uma responsabilidade maior.
     */
    calcularSalario(): number {
        return this.salario * 1.20; // 20% de bônus
    }
}
