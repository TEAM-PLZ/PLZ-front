import 'styles/globals.css';
import 'styles/reset.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Layout from 'components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};
export default App;
