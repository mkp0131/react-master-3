import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="not-found">
        <h1>404</h1>
        <Link to="/">사이트로 돌아가기</Link>
      </div>
    </>
  );
};

export default NotFound;
