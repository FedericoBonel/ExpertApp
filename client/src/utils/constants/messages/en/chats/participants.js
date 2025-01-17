export default {
    /** Title to be shown in the chat participants page */
    PAGE_TITLE: "Chat Participants",
    /** Messages to be shown in the creation pages of participants */
    create: {
        /** The title to be shown in the creation form for participants */
        TITLE: "New Participants",
        /** The sub title to be shown in the creation form for participants */
        SUB_TITLE:
            "Invite a new participant to the chat and select which actions they will be able to make in it.",
    },
    /** The messages to be shown in the form sections of participants. */
    formSections: {
        /** The messages to be shown in the contact section of participants forms */
        contact: {
            /** The label to be shown in the email field of the forms for participants */
            EMAIL: "User's email",
        },
        /** The messages to be shown in the permissions section for participants */
        permissions: {
            /** The label to be shown in the read files permission */
            READ_DOCS_LABEL: "Read Files",
            /** The description of the read files permission */
            READ_DOCS_DESC:
                "This allows the participant to read the documents you or other participants have uploaded to the chat.",
            /** The label to be shown in the upload files permission */
            UPLOAD_DOCS_LABEL: "Upload Files",
            /** The description of the upload files permission */
            UPLOAD_DOCS_DESC:
                "This allows the participant to upload new documents to the chat so that it can generate responses related to it.",
        },
    },
    /** Contains all messages to be shown in listing participants of a chat. */
    list: {
        /** Message to be shown in the title of the list of all chat participants */
        TITLE: "Current Participants",
        /** Message to be shown in the subtitle of the list of all chat participants */
        SUB_TITLE:
            "Manage all users that can access the chat right now. Here you can remove them completely from the chat or change their allowed actions in this chat.",
        /** Message to be shown in the label of the search field of the participant list */
        TEXT_SEARCH: "Search by name, last names or email",
        /** Message to be shown in a list when a participant has joined a chat */
        JOINED: "Joined",
        /** Message to be shown in a list when a participant hasn't joined a chat yet */
        INVITED: "Invited",
    },
    /** Contains all messages to be shown in the delete section of chat participants */
    delete: {
        /** Contains all messages to be shown in the delete form of chat participants. */
        form: {
            /** Message to be shown in the title of the delete form of chat participants. */
            TITLE: "Deleting Participant",
            /** Message to be shown in the body of the delete form of chat participants. It takes the form of a question to ask the user to confirm or cancel deletion. */
            QUESTION:
                "You are about to remove a participant from the chat.\nThis will make the chat not accessible to the participant any longer. Their uploaded documents will remain.\nDo you wish to remove this user from the chat?",
            /** Message to be shown in the submit success toast message */
            SUCCESS: "Participant deleted successfully!",
        },
    },
    /** Contains all messages to be shown in the update section of chat participants */
    update: {
        /** Contains all messages to be shown in the update form of chat participants. */
        form: {
            /** Message to be shown in the title of the delete form of chat participants. */
            TITLE: "Update Participant's Permissions",
            /** Message to be shown in the submit button of the form */
            SUBMIT: "Save changes",
            /** Message to be shown in the submit success toast message */
            SUCCESS: "Changes saved successfully!",
        },
    },
};
