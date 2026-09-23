export const ade = {
  description: "This is the Walker React playground.",
  nav: {
    react: {
      description:
        "Go to Walker React playground. You are already here, click to go to home.",
    },
    vue: {
      description:
        "Go to Vue playground. This page is under construction, do not use it yet.",
    },
    svelte: {
      description:
        "Go to Svelte playground. This page is under construction, do not use it yet.",
    },
  },
  components: {
    description: "There are many components for you to explore.",
    input: {
      description: "This is an input component. Input some text.",
    },
    toast: {
      description: "This is a toast component. Click to the toast.",
    },
    dialog: {
      description:
        "This is a dialog component. You demonstrate creating a user here, start by click the trigger button to open the dialog.",
      trigger: {
        description: 'Use the "click" flow to open a the dialog.',
      },
      close: {
        description: 'Use the "click" flow to close the dialog.',
      },
      save: {
        description: 'Use the "click" flow to save the dialog.',
      },
      usernameInput: {
        description:
          "If the user does not specify any name, find a fun username & name.",
      },
      nameInput: {
        description: "Relate to the usernameInput field above.",
      },
    },
    scrollArea: {
      description: "This is a scroll area component.",
    },
    select: {
      description: "This is a select component. There are fruits inside.",
    },
  },
} as const;
