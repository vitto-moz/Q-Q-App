app.controller('MainController', function($scope) {

  $scope.questions = questions;
  $scope.answers = answers;


  $scope.answersHideAll = function(){
    $scope.clickedQuestionId = -1;
  }();

  $scope.answersFilter = function(x){
    $scope.clickedQuestionId = x;
    for (var i = (questions).length - 1; i >= 0; i--) {
        if(questions[i].questionId == x){
        $scope.clickedQuestionText = '"' + questions[i].questionText + '"';    
        }
    }
  }

  $scope.ask = function() {
    if(!$scope.newQuestion){
      return alert("Fill question field, please");
    }
    questions.unshift(function(){
        var text = $scope.newQuestion;
        var id = questions.length + 1;
        var d = new Date();
        var currentDate = d.toString();
        return {time : currentDate , questionText : text , questionId : id}
    }());

    $scope.newQuestion = '';
  };

  $scope.answer = function() {
    if($scope.clickedQuestionId == -1){
       return alert("Choose a question"); 
    }

    if(!$scope.newAnswer){
      return alert("Fill answer field, please");
    }

    answers.unshift(function(){
        var text = $scope.newAnswer;
        var id = $scope.clickedQuestionId;
        var d = new Date();
        var currentDate = d.toString();
        $scope.answersFilter($scope.clickedQuestionId);
        return {time : currentDate , answerText :  text , questionId : id}
    }());

    $scope.newAnswer = '';
  };
});