/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("RecordService", function ($http, CommonService) {

            const RecordService = CommonService("record");
            RecordService.createRecord = createRecord;
            RecordService.findByQuizId = findByQuizId;
            RecordService.createForQuiz = createForQuiz;
            RecordService.getNextQuestion = getNextQuestion;
            RecordService.answerQuestion = answerQuestion;
            RecordService.getResult = getResult;

            return RecordService;

            function createRecord(result, quizId) {
                result._quiz = quizId;
                return RecordService.create(result);
            }

            function findByQuizId(quizId) {
                return RecordService.find({"_quiz": quizId});
            }

            function createForQuiz(quiz) {
                var record = {};
                record._quiz = quiz._id;
                return RecordService.create(record);
            }

            function getNextQuestion(recordId) {
                const url = "/api/record/" + recordId + "/next-question";
                console.log(url);
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function answerQuestion(recordId, answerId) {
                const url = "/api/record/" + recordId + "/answer-question";
                console.log(url);
                return $http.post(url, {answerId: answerId})
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getResult(record) {
                const url = "/api/record/" + record._id + "/result";
                console.log(url);
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
        });
})();