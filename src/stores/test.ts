import { atom } from 'recoil';

export const testStore = atom<string>({
  key: 'textStore', // unique ID (with respect to other atoms/selectors)
  default: '값이 들어오나', // default value (aka initial value)
});
