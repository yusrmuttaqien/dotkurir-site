import { Fragment } from 'react';
import Head from './(index)/fragments/Head';
import History from './(index)/fragments/History';
import getContents from './(index)/contents';
import type { RouteProps } from './(index)/type';

export default async function Homepage(props: RouteProps) {
  const { params } = props;
  const { lang } = params;
  const { head, history } = await getContents(lang);

  return (
    <Fragment>
      <Head contents={head} className="mt-[30svh]" params={params} />
      <History contents={history} className="mb-16 mt-12" />
    </Fragment>
  );
}
