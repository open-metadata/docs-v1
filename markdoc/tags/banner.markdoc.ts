import Banner from "../../components/common/Banner/Banner";

export const banner = {
  render: Banner,
  attributes: {
    heading: {
      type: String,
    },
    content: {
      type: String,
    },
    videoId: {
      type: String,
    },
    bgColor: {
      type: String,
      default: "white",
    },
  },
};
