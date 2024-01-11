import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://mern-app-limf.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://mern-app-limf.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {
      posts.map((entity) => {
        return (
          <PostWidget
            key={entity._id}
            postId={entity._id}
            postUserId={entity.userId}
            name={`${entity.firstName} ${entity.lastName}`}
            description={entity.description}
            location={entity.location}
            picturePath={entity.picturePath}
            userPicturePath={entity.userPicturePath}
            likes={entity.likes}
            comments={entity.comments}
          />
        );
      })
      }
    </>
  );   
};

export default PostsWidget;
