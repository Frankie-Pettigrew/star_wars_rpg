class Character {
    constructor(charIndex, healthPoints, attackPower, counterAttack, title, powerGrow) {
        this.charIndex = charIndex;
        this.healthPoints = healthPoints;
        this.attackPower = attackPower;
        this.counterAttack = counterAttack;
        this.powerGrow = powerGrow;
        this.title = title;
    }
}

var cantinaIMG = "assets/img/cantina.jpeg";
var palpIMG = "assets/img/sid.png";
var jarIMG = "assets/img/jarjar.png";
jabbaIMG = "assets/img/jabba.png";
kyloIMG = "assets/img/kyloren.png";
var images = [jabbaIMG, kyloIMG, jarIMG, palpIMG, cantinaIMG];

var jabba = new Character(0, 70, 7, 8, "Jabba", 2);
var kylo = new Character(1, 40, 9, 9, "Kylo", 4);
var jar = new Character(2, 60, 8, 8, "Jar-Jar", 3);
var palp = new Character(3, 30, 15, 15, "Palpatine",0);

var characters = [jabba, kylo, jar, palp];

var pc;
var npc;
var battleStarted = false;
var resultLog = [];




$(document).ready(function () {

    displayCharacters();
    $("#Kylo").on("click", function () {
        if (pc == undefined) {
            pc = kylo;
            console.log("kylo chosen");
            addToResults('Kylo Ren Chosen');
        } else if (npc == undefined && characters.length > 1 && pc != kylo) {
            npc = kylo;
            addToResults('Opponent is Kylo Ren');
        }
    });
    $("#Jabba").on("click", function () {
        if (pc == undefined) {
            pc = jabba;
            console.log("jabba chosen");
            addToResults('Jabba the Hutt Chosen');
        } else if (npc == undefined && characters.length > 1 && pc != jabba) {
            npc = jabba;
            addToResults('Opponent is Jabba the Hutt');
        }
    });
    $("#Palpatine").on("click", function () {
        if (pc == undefined) {
            pc = palp;
            console.log("palpatine chosen");
            addToResults('Emperor Palpatine Chosen');
        } else if (npc == undefined && characters.length > 1 && pc != palp) {
            npc = palp;
            addToResults('Opponent is Emperor Palpatine Chosen');
        }
    });
    $("#Jar-Jar").on("click", function () {
        if (pc == undefined) {
            pc = jar;
            console.log("jar jar chosen");
            $("#results").append('<br> Jar Jar Binks Chosen');
        } else if (npc == undefined && characters.length > 1 && pc != jar) {
            npc = jar;
            addToResults('Opponent is Jar Jar Binks');
        }
    });
    $("#attackBtn").on("click", function () {

        if (!battleStarted) {
            if (pc != undefined && npc != undefined) {
                $("#characters").html("");
                var pcImg = '<img class="characterIMG img-thumbnail rounded float-left" id="' + pc.title + '" src="' + images[pc.charIndex] + '"></img>';
                var npcImg = '<img class="characterIMG img-thumbnail rounded float-left" id="' + npc.title + '" src="' + images[npc.charIndex] + '"></img>';
                $("#characters").append('<div class="col-md">' + pcImg + '</div>');
                $("#characters").append('<div class="col-md">' + npcImg + '</div>');
                battleStarted = true;
            }
        } else {
            if(pc.healthPoints > 0 && npc.healthPoints > 0){
                npc.healthPoints -= pc.attackPower;
                pc.healthPoints -= npc.counterAttack;
                pc.attackPower += pc.powerGrow;
                addToResults(pc.title + ' HP: ' + pc.healthPoints);
                addToResults(npc.title + ' HP: ' + npc.healthPoints);
            } else if(pc.healthPoints <= 0){
                addToResults('YOU LOSE');
            }
        }
    });



    function displayCharacters() {
        for (var i = 0; i < characters.length; i++) {
            var newImg = '<img class="characterIMG img-thumbnail rounded float-left" id="' + characters[i].title + '" src="' + images[characters[i].charIndex] + '"></img>';
            $("#characters").append('<div class="col-md">' + newImg + '</div>');
        }
    }

    function addToResults(message){
        $("#results").html("");
        resultLog.push(message);
        if(resultLog.length > 5){
            resultLog.shift();
        }
        for(i=0;i<resultLog.length;i++){
            $("#results").append(resultLog[i]);
            $("#results").append('<br>');
        }
    }

});