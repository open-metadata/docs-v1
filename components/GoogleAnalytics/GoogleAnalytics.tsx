import Script from "next/script";

function GoogleAnalytics() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-2TW1XM6C89" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-2TW1XM6C89');
        `}
      </Script>
    </>
  );
}

export default GoogleAnalytics;
