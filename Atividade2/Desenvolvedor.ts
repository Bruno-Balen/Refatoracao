import { Funcionario } from './Funcionario';

export class Desenvolvedor extends Funcionario {
    // Atributo adicional: projetosEntregues representa quantos projetos foram entregues
    public projetosEntregues : number

    constructor(nome: string, salario: number, identificacao: string,  projetosEntregues: number) { 
        super(nome, salario, identificacao);
        this.projetosEntregues = projetosEntregues;
    }
    /*
     * Aqui eu calculo o salário do Desenvolvedor.
     * Regra aplicada: salário base + 10% de bônus para cada projeto entregue.
     * Ou seja, se eu entreguei 2 projetos e meu salário é 1000, recebo 1000 + 1000*0.1*2 = 1200.
     * Usei um atributo `projetosEntregues` para representar isso.
     */
    calcularSalario(): number {
        return this.salario + (this.salario * 0.10 * this.projetosEntregues);
    }
}
