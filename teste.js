const prompt = (msg) => window.prompt(msg); // Substituto para o prompt do navegador

class Biblioteca {
    _material = [];

    get getMaterial() {
        return this._material;
    }

    addMaterial(materiais) {
        this._material.push(materiais);
    }

    editarMaterial(index) {
        if (isNaN(index) || index < 0 || index >= this._material.length) {
            console.log("Índice inválido!");
            return;
        }

        const material = this._material[index];
        console.log("Material selecionado: ");
        console.log(material.toString());
        let op = prompt(
            "Informe o que deseja editar:\n1 - Autor\n2 - Data de Publicação\n3 - Categoria\n\n"
        );

        switch (op) {
            case "1":
                let autor = prompt("Informe o novo autor: ");
                material.setAutor = autor;
                break;
            case "2":
                let data = prompt("Informe a nova data de publicação: ");
                material.setDataPublicacao = data;
                break;
            case "3":
                let categoria = prompt("Informe a nova categoria: ");
                material.setCategoria = categoria;
                break;
            default:
                console.log("Opção inválida!");
                return;
        }

        console.log("Material atualizado com sucesso!");
    }

    excluirMaterial(index) {
        if (isNaN(index) || index < 0 || index >= this._material.length) {
            console.log("Índice inválido!");
            return;
        }
        this._material.splice(index, 1);
        console.log("Material excluído com sucesso!");
    }

    toString() {
        return `Biblioteca[${this._material.map((m) => m.toString()).join(", ")}]`;
    }
}

class Material {
    constructor(autor, data_publicacao, categoria) {
        this._autor = autor;
        this._data_publicacao = data_publicacao;
        this._categoria = categoria;
    }

    get getAutor() {
        return this._autor;
    }

    get getDataPublicacao() {
        return this._data_publicacao;
    }

    get getCategoria() {
        return this._categoria;
    }

    set setAutor(autor) {
        this._autor = autor;
    }

    set setDataPublicacao(data_publicacao) {
        this._data_publicacao = data_publicacao;
    }

    set setCategoria(categoria) {
        this._categoria = categoria;
    }

    toString() {
        return `autor: ${this._autor}, data_publicacao: ${this._data_publicacao}, categoria: ${this._categoria}`;
    }
}

class Livro extends Material {
    constructor(isbn, editora, autor, data_publicacao, categoria) {
        super(autor, data_publicacao, categoria);
        this._isbn = isbn;
        this._editora = editora;
    }

    get getIsbn() {
        return this._isbn;
    }

    get getEditora() {
        return this._editora;
    }

    set setIsbn(isbn) {
        this._isbn = isbn;
    }

    set setEditora(editora) {
        this._editora = editora;
    }

    toString() {
        return `Livro[isbn: ${this._isbn}, editora: ${this._editora}, ${super.toString()}]`;
    }
}

class Orientador {
    constructor(nome, dataNascimento, formacao) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.formacao = formacao;
    }

    toString() {
        return `Orientador[nome: ${this.nome}, dataNascimento: ${this.dataNascimento}, formação: ${this.formacao}]`;
    }
}

class TrabalhoAcademico extends Material {
    constructor(autor, data_publicacao, categoria, instituicao, orientador) {
        super(autor, data_publicacao, categoria);
        this.instituicao = instituicao;
        this.orientador = orientador;
    }

    toString() {
        return `TrabalhoAcadêmico[instituição: ${this.instituicao}, orientador: ${this.orientador.toString()}, ${super.toString()}]`;
    }
}

const biblioteca = new Biblioteca();

function criarLivro() {
    let infos_livro = prompt(
        "\nInsira os dados do livro separados por ',' (isbn, editora, autor, data_publicacao, categoria): "
    );
    let dados_livro = infos_livro.split(",");
    if (dados_livro.length !== 5) {
        console.log("Dados insuficientes ou inválidos!");
        return;
    }
    const livro = new Livro(
        dados_livro[0].trim(),
        dados_livro[1].trim(),
        dados_livro[2].trim(),
        dados_livro[3].trim(),
        dados_livro[4].trim()
    );
    console.log("\nLivro Criado!\n" + livro.toString() + "\n");
    biblioteca.addMaterial(livro);
}

function criarTrabalhoAcademico() {
    let orientador_nome = prompt("\nDigite o nome do orientador: ");
    let orientador_data_nascimento = prompt(
        "Digite a data de nascimento do orientador (dd/mm/yyyy): "
    );
    let orientador_formacao = prompt("Digite a formação do orientador: ");
    const orientador = new Orientador(
        orientador_nome.trim(),
        orientador_data_nascimento.trim(),
        orientador_formacao.trim()
    );

    let infos_trabalho = prompt(
        "\nInsira os dados do trabalho acadêmico separados por ',' (autor, data_publicacao, categoria, instituicao): "
    );
    let dados_trabalho = infos_trabalho.split(",");
    if (dados_trabalho.length !== 4) {
        console.log("Dados insuficientes ou inválidos!");
        return;
    }
    const trabalhoAcademicoCriado = new TrabalhoAcademico(
        dados_trabalho[0].trim(),
        dados_trabalho[1].trim(),
        dados_trabalho[2].trim(),
        dados_trabalho[3].trim(),
        orientador
    );
    console.log("\nTrabalho Acadêmico criado:\n" + trabalhoAcademicoCriado.toString() + "\n");
    biblioteca.addMaterial(trabalhoAcademicoCriado);
}

function listarMateriais() {
    if (biblioteca.getMaterial.length === 0) {
        console.log("\nA biblioteca está vazia.\n");
        return;
    }
    console.log("\nMateriais na biblioteca:");
    biblioteca.getMaterial.forEach((material, index) => {
        console.log(`${index}: ${material.toString()}`);
    });
    console.log();
}

function menu() {
    let opcao;
    do {
        opcao = prompt(
            "Escolha uma opção:\n" +
                "1 - Criar um Livro\n" +
                "2 - Criar um Trabalho Acadêmico\n" +
                "3 - Listar Materiais\n" +
                "4 - Editar Material\n" +
                "5 - Excluir Material\n" +
                "6 - Sair\n\n"
        );
        switch (opcao) {
            case "1":
                criarLivro();
                break;
            case "2":
                criarTrabalhoAcademico();
                break;
            case "3":
                listarMateriais();
                break;
            case "4":
                const indexEditar = Number(prompt("Digite o índice do material a ser editado: "));
                biblioteca.editarMaterial(indexEditar);
                break;
            case "5":
                const indexExcluir = Number(prompt("Digite o índice do material a ser excluído: "));
                biblioteca.excluirMaterial(indexExcluir);
                break;
            case "6":
                console.log("Saindo...");
                break;
            default:
                console.log("\nOpção inválida! Tente novamente.");
                break;
        }
    } while (opcao !== "6");
}

menu();
