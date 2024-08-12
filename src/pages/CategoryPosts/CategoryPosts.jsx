import { useSearchParams } from 'react-router-dom';
import Posts from '../../components/Home/Posts';
import '../Home/Home.scss';

const CategoryPosts = () => {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("category_id");    

    return (
        <Posts endpoint={`post/category/${categoryId}`} />
    );
};

export default CategoryPosts;