const ProductDetailSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 h-5 w-32 rounded bg-zinc-200" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square rounded-[20px] bg-zinc-200" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 w-20 rounded-xl bg-zinc-200" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-4 w-24 rounded bg-zinc-200" />
          <div className="h-8 w-3/4 rounded bg-zinc-200" />
          <div className="h-4 w-40 rounded bg-zinc-200" />
          <div className="h-9 w-32 rounded bg-zinc-200" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-zinc-200" />
            <div className="h-4 w-5/6 rounded bg-zinc-200" />
          </div>
          <div className="h-12 w-full rounded-full bg-zinc-200" />
          <div className="h-12 w-full rounded-full bg-zinc-200" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
