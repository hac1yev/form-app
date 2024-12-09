import Posts from "../../components/Home/Posts";
import "../Home/Home.scss";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");

  return <Posts endpoint={`search?key=${key}`} />;
};

export default Search;
