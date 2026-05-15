import DivisionPage from '../components/divisions/DivisionPage'
import { getDivision } from '../data/divisions'

export default function ITConsulting() {
  return <DivisionPage division={getDivision('it-consulting')} />
}
