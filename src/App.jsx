import { useState, useEffect } from "react";

const API_A = "http://localhost:9091";
const API_B = "http://localhost:9092";

function App() {
  const [seccion, setSeccion] = useState("rutas");
  const [almacen, setAlmacen] = useState("A");
  const [rutas, setRutas] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const api = almacen === "A" ? API_A : API_B;

  useEffect(() => {
    if (seccion === "rutas") cargarRutas();
    if (seccion === "conductores") cargarConductores();
  }, [seccion, almacen]);

  const cargarRutas = async () => {
    try {
      const res = await fetch(`${api}/rutas`);
      const data = await res.json();
      setRutas(data);
    } catch { setRutas([]); }
  };

  const cargarConductores = async () => {
    try {
      const res = await fetch(`${api}/conductores`);
      const data = await res.json();
      setConductores(data);
    } catch { setConductores([]); }
  };

  const crearRuta = async (e) => {
    e.preventDefault();
    const ruta = {
      origen: e.target.origen.value,
      destino: e.target.destino.value,
      distanciaKm: parseFloat(e.target.distancia.value),
      estado: "ACTIVA"
    };
    await fetch(`${api}/rutas`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(ruta) });
    setMensaje("Ruta creada exitosamente");
    e.target.reset();
    cargarRutas();
    setTimeout(() => setMensaje(""), 3000);
  };

  const crearConductor = async (e) => {
    e.preventDefault();
    const conductor = {
      nombre: e.target.nombre.value,
      licencia: e.target.licencia.value,
      telefono: e.target.telefono.value,
      estado: "ACTIVO"
    };
    await fetch(`${api}/conductores`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(conductor) });
    setMensaje("Conductor registrado exitosamente");
    e.target.reset();
    cargarConductores();
    setTimeout(() => setMensaje(""), 3000);
  };

  const eliminarConductor = async (id) => {
    await fetch(`${api}/conductores/${id}`, { method: "DELETE" });
    setMensaje("Conductor eliminado");
    cargarConductores();
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Logística de Envíos Globales</h1>
            <p className="text-blue-300 text-sm">Sistema de gestión de rutas y conductores</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setAlmacen("A")}
              className={`px-4 py-2 rounded font-semibold ${almacen === "A" ? "bg-white text-blue-900" : "bg-blue-700 text-white"}`}>
              Almacén A
            </button>
            <button onClick={() => setAlmacen("B")}
              className={`px-4 py-2 rounded font-semibold ${almacen === "B" ? "bg-white text-blue-900" : "bg-blue-700 text-white"}`}>
              Almacén B
            </button>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-white shadow px-6">
        <div className="max-w-6xl mx-auto flex gap-4">
          {["rutas", "conductores", "nueva-ruta", "nuevo-conductor"].map(s => (
            <button key={s} onClick={() => setSeccion(s)}
              className={`py-3 px-4 font-medium border-b-2 ${seccion === s ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"}`}>
              {s === "rutas" ? "Rutas" : s === "conductores" ? "Conductores" : s === "nueva-ruta" ? "Nueva Ruta" : "Nuevo Conductor"}
            </button>
          ))}
        </div>
      </nav>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto p-6">
        {mensaje && <div className="bg-green-100 text-green-800 p-3 rounded mb-4 font-medium">{mensaje}</div>}

        {/* Rutas */}
        {seccion === "rutas" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Rutas — Almacén {almacen}</h2>
            {rutas.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500 shadow">No hay rutas registradas aún.</div>
            ) : (
              <div className="grid gap-4">
                {rutas.map((r, i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{r.origen} → {r.destino}</p>
                      <p className="text-sm text-gray-500">{r.distanciaKm} km</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${r.estado === "ACTIVA" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {r.estado}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Conductores */}
        {seccion === "conductores" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Conductores — Almacén {almacen}</h2>
            {conductores.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500 shadow">No hay conductores registrados aún.</div>
            ) : (
              <div className="grid gap-4">
                {conductores.map((c, i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{c.nombre}</p>
                      <p className="text-sm text-gray-500">Licencia: {c.licencia} | Tel: {c.telefono}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{c.estado}</span>
                      <button onClick={() => eliminarConductor(c.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Nueva Ruta */}
        {seccion === "nueva-ruta" && (
          <div className="bg-white rounded-lg shadow p-6 max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Nueva Ruta — Almacén {almacen}</h2>
            <form onSubmit={crearRuta} className="flex flex-col gap-4">
              <input name="origen" placeholder="Ciudad de origen" required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input name="destino" placeholder="Ciudad de destino" required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input name="distancia" type="number" placeholder="Distancia en km" required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button type="submit" className="bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800">Crear Ruta</button>
            </form>
          </div>
        )}

        {/* Nuevo Conductor */}
        {seccion === "nuevo-conductor" && (
          <div className="bg-white rounded-lg shadow p-6 max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Nuevo Conductor — Almacén {almacen}</h2>
            <form onSubmit={crearConductor} className="flex flex-col gap-4">
              <input name="nombre" placeholder="Nombre completo" required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input name="licencia" placeholder="Número de licencia" required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input name="telefono" placeholder="Teléfono" required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button type="submit" className="bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800">Registrar Conductor</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;