import DefaultLayout from 'src/components/Layout/DefaultLayout';
import { Page } from 'src/types/page';

import Betpage from 'src/components/Betpage/Betpage'

const IndexPage: Page = () => {

  return (
    <>
      <Betpage />
    </>
  )
};

IndexPage.Layout = DefaultLayout;

export default IndexPage;