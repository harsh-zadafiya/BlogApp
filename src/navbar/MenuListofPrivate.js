import { CgProfile } from "react-icons/cg";

export const MenuListofPrivate = [
  {
    title: "All Blog",
    url: "/home/allblog",
  },
  {
    title: "My Blog",
    url: "/home/myblog",
  },
  {
    title: "Saved Blog",
    url: "/home/saveblog",
  },
  {
    title: "Add Blog",
    url: "/home/addblog",
  },
  {
    title: (
      <CgProfile
        style={{
          height: "40px",
          width: "40px",
        }}
      />
    ),
    url: "/profile",
  },
];
