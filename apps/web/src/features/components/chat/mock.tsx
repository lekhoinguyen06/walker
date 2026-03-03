import { MessageProp } from ".";

export const mockMessage: MessageProp[] = [
    { content: 'Hello, how can I help you today?', sender: 'ai' },
    { content: 'Can you explain useMemo vs useEffect?', sender: 'human' },
    {
      content:
        'Of course. useMemo memoizes values, useEffect handles side effects. Of course. useMemo memoizes values, useEffect handles side effects',
      sender: 'ai',
    },
    {
      content:
        'Of course. useMemo memoizes values, useEffect handles side effects.',
      sender: 'ai',
    },
    {
      content:
        'Of course. useMemo memoizes values, useEffect handles side effects.',
      sender: 'ai',
    },
    { content: "So mock data shouldn't use useEffect?", sender: 'human' },
    {
      content: "Correct. Only useEffect if you're simulating async behavior.",
      sender: 'ai',
    },
    { content: 'That makes sense.', sender: 'human' },
    { content: "Anything else you'd like to improve?", sender: 'ai' },
    { content: 'Hello, how can I help you today?', sender: 'ai' },
    { content: 'Can you explain useMemo vs useEffect?', sender: 'human' },
    {
      content:
        'Of course. useMemo memoizes values, useEffect handles side effects.',
      sender: 'ai',
    },
    {
      content:
        'Of course. useMemo memoizes values, useEffect handles side effects.',
      sender: 'ai',
    },
    {
      content:
        'Of course. useMemo memoizes values, useEffect handles side effects.',
      sender: 'ai',
    },
    { content: "So mock data shouldn't use useEffect?", sender: 'human' },
    {
      content: "Correct. Only useEffect if you're simulating async behavior.",
      sender: 'ai',
    },
    { content: 'That makes sense.', sender: 'human' },
    { content: "Anything else you'd like to improve?", sender: 'ai' },
  ];