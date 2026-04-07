These are React components created to simplify the usage of Agentflows

Usage demo
Root Provider

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router';
import { FlowProvider } from './agentFlows/components/FlowProvider';

// Create a Provider at root here to initialize agentFlow
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FlowProvider>
      <RouterProvider router={router} />
    </FlowProvider>
  </StrictMode>,
);
```

Items
ClickItem

```tsx
import FlowCommand from '../components/FlowCommand';
import ClickFlow from '../agentFlows/components/ClickFlow';
import { useFlowItem } from '../agentFlows/useFlowItem';
function Page() {
  const { value } = useFlowItem('abcd');

  return (
    <div className="flex flex-col flex-1">
      <ClickFlow>
        <button
          id="abcd"
          className={value == 'hovered' ? 'bg-red-400' : 'bg-blue-400'}
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </ClickFlow>
    </div>
  );
}

export default Page;
```
