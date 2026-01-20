import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type PostContentProps = {
  content: string;
};

function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose mt-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-semibold mt-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-semibold mt-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold mt-2">{children}</h3>,
          p: ({ children }) => <p className="text-sm leading-relaxed">{children}</p>,
          li: ({ children }) => <li className="text-sm leading-relaxed ml-4">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default PostContent;
