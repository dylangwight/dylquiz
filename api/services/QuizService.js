/**
 * Created by DylanWight on 6/4/17.
 */
const mongoose = require("mongoose");
const CommonService = require("./CommonService");

function QuizService () {

    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
    const index = client.initIndex("quizzes");

    const QuizSchema = require("../schemas/quizSchema");
    const QuizModel = mongoose.model("Quiz", QuizSchema);

    const QuizService = new CommonService(QuizModel);
    QuizService.publish = publish;
    return QuizService;

    function publish(quizId) {
        return QuizService.update(quizId, {published: true}).then((quiz) => {
            index.addObjects([quiz]);
            return quiz;
        })
    }
}

module.exports = QuizService;