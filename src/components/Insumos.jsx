import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Insumos = ({ setTotalCostos }) => {
    const [actividad, setActividad] = useState('');
    const [insumo, setInsumo] = useState('');
    const [costo, setCosto] = useState(0);
    const [actividades, setActividades] = useState([]);
    const [suma, setSuma] = useState(0);

    // Cargar datos desde localStorage al iniciar
    useEffect(() => {
        const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades')) || [];
        const sumaGuardada = JSON.parse(localStorage.getItem('sumaInsumos')) || 0;

        setActividades(actividadesGuardadas);
        setSuma(sumaGuardada);
        setTotalCostos(prevTotal => prevTotal + sumaGuardada);
    }, [setTotalCostos]);

    // Guardar actividades y suma en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem('actividades', JSON.stringify(actividades));
        localStorage.setItem('sumaInsumos', JSON.stringify(suma));
    }, [actividades, suma]);

    const recibirDatos = (e) => {
        e.preventDefault();
        const nuevoCosto = parseInt(costo) || 0;
        const nuevaActividad = { actividad, insumo, costo: nuevoCosto };

        setActividades([...actividades, nuevaActividad]);
        setSuma(prevSuma => prevSuma + nuevoCosto);
        setTotalCostos(prevTotal => prevTotal + nuevoCosto);

        // Limpiar campos después de guardar
        setCosto(0);
        setInsumo('');
        setActividad('');

        console.log('Actividad:', actividad);
        console.log('Insumo:', insumo);
        console.log('Costo:', nuevoCosto);
        console.log('Suma total:', suma + nuevoCosto);
    };

    const formatomoneda = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="d-flex mt-5 bg-info text-white rounded-5">
            <form onSubmit={recibirDatos} className="p-5">
                <h3 className="text-center">Registro de Egresos Insumos</h3>
                <label htmlFor="actividad"><b>Actividad:</b></label>
                <select value={actividad} className="form-control" onChange={(e) => setActividad(e.target.value)}>
                    <option value=""></option>
                    <option value="decuacion terreno">Deacuación Terreno</option>
                    <option value="siembra y transplante">Siembra y Transplante</option>
                    <option value="fertilizacion">Fertilización</option>
                </select>
                <label htmlFor="insumos"><b>Insumos:</b></label>
                <input type="text" className="form-control my-3" value={insumo} onChange={(e) => setInsumo(e.target.value)} />
                <label htmlFor="costo"><b>Costo:</b></label>
                <input type="number" className="form-control" value={costo} onChange={(e) => setCosto(e.target.value)} />
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
    );
};

export default Insumos;
