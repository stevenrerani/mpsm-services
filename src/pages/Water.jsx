import DivisionPage from '../components/divisions/DivisionPage'
import { getDivision } from '../data/divisions'

export default function Water() {
  return <DivisionPage division={getDivision('water')} />
}
