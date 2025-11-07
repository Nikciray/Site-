import { reatomAsync, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async";
import { atom } from "@reatom/core";

export const similarData = atom<Apartment[]>([], "")
export const apartmentData = atom<Apartment | null>(null);

export const apartmentImages = atom<string[]>((ctx) => {
  const apartment = ctx.spy(apartmentData);
  if (!apartment || !apartment.images) return [];

  const images = apartment.images.length > 0 ? apartment.images : (apartment && apartment.image ? [apartment.image] : []);
  return images
})

type Apartment = {
  id: string,
  adult_bed: number,
  name: string,
  images: string[],
  image: string,
  price: number,
  description: string,
  size: number,
  dir: string,
  floor: number
}

export const apartmentAction = reatomAsync(async (ctx, id: string) => {
  return await ctx.schedule(async () => {
    const [info, similar] = await Promise.all([
      fetch(`http://212.8.226.103:8000/api/info/room-types/${id}`).then(r => r.json()),
      fetch(`http://212.8.226.103:8000/api/similar/room-types/${id}`).then(r => r.json()),
    ])

    return { info, similar }
  })
}).pipe(withDataAtom(null, (ctx, data) => {
  const { info, similar } = data;

  if ("name" in info) {
    apartmentData(ctx, info)
  }

  similarData(ctx, Array.isArray(similar) ? similar : [])
}), withCache(), withStatusesAtom(), withErrorAtom())
