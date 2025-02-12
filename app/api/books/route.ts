import { connectMongoDB } from "@/lib/mongodb";
import { Book } from "@/models/article";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { title, url } = await req.json();

    if (!title || !url) {
      return NextResponse.json(
        { error: "Title and url are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    await Book.create({ title, url });

    return NextResponse.json({ message: "Book created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the book" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();

    const books = await Book.find().sort({ title: 1 });
    return NextResponse.json({ books }, { status: 200 });
  } catch (error) {
    console.error("Error finding book:", error);
    return NextResponse.json(
      { error: "An error occurred while finding the book" },
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
        { error: "ID is required to delete the book" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return NextResponse.json(
        { error: "Book not found or Already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the book" },
      { status: 500 }
    );
  }
};
