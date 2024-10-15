import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

const CampoSelect = () => {
    const [actividad, setactividad] = useState('')
    const [fecha, setfecha] = useState('')
    const [tiempo, settiempo] = useState(0)
    const [actividades, setactividades] = useState([])
    const [suma, setSuma] = useState(0)

    const recibirDatos = (e) => {
        e.preventDefault()
        const dia = new Date(fecha).getUTCDate()
        const nuevaactividad = { actividad, dia, tiempo}
        setactividades([...actividades, nuevaactividad])
        const nuevoti=parseInt(tiempo) || 0
        const nuevotiempo = suma + nuevoti
        
        settiempo(0)
        setfecha('')
        setactividad('')
        setSuma(nuevotiempo)
        console.log('Actividad', actividad);
        console.log(dia)
        console.log(tiempo)
        console.log('suma total:', nuevotiempo);
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
                <button type="onsubmit" className="btn btn-primary m-3">Enviar</button>
            </form>
            <div className="container">
            <table className="table border">
                <thead className="fs-bold fs-4 border">
                    <tr>
                        <td>Actividad</td>
                        <td>Fecha</td>
                        <td>Tiempo</td>
                    </tr>
                </thead>
                <tbody>
                    {actividades.map((acti, index) => (
                        <tr key={index}>
                            <td>{acti.actividad}</td>
                            <td>{acti.dia}</td>
                            <td>{acti.tiempo}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2}>Total:</td>
                        <td><strong>{suma}</strong></td>
                    </tr>
                </tfoot>
            </table>
            </div>
        </div>


    )
}
export default CampoSelect