declare module 'qrcode' {
  export function toDataURL(data: string): Promise<string>;
}
