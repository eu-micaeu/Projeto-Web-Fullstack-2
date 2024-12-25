import { useEffect, useState } from 'react';
import './Main.css';

function Main() {

    const [cars, setCars] = useState([]); 

    const [error, setError] = useState(null); 

    useEffect(() => {

        fetch('http://localhost:3000/api/cars/listCars')

            .then(response => {

                if (!response.ok) {

                    throw new Error('Erro ao buscar os carros');

                }

                return response.json();

            })

            .then(data => setCars(data)) 

            .catch(error => setError(error.message)); 

    }, []); 

    return (

        <main>

            <h1>Home</h1>

            {error && <p>{error}</p>} 

            <ul>

                {cars.length > 0 ? (

                    cars.map((car) => (

                        <li key={car.car_id}>

                            {car.brand} - {car.model}

                        </li>

                    ))

                ) : (

                    <p>Carregando carros...</p>

                )}

            </ul>

        </main>

    );

}

export default Main;