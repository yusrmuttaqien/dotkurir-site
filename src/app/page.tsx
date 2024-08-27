import { Fragment } from 'react';
import Head from './(index)/fragments/Head';
import getContents from './(index)/contents';

export default async function Homepage() {
  const { hero } = await getContents();

  return (
    <Fragment>
      <Head contents={hero} />
    </Fragment>
  );
}
