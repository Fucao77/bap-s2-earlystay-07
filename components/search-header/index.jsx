import DatePicker from '../date-picker';
import { container } from './search-header.module.scss';

export default function SearchHeader() {
  return (
    <header className={container}>
      <DatePicker label="Aller" />
    </header>
  );
}
