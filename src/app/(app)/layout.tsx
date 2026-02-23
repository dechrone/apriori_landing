import ClientAppLayout from './ClientAppLayout';

export const dynamic = 'force-dynamic';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientAppLayout>{children}</ClientAppLayout>;
}
