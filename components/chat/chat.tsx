"use client";

import { PreviewMessage, ThinkingMessage } from "./message";
import { MultimodalInput } from "./multimodal-input";
import { Overview } from "./overview";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function Chat() {
  const chatId = "001";

  // AI SDK v5: 手动管理 input 状态
  const [input, setInput] = useState("");
  const [isContextBannerVisible, setIsContextBannerVisible] = useState(true);

  // Use useRef to store browser fingerprint so it can be accessed in fetch closure
  const browserFingerprintRef = useRef<string>("");

  // Generate browser fingerprint on component mount
  useEffect(() => {
    const generateFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        browserFingerprintRef.current = result.visitorId;
        console.log('🔍 Browser Fingerprint Generated:', result.visitorId);
      } catch (error) {
        console.error('Failed to generate browser fingerprint:', error);
      }
    };

    generateFingerprint();
  }, []);

  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
  } = useChat({
    // v5: 默认使用 /api/chat，不需要指定
    // Use fetch option to customize request headers
    fetch: async (input, init) => {
      const fingerprint = browserFingerprintRef.current;
      console.log('🔍 Sending fingerprint in request:', fingerprint);
      return fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          'X-Client-Fingerprint': fingerprint,
        },
      });
    },
    onError: (error) => {
      if (error.message.includes("Too many requests") || error.message.includes("Rate limit") || error.message.includes("429")) {
        toast.error(
          "You have reached the usage limit, please try again in 60 minutes 😅",
          { duration: 8000 }
        );
      } else {
        toast.error(error.message);
      }
    },
  });

  // v5: isLoading 改为 status
  const isLoading = status === "streaming" || status === "submitted";

  // v5: 自定义 handleSubmit 和 append
  const handleSubmit = (e?: { preventDefault?: () => void }, options?: any) => {
    e?.preventDefault?.();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const append = async (message: any): Promise<string | null | undefined> => {
    if (message.content) {
      await sendMessage({ text: message.content });
      return null;
    } else if (message.text) {
      await sendMessage({ text: message.text });
      return null;
    }
    return null;
  };

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-52px)] bg-background">
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
      >
        {/* Initial AI Assistant Welcome Display */}
        {messages.length === 0 && <Overview />}

        {/* Context Banner */}
        {messages.length > 0 && isContextBannerVisible && (
          <div className="max-w-3xl mx-auto px-4 w-full">
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-primary/30 rounded-xl p-4 shadow-lg shadow-primary/10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-highlight rounded-lg flex items-center justify-center shadow-lg shadow-primary/50 shrink-0 mt-0.5">
                    <span className="text-lg font-bold text-white">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">AI Assistant</h3>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">Sanhe.me</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      I'm here to help you understand <span className="font-semibold text-primary glow-primary">Sanhe Hu</span>'s unique value as a senior AI architect and his proven track record in delivering enterprise solutions.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsContextBannerVisible(false)}
                  className="text-text-secondary hover:text-primary transition-colors shrink-0"
                  aria-label="关闭"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            chatId={chatId}
            message={message}
            isLoading={isLoading && messages.length - 1 === index}
            append={append}
          />
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <ThinkingMessage />}

        {/* Auto-scroll anchor */}
        {messages.length > 0 && (
          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        )}
      </div>

      <form className="flex mx-auto px-4 pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <MultimodalInput
          chatId={chatId}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          messages={messages}
          setMessages={setMessages}
          append={append}
        />
      </form>
    </div>
  );
}
