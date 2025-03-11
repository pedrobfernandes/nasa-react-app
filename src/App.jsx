import {useState, useEffect} from 'react';
import SideBar from './components/SideBar';
import Main from './components/Main';
import Footer from './components/Footer';

export default function App()
{
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    function handleToggleModal()
    {
        setShowModal(!showModal);
    };

    useEffect(() =>
    {
        async function fetchAPIData()
        {
            const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
            const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`;

            const today = (new Date()).toDateString();
            const localKey = `NASA-${today}`;

            if (localStorage.getItem(localKey))
            {
                const apiData = JSON.parse(localStorage.getItem(localKey));
                setData(apiData);
                console.log('Fetched from cahe today');
                return;
            }

            localStorage.clear();


            try
            {
                const response = await fetch(url);
                const apiData = await response.json();
                console.log(apiData);
                localStorage.setItem(localKey, JSON.stringify(apiData));
                setData(apiData);
                console.log('Fetched from API today');
            }
            catch (error)
            {
                console.log(error.message);
            }
        }

        fetchAPIData();
    }, []);

    return (
        <>
            {data ? (<Main data={data}/>) :
                <div className="loadingState" aria-live="polite" aria-label="Loading today's astronomical image and its description...">
                    <i className="fa-solid fa-gear" aria-hidden="true"></i>
                </div>}
            {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal}/>)}
            {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>)}
        </>
    )
}
