import { Fragment } from 'react';
import Head from './(index)/fragments/Head';
import History from './(index)/fragments/History';
import getContents from './(index)/contents';

export default async function Homepage() {
  const { hero, history } = await getContents();

  return (
    <Fragment>
      <Head contents={hero} className="mt-[30svh]" />
      <History contents={history} className="mb-16 mt-12" />
    </Fragment>
  );
}
