import Nav from '../components/global/nav';
import Footer from '../components/global/footer';
import FAQ from '../components/FAQ/FAQ-button';
import { title } from '../styles/pages/index.module.scss';
import HtmlParser from 'react-html-parser';

const data = [
  {
    title: 'Pourquoi earlystay ?',
    content: `early signifie tôt, de bonne heure, en avance, en premier ; stay signifie séjour, rester, séjourner.
    earlystay est donc un clin d'œil et une invitation à être parmi les premiers à réserver un voyage. `,
  },
  {
    title: 'Pourquoi ce logo ?',
    content:
      'Nous avons le bleu qui représente le ciel et la mer, et le jaune qui représente le soleil. L’horloge autour du soleil représente le temps, qui peut soit être interprété comme une invitation à réserver en avance, soit que les offres sont limitées dans le temps.',
  },
  {
    title: 'En quoi sommes nous différents des autres sites existants ?',
    content:
      "Nous négocions l'ensemble de nos offres directement auprès de divers fournisseurs. Nous vérifions leur solidité financière, nous veillons avec vigilance à la satisfaction de nos clients avant, pendant et après leur départ, on propose des services uniques que vous ne trouverez pas ailleurs.",
  },
  {
    title: 'Quels sont vos sources de revenus?',
    content:
      'Notre seule rémunération est une commission perçue pour chaque vente comme apporteur d’affaires auprès des Organisateurs techniques.',
  },
  {
    title: "Quel est l'intérêt d’acheter chez nous?",
    content:
      'Nous avons un site simple et très clair, sans publicité ni pop-up et des bons blancs et tarifs exclusifs quand nous en avons la possibilité. Nous sommes indépendants et nous avons décidé de reverser 5 euros pour chaque réservation à une association. ',
  },
  {
    title: 'Combien de temps en avance peut-on réserver ?',
    content:
      "Notre site propose généralement la possibilité de réserver un voyage jusqu'à 18 mois après la date de réservation.",
  },
  {
    title: 'La réservation est-elle modifiable ou annulable ?',
    content:
      "Si vous désirez modifier ou annuler votre réservation, même partiellement, merci de formuler votre demande par courrier électronique ou téléphone auprès de l'Organisateur technique, les informations figurent sur les conditions générales ou la fiche produit.",
  },
  {
    title: 'Comment puis-je réserver un voyage ?',
    content:
      'La réservation d’un voyage est possible uniquement sur le site earlystay.fr <br/><br/>Pour choisir votre voyage, vous pouvez sélectionner les critères souhaités (dates, aéroport de départ, durée, thème, destination) parmi les choix proposés.<br/>Il vous suffit ensuite de suivre les étapes de réservation jusqu’à l’étape du paiement.',
  },
  {
    title: 'Comment puis-je payer mon voyage ?',
    content:
      'Sur notre site, vous ne pouvez payer que par carte bancaire : carte bleue, VISA, MASTERCARD.',
  },
  {
    title: 'Comment payer avec mes chèques-vacances ?',
    content:
      'Nous n’acceptons pas les chèques-vacances comme mode de paiement sur notre site.',
  },
  {
    title: 'Comment être certain que ma réservation soit bien enregistrée ?',
    content:
      'Une fois le paiement effectué pour valider votre réservation, vous recevrez automatiquement un courrier électronique de confirmation de réservation comprenant:<br/><br/>    -    la confirmation de votre réservation (détail des prestations réservées),<br/>    -    les conditions générales earlystay,<br/>    -    les conditions générales de l’Organisateur technique<br/>-    le contrat d’assurance, en cas de souscription d’une assurance.<br/><br/>    Vous recevrez par la suite un reçu de paiement, ainsi qu’une facture.',
  },
  {
    title: 'Comment puis-je ajouter une assurance voyages ?',
    content: `Lorsque vous sélectionnez un voyage sur notre site earlystay.fr, la page devis apparaît comprenant une rubrique Assurance. 
    Aucune assurance n’est incluse dans les voyages proposés sur notre site internet.
    Si vous la souscrivez, votre contrat vous sera envoyé par courrier électronique en même temps que votre confirmation de réservation.<br/><br/>
    Attention, aucun ajout n'est possible après votre réservation.`,
  },
  {
    title: 'Qu’est-ce qu’un carnet de voyage ?',
    content: `Votre carnet de voyage se compose selon le voyage réservé de convocations aéroport/gare, de billets électroniques, de vouchers/bons d’échange pour l’hébergement ou les transferts...`,
  },
  {
    title: 'Quand vais-je recevoir mon carnet de voyage ?',
    content:
      'L’envoi de votre carnet de voyage se fait par courrier électronique à l’adresse mentionnée lors de votre réservation. Il est généralement envoyé jusqu’à 48h-24h avant votre départ. Il est donc primordial de vous tenir informé du suivi de votre dossier et de vérifier le bon fonctionnement de votre boîte e-mail.',
  },
  {
    title: 'Comment puis-je exprimer une demande particulière ?',
    content: `Toute demande particulière doit être formulée par courrier électronique en indiquant la référence de votre dossier ou par téléphone. Les informations se trouvent sur la page contact du produit sélectionné. Nous vous rappelons que les demandes particulières ne peuvent pas être garanties.`,
  },
  {
    title:
      'Comment savoir si les animaux de compagnie sont acceptés sur mon lieu de séjour ?',
    content:
      'L’acceptation des animaux sur votre lieu de séjour est mentionnée sur l’offre préalable du voyage sélectionné, selon des conditions restrictives et propres à l’Organisateur technique . Le supplément généré reste à votre charge.',
  },
];

export default function FAQpage({ questions = data }) {
  return (
    <div>
      <Nav />
      <h1 className={title}>FAQ</h1>
      {questions.map((item, index) => (
        <FAQ key={index} title={item.title}>
          <p>{HtmlParser(item.content)}</p>
        </FAQ>
      ))}

      <Footer />
    </div>
  );
}
