import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuid } from 'uuid'
import { FaTemperatureHigh, FaWind } from 'react-icons/fa'

function App() {
  const [procurar, setProcurar] = useState('')
  const [tempo, setTempo] = useState(null)
  const [cidade, setCidade] = useState('')
  //const [loading, setLoading] = useState('')

  const traducaoTempo = {
    'Partly cloudy': 'Parcialmente nublado',
    Clear: 'Tempo limpo',
    'Heavy rain, mist': 'Chuva forte e neblina',
    'Light snow': 'Leve neve',
    Sunny: 'Ensolarado',
    'Rain with thunderstorm': 'Chuva com tempestade',
    'Parchy rain possible': 'Possibilidade de Chuva'
  }

  function handleSubmit(event) {
    event.preventDefault()
    setCidade(procurar)
    console.log(procurar)
  }

  useEffect(() => {
    async function getVerificarTempo() {
      const response = await fetch(
        `https://goweather.herokuapp.com/weather/${procurar}`
      )
      const data = await response.json()
      setTempo(data)
      console.log(data)
    }

    getVerificarTempo()
  }, [cidade])

  return (
    <div>
      <form action=" " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ex: Curitiba"
          value={procurar}
          onChange={(event) => setProcurar(event.target.value)}
        />
        <button type="submit">Pesquisar cidade </button>
      </form>

      {cidade && tempo && (
        <>
          <h1>{cidade}</h1>
          <h2>Tempo atual</h2>
          <p>{tempo.temperature}</p>
          {traducaoTempo[tempo.description]
            ? traducaoTempo[tempo.description]
            : tempo.description}

          <main>
            <section className="Previsao">
              <h2>Previsão</h2>
              <ul>
                {tempo.forecast.map((previsaoDia, index) => {
                  return (
                    <li key={uuid()}>
                      <h3>
                        {index == 0
                          ? 'Amanhã'
                          : Intl.DateTimeFormat('pt-BR', {
                              weekday: 'long'
                            }).format(
                              new Date().setDate(
                                new Date().getDate() + index + 1
                              )
                            )}
                      </h3>
                      <div>
                        <FaTemperatureHigh />
                        <p>{previsaoDia.temperature}</p>
                      </div>
                      <div>
                        <FaWind />
                        <p>{previsaoDia.wind}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          </main>
        </>
      )}
    </div>
  )
}

export default App
