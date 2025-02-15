
import Image from "next/image"
import Link from "next/link"
import products from "@/data/products.json"
export const HeroParallax = () => {
  const firstRow = products.products.slice(0, 5)
  const secondRow = products.products.slice(5, 10)
  const thirdRow = products.products.slice(10, 15)

  // 
  return (
    <div className="sm:flex hidden overflow-hidden absolute top-2 -z-10 bg-indigo-900  antialiased  flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
     
      <div
        style={{
          transform: "rotateX(15deg) rotateZ(20deg) translateY(-700px)",
          opacity: 0.2,
        }}
        className="animate-parallax"
      >
        <div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              key={product.title}
            />
          ))}
        </div>
        <div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              key={product.title}
            />
          ))}
        </div>
        <div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              key={product.title}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


export const ProductCard = ({
  product,
}: {
  product: {
    title: string
    link: string
    thumbnail: string
  }
}) => {
  return (
    <div
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </div>
  )
}

