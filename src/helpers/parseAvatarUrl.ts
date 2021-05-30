export const parseAvatarUrl = (url: string) =>
  url.split('?').shift()?.split('%2F').pop();
