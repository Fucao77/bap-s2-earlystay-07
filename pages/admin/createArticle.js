import Form from '../../components/formNewArticle';
import Header from '../../components/adminHeader';

export default function Formulaire() {
  return (
    <div>
      <Header title={"Création d'article"}></Header>
      <Form />
    </div>
  );
}
