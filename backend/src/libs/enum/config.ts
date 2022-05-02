export const IS_PROD: boolean = process.env.NODE_ENV === 'production';
export const http = IS_PROD ? 'https://' : 'http://';


