import Nav from '../components/nav';
import Footer from '../components/footer';
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
