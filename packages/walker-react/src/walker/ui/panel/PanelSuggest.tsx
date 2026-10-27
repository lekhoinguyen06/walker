import { usePanelToast, useWalkerInput } from "@/walker/hooks";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

interface WalkerUINodeType {
  type: "div" | "img" | "raw";
  attributes?: Partial<Record<"class" | "url" | "alt" | "value", string>>;
  children?: WalkerUINodeType[];
}

type SuggestType = {
  prompt: string;
  thumbnail: WalkerUINodeType;
  body: WalkerUINodeType;
};

function conciergeSuggest({
  thumbnailUrl,
}: {
  thumbnailUrl: string;
}): SuggestType {
  return {
    prompt: "Let's go to Concierge",
    thumbnail: {
      type: "img",
      attributes: {
        class:
          "size-full object-fit p-1.5 hover:cursor-pointer hover:scale-120 transition-all duration-200 bg-primary",
        url: thumbnailUrl,
        alt: "Suggest",
      },
    },
    body: {
      type: "div",
      attributes: {
        class:
          "w-full flex flex-col rounded-[24px] p-1.5 gap-1.5 bg-red-50 dark:bg-red-950 hover:cursor-pointer",
      },
      children: [
        {
          type: "div",
          attributes: {
            class: "w-full p-1.5 text-red-500 bg-background rounded-[16px]",
          },
          children: [
            {
              type: "raw",
              attributes: {
                value: "Creating enterprise-grade Walker Apps with Concierge.",
              },
            },
          ],
        },
        {
          type: "div",
          attributes: {
            class: "w-full h-8 flex gap-3 items-center rounded-full p-1 px-3",
          },
          children: [
            {
              type: "img",
              attributes: {
                class: "h-4",
                url: "https://vstaffs.com/concierge-logo.svg",
                alt: "Concierge",
              },
            },
            {
              type: "div",
              attributes: {
                class: "w-full text-red-500 font-semibold",
              },
              children: [
                {
                  type: "raw",
                  attributes: {
                    value: "For apps that matters.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };
}

function render(node: WalkerUINodeType) {
  switch (node.type) {
    case "div":
      return (
        <div {...node.attributes}>{node.children?.map((n) => render(n))}</div>
      );
    case "img":
      return (
        <img
          src={node.attributes?.url}
          alt={node.attributes?.alt}
          className={node.attributes?.class}
        />
      );
    case "raw":
      return <span {...node.attributes}>{node.attributes?.value}</span>;
    default:
      return null;
  }
}

function Suggest({ body, prompt }: SuggestType) {
  const { setInput } = useWalkerInput();
  return <div onClick={() => setInput(prompt)}>{render(body)}</div>;
}

function SuggestThumbnail({ thumbnail }: SuggestType) {
  return render(thumbnail);
}

const suggestionList: SuggestType[] = [
  conciergeSuggest({ thumbnailUrl: "https://walker.vstaffs.com/frame-01.svg" }),
  conciergeSuggest({ thumbnailUrl: "https://walker.vstaffs.com/frame-02.svg" }),
  conciergeSuggest({ thumbnailUrl: "https://walker.vstaffs.com/frame-03.svg" }),
  conciergeSuggest({ thumbnailUrl: "https://walker.vstaffs.com/frame-04.svg" }),
  conciergeSuggest({ thumbnailUrl: "https://walker.vstaffs.com/frame-05.svg" }),
];

export function PanelSuggest() {
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(10000);
  const [isPlaying, setPlaying] = useState<boolean>(true);
  const { pushToast } = usePanelToast();

  useInterval(
    () => {
      if (count >= suggestionList.length - 1) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
    },
    isPlaying ? delay : null,
  );

  return (
    <div
      className="w-full h-8 flex items-center justify-center rounded-full bg-muted overflow-hidden"
      onClick={() => {
        pushToast({
          type: "plain",
          message: "",
          render: suggestionList[count] && (
            <Suggest {...suggestionList[count]} />
          ),
          duration: 10,
        });
      }}
    >
      {suggestionList[count] && <SuggestThumbnail {...suggestionList[count]} />}
    </div>
  );
}
