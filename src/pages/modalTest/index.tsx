import SnackBar from 'components/SnackBar';
import Button from 'components/SnackBarButton';
import React, { useRef, useState } from 'react';

interface ISnackBarList {
  status: string;
  message: string;
}

const index = () => {
  const [snackBar, setSnackBar] = useState<ISnackBarList>({
    status: '',
    message: '',
  });
  const [value, setValue] = useState('');

  const validation = (e: any) => {
    e.preventDefault();
    if (value === '123') {
      setSnackBar({ status: 'success', message: '링크맞아요.' });
    } else {
      setSnackBar({ status: 'failure', message: '잘못된 형식입니다.' });
    }
  };

  const handleCopyUrl = () => {
    setSnackBar({ status: 'success', message: '카피 성공' });
  };

  return (
    <>
      <h1>스낵바 테스트</h1>

      <button onClick={handleCopyUrl}>URL 링크 복사</button>

      <form onSubmit={validation}>
        <input
          type="text"
          onChange={e => {
            setValue(e.target.value);
          }}
        />
        <button type="submit">제출</button>
      </form>

      <Button handleClick={() => setSnackBar({ status: 'failure', message: '용량 초과했습니다.' })}>
        용량초과
      </Button>
      <Button handleClick={() => setSnackBar({ status: 'failure', message: '잘못된 형식입니다.' })}>
        잘못된형식
      </Button>
      <Button
        handleClick={() => setSnackBar({ status: 'failure', message: '타임아웃 에러입니다.' })}
      >
        로딩
      </Button>

      {snackBar?.status !== '' && <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />}
    </>
  );
};

export default index;
