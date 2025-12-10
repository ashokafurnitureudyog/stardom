import { motion } from "framer-motion";

export const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface ProductInfoProps {
  product: {
    collection?: string;
    name: string;
    description: string;
    features: string[];
    colors: string[];
  };
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  handleWhatsAppInquiry: () => void;
}

export const ProductInfo = ({
  product,
  selectedColor,
  setSelectedColor,
  handleWhatsAppInquiry,
}: ProductInfoProps) => {
  return (
    <motion.div
      className="flex flex-col justify-center h-full max-w-xl"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="mb-8">
        <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground/60 uppercase mb-4 block">
          {product.collection} Collection
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-serif tracking-tight text-foreground mb-6">
          {product.name}
        </h1>
        <div className="w-20 h-1 bg-primary/10 rounded-full" />
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
        <p className="text-muted-foreground text-lg leading-relaxed font-light">
          {product.description}
        </p>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80 mb-6">
          Key Features
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          {product.features.map((feature, index) => (
            <li
              key={index}
              className="text-muted-foreground flex items-start text-sm"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Colors */}
      <div className="mb-12">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80 mb-6">
          Available Finishes
        </h3>
        <div className="flex gap-3 flex-wrap">
          <button
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedColor === ""
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-background border border-border text-foreground hover:border-primary/50 hover:bg-secondary/50"
            }`}
            onClick={() => setSelectedColor("")}
          >
            All Finishes
          </button>
          {product.colors.map((color, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedColor === color
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-background border border-border text-foreground hover:border-primary/50 hover:bg-secondary/50"
              }`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp Inquiry Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <button
          onClick={handleWhatsAppInquiry}
          className="group w-full md:w-auto min-w-[300px] flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb855] text-white py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-[#25D366]/30"
        >
          <WhatsAppIcon />
          <span className="font-medium tracking-wide">
            Inquire via WhatsApp
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
};
