import { create } from "zustand";

export type FocusNode = {
  id: string;
  isFocused?: boolean;
  onClick?: () => void;
};

export interface FocusTree extends FocusNode {
  children?: FocusTree[];
}

type FocusNodeActions = "left" | "right" | "up" | "down" | "enter" | "back";

type FocusStore = {
  tree: FocusTree | null;

  setTree: (tree: FocusTree) => void;

  currentFocusId: string | null;
  setFocusId: (id: string) => void;

  clickCurrentFocus: () => void;
  changeFocus: (action: FocusNodeActions) => void;
};

export const useFocusStore = create<FocusStore>((set, get) => ({
  tree: null,
  setTree: (tree) => {
    const { currentFocusId } = get();
    const stillExists = currentFocusId && findNodeById(tree, currentFocusId);
    set({
      tree,
      currentFocusId: stillExists
        ? currentFocusId
        : (tree.children?.[0]?.id ?? tree.id),
    });
  },
  currentFocusId: null,
  setFocusId: (id: string) => {
    const tree = get().tree;
    if (tree) {
      set({ currentFocusId: id });
    }
  },

  clickCurrentFocus: () => {
    const tree = get().tree;
    if (!tree) return;

    const currentFocusId = get().currentFocusId;
    if (!currentFocusId) return;

    const currentNode = findNodeById(tree, currentFocusId);
    if (currentNode && currentNode.onClick) {
      currentNode.onClick();
    }
  },

  changeFocus: (action: FocusNodeActions) => {
    const tree = get().tree;
    if (!tree) return;

    const currentFocusId = get().currentFocusId;
    if (!currentFocusId) return;

    const currentNode = findNodeById(tree, currentFocusId);
    if (!currentNode) return;

    let newFocusId: string | null = null;

    switch (action) {
      case "left":
        const leftNode = findLeftNode(currentFocusId, tree);
        if (leftNode) newFocusId = leftNode.id;
        break;
      case "up":
        const previousNode = findPreviousNodeOnSameLevel(currentFocusId, tree);
        if (previousNode) newFocusId = previousNode.id;
        break;
      case "right":
        const rightNode = findRightNode(currentFocusId, tree);
        if (rightNode) newFocusId = rightNode.id;
        break;
      case "down":
        const nextNode = findNextNodeOnSameLevel(currentFocusId, tree);
        if (nextNode) newFocusId = nextNode.id;
        break;
      case "enter":
        const firstChild = currentNode.children?.[0];
        if (firstChild) newFocusId = firstChild.id;
        break;
      case "back":
        const parentNode = findParentNode(tree, currentFocusId);
        if (parentNode) newFocusId = parentNode.id;
        break;
    }

    if (newFocusId) {
      set({ currentFocusId: newFocusId });
    }
  },
}));

function findNodeById(tree: FocusTree, id: string): FocusTree | null {
  if (tree.id === id) return tree;
  if (tree.children) {
    for (const child of tree.children) {
      const result = findNodeById(child, id);
      if (result) return result;
    }
  }
  return null;
}

function findParentNode(tree: FocusTree, id: string): FocusTree | null {
  if (tree.children) {
    for (const child of tree.children) {
      if (child.id === id) return tree;
      const result = findParentNode(child, id);
      if (result) return result;
    }
  }
  return null;
}

function findLeftNode(id: string, tree?: FocusTree): FocusTree | undefined {
  if (!tree) return undefined;
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child?.id === id && i > 0) {
        return tree.children[i - 1];
      }
      const result = findLeftNode(id, child);
      if (result) return result;
    }
  }
  return undefined;
}

function findRightNode(id: string, tree?: FocusTree): FocusTree | undefined {
  if (!tree) return undefined;
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child?.id === id && i < tree.children.length - 1) {
        return tree.children[i + 1];
      }
      const result = findRightNode(id, child);
      if (result) return result;
    }
  }
  return undefined;
}

function findPreviousNodeOnSameLevel(
  id: string,
  tree?: FocusTree,
): FocusTree | undefined {
  if (!tree) return undefined;
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child?.id === id && i > 0) {
        return tree.children[i - 1];
      }
      const result = findPreviousNodeOnSameLevel(id, child);
      if (result) return result;
    }
  }
  return undefined;
}

function findNextNodeOnSameLevel(
  id: string,
  tree?: FocusTree,
): FocusTree | undefined {
  if (!tree) return undefined;
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child?.id === id && i < tree.children.length - 1) {
        return tree.children[i + 1];
      }
      const result = findNextNodeOnSameLevel(id, child);
      if (result) return result;
    }
  }
  return undefined;
}
