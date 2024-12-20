import React, { useState } from "react"
import CampoSelect from "./CampoSelect"
import Insumos from "./Insumos"
import Ventas from "./Ventas"
import 'bootstrap/dist/css/bootstrap.min.css'

const Totales = () => {
    const [totalManoObra, setTotalManoObra] = useState(0)
    const [totalCostos, setTotalCostos] = useState(0)
    const [totalIngresos, setTotalIngresos] = useState(0)

    const formatomoneda = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }

    const calcularRentabilidad = () => {
        const totalEgresos = totalManoObra + totalCostos
        const rentabilidad = totalEgresos > 0 ? totalIngresos / totalEgresos : 0
        return rentabilidad
    }

    return (
        <div className="container mt-5">
            <CampoSelect setTotalManoObra={setTotalManoObra}/>
            <Insumos setTotalCostos={setTotalCostos} />
            <Ventas setTotalIngresos={setTotalIngresos} />
            <div className="container my-5 rounded-5 p-3">
                <table className="table">
                    <thead className="fs-bold fs-4 border table-success rounded-5">
                        <tr>
                            <th>Nombre tabla</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3">Total Mano de Obra:</td>
                            <td className="p-3"><strong>{formatomoneda(totalManoObra)}</strong></td>
                        </tr>
                        <tr>
                            <td className="p-3">Total Egresos Insumos:</td>
                            <td className="p-3"><strong>{formatomoneda(totalCostos)}</strong></td>
                        </tr>
                        <tr>
                            <td className="p-3">Total Egresos:</td>
                            <td className="bg-danger p-3"><strong>{formatomoneda(totalManoObra + totalCostos)}</strong></td>
                        </tr>
                        <tr>
                            <td className="p-3">Total Ingresos:</td>
                            <td className="bg-warning p-3"><strong>{formatomoneda(totalIngresos)}</strong></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="p-3" colSpan={1}>Rentabilidad Costo-Valor</td>
                            <td className="bg-success p-3"><strong>{calcularRentabilidad().toFixed(2)}</strong></td>
                            
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Totales

