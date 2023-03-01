import Head from "next/head";
// import { useRouter } from "next/router";

export default function Meta({ ...customMeta }) {
  // const router = useRouter();
  const meta = {
    ...customMeta,
  };
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{meta.title}</title>
      <meta name="keywords" content={meta.keywords} />
      <meta name="description" content="Twitter Clone" />
      {/* <meta name="robots" content="follow, index" />
      <meta
        property="og:url"
        content={`https://website.com${router.asPath}`}
      />
      <link rel="canonical" href={`https://website.com${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="my-website" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {meta.date && (
        <meta property="article:published_time" content={meta.date} />
      )} */}
    </Head>
  );
}
