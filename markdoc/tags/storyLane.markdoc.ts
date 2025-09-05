export const storyLane = {
  render: "StoryLane",
  description: "Embed storylane interactive demos with 16:9 aspect ratio",
  attributes: {
    demoId: {
      type: String,
      required: true,
      description: "The storylane demo ID from your demo URL",
    },
    width: {
      type: String,
      default: "80%",
      description:
        "Width of the demo embed (height will be calculated automatically for 16:9 ratio)",
    },
    caption: {
      type: String,
      description: "Caption for the demo",
    },
  },
};
