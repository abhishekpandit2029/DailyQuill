import { useGetQuery } from "@/lib/fetcher";

export interface IFollowersFollowings {
  follower_id: string,
  follower_username: string,
  follower_full_name: string,
  follower_profile_image: string,
  // this below types are unused
  username?: string,
  full_name?: string,
  userprofile_image?: string
}

export interface IUser {
  data: {
    _id: string,
    username: string,
    email: string,
    isVerfied: boolean,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string,
    additional_name: string,
    bio: string,
    full_name: string,
    link: string,
    location: string,
    language: string,
    pronounce: string,
    link_alias: string,
    userprofile_image?: string,
    followersLists: IFollowersFollowings[],
    followingsLists: IFollowersFollowings[],
  }
}

export default function useMe() {
  const { data: userData, isLoading } = useGetQuery<IUser>("/users/me");
  return { userData, isLoading };
};
