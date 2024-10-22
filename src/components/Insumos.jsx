import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

const Insumos = ({ setTotalCostos }) => {
    const [actividad, setactividad] = useState('')
    const [insumo, setinsumo] = useState('')
    const [costo, setcosto] = useState(0)
    const [actividades, setactividades] = useState([])
    const [suma, setSuma] = useState(0)

    const recibirDatos = (e) => {
        e.preventDefault()
        const nuevocosto = parseInt(costo) || 0
        const nuevaactividad = { actividad, insumo, costo: nuevocosto }

        setactividades([...actividades, nuevaactividad])
        setSuma(prevSuma => prevSuma + nuevocosto) // Actualiza el total
        setTotalCostos(prevTotal => prevTotal + nuevocosto) // Actualiza el total de costos

        setcosto(0)
        setinsumo('')
        setactividad('')

        console.log('Actividad', actividad)
        console.log(insumo)
        console.log('Costo:', nuevocosto)
        console.log('suma total:', suma + nuevocosto)
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
                    <input type="text" className="form-control my-3" value={insumo} onChange={(e) => setinsumo(e.target.value)} />
                    <input type="number" className="form-control" value={costo} onChange={(e) => setcosto(e.target.value)} />
                </label><br />
                <button type="submit" className="btn btn-primary m-3">Enviar</button>
            </form>
            <div className="container">
                <h2>Egresos Insumos</h2>
                <table className="table border">
                    <thead className="fs-bold fs-4 border">
                        <tr>
                            <td>Actividad</td>
                            <td>Insumos</td>
                            <td>Costos</td>
                        </tr>
                    </thead>
                    <tbody>
                        {actividades.map((acti, index) => (
                            <tr key={index}>
                                <td>{acti.actividad}</td>
                                <td>{acti.insumo}</td>
                                <td>{formatomoneda(acti.costo)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>Total:</td>
                            <td><strong>{formatomoneda(suma)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Insumos
