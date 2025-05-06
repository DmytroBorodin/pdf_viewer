export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");
  const token = searchParams.get("token");

  if (!fileId || !token) {
    return new Response(JSON.stringify({ error: "Missing fileId or token" }), {
      status: 400,
    });
  }

  const googleRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!googleRes.ok || !googleRes.body) {
    const errorText = await googleRes.text();
    return new Response(
      JSON.stringify({ error: `Google API error: ${errorText}` }),
      {
        status: googleRes.status,
      }
    );
  }

  // Stream the PDF file to the client
  return new Response(googleRes.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
