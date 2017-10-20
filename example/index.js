'use strict';

const Alexa = require("alexa-sdk");
const jobs = require("./jobs");

const handlers = {
    'LaunchRequest': function () {
        this.attributes.speechOutput = "Welcome to Joby, the job search skill to find your next career opportunity. You can ask a question like, what are the latest jobs offers in Paris ? Now, how can i help you ?";
        this.attributes.repromptSpeech = "I'm still waiting for your question";
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'JobSearchIntent': function () {
        let cityName;
        const citySlot = this.event.request.intent.slots.city;
        
        if (citySlot && citySlot.value) {
            cityName = citySlot.value.toUpperCase();
        }

        const job = jobs[cityName];

        if (job) {
            this.attributes.speechOutput = job.description;
            this.attributes.repromptSpeech = "if you are interested i can tell you more about the offer ?";
        } else {
            let speechOutput = "I'm sorry, i currently do not know";
            const repromptSpeech = "Can you repeat your question in other words ?";
        }

        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = "You can ask questions such as, what are the latest jobs offers in Paris, or, you can simple say exit now, how can i help you ?";
        this.attributes.repromptSpeech = "I'm still waiting for you question";
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', 'Goodbye !');
    },
    'Unhandled': function () {
        this.attributes.speechOutput = "You can ask questions such as, what are the latest jobs offers in Paris, or, you can simple say exit now, how can i help you ?";
        this.attributes.repromptSpeech = "I'm still waiting for you question";
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
