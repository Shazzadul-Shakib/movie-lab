export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className='ml-64 mt-16 min-h-[calc(100vh-4rem)] bg-background'>
      <div className='h-full overflow-y-auto'>
        <div className='container mx-auto p-6'>{children}</div>
      </div>
    </main>
  );
}
