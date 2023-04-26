export const note = {
  render: "Note",
  description: "Display a note for additional info.",
  attributes: {
    noteType: {
      type: String,
      description:
        'Note type, by default will be "Note". Also can give as "Warning" and "Tip"',
    },
  },
};
