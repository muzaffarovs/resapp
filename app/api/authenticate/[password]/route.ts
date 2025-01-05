import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { password: string } }
) => {
  if (req.method !== "GET") {
    return NextResponse.json({
      success: false,
      message: "Method Not Allowed",
      status: 405,
    });
  }

  const password = params.password;

  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json(
    {
      success: false,
    },
    { status: 401 }
  );
};
