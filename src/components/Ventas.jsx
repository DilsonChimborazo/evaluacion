import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Ventas = ({ setTotalIngresos }) => {
    const [producto, setProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState(0);
    const [productos, setProductos] = useState([]);
    const [suma, setSuma] = useState(0);

    const recibirDatos = (e) => {
        e.preventDefault();
        const nuevoCosto = parseInt(costo) || 0;
        const nuevoProducto = { producto, descripcion, costo: nuevoCosto };

        setProductos([...productos, nuevoProducto]);
        setSuma(prevSuma => prevSuma + nuevoCosto);
        setTotalIngresos(prevIngresos => prevIngresos + nuevoCosto);


        setCosto(0);
        setDescripcion('');
        setProducto('');
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
        <div className="d-flex mt-5 bg-success text-white rounded-5">
            <form onSubmit={recibirDatos} className="p-5">
                <h3 className="text-center">Registro de Ventas</h3>
                <label htmlFor="producto"><b>Producto:</b></label>
                <select value={producto} className="form-control" onChange={(e) => setProducto(e.target.value)}>
                    <option value=""></option>
                    <option value="tomate">Tomate</option>
                    <option value="cebolla">Cebolla</option>
                    <option value="repollo">Repollo</option>
                </select>
                <label htmlFor="descripcion"><b>Descripción:</b></label>
                <input type="text" className="form-control my-3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <label htmlFor="costo"><b>Costo:</b></label>
                <input type="number" className="form-control" value={costo} onChange={(e) => setCosto(e.target.value)} />
                <button type="submit" className="btn btn-primary m-3">Enviar</button>
            </form>
            <div className="container p-3">
                <h3 className="text-center">Ventas</h3>
                <table className="table border shadow-lg">
                    <thead className="fs-bold fs-4 table-primary">
                        <tr>
                            <td>Producto</td>
                            <td>Descripción</td>
                            <td>Costo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((prod, index) => (
                            <tr key={index}>
                                <td>{prod.producto}</td>
                                <td>{prod.descripcion}</td>
                                <td>{formatomoneda(prod.costo)}</td>
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

export default Ventas;