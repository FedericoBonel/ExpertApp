import messagesRepository from "../../repositories/messages/messages.js";
import colaboratorsRepository from "../../repositories/colaborators/colaborators.js";
import chatsRepository from "../../repositories/chats/chats.js";
import pagesRepository from "../../repositories/pages/pages.js";
import messagesDTO from "../../dtos/messages/index.js";
import { chatMemoryFrom, getQAChain } from "./utils/index.js";
import { NotFoundError } from "../../utils/errors/index.js";
import { messages, validation, permissions } from "../../utils/constants/index.js";
import verifyChatPermissions from "../../utils/permissions/verifyChatPermissions.js";
import calculateSkip from "../../utils/db/calculateSkip.js";

/**
 * Generate an AI response for a user prompt message.
 * @param {string} prompt User prompt.
 * @param {string} chatId Id of the chat where the message is being sent.
 * @param {string} userId Id of the user generating the message
 * @returns The generated message.
 */
const generateResponse = async (prompt, chatId, userId) => {
    // Validate the user has access to the chat and get its colabarator data
    const foundColaborator = await colaboratorsRepository.getByChatAndUser(chatId, userId);
    if (!foundColaborator) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    // Get the last chat history messages for the colaborator if any
    const historyMessages = await messagesRepository.getAllBy(
        { colaboratorId: foundColaborator._id },
        { limit: validation.messages.generation.MAX_HISTORY, sort: "-createdAt" }
    );
    const chatMemory = chatMemoryFrom(historyMessages);

    // Get the chat knowledge base reference (uploaded documents)
    const chatWithDocuments = await chatsRepository.getById(chatId);

    // Create a retriever for those documents
    const pagesRetriever = await pagesRepository.getRetrieverByDocs(
        chatWithDocuments.documents.map((doc) => doc._id.toString())
    );

    // Get the LLM model
    const llmModel = chatsRepository.getLLM();

    // Generate the response with that LLM, retrievers and chat history
    const chain = getQAChain(llmModel, pagesRetriever, chatMemory);
    const response = await chain.invoke({ question: prompt });

    // Store the new messages in history
    const newMessages = await messagesRepository.saveAll([
        messagesDTO.toMessageModel(prompt, foundColaborator._id, validation.messages.actors.human),
        messagesDTO.toMessageModel(
            response.text,
            foundColaborator._id,
            validation.messages.actors.AI,
            response.sourceDocuments
        ),
    ]);

    return messagesDTO.toMessageOutputDTO(
        newMessages.find((message) => message.from === validation.messages.actors.AI),
        verifyChatPermissions(
            [permissions.colaborator.readDocs],
            foundColaborator.permissions,
            foundColaborator.chat.owner._id.toString() === foundColaborator.user._id.toString()
        )
    );
};

/**
 * Retrieves a chat history based on provided parameters.
 * @param {string} userId The Id of the user that is logged in.
 * @param {string} chatId The Id of the chat from where to retrieve message history.
 * @param {Object} [pagination={}] Pagination options.
 * @param {number} [pagination.page=undefined] Page number.
 * @param {number} [pagination.limit=undefined] Limit per page.
 * @returns The chat history that matches the parameters.
 */
const getByChatId = async (userId, chatId, pagination = { page: 1, limit: 10 }) => {
    const foundColaborator = await colaboratorsRepository.getByChatAndUser(chatId, userId);
    if (!foundColaborator) {
        throw new NotFoundError(messages.errors.ROUTE_NOT_FOUND);
    }

    const skip = calculateSkip(pagination.page, pagination.limit);
    const chatHistory = await messagesRepository.getAllBy(
        { colaboratorId: foundColaborator._id },
        { skip, limit: pagination.limit, sort: "-createdAt" }
    );

    return chatHistory.map((message) =>
        messagesDTO.toMessageOutputDTO(
            message,
            verifyChatPermissions(
                [permissions.colaborator.readDocs],
                foundColaborator.permissions,
                foundColaborator.chat.owner._id.toString() === foundColaborator.user._id.toString()
            )
        )
    );
};

export default { generateResponse, getByChatId };
