import React, { useState, useRef, useEffect } from 'react'
import './Chatbot.css'

const CALENDLY_BASE_URL = "https://calendly.com/ochatako/consultation"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface BookingInfo {
  name: string
  email: string
  preferredTime?: string
  additionalContext?: string
}

// Website knowledge base for Ochatako
const WEBSITE_KNOWLEDGE = `
Ochatako is a creative art portfolio offering diverse artistic services across eight different disciplines. 

ABOUT THE NAME:
- "Ochatako" combines "cha" (tea - the artist's favorite beverage) and "tako" (octopus in Japanese)
- The octopus represents doing 8 different things at once with versatility and grace
- Like tea, the work is thoughtfully crafted with care and attention

ABOUT THE WEBSITE:
- The website features a minimalistic, professional design
- It includes a dark mode toggle for user preference
- The site has parallax image effects that create subtle movement as users scroll
- Sections include: Hero, Mission, About, Portfolio (Selected Work), Services, and Contact
- The website is built with React, TypeScript, and Vite for modern performance
- It's fully responsive and works beautifully on all devices

SERVICES OFFERED (8 Creative Disciplines):
1. Graphic Design: Visual communication through logos, layouts, and brand identity systems
2. Illustration: Original artwork and digital illustrations with unique style
3. Photography: Professional photography capturing moments, products, and environments
4. Animation: Motion graphics and animated content with dynamic visual storytelling
5. Branding: Complete brand strategy and identity development
6. Web Design: Modern, responsive web interfaces combining aesthetics with user experience
7. Typography: Custom lettering and typographic design
8. Art Direction: Creative direction and visual strategy for multi-platform campaigns

APPROACH:
- Versatile like an octopus with eight arms, working across multiple creative disciplines
- Thoughtful and deliberate like tea preparation
- Each project receives dedication and artistry
- Expertise and passion in every unique endeavor

CONTACT & BOOKING:
- Email: hello@ochatako.com
- Location: Available Worldwide
- Free consultations available via Calendly
- Users can schedule consultations to discuss their creative projects
`

const SYSTEM_PROMPT = `You are a helpful AI assistant for Ochatako, a multidisciplinary creative artist and professional. 
You help potential clients learn about the services, approach to art and design, website features, and how Ochatako can help bring their creative projects to life.

Use the following information about Ochatako:
${WEBSITE_KNOWLEDGE}

Guidelines:
- Be friendly, professional, creative, and helpful
- Answer questions about services, approach, the artist, AND the website itself (design, features, functionality)
- When users ask about the website, explain features like dark mode, parallax images, responsive design, etc.
- ACTIVELY RECOMMEND booking a consultation: "I'd love to help bring your creative project to life! Would you like to schedule a free consultation? We can discuss your vision and explore possibilities."
- When a user wants to book a consultation, help them by asking for their name, email, and any preferred times
- If a user provides booking information (name and email), confirm it and provide the Calendly link
- IMPORTANT: When providing booking information, use this exact phrasing: "Unfortunately, I can't book the appointment directly for you, but this [Calendly link](${CALENDLY_BASE_URL}) makes it easy to select a suitable time. If you need any assistance during the booking process, feel free to ask! Looking forward to connecting with you!"
- Keep responses concise and informative (under 200 words)
- Use markdown formatting: **bold** for emphasis, *italic* for subtle emphasis, • for lists
- Format responses nicely with line breaks and bullet points
- When mentioning Calendly, format it as a clickable link: [Book your consultation](${CALENDLY_BASE_URL})
- At the end of helpful responses, naturally suggest: "Would you like to schedule a consultation to discuss your project in detail?"
`

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm here to help you learn about Ochatako's creative services across eight artistic disciplines. I can answer questions about the work, services, or even this website! Would you like to schedule a free consultation to discuss your project?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState<string>("")
  const [extractedBookingInfo, setExtractedBookingInfo] = useState<Partial<BookingInfo>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [apiKey, setApiKey] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const key = import.meta.env.VITE_OPENAI_API_KEY
      setApiKey(key || null)
      if (key) {
        console.log("API Key loaded:", `${key.substring(0, 15)}...`)
      } else {
        console.warn("⚠️ VITE_OPENAI_API_KEY not found. Chatbot will use fallback responses.")
        console.log("To enable full AI features, add VITE_OPENAI_API_KEY to your .env.local file")
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true)
    }
    window.addEventListener('openChatbot', handleOpenChatbot)
    return () => window.removeEventListener('openChatbot', handleOpenChatbot)
  }, [])

  const extractBookingInfo = (userMessage: string): Partial<BookingInfo> => {
    const info: Partial<BookingInfo> = {}
    
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
    const emailMatch = userMessage.match(emailRegex)
    if (emailMatch) {
      info.email = emailMatch[0]
    }
    
    const namePatterns = [
      /(?:i'?m|my name is|this is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
      /^([A-Z][a-z]+\s+[A-Z][a-z]+)$/,
    ]
    for (const pattern of namePatterns) {
      const match = userMessage.match(pattern)
      if (match && match[1]) {
        info.name = match[1].trim()
        break
      }
    }
    
    const timePatterns = [
      /(?:prefer|like|want|available)\s+(?:at\s+)?([0-9]{1,2}(?::[0-9]{2})?\s*(?:am|pm|AM|PM)?)/i,
      /(?:morning|afternoon|evening|monday|tuesday|wednesday|thursday|friday|weekend)/i,
    ]
    for (const pattern of timePatterns) {
      if (pattern.test(userMessage)) {
        const timeMatch = userMessage.match(/(?:prefer|like|want|available)\s+(?:at\s+)?([^\.\?\!\n]+)/i)
        if (timeMatch) {
          info.preferredTime = timeMatch[1].trim()
        }
        break
      }
    }
    
    return info
  }

  const buildCalendlyUrl = (info: BookingInfo): string => {
    const params = new URLSearchParams()
    if (info.name) {
      params.append("name", info.name)
    }
    if (info.email) {
      params.append("email", info.email)
    }
    return params.toString() ? `${CALENDLY_BASE_URL}?${params.toString()}` : CALENDLY_BASE_URL
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input.trim()
    setInput("")
    setIsLoading(true)
    setStreamingMessage("")

    try {
      const newInfo = extractBookingInfo(currentInput)
      if (newInfo.name || newInfo.email) {
        setExtractedBookingInfo((prev) => ({ ...prev, ...newInfo }))
      }

      const bookingKeywords = ["book", "schedule", "appointment", "consultation", "meeting", "calendly"]
      const lowerInput = currentInput.toLowerCase()
      const isBookingRequest = bookingKeywords.some((keyword) => lowerInput.includes(keyword))

      const collectedName = extractedBookingInfo.name || newInfo.name || ""
      const collectedEmail = extractedBookingInfo.email || newInfo.email || ""
      
      if (isBookingRequest && (collectedName || collectedEmail)) {
        const finalName = collectedName || ""
        const finalEmail = collectedEmail || ""
        
        if (finalName && finalEmail) {
          const calendlyUrl = buildCalendlyUrl({ name: finalName, email: finalEmail })
          
          const assistantMessage: Message = {
            role: "assistant",
            content: `Perfect! I've collected your information:\n\n• **Name:** ${finalName}\n• **Email:** ${finalEmail}\n\nUnfortunately, I can't book the appointment directly for you, but this [Calendly link](${calendlyUrl}) makes it easy to select a suitable time. If you need any assistance during the booking process, feel free to ask! Looking forward to connecting with you!`,
            timestamp: new Date(),
          }
          
          setMessages((prev) => [...prev, assistantMessage])
          setIsLoading(false)
          
          setTimeout(() => {
            window.open(calendlyUrl, "_blank", "noopener,noreferrer")
          }, 500)
          
          return
        } else {
          const assistantMessage: Message = {
            role: "assistant",
            content: "I'd be happy to help you schedule! I have " + (finalName ? `your name (${finalName})` : "") + (finalName && finalEmail ? " and " : "") + (finalEmail ? `your email (${finalEmail})` : "") + ". " + (!finalName ? "Could you please provide your name? " : "") + (!finalEmail ? "Could you please provide your email? " : ""),
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])
          setIsLoading(false)
          return
        }
      }

      let assistantMessage: Message

      if (!apiKey) {
        console.warn("⚠️ No API key found! Using fallback responses.")
        if (isBookingRequest) {
          assistantMessage = {
            role: "assistant",
            content: "I'd be happy to help you schedule a consultation! Could you please provide your name and email address so I can help you book an appointment?",
            timestamp: new Date(),
          }
        } else {
          assistantMessage = {
            role: "assistant",
            content: "I'd be happy to help! You can learn more about Ochatako's services on this website, or ask me anything about the creative work and eight disciplines offered. Would you like to schedule a free consultation? Just let me know your name and email, and I'll help you book a time that works for you.",
            timestamp: new Date(),
          }
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
        return
      }
      
      // Use OpenRouter API
      const streamMessage: Message = {
        role: "assistant",
        content: "",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, streamMessage])
      setStreamingMessage("")
      
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "Ochatako Chatbot",
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
              { role: "user", content: currentInput },
            ],
            temperature: 0.7,
            max_tokens: 500,
            stream: true,
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("OpenRouter API Error:", response.status, response.statusText, errorText)
          throw new Error(`API error: ${response.statusText}`)
        }

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let fullContent = ""

        if (!reader) {
          throw new Error("No reader available for streaming")
        }

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n").filter((line) => line.trim() !== "")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") {
                break
              }

              try {
                const json = JSON.parse(data)
                const delta = json.choices?.[0]?.delta?.content
                if (delta) {
                  fullContent += delta
                  setStreamingMessage(fullContent)
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }

        let responseContent = fullContent || "I apologize, but I couldn't generate a response. Please try again."

        if (isBookingRequest && !extractedBookingInfo.name && !newInfo.name) {
          responseContent += "\n\nI'd be happy to help you schedule! Could you please provide your name and email address?"
        }

        setMessages((prev) => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: responseContent,
            timestamp: new Date(),
          }
          return newMessages
        })
        setStreamingMessage("")
        setIsLoading(false)
        return
    } catch (error) {
      console.error("Error sending message:", error)
      
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1]
        if (lastMessage && lastMessage.role === "assistant" && !lastMessage.content) {
          return prev.slice(0, -1)
        }
        return prev
      })
      
      const errorMessage: Message = {
        role: "assistant",
        content: `I apologize, but I'm having trouble processing your request. Please try again or contact us directly at hello@ochatako.com.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setStreamingMessage("")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatMessage = (content: string) => {
    type Part = { type: "text" | "link"; content?: string; text?: string; url?: string }
    const parts: Part[] = []

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let match
    const linkMatches: Array<{ start: number; end: number; text: string; url: string }> = []
    
    while ((match = linkRegex.exec(content)) !== null) {
      linkMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[1],
        url: match[2],
      })
    }

    let currentIndex = 0
    const sortedMatches = linkMatches.sort((a, b) => a.start - b.start)

    for (const linkMatch of sortedMatches) {
      if (linkMatch.start > currentIndex) {
        const textBefore = content.substring(currentIndex, linkMatch.start)
        parts.push({ type: "text", content: renderMarkdownText(textBefore) })
      }
      parts.push({ type: "link", text: linkMatch.text, url: linkMatch.url })
      currentIndex = linkMatch.end
    }

    if (currentIndex < content.length) {
      const remainingText = content.substring(currentIndex)
      parts.push({ type: "text", content: renderMarkdownText(remainingText) })
    }

    if (parts.length === 0) {
      return [{ type: "text", content: renderMarkdownText(content) }]
    }

    return parts
  }

  const renderMarkdownText = (text: string): string => {
    let html = text
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>')
    html = html.replace(/(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)/g, '<em>$1</em>')
    html = html.replace(/^[\-\*]\s+(.+)$/gm, '<span>• $1</span>')
    html = html.replace(/\n/g, '<br/>')
    html = html.replace(/(<br\/>){3,}/g, '<br/><br/>')
    
    return html
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-button"
          aria-label="Open chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h3>AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-close"
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1
              const isStreaming = isLastMessage && message.role === "assistant" && streamingMessage
              const displayContent = isStreaming ? streamingMessage : message.content

              return (
                <div
                  key={index}
                  className={`chatbot-message ${message.role === "user" ? "user" : "assistant"}`}
                >
                  <div className="chatbot-message-content">
                    {displayContent ? (
                      formatMessage(displayContent).map((part, partIndex) => {
                        if (part.type === "link" && "url" in part && "text" in part) {
                          return (
                            <a
                              key={partIndex}
                              href={part.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="chatbot-link"
                            >
                              {part.text}
                            </a>
                          )
                        }
                        return (
                          <span 
                            key={partIndex} 
                            dangerouslySetInnerHTML={{ __html: ("content" in part && part.content) || "" }}
                          />
                        )
                      })
                    ) : null}
                    {!displayContent && isLoading && !streamingMessage && (
                      <span className="chatbot-typing">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <div className="chatbot-input-wrapper">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="chatbot-input"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="chatbot-send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            {!apiKey && (
              <p className="chatbot-note">
                Note: Configure VITE_OPENAI_API_KEY for full AI features
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
