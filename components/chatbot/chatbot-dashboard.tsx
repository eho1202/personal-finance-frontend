"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { streamChatMessage } from "@/api/client-api"

interface Message {
    role: "user" | "assistant"
    content: string
}

const ChatbotDashboard = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const streamingRef = useRef(false)

    const sendMessage = async () => {
        if (!input.trim() || streamingRef.current) return

        const userMessage: Message = { role: "user", content: input }
        const updatedMessages = [...messages, userMessage]

        setMessages([...updatedMessages, { role: "assistant", content: "" }])
        setInput("")
        setLoading(true)
        streamingRef.current = true

        try {
            await streamChatMessage(updatedMessages, (chunk) => {
                setMessages(prev => {
                    const updated = [...prev]
                    updated[updated.length - 1].content += chunk
                    return updated
                })
            })
        } catch (err: any) {
            console.error(err)
        } finally {
            setLoading(false)
            streamingRef.current = false
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl w-full mx-auto px-4 py-6">
            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader>
                    <CardTitle>Finance Assistant</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto flex flex-col gap-3">
                    {messages.length === 0 && (
                        <p className="text-muted-foreground text-sm text-center mt-8">
                            Ask me anything about your spending - &quot;Why did I overspend in March?&quot;
                            or &quot;What&apos;s my biggest expense category?&quot;
                        </p>
                    )}
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${m.role === "user"
                                ? "self-end bg-primary text-primary-foreground"
                                : "self-start bg-muted"
                                }`}
                        >
                            {m.content}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </CardContent>
                <div className="p-4 border-t flex gap-2">
                    <Input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && sendMessage()}
                        placeholder="Ask about your finances..."
                        disabled={loading}
                    />
                    <Button onClick={sendMessage} disabled={loading || !input.trim()}>
                        Send
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default ChatbotDashboard