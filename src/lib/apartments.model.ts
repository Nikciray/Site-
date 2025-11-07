import { reatomAsync, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async";

type RoomTypes = {
  id: string,
  name: string,
  description: string,
  price: number,
  adult_bed: number,
  image: string
}

export const roomTypesAction = reatomAsync(async (ctx) => {
  return await ctx.schedule(async () => {
    const response = await fetch("http://212.8.226.103:8000/api/main/room-types", {
      headers: { accept: "application/json" },
    });

    if (!response.ok) throw new Error("Ошибка загрузки данных");

    const data = await response.json();

    return data as RoomTypes[]
  })
}).pipe(
  withDataAtom([], (ctx, data) => Array.isArray(data) ? data.slice(0, 4) : []),
  withCache({ swr: false }),
  withStatusesAtom(),
  withErrorAtom()
)