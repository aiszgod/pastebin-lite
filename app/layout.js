import './globals.css';

export const metadata = {
  title: 'Pastebin Lite',
  description: 'Simple pastebin application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
