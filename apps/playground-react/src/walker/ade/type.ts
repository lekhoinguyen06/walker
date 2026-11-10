export type ADEType = Record<
  string,
  {
    id: string;
    description: string;
    flows?: readonly string[];
  }
>;
