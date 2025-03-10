import ProductDisplay from "./ProductDisplay";

export default async function ProductDisplayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <ProductDisplay id={id} />
    </>
  );
}
