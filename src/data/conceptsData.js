const reactConcepts = [
    {
      name: "React Optimising Compiler",
      description: "Automatically manages re-renders, eliminating the need for manual optimization using useMemo, useCallback, and memo APIs.",
      example: `// No need for useMemo or useCallback anymore
  const computeExpensiveValue = (input) => {
    // some expensive computation
    return result;
  };`,
      symbol: "🔧",
      effect: "Optimization"
    },
    {
      name: "use() Hook",
      description: "Allows loading resources asynchronously, particularly fetching data and handling context.",
      example: `const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return res.json();
  };
  
  const Posts = () => {
    const [isFetchPost, setIsFetchPost] = useState(false);
  
    let data;
    if (isFetchPost) {
      data = use(fetchPosts());
    }
  
    return (
      <div>
        <Title>use() Example</Title>
        <Button onClick={() => setIsFetchPost(prev => !prev)}>Fetch Posts</Button>
        {data &&
          data.map(data => (
            <Card key={data.id}>{data.body}</Card>
          ))}
      </div>
    );
  };`,
      symbol: "🔄",
      effect: "Data Fetch"
    },
    {
      name: "Server and Client Directives",
      description: "Allows seamless integration of client and server-side code within the same file, leading to improved performance and simplified data fetching.",
      example: `// Server-side function
  async function addToCart(data) {
    'use server';
    // server-side logic
  }
  
  // Client-side function
  'use client';
  import { useState } from 'react';
  import Button from './Button';
  
  const RichTextEditor = ({ timestamp, text }) => {
    const date = new Date(timestamp).toLocaleString();
    return (
      <div>
        <p>{date}</p>
        <Button>Edit</Button>
      </div>
    );
  };`,
      symbol: "🖥️",
      effect: "Hybrid Rendering"
    },
    {
      name: "Form Actions",
      description: "Simplifies working with forms by attaching actions directly without needing onSubmit, similar to PHP.",
      example: `const addPost = (formData) => {
    const newPost = {
      title: formData.get("title"),
      body: formData.get("body")
    };
    createPost(newPost);
  };
  
  return (
    <form action={addPost}>
      <input name="title" />
      <input name="body" />
      <button type="submit">Submit</button>
    </form>
  );`,
      symbol: "📝",
      effect: "Form Handling"
    },
    {
      name: "useFormState() Hook",
      description: "Keeps the state updated based on the result of form actions, facilitating seamless form management.",
      example: `const addPost = (prevState, queryData) => {
    const newPost = {
      title: queryData.get("title"),
      body: queryData.get("body")
    };
    return "Post Created Successfully!";
  };
  
  const [state, formAction] = useFormState(addPost, "");
  
  return (
    <form action={formAction}>
      <input name="title" />
      <input name="body" />
      <button type="submit">Submit</button>
      <div>{state}</div>
    </form>
  );`,
      symbol: "📋",
      effect: "Form State"
    },
    {
      name: "useFormStatus() Hook",
      description: "Provides status information of the last form submission.",
      example: `const CreatePostButton = () => {
    const { pending, method } = useFormStatus();
  
    return (
      <>
        <button type="submit">Submit</button>
        <div>{pending && "Loading..."}</div>
        <div>{method && \`Method: \${method.toUpperCase()}\`}</div>
      </>
    );
  };`,
      symbol: "⏳",
      effect: "Form Status"
    },
    {
      name: "useOptimistic() Hook",
      description: "Allows displaying a different state while waiting for an asynchronous action, like a network request.",
      example: `const addPost = async (formData) => {
    const newPost = {
      title: formData.get("title"),
      body: formData.get("body")
    };
  
    // optimistic update
    addOptimisticPost(newPost);
  
    // server call
    await createPost(newPost);
  };
  
  const [optimisticPosts, addOptimisticPost] = useOptimistic(posts, (state, newPost) => [
    ...state,
    newPost
  ]);
  
  return (
    <form action={addPost}>
      <input name="title" />
      <input name="body" />
      <button type="submit">Submit</button>
      <RenderPosts posts={optimisticPosts} />
    </form>
  );`,
      symbol: "💫",
      effect: "Optimistic UI"
    },
    {
      name: "Document Metadata",
      description: "Allows direct control over page titles and meta tags within React components, enhancing SEO management.",
      example: `<>
    <title>Simform Blog</title>
    <meta name="description" content="Simform Engineering Blog" />
    <h1>Document Metadata Example</h1>
  </>;`,
      symbol: "📝",
      effect: "SEO"
    },
    {
      name: "Simplified Ref Handling",
      description: "Eliminates the need for the forwardRef hook, simplifying code and enhancing readability.",
      example: `const Button = ({ ref, incrementCount }) => (
    <button ref={ref} onClick={incrementCount}>Increment</button>
  );
  
  const RefHandlingExample = () => {
    const [counter, setCounter] = useState(0);
    const buttonRef = useRef(null);
  
    return (
      <>
        <div>Counter: {counter}</div>
        <Button ref={buttonRef} incrementCount={() => setCounter(counter + 1)} />
      </>
    );
  };`,
      symbol: "🔗",
      effect: "Ref Handling"
    }
  ];
  
  export default reactConcepts;
  