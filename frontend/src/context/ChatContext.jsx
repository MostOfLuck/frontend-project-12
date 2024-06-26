// ChatContext.jsx
import { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addChannel, setCurrentChannel, deleteChannel, renameChannel,
} from '../slices/channelSlice';
import fetchInitialData from './InitialDataThunk';

export const ChatContext = createContext({});

const ChatContextProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const timeout = 3000;

  const addNewMessage = useCallback(
    async (message) => {
      await socket
        .timeout(timeout)
        .emit('newMessage', message);
    },
    [socket],
  );

  const addNewChannel = useCallback(
    async (channel) => {
      const { data } = await socket
        .timeout(timeout)
        .emitWithAck('newChannel', channel);
      dispatch(addChannel(data));
      dispatch(setCurrentChannel(data.id));
    },
    [socket, dispatch],
  );

  const removeSelectedChannel = useCallback(
    async (id) => {
      await socket
        .timeout(timeout)
        .emit('removeChannel', { id });
      dispatch(deleteChannel(id));
    },
    [socket, dispatch],
  );

  const renameSelectedChannel = useCallback(
    async ({ id, name }) => {
      await socket
        .timeout(timeout)
        .emit('renameChannel', { id, name });
      dispatch(renameChannel({ id, changes: { name } }));
    },
    [socket, dispatch],
  );

  const getChannelsData = useCallback(
    async () => {
      dispatch(fetchInitialData());
    },
    [dispatch],
  );

  const memoAuth = useMemo(
    () => ({
      addNewMessage,
      addNewChannel,
      removeSelectedChannel,
      renameSelectedChannel,
      getChannelsData,
    }),
    [
      addNewMessage,
      addNewChannel,
      removeSelectedChannel,
      renameSelectedChannel,
      getChannelsData,
    ],
  );

  return (
    <ChatContext.Provider value={memoAuth}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
