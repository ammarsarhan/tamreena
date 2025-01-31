import { FilterContextProvider } from "../context/useFilterContext"
import Filter from "../components/Filter"
import Grid from "../components/Grid"

export default function App() {
  return (
    <FilterContextProvider>
      <Filter/>
      <Grid/>
    </FilterContextProvider>
  )
}
