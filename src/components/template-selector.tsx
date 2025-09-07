"use client";
import React, { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActiveTemplateId, useTemplateActions } from "@/store/hooks";
import { TEMPLATES } from "@/lib/constants/constants";

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
  selectedTemplateId?: string;
}

const TemplateModal = React.memo(function TemplateModal({
  isOpen,
  onClose,
  onSelectTemplate,
  selectedTemplateId,
}: TemplateModalProps) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const selectedCategory = TEMPLATES[selectedCategoryIndex];

  // Filter templates based on search query
  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectedCategory?.options || [];
    }

    const query = searchQuery.toLowerCase();
    return (
      selectedCategory?.options.filter(
        (template) =>
          template.title.toLowerCase().includes(query) ||
          template.description?.toLowerCase().includes(query) ||
          template.fonts?.heading?.family?.toLowerCase().includes(query) ||
          template.fonts?.body?.family?.toLowerCase().includes(query),
      ) || []
    );
  }, [selectedCategory?.options, searchQuery]);

  // Get all templates across all categories for global search
  const allTemplates = useMemo(() => {
    return TEMPLATES.flatMap((category, categoryIndex) =>
      category.options.map((template) => ({
        ...template,
        categoryTitle: category.title,
        categoryIndex,
      })),
    );
  }, []);

  // Global search across all templates
  const globalFilteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return allTemplates.filter(
      (template) =>
        template.title.toLowerCase().includes(query) ||
        template.description?.toLowerCase().includes(query) ||
        template.categoryTitle.toLowerCase().includes(query) ||
        template.fonts?.heading?.family?.toLowerCase().includes(query) ||
        template.fonts?.body?.family?.toLowerCase().includes(query),
    );
  }, [allTemplates, searchQuery]);

  const isGlobalSearch = searchQuery.trim().length > 0;
  const templatesToShow = isGlobalSearch
    ? globalFilteredTemplates
    : filteredTemplates;

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-6xl rounded-3xl h-[80vh] p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <div>
            <h3 className="text-2xl font-bold text-base-content">
              Choose Template
            </h3>
            <p className="text-base-content/70 mt-1">
              Select a template to customize with your theme
            </p>
          </div>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="p-4 border-b border-base-300">
          <div className="relative">
            <input
              type="text"
              placeholder="Search templates, categories, or fonts..."
              className="input input-bordered w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {isGlobalSearch && (
            <div className="mt-2 text-sm text-base-content/70">
              Found {templatesToShow.length} template
              {templatesToShow.length !== 1 ? "s" : ""} across all categories
            </div>
          )}
        </div>
        <div className="flex h-[calc(80vh-9rem)]">
          {/* Categories Sidebar (desktop) - Hide when searching globally or on small screens */}
          {!isGlobalSearch && (
            <div className="hidden md:block w-64 border-r border-base-300 p-4">
              <h4 className="font-semibold text-base-content mb-4">
                Categories
              </h4>
              <div className="space-y-2">
                {TEMPLATES.map((category, index) => (
                  <button
                    key={category.title}
                    className={`w-full text-left p-3 rounded-2xl transition-all ${
                      selectedCategoryIndex === index
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200 text-base-content"
                    }`}
                    onClick={() => setSelectedCategoryIndex(index)}
                  >
                    <div className="font-medium">{category.title}</div>
                    <div
                      className={`text-xs mt-1 ${
                        selectedCategoryIndex === index
                          ? "text-primary-content/80"
                          : "text-base-content/60"
                      }`}
                    >
                      {category.options.length} template
                      {category.options.length !== 1 ? "s" : ""}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Templates Grid */}
          <div className={`flex-1 p-6 ${isGlobalSearch ? "w-full" : ""}`}>
            {/* Category pills for small screens */}
            {!isGlobalSearch && (
              <div className="mb-4 md:hidden flex flex-wrap gap-2">
                {TEMPLATES.map((category, idx) => (
                  <button
                    key={category.title}
                    onClick={() => setSelectedCategoryIndex(idx)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedCategoryIndex === idx
                        ? "bg-primary text-primary-content"
                        : "bg-base-200 text-base-content/80"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            )}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-base-content">
                {isGlobalSearch ? "Search Results" : selectedCategory?.title}
              </h4>
              <p className="text-base-content/70 mt-1">
                {isGlobalSearch
                  ? `Showing ${templatesToShow.length} results for "${searchQuery}"`
                  : `Choose from ${selectedCategory?.options.length} available templates`}
              </p>
            </div>

            <ScrollArea className="h-[calc(100%-5rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
                {templatesToShow.map((template) => (
                  <div
                    key={template.id}
                    className={`card bg-base-100 border-2 transition-all cursor-pointer hover:shadow-lg rounded-3xl ${
                      selectedTemplateId === template.id
                        ? "border-primary shadow-lg ring-2 ring-primary/20"
                        : "border-base-300 hover:border-base-400"
                    }`}
                    onClick={() => onSelectTemplate(template.id)}
                  >
                    <div className="card-body p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="card-title text-base font-medium text-base-content">
                          {template.title}
                        </h5>
                        {/* Show category badge for global search results */}
                        {isGlobalSearch && "categoryTitle" in template && (
                          <div className="badge badge-outline badge-sm">
                            {
                              (
                                template as typeof template & {
                                  categoryTitle: string;
                                }
                              ).categoryTitle
                            }
                          </div>
                        )}
                      </div>

                      {/* Template Preview Area */}
                      <div className="w-full h-24 bg-base-200 rounded-2xl mb-3 flex items-center justify-center overflow-hidden">
                        <span className="text-base-content/40 text-sm">
                          {template.image ? (
                            <img
                              src={template.image}
                              alt={template.title}
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          ) : (
                            "No Preview Available"
                          )}
                        </span>
                      </div>

                      <p className="text-sm text-base-content/70 line-clamp-3 mb-3">
                        {template.description}
                      </p>

                      {/* Font Info */}
                      {template.fonts && (
                        <div className="text-xs text-base-content/50 mb-3">
                          <div>Heading: {template.fonts.heading?.family}</div>
                          <div>Body: {template.fonts.body?.family}</div>
                        </div>
                      )}

                      <div className="card-actions justify-end">
                        {/* SEO anchor so crawlers see a real URL for each template preview. Prevent navigation for users; selection still works via button. */}
                        <a
                          href={`/preview/${encodeURIComponent(template.id)}`}
                          onClick={(e) => e.preventDefault()}
                          aria-hidden="true"
                          className="sr-only"
                        >
                          Preview {template.title}
                        </a>

                        <button
                          className={`btn btn-sm ${
                            selectedTemplateId === template.id
                              ? "btn-primary"
                              : "btn-outline btn-primary"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTemplate(template.id);
                          }}
                        >
                          {selectedTemplateId === template.id
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {templatesToShow.length === 0 && searchQuery.trim() && (
                <div className="text-center py-12">
                  <div className="text-base-content/50 mb-2">
                    No templates found
                  </div>
                  <p className="text-base-content/70 text-sm">
                    Try searching for different keywords or clear your search
                  </p>
                </div>
              )}
              {/* no sponsored/ad placeholders on this UI per request */}
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
});

export default function TemplateSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeTemplateId = useActiveTemplateId();
  const { setActiveTemplateById } = useTemplateActions();

  const handleSelectTemplate = (templateId: string) => {
    setActiveTemplateById(templateId);

    setTimeout(() => setIsModalOpen(false), 300);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed left-5 bottom-5 z-50">
        <button
          className="btn btn-primary btn-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Templates
        </button>
      </div>

      {/* Modal */}
      <TemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
        selectedTemplateId={activeTemplateId || undefined}
      />
    </>
  );
}
