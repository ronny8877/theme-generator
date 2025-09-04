
"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const tempPlates = [
  {
    title: "Blog",
    description: "Static blog layouts with post and landing pages",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
    href: "/templates",
    available: true,
  },
  {
    title: "Website",
    description:
      "Complete website templates including social, e-commerce, portfolio, and recipe sites",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    href: "/templates",
    available: true,
  },
  {
    title: "E-commerce",
    description:
      "Coming soon - Advanced e-commerce features and checkout flows",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
    href: "#",
    available: false,
  },
];

export default function TemplateSelect() {
  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 w-16 z-50 hover:w-64 h-96 bg-base-100 rounded-3xl transition-all duration-300 ease-in-out group overflow-hidden shadow-lg">
      <div className="p-3 h-full flex flex-col">
        <h2 className="text-lg font-semibold text-base-content opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3 whitespace-nowrap">
          Templates
        </h2>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-2 pr-2">
              {tempPlates.map((template) => (
                <Link
                  key={template.title}
                  href={template.href}
                  className={`block relative rounded-xl overflow-hidden bg-base-100/60 hover:bg-base-100/80 transition-all duration-200 group/card ${
                    !template.available
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={(e) => !template.available && e.preventDefault()}
                >
                  {/* Image - always visible */}
                  <div className="relative">
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-16 group-hover:h-22 min-w-10 object-cover transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group/card-hover:opacity-100 transition-opacity duration-200" />
                    {!template.available && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-xs font-medium px-2 py-1 bg-black/60 rounded">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text content - only visible on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base-100/95 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-3">
                    <h3 className="text-sm font-medium text-base-content truncate">
                      {template.title}
                    </h3>
                    <p className="text-xs text-base-content/70 line-clamp-2 mt-1">
                      {template.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
