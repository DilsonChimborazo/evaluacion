import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Insumos.css'

const Insumos = ({ setTotalCostos }) => {
    const [actividad, setActividad] = useState('')
    const [insumo, setInsumo] = useState('')
    const [costo, setCosto] = useState(0)
    const [actividades, setActividades] = useState([])
    const [suma, setSuma] = useState(0)


    useEffect(() => {
        const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades')) || []
        const sumaGuardada = JSON.parse(localStorage.getItem('sumaInsumos')) || 0

        setActividades(actividadesGuardadas)
        setSuma(sumaGuardada)
        setTotalCostos(prevTotal => prevTotal + sumaGuardada)
    }, [setTotalCostos])

    useEffect(() => {
        localStorage.setItem('actividades', JSON.stringify(actividades))
        localStorage.setItem('sumaInsumos', JSON.stringify(suma))
    }, [actividades, suma])

    const recibirDatos = (e) => {
        e.preventDefault()
        const nuevoCosto = parseInt(costo) || 0;
        const nuevaActividad = { actividad, insumo, costo: nuevoCosto }

        setActividades([...actividades, nuevaActividad])
        setSuma(prevSuma => prevSuma + nuevoCosto)
        setTotalCostos(prevTotal => prevTotal + nuevoCosto)

        setCosto(0)
        setInsumo('')
        setActividad('')

        console.log('Actividad:', actividad)
        console.log('Insumo:', insumo)
        console.log('Costo:', nuevoCosto)
        console.log('Suma total:', suma + nuevoCosto)
    }

    const formatomoneda = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    return (
        <div className="Insumos d-flex mt-5 text-white rounded-4">
            <form onSubmit={recibirDatos} className="p-3">
                <h3 className="text-center">Registro de Egresos Insumos</h3>
                <label htmlFor="actividad"><b>Actividad:</b></label>
                <select value={actividad} className="form-control" id="actividad" onChange={(e) => setActividad(e.target.value)}>
                <option value=""></option>
                    <option value="Adecuacion terreno">Adecuación terreno</option>
                    <option value="Siembra y transplante">Siembra y transplante</option>
                    <option value="Fertilización y enmiendas">Fertilización y enmiendas</option>
                    <option value="control de arvenses">control de arvenses</option>
                    <option value="Control fitosanitario">Control fitosanitario</option>
                    <option value="Riego">Riego</option>
                    <option value="Labores Agroculturales">Labores Agroculturales</option>
                    <option value="Cosecha y pos cosecha">Cosecha y pos cosecha</option>
                </select>
                <label htmlFor="insumos"><b>Insumos:</b></label>
                <input type="text" className="form-control my-3" id="insumos" value={insumo} onChange={(e) => setInsumo(e.target.value)} />
                <label htmlFor="costo"><b>Costo:</b></label>
                <input type="number" className="form-control" id="costo" value={costo} onChange={(e) => setCosto(e.target.value)} />
                <div className="text-center">
                    <button type="submit" className="btn btn-primary m-3">Enviar</button>
                </div>
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
