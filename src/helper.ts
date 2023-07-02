export const random = (allMessage) => {
  const rand = Math.floor(Math.random() * allMessage.length);
  return allMessage[rand];
};
