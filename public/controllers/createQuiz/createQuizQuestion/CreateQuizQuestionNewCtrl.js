/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizQuestionNewCtrl", function ($routeParams, $location, QuizService, QuestionService) {
            const vm = this;

            vm.qid = $routeParams["qid"];
            vm.createQuestion = createQuestion;
            vm.addAnswer = addAnswer;

            function init() {
                QuizService.findById(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();

            function createQuestion(question) {
                QuestionService
                    .createQuestion(question, vm.qid)
                    .then(function (question) {
                        $location.url("/createQuiz/" + vm.qid + "/question");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function addAnswer(question) {
                QuestionService
                    .createQuestion(question, vm.qid)
                    .then(function (question) {
                        $location.url("/createQuiz/" + vm.qid + "/question/" + vm.qnid + "/answer/new");
                    }).catch(function (error) {
                    console.log(error);
                })
            }
        });
})();
