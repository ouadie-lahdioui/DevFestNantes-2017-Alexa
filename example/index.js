'use strict';

const Alexa = require("alexa-sdk");
const Talks = require("./talks");

const handlers = {
    "LaunchRequest": function () {
        this.attributes.speechOutput = "Welcome to DevFest Nantes 2017. The biggest DevFest in europe carefully crafted for you by GDG community ! Be a Coder, Be a Hero ! Now, how can i help you ?";
        this.attributes.repromptSpeech = "I'm still waiting for your question";
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    "Unhandled": function () {
        this.attributes.speechOutput = "You can ask questions such as, what is the next talk in Belem room, or, you can simple say exit now, how can i help you ?";
        this.attributes.repromptSpeech = "I'm still waiting for you question";
        this.emit(":ask", this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    "SessionEndedRequest": function () {
        this.emit(":tell", "Goodbye !");
    },
    "AMAZON.HelpIntent": function () {
        this.attributes.speechOutput = "Welcome again to DevFest Nantes, You can ask questions such as, what is the next talk in Belem room ";
        this.attributes.repromptSpeech = "I'm still waiting for you question";
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    "AMAZON.RepeatIntent": function() {
        this.emit(":ask", this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    "AMAZON.StopIntent": function () {
        this.emit("SessionEndedRequest");
    },
    "AMAZON.CancelIntent": function () {
        this.emit("SessionEndedRequest");
    },
    "TalkSearchIntent": function() {
        const roomSlot = this.event.request.intent.slots.room;
        
        this.attributes.speechOutput = "I'm sorry, i currently do not know";
        this.attributes.repromptSpeech = "Can you repeat your question in other words ?";

        if (roomSlot && roomSlot.value) {
            let roomName = roomSlot.value.toUpperCase();
            let talk = Talks[roomName];
            this.attributes.speechOutput = talk.description;
            this.attributes.repromptSpeech = "If you are interested, i can tell you more abut the speaker ?";
        }

        this.emit(":ask", this.attributes.speechOutput, this.attributes.repromptSpeech);
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};