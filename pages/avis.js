import Nav from '../components/global/nav';
import Footer from '../components/global/footer';
import { container } from '../styles/pages/avis.module.scss';
import { title } from '../styles/pages/index.module.scss';

export default function avis() {
  return (
    <div className={container}>
      <Nav />
      <h1 className={title}>Avis</h1>
      <div
        className="powr-reviews"
        id="4c22c627_1619618763"
        style={{ paddingTop: '100px' }}
      ></div>
      <script src="https://www.powr.io/powr.js?platform=html"></script>
      <Footer />
    </div>
  );
}
