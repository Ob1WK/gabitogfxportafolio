import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Generate a client token for the browser to upload the file
        // This allows files larger than 4.5MB to be uploaded directly to Blob
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
            "video/mp4",
            "video/webm",
            "video/quicktime",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 100 * 1024 * 1024, // 100MB limit
        }
      },
      onUploadCompleted: async ({ blob }) => {
        // Called when upload completes successfully
        console.log("[v0] Upload completed:", blob.url)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
