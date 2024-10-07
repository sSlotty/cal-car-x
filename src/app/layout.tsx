import { KoHo } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'CalCarX',
  description:
    'คำนวณค่าใช้จ่ายในการผ่อนรถเบื้องต้น สำหรับมือใหม่ ใช้เพื่อการประเมินเพื่อความมั่นใจเท่านั้น | Preliminary car installment cost calculation for beginners, for assessment purposes only to build confidence.',
};
const kohoFont = KoHo({
  weight: '400',
  subsets: ['thai', 'latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={`${kohoFont.className} antialiased minimal-background`}>
        {children}
      </body>
    </html>
  );
}
