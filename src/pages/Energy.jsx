import DivisionPage from '../components/divisions/DivisionPage'
import { getDivision } from '../data/divisions'

export default function Energy() {
  return <DivisionPage division={getDivision('energy')} />
}
