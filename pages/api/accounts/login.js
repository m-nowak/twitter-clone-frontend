import cookie from "cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const body = JSON.stringify({
      username,
      password,
    });
    try {
      const apiRes = await fetch(`${baseURL}/accounts/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          withCredentials: true,
        },
        body: body,
      });

      const data = await apiRes.json();
      if (apiRes.status === 200) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("refresh", data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 - 60,
            sameSite: "strict",
            path: "/",
          }),
          cookie.serialize("access", data.access, {
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 - 60,
            sameSite: "strict",
            path: "/",
          }),
        ]);
        return res.status(200).json({
          success: "Logged in successfully",
        });
      } else {
        return res.status(apiRes.status).json({
          error: data.detail,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when loging in",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
};
