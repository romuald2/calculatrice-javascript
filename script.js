//obtenir la valeur qui est dans l'historique
function getHistory() {
    return document.getElementById('history-value').innerText;
}

//afficher la valeur entrer par le clavier dans la zone history-value qui est initialiser mun
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

//permet d'obtenir le resultat de l'operation entrer dans le clavier
//getformatnumber renvoi un numbre en  tenant compte de sa localiter (en anglaise fr francais)
//si la valeur entre est nul il .affiche pas de virgule entre les chiffres
function printOutput() {

    if (num == "") {
        document.getElementById("output-value").innerText = num;

    } else
        document.getElementById("output-value").innerText = getFormattedNumber(num);
}

//afficher le resutat dans la zone output
function printOutput(num) {
    document.getElementById("output-value").innerText = getFormattedNumber(num);
}

//getformatnumber renvoi un numbre en  tenant compte de sa localiter (en anglaise fr francais)
function getFormattedNumber(num) {
    if (num == "-") { //cet condition permet de faire les opration negative
        return "";
    } // 
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
//cette fonction permet de remplacer la virgule par le vide
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

//ici on parcoure le code html recupupere tous les class operator
//clear dans la fonction permet d'effacer la valeur qui se trouve dans history et output et sa ramene la valeur a zero
var opereator = document.getElementsByClassName("operator");
for (var i = 0; i < opereator.length; i++) {
    opereator[i].addEventListener('click', function() {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
            //la condition avec backspace permet d'effacer un nombre entrer
        } else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) { //if has a value
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else { //cet condition permet d'envoyer la valeur qui est dans la zone output dans history
            var output = getOutput();
            var history = getHistory();
            if (output == "" && history != "") { //cette condition permet de nodifier la valeur dans l'historque
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output != "" || history != "") { //changement de la valeur de history si la condition
                //codition? true: false 
                output = output == "" ?
                    output : reverseNumberFormat(output);
                history = history + output;
                if (this.id == "=") { //lorque qu'on click sur egale le resultat s'affiche dans output et history reste vide
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

//ici on parcoure le code html recupupere tous les class number
//si la valeur output est null le numbre afficher ne sera pas en format anglais
//output permet d'afficher a l'ecran la valeur entrer en fonction de l'id
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) { //if output is a number
            output = output + this.id;
            printOutput(output);
        }

    });
}