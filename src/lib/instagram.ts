const token = process.env.INSTAGRAM_ACCESS_TOKEN;

export interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
}

export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  if (!token) return [];

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type,timestamp&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 3600 } } // Cache 1 uur
    );

    if (!res.ok) return [];

    const data = await res.json();
    return (data.data || []).filter(
      (post: InstagramPost) => post.media_type !== "VIDEO"
    );
  } catch {
    return [];
  }
}
