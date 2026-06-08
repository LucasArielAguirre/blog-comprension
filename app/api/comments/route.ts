import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// GET /api/comments?post_id=secundaria-a-universidad
export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("post_id");

  if (!postId) {
    return NextResponse.json(
      { error: "post_id es obligatorio" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/comments
export async function POST(req: NextRequest) {
  const body = await req.json();

  const { post_id, nombre, apellido, asunto, mensaje } = body;

  if (!post_id || !nombre || !apellido || !asunto || !mensaje) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id,
      nombre,
      apellido,
      asunto,
      mensaje,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
