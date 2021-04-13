import { useEffect } from 'react';
import Nav from '../components/nav';

export default function Home() {
  useEffect(() => {
    fetch('/api/test-ceto')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Nav />
    </div>
  );
}
