import { Livro } from './Livro';
import { Membro } from './Membro';

// Criação dos livros com seus dados completos
const livro1 = new Livro("Dom Casmurro", "Machado de Assis", "Companhia das Letras", 1899, true);
const livro2 = new Livro("1984", "George Orwell", "Companhia das Letras", 1949, true);
const livro3 = new Livro("O Pequeno Príncipe", "Antoine de Saint-Exupéry", "Agir", 1943, true);
const livro4 = new Livro("Clean Code", "Robert C. Martin", "Prentice Hall", 2008, true);

// Criação dos membros da biblioteca
const membro1 = new Membro("João Silva", "12345");
const membro2 = new Membro("Maria Oliveira", "67890");
const membro3 = new Membro("Pedro Santos", "54321");

console.log("\n=== Simulação de Operações na Biblioteca ===\n");

// Operação 1 e 2: João pega dois livros emprestados
membro1.pegarEmprestado(livro1);
membro1.pegarEmprestado(livro2);

// Operação 3: Maria tenta pegar o livro1 que já está emprestado
membro2.pegarEmprestado(livro1);

// Operação 4: Maria pega o livro3
membro2.pegarEmprestado(livro3);

// Operação 5: Pedro pega o livro4
membro3.pegarEmprestado(livro4);

// Operação 6: João devolve o livro1
membro1.devolverLivro(livro1);

// Operação 7: Maria agora consegue pegar o livro1
membro2.pegarEmprestado(livro1);

// Operação 8: Pedro tenta devolver um livro que não pegou emprestado
membro3.devolverLivro(livro2);

// Operação 9: João devolve o livro2
membro1.devolverLivro(livro2);

// Operação 10: Pedro pega o livro2 que foi devolvido
membro3.pegarEmprestado(livro2);
