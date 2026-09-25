import { useState } from "react";
import { usePanelToast } from "@/hooks";
import { useInterval } from "usehooks-ts";
import { useWalkerInput } from "@/hooks";

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

const conciergeSuggest: SuggestType = {
  prompt: "Let's go to Concierge",
  thumbnail: {
    type: "img",
    attributes: {
      class: "size-full object-cover",
      url: "https://i.pinimg.com/1200x/a4/36/60/a43660b58cc3bc73a74891b5d3057fba.jpg",
      alt: "Suggest",
    },
  },
  body: {
    type: "div",
    attributes: {
      class:
        "w-full rounded-[24px] flex flex-col p-1.5 gap-1.5 bg-red-50 dark:bg-red-950 hover:cursor-pointer",
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
              value:
                "We are on a mission to building the world for those who care. Try out Concierge! It is a managed Walker Server to help you create enterprise-grade Walker Apps.",
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
      return <div>{node.attributes?.value}</div>;
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

const suggestionList: SuggestType[] = [conciergeSuggest];

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
