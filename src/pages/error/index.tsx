import { useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  console.error(error);
  setTimeout(() => {
    navigate({ pathname: '/' }, { replace: true });
  }, 3000);

  return (
    <div
      id="error-page"
      className="flex h-lvh flex-col items-center justify-center"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>we will go to homepage after 3 seconds</p>
      <p>
        <i>{error && error.message}</i>
      </p>
    </div>
  );
}
