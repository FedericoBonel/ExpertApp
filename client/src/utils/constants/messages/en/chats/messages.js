export default {
    /** The "usernames" of each chat actor (sender or receiver) to show in chats */
    actors: {
        /** The user username */
        USER: "You",
        /** The AI username */
        AI: "DataSage",
    },
    /** The message to be shown when the AI is generating a response */
    WRITING_RESPONSE: "DataSage is writing...",
    /** The chat message conversation input related variables */
    input: {
        /** Label of the input field */
        LABEL: "Chat Message Input",
        /** Placeholder of the input field */
        PLACEHOLDER: "Message to be sent to chat...",
    },
    /** Contains all messages related to the sources section of the chat messages (For those generated by AI). */
    sources: {
        /** Message that introduces the sources section (context used) of an AI generated message. */
        INTRODUCTION: "Sources:",
        /** Function that builds a single source text from a location page. (Should be used inside a link to the source). */
        buildSourceMessage: (locationPage) => `Page ${locationPage}`,
    },
    /** Contains all messages to be shown when entering a chat before any messages have been sent or received */
    welcome: {
        /** Welcome header */
        WELCOME: "Welcome",
        /** Welcome message sub header, normally a friendly question */
        SUB_HEADER: "How can I help you today?",
        /** The notes introduction header */
        NOTES_HEADER: "Before you begin",
        /** Notes about which questions will be answered */
        QUESTIONS_WILL_ANSWER: `Please note that I can only respond to questions based on the
        information provided in the documents.`,
        /** Notes about how to use the chat and how to make questions */
        IMPORTANT_NOTES: `When you ask a question, I'll search for relevant pages and
        mainly derive the response from there. Therefore, please be as
        specific as possible and refrain from assuming information that
        isn't explicitly stated in the provided documents (even it it is
        in the chat history). For instance, instead of asking a general
        question like "what are its benefits?", specify the subject,
        like "What are the benefits of the multicore processor?" This
        helps ensure accurate responses tailored to the available
        information.`,
        /** Notes about which questions wont normally be answered */
        QUESTIONS_WONT_ANSWER: `Questions about topics not covered in the documents will not be
        answered or may be inaccurate. Always verify information from
        the original sources I provide in each message if you are able
        to access them.`,
    },
};
