import FlowerDetailsContent from '../FlowerDetailsContent';

export type Flower = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  author: string;
  views: number;
  postedAt: string;
  slug: string;
  price: string;
};

export default function FlowerDetails({
  params,
}: {
  params: { id: string };
}) {
  const {id} = params

  return <FlowerDetailsContent id={id} />;
}