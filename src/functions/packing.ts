export const pack = (a: boolean, c: boolean) => (Number(c) << 1) | Number(a);
export const answered = (v: number) => (v & 1) !== 0;
export const correct  = (v: number) => (v & 2) !== 0;
