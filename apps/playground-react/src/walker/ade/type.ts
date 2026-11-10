type ItemType = {
  id: string;
  description: string;
  flows?: readonly string[];
};

export type ADEType = Record<string, (props: any) => ItemType>;
