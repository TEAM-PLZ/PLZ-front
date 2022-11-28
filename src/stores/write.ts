import { atom } from 'recoil';

const submitStatusState = atom<string>({
  key: 'submitStatusState',
  default: '',
});

export default submitStatusState;
