import { useAccount } from "../contexts/AccountContext.js";
import { useQuery } from "@tanstack/react-query";

export function getAllUsers() {
  const { publicInstance } = useAccount();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await publicInstance.get("/accounts/users/");
      return data;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
}
export function getUserTweetCount() {
  const { privateInstance } = useAccount();
  return useQuery({
    queryKey: ["tweets-count"],
    queryFn: async () => {
      const { data } = await privateInstance.get("/tweets/count/");
      return data;
    },
    initialData: [],
    refetchOnWindowFocus: true,
  });
}
export function getAllTweets() {
  const { publicInstance } = useAccount();
  return useQuery({
    queryKey: ["tweets"],
    queryFn: async () => {
      const { data } = await publicInstance.get("/tweets/");
      return data;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
}
