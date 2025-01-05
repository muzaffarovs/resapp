import { connectMongoDB } from "@/lib/mongodb";
import { Video } from "@/models/article";
import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectMongoDB();
    const { id } = await params;

    const body = await req.json();
    const { title, url } = body;

    if (!title || !url) {
      return NextResponse.json(
        { error: "Title and url are required" },
        { status: 400 }
      );
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { title, url },
      { new: true }
    );

    if (!updatedVideo) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Video updated", video: updatedVideo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating video:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectMongoDB();
    const { id } = await params;

    const blog = await Video.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
