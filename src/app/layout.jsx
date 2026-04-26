import './globals.css';

export const metadata = {
  title: 'TeachSense+ | Platform LMS Adaptif',
  description: 'Sistem Pembelajaran Adaptif berbasis AI untuk Perguruan Tinggi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
