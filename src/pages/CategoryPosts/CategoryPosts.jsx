import {
  useParams,
} from "react-router-dom";
import Posts from "../../components/Home/Posts";
import "../Home/Home.scss";

const CategoryPosts = () => {
  const {category_id}  = useParams();
  return <Posts endpoint={`post/community/${category_id}`} />;
};

export default CategoryPosts;
