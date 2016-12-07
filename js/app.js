//storage
var questions = [        
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionText:"How to play?", questionId:1},
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionText:"How to work?", questionId:2},
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionText:"How to sleep?", questionId:3},
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionText:"How to eat?", questionId:4},
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionText:"How to sing?", questionId:5}
  ];

var answers = [        
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionId: 1, answerText: "For playing you should lorem ipsum dolor sit amet"},
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionId: 1, answerText: "For playing you also can amco laboris nisi ut aliquip ex ea commodo"},
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionId: 3, answerText: "For sleeping - it's better didunt ut labore et dolore magna aliqua"},
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionId: 5, answerText: "If you want sing better adipisicing elit, sed do eiusmod"},
    {time : "Tue Dec 06 2016 23:50:43 GMT+0200 " , questionId: 3, answerText: "Sleeping it's very important!"}
  ];

// app.js
var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        // home
        .state('home', {
            url: '/',
            templateUrl: 'tamplates/partial-home.html',
            controller: "MainController"
        })
        // all-questions
        .state('all-questions', {
            url: '/all-questions',
            templateUrl: 'tamplates/all-questions.html',
            controller: "MainController"
        })
        //answered
        .state('answered', {
            url: '/answered',
            templateUrl: 'tamplates/answered.html',
            controller: "MainController"
        }) 
        //un-answered 
        .state('un-answered', {
            url: '/un-answered',
            templateUrl: 'tamplates/un-answered.html',
            controller: "MainController"
        })
    });

app.filter('unanswered', function () {
    return function (items) {
      var initial = [];
      for (var i = items.length - 1; i >= 0; i--) {
         initial.unshift(items[i]);
       }
      for (var n = answers.length - 1; n >= 0; n--) {
        for (var i = initial.length - 1; i >= 0; i--) {
          if(initial[i].questionId == answers[n].questionId){
              initial.splice(i,1);
            }
        }
      }
      return initial
    }
 });

app.filter('answered', function () {
    return function (items) {
      var out = []; 
      for (var n = 0; n < answers.length; n++) {
        for (var i = items.length - 1; i >= 0; i--) {
          if(items[i].questionId == answers[n].questionId){
              out.push(items[i]);
            }
        }
      }

      for (var j = out.length - 1; j >= 0; j--) {
        for (var o = out.length - 1; o >= 0; o--) {
          if(j == o){continue}
          else{
            if (out[j].questionId == out[o].questionId){
              out.splice(j,1, "none");
            }
          }
        }
      }

      for (var i = out.length - 1; i >= 0; i--) {
        if (out[i] == "none"){
          out.splice(i,1);
        }
      }
     
      return out
    }
 });

app.filter('displayBreakLines', function () {
    return function (item) {
        item.replace("|"," </br> ")
        item += "!"
      return item
    }
 });
