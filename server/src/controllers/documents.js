import { StatusCodes } from "http-status-codes";
import { SuccessPayload } from "../utils/responsebodies/index.js";
import docsServices from "../services/documents/documents.js";

/** Controller that handles all requests that ask for a list of documents of a chat */
const getByChatId = async (req, res) => {
    const { chatId } = req.params;

    const foundDocs = await docsServices.getByChatId(chatId);

    return res.status(StatusCodes.OK).json(new SuccessPayload(foundDocs));
};

/** Controller that handles all requests that ask for a deletion of a document from a chat */
const deleteById = async (req, res) => {
    const { chatId, documentId } = req.params;
    const user = req.user;

    const deletedDoc = await docsServices.deleteById(chatId, documentId, user._id);

    return res.status(StatusCodes.OK).json(new SuccessPayload(deletedDoc));
};

export default { getByChatId, deleteById };
