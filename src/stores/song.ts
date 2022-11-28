import { atom } from 'recoil';

const playState = atom<boolean>({
  key: 'playState',
  default: false,
});

export default playState;
