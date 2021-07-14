const users = [];

//Save User =================================
const saveUser = ({id, username, chatId}) =>{

    username = username.trim().toLowerCase();
    chatId = chatId.trim().toLowerCase();

    const exitUser = users.find((user) =>
        user.chatId === chatId && user.username === username);

    if(exitUser){
        return { error: 'Username is token'}
    }

    const user = { id, username, chatId};
    users.push(user);

    return { user }
}