import { connectMongoDB } from "@/lib/mongodb";
import { Article } from "@/models/article";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    await Article.create({ title, description });

    return NextResponse.json({ message: "Article created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the article" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();

    const articles = await Article.find().sort({ updatedAt: -1 });
    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Error finding article:", error);
    return NextResponse.json(
      { error: "An error occurred while finding the article" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required to delete an article" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return NextResponse.json(
        { error: "Article not found or Already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the article" },
      { status: 500 }
    );
  }
};
