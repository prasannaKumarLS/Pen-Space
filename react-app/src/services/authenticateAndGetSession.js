import { useCallback } from "react";
import { getSession } from "./authServices";
import { useNavigate } from "react-router-dom";

export default function AuthenticateAndGetSessionInfo() {
  const navigate = useNavigate();
  const fetchSessionInfo = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session || session.error) throw new Error();
      return session;
    } catch (res) {
      console.log({
        error: res.error || "Something went wrong while fetching Session Info.",
      });
      navigate("/");
    }
  }, [navigate]);
  return fetchSessionInfo;
}
