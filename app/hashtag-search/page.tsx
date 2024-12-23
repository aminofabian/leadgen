import HashtagSearch  from '@/components/HashtagSearch';

export default function HashtagSearchPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
          Instagram Hashtag Search
        </h1>
        <HashtagSearch />
      </div>
    </main>
  );
}
