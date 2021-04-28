import Nav from '../components/nav';
import Footer from '../components/footer';
import FAQ from '../components/FAQ/FAQ-button';
import { title } from '../styles/pages/index.module.scss';

export default function FAQpage() {
  return (
    <div>
      <Nav />
      <h1 className={title}>FAQ</h1>
      <FAQ title="Pourquoi avoir créé Earlystay ? ">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
          egestas erat nulla nunc sagittis dignissim.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Viverra egestas erat nulla nunc sagittis
          dignissim.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Viverra egestas erat nulla nunc sagittis dignissim.Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Viverra egestas erat nulla nunc
          sagittis dignissim.
        </p>
      </FAQ>
      <FAQ title="test ">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
          egestas erat nulla nunc sagittis dignissim.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vive
        </p>
      </FAQ>

      <Footer />
    </div>
  );
}
