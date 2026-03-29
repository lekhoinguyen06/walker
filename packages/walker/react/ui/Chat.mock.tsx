import type { ChatUI } from "@shared/chat.schema";

export const mockChatData: ChatUI = [
	{
		id: "1",
		type: "message",
		content: "Hey! I need help building a React component for my dashboard.",
		role: "user",
	},
	{
		id: "2",
		type: "message",
		content:
			"I'd be happy to help you build a React component! Here's a simple example to get you started:",
		role: "assistant",
	},
	{
		id: "3",
		type: "code",
		content: `function HelloWorld() {
  return <div>Hello, World!</div>;
}`,
		role: "assistant",
	},
	{
		id: "4",
		type: "message",
		content:
			"Great! I used your suggestion and created a button component. Check out this screenshot:",
		role: "user",
	},
	{
		id: "5",
		type: "image",
		content:
			"https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800",
		role: "user",
	},
	{
		id: "6",
		type: "message",
		content:
			"That looks fantastic! Let me show you how to calculate areas with this formula:",
		role: "assistant",
	},
	{
		id: "7",
		type: "equation",
		content: "E = mc^2",
		role: "assistant",
	},
	{
		id: "8",
		type: "code",
		content: `const calculateArea = (radius: number): number => {
  return Math.PI * radius * radius;
};`,
		role: "assistant",
	},
	{
		id: "9",
		type: "message",
		content:
			"The formula for a circle's area is shown above. For a radius of 5, the area would be approximately 78.54 square units.",
		role: "assistant",
	},
	{
		id: "10",
		type: "message",
		content: "This looks amazing! Thanks for walking me through it.",
		role: "user",
	},
	{
		id: "11",
		type: "message",
		content:
			"You're welcome! Here's a more complex example with TypeScript interfaces:",
		role: "assistant",
	},
	{
		id: "12",
		type: "code",
		content: `interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

const createUser = (userData: User): User => {
  return { ...userData, id: Math.random().toString() };
};`,
		role: "assistant",
	},
	{
		id: "13",
		type: "message",
		content:
			"I've been working on the user management system. The interface above defines our user structure. Should I add more fields like phone number and address?",
		role: "user",
	},
	{
		id: "14",
		type: "message",
		content:
			"That's a great question! For user management, you might want to consider these additional fields. Also, here's an interesting mathematical fact:",
		role: "assistant",
	},
	{
		id: "15",
		type: "equation",
		content: "∑(n=1 to ∞) 1/n^2 = π^2/6",
		role: "assistant",
	},
	{
		id: "16",
		type: "message",
		content: "That's the Basel problem! It's a classic result in mathematics.",
		role: "user",
	},
	{
		id: "17",
		type: "image",
		content:
			"https://images.unsplash.com/photo-1516321318423-f06f70d504d0?w=800",
		role: "assistant",
	},
	{
		id: "18",
		type: "message",
		content:
			"Exactly! Here's a practical data processing class that might be useful for your project:",
		role: "assistant",
	},
	{
		id: "19",
		type: "code",
		content: `class DataProcessor {
  private data: number[] = [];

  addValue(value: number): void {
    this.data.push(value);
  }

  getAverage(): number {
    if (this.data.length === 0) return 0;
    return this.data.reduce((a, b) => a + b, 0) / this.data.length;
  }

  getMedian(): number {
    const sorted = [...this.data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }
}`,
		role: "assistant",
	},
	{
		id: "20",
		type: "message",
		content:
			"Perfect! This data processor class will handle most of our statistical needs.",
		role: "user",
	},
];
