import { PageContext } from "vike/types";
import { useConfig } from "vike-react/useConfig"

export async function data(pageContext: PageContext) {
  const config = useConfig()

  config({
    title: `Апартаменты ${pageContext.routeParams.id}`
  })
}