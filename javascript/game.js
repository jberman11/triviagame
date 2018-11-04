var counter = 0
var timee;
var soundUrl ="assets/sounds/"
var audio = ["battle.mp3", "victory.mp3", "lose.mp3"]
var audio1 = new Audio(soundUrl +audio[0])
var audio2 = new Audio(soundUrl+audio[1])
var audio3 = new Audio(soundUrl+audio[2])
var trivia = {
    
    questions : [
        {//1
            text : "What pokemon is number 103?",
            wrong1 : "Cubone",
            wrong2 : "Electabuzz",
            wrong3 : "Magmar",
            correct : "Exeggutor",
            complete: false,
            class: "q1",
        },
        {//2
            text : "In the movie, Pokemon the First Movie, which Gen 2 pokemon was featured in the short?",
            wrong1 : "Cyndaquil",
            wrong2 : "Sneasel",
            wrong3 : "Umbreon",
            correct : "Marill",
            complete: false,
            class:"q2",
        },
        {//3
            text : "What's the first pokemon Ash loses in the Anime?",
            wrong1 : "Charizard",
            wrong2 : "Pidgeot",
            wrong3 : "Squirtle",
            correct : "Butterfree",
            complete: false,
            class : "q3",
        },
        {//4
            text : "What level does charmander learn Metal Claw in Fire Red?",
            wrong1 : "21",
            wrong2 : "8",
            wrong3 : "16",
            correct : "13",
            complete: false,
            class : "q4"
        },
        {//5
            text : "Which of these pokemon is dual type?",
            wrong1 : "Blastoise",
            wrong2 : "Arbok",
            wrong3 : "Hitmonchan",
            correct : "Venasaur",
            complete: false,
            class : "q5"
        },
    ],
    right : 0,
    wrong : 0,
    skipped: 0, 
    currentAnswer: "",
    timer: 10,


    countdown: function(){
        clearInterval(timee)
        timee = setInterval(function(){
            $(".timer").text(trivia.timer)
            if(trivia.timer === 0){
                if(counter === trivia["questions"].length){

                    clearInterval(timee)
                    return
                }

                clearInterval(timee)
                
                $(".response1").text("Sorry! You took wayyyyy too long!")
                $(".response2").text("The correct answer was: " + trivia.currentAnswer)
                trivia.reveal()
                setTimeout(function(){
                    $(".revealed").addClass("hidden")
                    trivia.generate()
                }, 4000)

            }
            
            trivia.timer--

            },1000)


    },


    playAgain : function (){
        $(".revealed").removeClass("hidden")
        $(".response2").html("Correct: " + trivia.right +"<br>Wrong: "+ trivia.wrong+ "<br>Skipped: "+ trivia.skipped)
        if(trivia.right === 5){
            audio1.pause()
            audio2.loop=true
            audio2.play()
            
        }else {
            audio1.pause()
            audio3.loop=true
            audio3.play()
        }
        
        
        for (i=0; i < this["questions"].length; i++){
            this.questions[i].complete = false
        }
        $(".start").removeClass("hidden").attr("style","bottom:-215px")
    },



    reveal: function(question){
        $(".container").addClass("hidden")
        $(".revealed").removeClass("hidden")

    },



    generate : function(){
        $(".container").removeClass("hidden")
        $(".question").empty()
        trivia.timer = 10
        
        $(".answer").each(function(){
            $(this).empty()
        })
        $(".start").addClass("hidden")

        let arr = this.questions   
        let x = Math.floor(Math.random()*arr.length)
        var options = [];
        
        if(this.questions[x].complete === true){
            if(counter === arr.length){
                counter = 0
                clearInterval(timee)
                $(".container").addClass("hidden")

                this.playAgain()
                return
            }
            this.generate()
            
            console.log (counter)
            return
        } else {
            counter++
        }
        this.currentAnswer = this.questions[x].correct
        console.log(this.currentAnswer)
        options = [trivia.questions[x].wrong1,trivia.questions[x].wrong2,trivia.questions[x].wrong3,trivia.questions[x].correct]
        console.log (options)   
        $(".question").text(this.questions[x].text)


        shuffle(options)
        $(".answer").each(function(){
            $(this).text(options.pop())
           
        })
        $(".timer").text(trivia.timer)
        this.countdown()
        this.questions[x].complete = true

    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    
    while (0 !== currentIndex) {
  
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
}


//////////////////////on-click
$(document).ready(function(){

    $(".start").on("click", function(){
        $(".revealed").addClass("hidden")
        $(".response1").empty()
        $(".response2").empty()
        audio1.currentTime=0
        audio1.loop = true
        audio1.play()
        trivia.generate()
    })




    $(".answer").on("click",function(){
        console.log($(this).text(), trivia.currentAnswer)
        if( $(this).text() === trivia.currentAnswer){
            $(".response2").empty()
            $(".response1").text("Good Job!")
            trivia.right++
            trivia.reveal()
            for(i=0; i< trivia["questions"].length; i++){
                if(trivia.questions[i].correct === trivia.currentAnswer){
                    trivia.questions[i].complete === true;
                }
            }
            if(trivia.right === 5){
                $(".response1").text("Good Job! You are a pokemon master")
                trivia.generate()
            } else {
            setTimeout(function(){
                
                $(".revealed").addClass("hidden")
                trivia.generate()
            }, 3000)
            }
        } else {
            $(".response1").text("Sorry! You're wrong.")
            $(".response2").text("The correct answer was: " + trivia.currentAnswer)
            trivia.reveal()
            trivia.wrong++
            for(i=0; i< trivia["questions"].length; i++){
                if(trivia.questions[i].correct === trivia.currentAnswer){
                    trivia.questions[i].complete === true;
                }
            }
            setTimeout(function(){
                $(".revealed").addClass("hidden")
                trivia.generate()
            }, 3000)
        }
    })
})