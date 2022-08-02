//pilha dos operadores
var pilha = [];

//topo da pilha
var topo = -1;

//função que insere um elemento no topo da pilha
function colocar(e) {
    topo++;
    pilha[topo] = e;
}

//função que remove o elemento do topo da pilha e retorna o elemento removido 
function tirar() {
    if (topo == -1) return 0;
    else {
        var elementoRemovido = pilha[topo];
        topo--;
        return elementoRemovido;
    }
}

function operador(op) {
    if (
        op == "+" ||
        op == "-" ||
        op == "^" ||
        op == "*" ||
        op == "/" ||
        op == "(" ||
        op == ")"
    ) {
        return true;
    } else return false;
}

function prioridade(pre) {
    if (pre == "x" || pre == "(" || pre == ")") {
        return 1;
    } else if (pre == "+" || pre == "-") {
        return 2;
    } else if (pre == "/" || pre == "*") {
        return 3;
    } else if (pre == "^") {
        return 4;
    } else return 0;
}

//inicializa a pilha com x
function InfixaParaPostfixa() {
    var posfixa = [];
    var count = 0;
    colocar("x");
    infixa = document.getElementById("operacao").value;

    //percorrer a infixa, caracter por caracter
    for (var i = 0; i < infixa.length; i++) {
        var elemento = infixa[i];

        //se for um operador entra nesse if
        if (operador(elemento)) {

            //Quando encontrar um ) ele vai percorrer a pilha passando pra posfixa os operadores com a prioridade de () 
            if (elemento == ")") {
                while (pilha[topo] != "(") {
                    posfixa[count++] = tirar();
                }
                //Apos remover da pilha o operadores com a prioridade do () ele remove o ( e voltar ao laço de repeticao
                tirar();
            }
            //insere o ( na pilha
            else if (elemento == "(") {
                colocar(elemento);
            }
            //verifica se se prioridade do elemento é maior do que a do topo da pilha e insere no topo da pilha o novo elemento
            else if (prioridade(elemento) > prioridade(pilha[topo])) {
                colocar(elemento);
            } else {
                //se o elemento tiver prioridade menor ou igual ao topo da pilha, ele insere o topo da pilha na operação posfixa
                while (prioridade(elemento) <= prioridade(pilha[topo]) && topo > -1) {
                    posfixa[count++] = tirar();
                }
                //apos a inserir o que tem prioridade no operação pos fixa ele insere o elemento no topo da pilha
                colocar(elemento);
            }
        } else {
            //se nao for um operador adiciona o caracter na expressão pos fixa
            posfixa[count++] = elemento;
        }
    }

    //pega o valor no topo da pilha e insere na operação posfixa enquanto não acha o caracter que foi iniciado na pilha
    while (pilha[topo] != "x") {
        posfixa[count++] = tirar();
    }

    //transforma a array posfixado em uma string 
    var resultado = "";
    for (var i = 0; i < posfixa.length; i++) {
        resultado += posfixa[i];
    }

    const msgError = document.getElementsByClassName("msg");
    if (msgError.length >= 1) {
        for (let erro of msgError) {
            erro.remove();
        }
    }

    const div = document.createElement("div");
    div.innerHTML = "<br>Pos fixa";
    div.innerHTML += `<br>${resultado}`;
    div.classList.add("posfixado", "msg");
    document.querySelector(".h1").appendChild(div);
}