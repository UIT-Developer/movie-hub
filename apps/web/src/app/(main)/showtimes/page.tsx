import { ShowtimesList } from "./showtimes-list";

const ShowtimesPage = () => {
  return (
    <div className="flex flex-col p-4 items-center">
      <h1 className="text-2xl font-bold mb-4 text-white">Lịch chiếu</h1>
      <ShowtimesList />
    </div>
  )
}

export default ShowtimesPage;