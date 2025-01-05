import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", BlogSchema);

const VideoSchema = new Schema(
  {
    title: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);

const BookSchema = new Schema(
  {
    title: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

export { Article, Video, Book };
