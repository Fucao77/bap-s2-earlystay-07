import Nav from '../components/global/nav';
import Footer from '../components/global/footer';
import CGU from '../components/CGU';
import { title } from '../components/CGU/cgu.module.scss';

export default function cgupage() {
  return (
    <div>
      <Nav />
      <h1 className={title}>Conditions Générales d'utilisation</h1>
      <CGU />
      <Footer />
    </div>
  );
}
