import cookie from "cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const refresh = cookies.refresh ?? false;
    if (refresh === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }
    const body = JSON.stringify({
      refresh,
    });
    try {
      const apiRes = await fetch(`${baseURL}/accounts/refresh/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();
      if (apiRes.status === 200) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", data.access, {
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 - 60,
            sameSite: "strict",
            path: "/",
          }),
          cookie.serialize("refresh", data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 - 60,
            sameSite: "strict",
            path: "/",
          }),
        ]);
        return res.status(200).json({
          success: "Refresh request successful",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "Failed to make refresh request",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when trying to make refresh request",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
