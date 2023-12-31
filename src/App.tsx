import { useState, useEffect } from 'react'
import Panel from './Panel'
import Content from './Content'
import Details from './Details';


function App() {
  const [planet, setPlanet] = useState<number>(0); // რომელი პლანეტაა არჩეული
  const [data, setData] = useState<[] | null>(null); // მონაცემების დასაფეჩად
  const [page, setPage] = useState<string>('overview'); // რომელი ფეიჯი უნდა ვაჩვენოთ
  const [image, setImage] = useState<string>('planet'); // რომელი სურათ(ებ)ი უნდა ჩანდეს
  const [mobile, setMobile] = useState<boolean>(false); // გავიგოთ მობაილ ვერსიაზე ვართ თუ არა
  const [count, setCount] = useState<number>(0); // useEffect-ით დავადგინოთ ul, main და footer უნდა გავაქროთ თუ გამოვაჩინოთ
  const [bodyHide, setBodyHide] = useState<boolean>(false); // გვეუბნება რა უნდა ვუქნათ main, footer და ul ელემენტებს, მობაილ ვერსიაზე ყოფნის დროს

  useEffect(() => { // მობაილ ვერსიაზე ყოფნისას, ვარკვევთ დაკლიკდა თუ არა burger icon-ზე ან რომელიმე პლანეტაზე, რათა შესაბამისად შევცვალოთ bodyHide სთეითი
    if (count > 0) {
      setBodyHide(!bodyHide);
    }
  }, [count])

  useEffect(() => { // ვფეჩავთ მონაცემებს საიტის პირველი რენდერისას
    const fetchData = async () => {
      try {
        const response = await fetch('./data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <Panel
        data={data}
        planet={planet}
        setPlanet={setPlanet}
        setPage={setPage}
        setImage={setImage}
        mobile={mobile}
        count={count}
        setCount={setCount}
      />
      <Content
        planet={planet}
        data={data}
        page={page}
        setPage={setPage}
        image={image}
        setImage={setImage}
        mobile={mobile}
        setMobile={setMobile}
        bodyHide={bodyHide}
      />
      <Details
        planet={planet}
        data={data}
        bodyHide={bodyHide}
      />
    </>
  )
}

export default App;