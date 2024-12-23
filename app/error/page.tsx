// app/error/page.tsx
export default function ErrorPage({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="p-4">
    <h1 className="text-red-600">Error</h1>
    <p>{searchParams.message}</p>
    </div>
  );
}