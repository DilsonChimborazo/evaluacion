import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

const CampoSelect = ({ setTotalManoObra }) => {
    const [actividad, setactividad] = useState('')
    const [fecha, setfecha] = useState('')
    const [tiempo, settiempo] = useState(0)
    const [actividades, setactividades] = useState([])
    const [suma, setSuma] = useState(0)

    const recibirDatos = (e) => {
        e.preventDefault()
        const dia = new Date(fecha).getUTCDate()
        const nuevoti = parseInt(tiempo) || 0
        const nuevotiempo = suma + nuevoti

        const horas = tiempo / 60
        const jornal = horas / 8.5
        const manoobraactividad = jornal * 60000

        const nuevaactividad = { actividad, dia, tiempo, manoobraactividad }

        setactividades([...actividades, nuevaactividad])
        setSuma(nuevotiempo)
        setTotalManoObra(prevTotal => prevTotal + manoobraactividad) 
        settiempo(0)
        setfecha('')
        setactividad('')

        console.log('Actividad', actividad)
        console.log(dia)
        console.log(tiempo)
        console.log('suma total:', nuevotiempo)
        console.log('horas', horas)
        console.log('jornal', jornal)
        console.log('Mano de obra', manoobraactividad)
    }

    const formatomoneda = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }

    return (
        <div>
            <form onSubmit={recibirDatos}>
                <label htmlFor="actividad"><b>Actividad:</b>
                    <select value={actividad} className="form-control" onChange={(e) => setactividad(e.target.value)}>
                        <option value=""></option>
                        <option value="decuacion terreno">decuacion terreno</option>
                        <option value="siembra y transplante">siembra y transplante</option>
                        <option value="fertilizacion">fertilizacion</option>
                    </select>
                    <input type="date" className="form-control my-3" value={fecha} onChange={(e) => setfecha(e.target.value)} />
                    <input type="number" className="form-control" value={tiempo} onChange={(e) => settiempo(e.target.value)} />
                </label><br />
                <button type="submit" className="btn btn-primary m-3">Enviar</button>
            </form>
            <div className="container">
                <h2>Registro diario de campo</h2>
                <table className="table border">
                    <thead className="fs-bold fs-4 border">
                        <tr>
                            <td>Actividad</td>
                            <td>Fecha</td>
                            <td>Tiempo</td>
                            <td>Mano de obra</td>
                        </tr>
                    </thead>
                    <tbody>
                        {actividades.map((acti, index) => (
                            <tr key={index}>
                                <td>{acti.actividad}</td>
                                <td>{acti.dia}</td>
                                <td>{acti.tiempo}</td>
                                <td>{formatomoneda(acti.manoobraactividad)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>Total:</td>
                            <td><strong>{suma}</strong></td>
                            <td><strong>{formatomoneda(actividades.reduce((acc, acti) => acc + acti.manoobraactividad, 0))}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default CampoSelect
