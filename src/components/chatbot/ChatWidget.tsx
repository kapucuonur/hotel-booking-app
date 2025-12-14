"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: "Hello! How can I help you find your perfect room today?",
        },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: "Thank you for your message! Our agents are currently offline, but feel free to browse our Rooms page for availability.",
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);
    };

    return (
        <>
            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 text-white p-0 gap-0"
                size="icon"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </Button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-24 right-6 w-80 sm:w-96 bg-background border rounded-xl shadow-2xl z-50 overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col",
                    isOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none translate-y-4"
                )}
                style={{ height: "500px", maxHeight: "80vh" }}
            >
                {/* Header */}
                <div className="bg-primary p-4 text-primary-foreground">
                    <h3 className="font-bold flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Customer Support
                    </h3>
                    <p className="text-xs opacity-90">Usually replies in a few minutes</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex w-full",
                                message.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                                    message.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-white dark:bg-zinc-800 text-foreground border rounded-bl-none"
                                )}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-background border-t">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <Button type="submit" size="icon" disabled={!input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
