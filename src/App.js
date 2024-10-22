import React, { useState } from "react"
import CampoSelect from "./components/CampoSelect" 
import Insumos from "./components/Insumos" 
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
    const [totalManoObra, setTotalManoObra] = useState(0)
    const [totalCostos, setTotalCostos] = useState(0)

    const formatomoneda = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }

    return (
        <div className="container mt-4">
            <h1>Registro de Actividades</h1>
            <CampoSelect setTotalManoObra={setTotalManoObra} />
            <Insumos setTotalCostos={setTotalCostos} />
            <h2>Totales</h2>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Total Mano de Obra:</td>
                        <td><strong>{formatomoneda(totalManoObra)}</strong></td>
                    </tr>
                    <tr>
                        <td>Total Egresos Insumos:</td>
                        <td><strong>{formatomoneda(totalCostos)}</strong></td>
                    </tr>
                    <tr>
                        <td>Total General:</td>
                        <td><strong>{formatomoneda(totalManoObra + totalCostos)}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default App

