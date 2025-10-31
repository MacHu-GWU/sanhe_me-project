'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  children: string;
  variant?: 'chat' | 'card';
  onQuestionClick?: (question: string) => void;
}

export const Markdown = ({ children, variant = 'chat', onQuestionClick }: MarkdownProps) => {
  // Preprocess markdown to handle #ask: links with spaces
  const preprocessedChildren = children.replace(
    /\[([^\]]+)\]\(#ask:([^)]+)\)/g,
    '[$1](<#ask:$2>)'
  );

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
          a: ({ href, children }) => {
            // Handle clickable question links
            if (href?.startsWith('#ask:')) {
              const question = decodeURIComponent(href.replace('#ask:', ''));
              return (
                <button
                  onClick={() => onQuestionClick?.(question)}
                  className="text-blue-600 hover:text-blue-700 underline font-medium cursor-pointer transition-colors"
                >
                  {children}
                </button>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                {children}
              </a>
            );
          },
          code: ({ inline, className, children }) => {
            if (inline) {
              return (
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
                  {children}
                </code>
              );
            }
            return (
              <code className={cn("block bg-gray-100 p-3 rounded-lg my-3 overflow-x-auto text-sm font-mono", className)}>
                {children}
              </code>
            );
          },
          ul: ({ children }) => <ul className="list-disc pl-6 mb-3 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-3 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-3 text-gray-700 italic">
              {children}
            </blockquote>
          ),
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 mt-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-3">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-semibold mb-2 mt-3">{children}</h4>,
        }}
      >
        {preprocessedChildren}
      </ReactMarkdown>
    </div>
  );
};
