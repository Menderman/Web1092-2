$(function(){
    var currentQuiz = null;
    $("#startButton").on("click",function(){
        if(currentQuiz==null){//first question
            currentQuiz=0;
            //display question
            $("#question").text(questions[0].question);
            //clear options
            $("#options").empty();
            //add options
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name='options' type='radio'value='${index}'><label>${element[0]}</label><br><br>`);
            })
            //button text change
            $("#startButton").attr("value","Next");
        }
        else{
            //選取選項
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    //最後一題
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //display title
                        $("#question").text(finalAnswers[finalResult][0]);
                        //clear options
                        $("#options").empty();
                        //result
                        $("#question").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz = null;
                        $("#startButton").attr("value","重新開始");

                    }
                    else{
                        //指定下一題，原始資料從1開始，所以要-1
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;
                        //display question
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        //add option
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
                            });
                            
                    }
                    return false;
                }
            });
        }
    });
});