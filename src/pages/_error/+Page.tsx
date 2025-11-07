import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

const NotFound = () => {
  return (
    <h1 className="text-2xl font-bold">Страница не найдена</h1>
  )
}

const Error = () => {
  return (
    <h1 className="text-2xl font-bold">Произошла ошибка</h1>
  )
}

export default function Page() {
  const { is404 } = usePageContext();

  return (
    <div className="flex flex-col gap-6 h-dvh w-full items-center justify-center">
      {is404 ? <NotFound /> : <Error />}
      <div className="flex items-center justify-center w-full">
        <button
          className="inline-flex border border-black/60 px-4 h-10 rounded-2xl justify-center items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-xl font-semibold text-black">
            На главную
          </span>
        </button>
      </div>
    </div>
  );
}