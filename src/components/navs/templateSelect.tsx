import { ScrollArea } from "@/components/ui/scroll-area";

const tempPlates = [
  {
    title: "Blog",
    description: "Description for Blog Template",
    image: "https://picscave.com/assetstore/medium/zerotwo_EGKGahsvG4Q2kp.jpeg",
  },
  {
    title: "E-commerce",
    description: "Description for E-commerce Template",
    image: "https://picscave.com/assetstore/medium/zerotwo_EGKGahsvG4Q2kp.jpeg",
  },
  {
    title: "Landing Page",
    description: "Description for Landing Page Template",
    image: "https://picscave.com/assetstore/medium/zerotwo_EGKGahsvG4Q2kp.jpeg",
  },
];

export default function TemplateSelect() {
  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 w-16 hover:w-64 h-96 glass rounded-3xl transition-all duration-300 ease-in-out group overflow-hidden shadow-lg">
      <div className="p-3 h-full flex flex-col">
        <h2 className="text-lg font-semibold text-base-content opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3 whitespace-nowrap">
          Templates
        </h2>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-2 pr-2">
              {tempPlates.map((template) => (
                <div
                  key={template.title}
                  className="relative rounded-xl overflow-hidden bg-base-100/60 hover:bg-base-100/80 transition-all duration-200 cursor-pointer group/card"
                >
                  {/* Image - always visible */}
                  <div className="relative">
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full  h-16 group-hover:h-22 min-w-10 object-cover transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group/card-hover:opacity-100 transition-opacity duration-200" />
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
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
