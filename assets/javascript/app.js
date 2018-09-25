
var intervalId;

var questionlist = [
    {Question: "On December 29, 1972 what famed weekly magazine ceased publication only to reemerge as a monthly magazine in 1978?",
     Answer: 
        {Name: "Life", Url: "assets/images/Life.gif"},
     Wrong: ["The Saturday Post", "Look","Focus"]},
    {Question: "What toy debuted in 1975, and came with a lengthy set of instructions on how to care for and train it?", 
     Answer: 
        {Name: "Pet Rock", Url: "assets/images/petrock.gif"},
     Wrong: ["Pound Puppies", "Goldfish", "Baby Alive"]},
    {Question: "What dance genre became popular in the 70's?", 
     Answer: 
        {Name: "Disco", Url: "assets/images/disco.gif"},
     Wrong: ["Swing", "Break Dancing", "The Carlton"]},
    {Question: "How many children were part of The Brady Bunch?",
     Answer: 
        {Name: "6", Url: "assets/images/brady.gif"},
     Wrong: ["5","10","4"]},
    {Question: "Which band broke up in 1970?",
     Answer:
        {Name: "The Beatles", Url: "assets/images/Beatles.gif"},
     Wrong: ["Cream","Destiny's Child","Fleetwood Mac"]},
    {Question: "The Partridge Family created what hit song in 1970?",
     Answer: 
        {Name: "I think I Love you", Url: "assets/images/Love.gif"},
     Wrong: ["I Don't Know what Love is", "Dancing Queen", "Knocking on Heavens Door"]},
    {Question: "Which scandal in 1972 rocked the White House?",
     Answer: 
        {Name: "Watergate", Url: "assets/images/Nixon.gif"},
     Wrong: ["Waterdoor", "Hotel Fire", "Nixon"]},
    {Question: "Which superhero debuts on TV 1975?",
     Answer: 
        {Name: "Wonder Woman", Url:"assets/images/wonderwomen.gif"},
     Wrong: ["Superman", "Batman","Aquaman"]},
    {Question: "Which computer company started in 1976?",
     Answer: 
        {Name: "Apple Computers", Url:"assets/images/Apple.gif"},
     Wrong: ["Orange Computers", "Microsoft", "Target"]},
    {Question: "What is the best singing group of the decade?",
     Answer: 
        {Name: "ABBA", Url: "assets/images/abba.gif"},
     Wrong: ["Nirvana", "1975", "Donna Summer"]}];


var numRight = 0;
var numWrong = 0;
var numUnanswrd = 0;


$("#start").on("click", function() {
   
    var i=0;
   
    function printResults () {
        $("#qna-box").empty();
        $("#qna-box").append ('<div class="alert alert-success" role="alert" style="width: 66%; margin: 0 auto 10px;">Results</div>');
        $("#qna-box").append('<p>You got '+numRight+' correct!</p>');
        $("#qna-box").append('<p>You got '+numWrong+' wrong!</p>');
        $("#qna-box").append('<p>You left '+numUnanswrd+' questions unanswered!</p>');
        $("#qna-box").append('<button id="restart" type="button" class="btn btn-primary btn-lg">Restart Game</button>');
    }
    
    function resetClock() {
        
        
        $("#qna-box").empty();
        
        
        var number = 20;    
        
      
        var newClock = $('<p id="clock" class="lead"></p>');
        var newQuestion = $('<p id="question" class="lead">'+questionlist[i].Question+'</p>');
        var newAnswerDiv = $('<div id="answers" class="list-group">');
        
        
        var randomAnswrSpot = Math.floor(Math.random()*4)+1;
        
       
        var k = 0;
        
       
        for (var j=1; j < 5; j++) {
        if (j == randomAnswrSpot) {
            newAnswerDiv.append('<button type="button" value ="'+j+'" class="list-group-item list-group-item-info list-group-item-action">'+ questionlist[i].Answer.Name +'</button>');
        }
        else {
            newAnswerDiv.append('<button type="button" value ="'+j+'" class="list-group-item list-group-item-info list-group-item-action">'+ questionlist[i].Wrong[k] +'</button>');
            k++;
        }
        }
       
        $("#qna-box").append(newClock).append(newQuestion).append(newAnswerDiv);
        
        
        function printAnswer() {
            $("#clock").empty();
            $("#answers").empty();
            $("#answers").append('<div class="alert alert-danger my-danger" role="alert">The correct answer is '+questionlist[i].Answer.Name+'!!!</div>');
            $('#answers').append('<div id="answrMedia" style="margin:0 auto;"></div>');
            $('#answrMedia').append('<img src='+ questionlist[i].Answer.Url+'/>');
        }
        
        function run () {    
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
            $("#clock").text("Time remaining: "+number + " secs!");
            }
          
        
        function decrement() {
            
            
            number--;
            $("#clock").text("Time remaining: "+number + " secs!");

         
            if (number === 0) {
      
             
              stop();
              numUnanswrd++;
               
              if (i<questionlist.length-1) {
                printAnswer();
                i++;

                
                setTimeout(function() {
                    resetClock();
                },5000);
                }
                  
                else {
                printAnswer();
                setTimeout(function() {
                    printResults();
                    
                    $("#restart").on("click", function() {
                        i=0;
                        numRight=0;
                        numWrong=0;
                        numUnanswrd = 0;
                        resetClock();
                    });
                },5000);
              }
            }
          }
      
        function stop() {
      
           
            clearInterval(intervalId);
        }
        
        run();
       
        $("button").on("click", function(e) {
            
            var valClicked = parseInt(e.target.value);
            
            $("#clock").empty();
            $("#answers").empty();
            
            if (valClicked==randomAnswrSpot) {
                numRight++;
                $('#answers').append('<div class="alert alert-primary my-correct" role="alert">That is the correct answer!</div>');
            }
            else {
                numWrong++;
                $("#answers").append('<div class="alert alert-danger my-danger" role="alert">The correct answer is '+questionlist[i].Answer.Name+'</div>');
            }
            
            $('#answers').append('<div id="answrMedia" style="margin:0 auto;"></div>');
            $('#answrMedia').append('<img src='+ questionlist[i].Answer.Url+'></img>');
           
            if (i<questionlist.length-1) {
                stop();
                i++;
                setTimeout(function() {
                    resetClock();
                },5000);
            }
            
            else {
                stop();
                i++;
                setTimeout(function() {
                    printResults(); 
                    $("#restart").on("click", function() {
                        i=0
                        numRight=0;
                        numWrong=0;
                        numUnanswrd = 0;
                        resetClock();
                    });
                },5000);
            }
        });
    }
  
    resetClock();
});