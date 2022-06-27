import { Message } from 'element-ui';

export const MessageInterface = (message, type, duration) => {
    Message({
        message,
        type,
        duration
    });
};
