import { connectMongoDB } from "@/lib/mongodb";
import { Video } from "@/models/article";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { title, url } = await req.json();

    if (!title || !url) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    await Video.create({ title, url });

    return NextResponse.json({ message: "Video created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the video" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();

    const videos = await Video.find().sort({ updatedAt: -1 });
    return NextResponse.json({ videos }, { status: 200 });
  } catch (error) {
    console.error("Error finding video:", error);
    return NextResponse.json(
      { error: "An error occurred while finding the video" },
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
        { error: "ID is required to delete an video" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const deleteVideo = await Video.findByIdAndDelete(id);

    if (!deleteVideo) {
      return NextResponse.json(
        { error: "Video not found or Already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Video deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the video" },
      { status: 500 }
    );
  }
};
