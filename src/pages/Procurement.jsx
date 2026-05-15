import DivisionPage from '../components/divisions/DivisionPage'
import { getDivision } from '../data/divisions'

export default function Procurement() {
  return <DivisionPage division={getDivision('procurement')} />
}
