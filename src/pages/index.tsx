import { useRecoilState } from 'recoil';
import { testStore } from 'stores/test';

export default function Home() {
  const [text, setText] = useRecoilState(testStore);


  return (
    <div>
      내 플리를 부탁해 plz...
      <p>{text}</p>
    </div>
  );
}
