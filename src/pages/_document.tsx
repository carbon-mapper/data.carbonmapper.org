import { Html, Head, Main, NextScript } from 'next/document';
import { NewRelicSnippet } from '@/components/atoms/NewRelicSnippet/NewRelicSnippet';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
              <NewRelicSnippet />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
