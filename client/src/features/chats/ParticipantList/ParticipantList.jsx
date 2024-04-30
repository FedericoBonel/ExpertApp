import { useCallback, useState } from "react";
import { chatsServices } from "@/services/chats";
import DeleteParticipantDialog from "../DeleteParticipantDialog/DeleteParticipantDialog";
import { TextField } from "@/components/fields";
import { PaginatedList } from "@/components/list";
import { messages, api } from "@/utils/constants";
import useDialog from "@/utils/hooks/useDialog";
import ParticipantListItem from "./components/ParticipantListItem/ParticipantListItem";
import { ListStyles } from "./ParticipantList.styles";
import propTypes from "./ParticipantList.props";

/** Renders a list of participants of a chat by id and its management components (search bar, deletion and update). */
const ParticipantList = ({ chatId }) => {
    const { selected, open, isOpen, close } = useDialog();
    const [textSearch, setTextSearch] = useState("");
    const onChangeSearch = (query) => setTextSearch(query);

    const participantQuery = chatsServices.useInfiniteParticipantDataByChat({
        chatId,
        textSearch,
    });

    const onEditParticipant = useCallback(() => undefined, []);

    const participants =
        participantQuery.isSuccess &&
        participantQuery.data.pages.map((page) =>
            page.data.map((participant) => (
                <ParticipantListItem
                    key={participant._id}
                    participant={participant}
                    onClickDelete={open}
                    onClickEdit={onEditParticipant}
                />
            ))
        );

    return (
        <>
            <TextField
                isDebounced
                value={textSearch}
                onChange={onChangeSearch}
                fullWidth
                label={messages.chats.participants.list.TEXT_SEARCH}
                variant="standard"
                type="search"
                inputProps={{ maxLength: api.searching.textSearch.MAX_LENGTH }}
            />
            <PaginatedList
                listContainerStyles={ListStyles}
                isFetching={participantQuery.isLoading}
                onLoadMore={participantQuery.fetchNextPage}
                isLoadingMore={participantQuery.isFetchingNextPage}
                hasNextPage={participantQuery.hasNextPage}
            >
                {participants}
            </PaginatedList>
            <DeleteParticipantDialog
                chatId={chatId}
                participantId={selected}
                isOpen={isOpen}
                onClose={close}
            />
        </>
    );
};

ParticipantList.propTypes = propTypes;

export default ParticipantList;
