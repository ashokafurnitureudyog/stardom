/**
 * Route-level loading state. A quiet brass rail rather than a spinner: the page
 * behind it is usually a fraction of a second away, and a spinning graphic
 * makes that wait feel longer than it is.
 */
const Loading = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
    <div className="w-full max-w-xs text-center">
      <p className="font-serif text-3xl tracking-wide text-foreground">Stardom</p>
      <div className="loading-rail mt-6 h-px w-full overflow-hidden bg-border/40">
        <div className="loading-rail-fill h-full w-1/3 bg-primary" />
      </div>
      <p className="mt-6 text-xs text-muted-foreground">Loading</p>
    </div>
  </div>
);

export default Loading;
