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
        <div className="d-flex mt-5 bg-success text-white rounded-5">
            <form onSubmit={recibirDatos} className="shadow-lg p-5">
                <h3 className="text-center">Registro de Egresos insumos</h3>
                <label htmlFor="actividad"><b>Actividad:</b></label>
                <select value={actividad} className="form-control" onChange={(e) => setactividad(e.target.value)}>
                    <option value=""></option>
                    <option value="decuacion terreno">decuacion terreno</option>
                    <option value="siembra y transplante">siembra y transplante</option>
                    <option value="fertilizacion">fertilizacion</option>
                </select>
                <label htmlFor="insumos"><b>Insumos:</b></label>
                <input type="text" className="form-control my-3" value={insumo} onChange={(e) => setinsumo(e.target.value)} />
                <label htmlFor="costo"><b>Costo:</b></label>
                <input type="number" className="form-control" value={costo} onChange={(e) => setcosto(e.target.value)} />
                <button type="submit" className="btn btn-primary m-3">Enviar</button>
            </form>
            <div className="container p-3">
                <h3 className="text-center">Egresos Insumos</h3>
                <table className="table border shadow-lg">
                    <thead className="fs-bold fs-4 table-primary">
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
                            <td className="bg-warning"><strong>{formatomoneda(suma)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Insumos
