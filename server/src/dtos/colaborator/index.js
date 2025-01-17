import { colaboratorToParticipantOutputDTO } from "./ColaboratorParticipantOutputDTO/index.js";
import { colaboratorToChatDetailsOutputDTO } from "./ColaboratorChatOutputDTO/index.js";
import { colaboratorToParticipantExcerptOutputDTO } from "./ColaboratorParticipantExcerptOutputDTO/index.js";
import { toChatPermissionDTO } from "./ChatPermissionDTO/index.js";
import ColaboratorChatExcerptOutputDTO from "./ColaboratorChatExcerptOutputDTO/ColaboratorChatExcerptOutputDTO.js";
import chatsDTO from "../chats/index.js";

/**
 * Formats the data of a new chat to how it should be stored in database for collaborators
 * @param {*} user The user as it is saved in the database that creates the chat
 * @param {*} chat The new chat that has been created as it is saved in the database
 */
const newChatToColaboratorModel = (user, chat) => ({
    user,
    chat,
    hasJoined: true,
});

/**
 * Formats the data of a new participant to how it should be stored in database for collaborators
 * @param {*} user The user as it is saved in the database that is invited to the chat
 * @param {*} chat The chat where the user is being invited as it is stored in the database
 * @param {Array.<*>} permissions The database stored permissions that the user will have in the chat
 * @returns The new collaborator as it should be stored in the database.
 */
const newParticipantToColaboratorModel = (user, chat, permissions) => ({
    user,
    chat,
    permissions,
});

/**
 * Formats the data of a participant update to how it should be stored in database for collaborators
 * @param {Array.<*>} permissions The database stored permissions that the user will have in the chat
 * @returns The updated collaborator as it should be stored in the database.
 */
const updateParticipantToColaboratorModel = (permissions) => ({
    permissions,
});

/**
 * Transforms a colaborator as it is stored in the database to how it should be exposed as a chat list item.
 * @param {*} colaborator The colaborator as it is stored in the database
 * @param {string} userId The user that is requesting the resource in the database
 */
const toChatExcerptOutputDTO = (colaborator, userId) => {
    const dto = new ColaboratorChatExcerptOutputDTO();
    dto._id = colaborator.chat._id;
    dto.name = colaborator.chat.name;
    dto.isOwner = colaborator.chat.owner._id.toString() === userId;
    dto.createdAt = colaborator.chat.createdAt?.toISOString();
    dto.owner = chatsDTO.toChatOwnerDTO(colaborator.chat.owner);
    return dto;
};

export default {
    newChatToColaboratorModel,
    newParticipantToColaboratorModel,
    updateParticipantToColaboratorModel,
    toChatExcerptOutputDTO,
    colaboratorToChatDetailsOutputDTO,
    colaboratorToParticipantOutputDTO,
    colaboratorToParticipantExcerptOutputDTO,
    toChatPermissionDTO,
};
