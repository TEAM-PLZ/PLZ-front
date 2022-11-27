import { atom } from 'recoil';

export const playState = atom<boolean>({
  key: 'playState',
  default: false,
});
