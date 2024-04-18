import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardActions } from "@mui/material";
import { chatsServices } from "@/services/chats";
import { Form, FormAlert } from "@/components/forms";
import { ShowLoader } from "@/components/informational";
import { TextField } from "@/components/fields";
import { messages, api } from "@/utils/constants";
import { chatsValidator } from "@/utils/validators";
import propTypes from "./UpdateChatForm.props";

/** Initial state of the form */
const initialFormState = {
    name: "",
};

/** Renders a chat form for updating chats */
const UpdateChatForm = ({ chatId }) => {
    const [updatedChat, setUpdatedChat] = useState(initialFormState);

    const chatQuery = chatsServices.useChatById(chatId);
    useEffect(() => {
        if (chatQuery.isSuccess) {
            setUpdatedChat({ name: chatQuery.data?.data.name });
        }
    }, [chatQuery.data, chatQuery.isSuccess]);

    const updateQuery = chatsServices.useUpdateByIdChat();

    // Updates state when text fields changes
    const onChangeTextField = (e) =>
        setUpdatedChat((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    const resetForm = () =>
        setUpdatedChat(
            chatQuery.isSuccess
                ? { name: chatQuery.data?.data.name }
                : initialFormState
        );

    const onSubmit = (e) => {
        e.preventDefault();

        updateQuery.mutate({ chatId, updatedChat });
    };

    // If submition was unsuccessful show the corresponding errors
    const errors = updateQuery.isError && (
        <FormAlert error={updateQuery.error?.response?.data} />
    );

    return (
        <ShowLoader isLoading={chatQuery.isLoading}>
            <Form
                component={Card}
                buttonsWrapper={CardActions}
                sx={{ flex: 1 }}
                onSubmit={onSubmit}
                canSubmit={chatsValidator.updateChat(updatedChat)}
                onCancel={resetForm}
                isSubmitting={updateQuery.isPending}
                buttonsLabels={{
                    submit: messages.chats.update.form.buttons.ACCEPT,
                    cancel: messages.chats.update.form.buttons.CANCEL,
                }}
            >
                <CardHeader
                    title={messages.chats.update.form.TITLE}
                    subheader={messages.chats.update.form.SUB_TITLE}
                />
                <CardContent>
                    {/* Chat name field */}
                    <TextField
                        value={updatedChat.name}
                        variant="standard"
                        label={messages.chats.update.form.NAME_FIELD}
                        inputProps={{
                            required: true,
                            maxLength: api.validation.chats.MAX_NAME_LENGTH,
                        }}
                        fullWidth
                        name="name"
                        onChange={onChangeTextField}
                        showHelperText
                        helperText={messages.chats.update.form.NAME_HELPER_TEXT}
                    />
                </CardContent>
                {errors}
            </Form>
        </ShowLoader>
    );
};

UpdateChatForm.propTypes = propTypes;

export default UpdateChatForm;
