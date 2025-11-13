export abstract class Funcionario {
    // Atributos básicos que todo funcionário terá
    // nome: nome do funcionário
    // salario: o salário base (double em Java; aqui usamos number)
    // identificacao: uma string que identifica o funcionário
    public identificacao: string;
    public salario: number;
    public nome: string

    /*
     `Funcionario` é a minha classe pai que descreve o que
     todo funcionário tem (nome, salário e identificação) e exige que qualquer
     subclasse diga como calcula o salário. Quando eu coloco objetos diferentes
     (por exemplo, um Gerente ou um Estagiário) numa lista do tipo `Funcionario[]`
     e chamo `calcularSalario()` em cada um, a implementação correta de cada
     objeto é executada.
     */
    constructor(nome: string, salario: number,  identificacao: string) {
        this.nome = nome;
        this.salario = salario;
        this.identificacao = identificacao;
    }
    abstract calcularSalario(): number;
}
