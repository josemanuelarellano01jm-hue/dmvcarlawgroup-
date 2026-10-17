const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/fotos', express.static(path.join(__dirname, 'fotos')));

// Vista principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Base de datos SQLite en memoria
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            id_cliente TEXT PRIMARY KEY,
            nombre TEXT,
            direccion TEXT,
            estado TEXT,
            tipo_licencia TEXT,
            correo TEXT,
            foto_url TEXT,
            foto_doc_url TEXT,
            fecha_nacimiento TEXT,
            sexo TEXT,
            estatura TEXT,
            peso TEXT,
            color_ojos TEXT,
            color_cabello TEXT,
            telefono TEXT,
            pin TEXT,
            documento TEXT DEFAULT 'Pending'
        )
    `);

    // TODOS LOS CLIENTES (18 originales + 1 de prueba = 19)
    const clientes = [
        // ========== CLIENTE DE PRUEBA (usar para verificar) ==========
        {
            id_cliente: 'TEST001',
            nombre: 'CLIENTE DE PRUEBA',
            direccion: '123 TEST STREET, MIAMI, FL 33101',
            estado: 'FLORIDA',
            tipo_licencia: 'CLASS E',
            correo: 'test@dmvcar.com',
            foto_url: '',
            foto_doc_url: '',
            fecha_nacimiento: '1990-01-15',
            sexo: 'M',
            estatura: `5'10"`,
            peso: '170 lb',
            color_ojos: 'BROWN',
            color_cabello: 'BLACK',
            telefono: '555-123-4567',
            pin: '123',
            documento: 'Approval'
        },
        // ========== CLIENTES ORIGINALES ==========
       
        {
            id_cliente: 'Y0706965',
            nombre: 'CARLOS ALBERTO RODRIGUEZ PINEDA',
            direccion: '15297 BITTNER PL MOORPARK CA 93021',
            estado: 'CALIFORNIA',
            tipo_licencia: 'REGULAR',
            correo: 'NONE',
            foto_url: '/fotos/carlos rodriguez.png',
            foto_doc_url: '/fotos/carlos rodriguez.doc.png',
            fecha_nacimiento: '1980-09-19',
            sexo: 'M',
            estatura: `5'06"`,
            peso: '187 lb',
            color_ojos: 'BLACK',
            color_cabello: 'BLACK',
            telefono: '3478068079',
            pin: '',
            documento: 'Pending'
        },
        {
            id_cliente: '050685014',
            nombre: 'FLORES MARTINEZ MANUEL DE JESUS',
            direccion: '4214 MAGNOLIA PL GAINESVILLE GA 30504-5893',
            estado: 'GEORGIA',
            tipo_licencia: 'REGULAR',
            correo: 'manuelfloresmar1@yahoo.com',
            foto_url: '/fotos/manueld.png',
            foto_doc_url: '/fotos/manuel.doc.png',
            fecha_nacimiento: '1968-12-31',
            sexo: 'M',
            estatura: `5'06"`,
            peso: '180 lb',
            color_ojos: 'BROWN',
            color_cabello: 'BLACK',
            telefono: '',
            pin: '',
            documento: 'Pending'
       },
        
   {
  id_cliente: 'R520-558-83-024-0',
  nombre: 'REYNOSO MILTON V',
  direccion: '9417 WINDERMERE PARK CIR 202, RIVERVIEW, FL 33578-2573',
  estado: 'FLORIDA',
  tipo_licencia: 'REAL ID',
  correo: 'Miltonreynoso633@gmail.com',
  foto_url: '/fotos/reynosso.png',
  foto_doc_url: '/fotos/milton.doc.png',
  fecha_nacimiento: '1983-01-24',
  sexo: 'M',
  estatura: `5'05"`,
  peso: 'N/A',
  color_ojos: 'DARK',
  color_cabello: 'BLACK',
  telefono: '',
  pin: '',
  documento: 'Pending'
},

   {
        id_cliente: 'G305111141',
  nombre: 'GONZALEZ GONZALEZ MARTIN',
  direccion: '160 skyln ECRU ms 38841',
  estado: 'MISSISSIPPI',
  tipo_licencia: 'REGULAR',
  correo: 'Martingonzalez0821@gmial.com',
  foto_url: '/fotos/martin.png',
  foto_doc_url: '/fotos/gonzalez.doc.png',
  fecha_nacimiento: '1965-08-21',
  sexo: 'M',
  estatura: `6'07"`,
  peso: '197LB',
  color_ojos: 'GREEN',
  color_cabello: 'BLACK',
  telefono: '(662) 308-7203',
  pin: '',
  status: 'Pending'
 }, 

{
     id_cliente: 'D661549900',
  nombre: 'FRESIA YEPES AGUDELO',
  direccion: '2125 ALDRIN RD, APT 1B OCEAN TWP NJ 07712',
  estado: 'NEW JERSEY',
  tipo_licencia: 'REGULAR',
  correo: 'Fresiayepes97@gmail.com',
  foto_url: '/fotos/fresa.png',
  foto_doc_url: '/fotos/FRESSA,doc.png',
  fecha_nacimiento: '1960-08-21',
  sexo: 'F',
  estatura: '5\'0"\'',
  peso: '160 LB',
  color_ojos: 'BROWN',
  color_cabello: 'BROWN',
  telefono: '732 822-1853',
  pin: '',
  status: 'Pending'
 },
        
{
     id_cliente: 'Y0706960',
  nombre: 'LUCAS HERNANDEZ ZENAIDO',
  direccion: '625 Rucker ave Gilroy CA',
  estado: 'CALIFORNIA',
  tipo_licencia: 'REGULAR',
  correo: 'Zenaidolucashernandez@gmail.com',
  foto_url: '/fotos/lucas.png',
  foto_doc_url: '/fotos/hernandez.doc.png',
  fecha_nacimiento: '2001-01-18',
  sexo: 'M',
  estatura: '5\'2"',
  peso: '162 LB',
  color_ojos: 'BLACK',
  color_cabello: 'BLACK',
  telefono: '805 260-8805',
  pin: '',
  status: 'Pending'
 },

{
id_cliente: '33074326',
  nombre: 'LORENZO RICON ELPIDIO',
  direccion: '725 JESSOP PL YORK, PA 17401',
  estado: 'PENNSYLVANIA',
  tipo_licencia: 'REGULAR',
  correo: 'GUILLERMOLORENZO1204@gmail.com',
  foto_url: '/fotos/lorenzo.png',
  foto_doc_url: '/fotos/lorenzo.doc.png',
  fecha_nacimiento: '1956-01-09',
  sexo: 'M',
  estatura: '5\'11"',
  peso: '162 LB',
  color_ojos: 'BLACK',
  color_cabello: 'NONE',
  telefono: '8495801353',
  pin: '',
  status: 'Pending'
},

{
        id_cliente: 'C3246290',
  nombre: 'PÉREZ ALFREDO VILLELA',
  direccion: '1501 IMPERIAL AVE SAN DIEGO, CA 92101',
  estado: 'CALIFORNIA',
  tipo_licencia: 'CLASS C',
  correo: 'fredyalfredoperez357@gmail.com',
  foto_url: '/fotos/alfredo.png',
  foto_doc_url: '/fotos/alfredo.doc.png',
  fecha_nacimiento: '1961-11-19',
  sexo: 'M',
  estatura: '5\'05"',
  peso: '',
  color_ojos: 'OSCUROS',
  color_cabello: 'BLANCO',
  telefono: '8495801353',
  pin: '123',
  status: 'Pending'
  },    

{
 id_cliente: '119072101',
  nombre: 'COELHO RODRIGUES JOSÉ',
  direccion: '3237 54TH ST FLUSHING, NY 11377',
  estado: 'NEW YORK',
  tipo_licencia: 'CLASE D',
  correo: 'Jrcoelho1407@hotmail.com',
  foto_url: 'fotos/josee.png',
  foto_doc_url: 'fotos/jose.doc.png',
  fecha_nacimiento: '1948-06-06',
  sexo: 'M',
  estatura: '5\'04"',
  peso: '100LB',
  color_ojos: 'BLACK',
  color_cabello: 'BLACK',
  telefono: '8572464247',
  pin: '',
  status: 'Pending'
    }, 


        {
  id_cliente: '33320266',
  nombre: 'MEJÍA MORERA ABRAHAM',
  direccion: '5 W 11TH ST HAZLETON, PA 18201-3204',
  estado: 'PENSILVANIA',
  tipo_licencia: 'REGULAR',
  correo: 'abrahanmejia681@gmail.com',
  foto_url: 'fotos/abraham .png',
  foto_doc_url: 'fotos/ABRAHAM.doc.png',
  fecha_nacimiento: '1977-10-12',
  sexo: 'M',
  estatura: '5\'08"',
  peso: '140LB',
  color_ojos: 'BLACK',
  color_cabello: 'BLACK',
  telefono: '8572464247',
  pin: '123',
  status: 'Pending'
},

{
  id_cliente: '22045264',
  nombre: 'PRIETO MORENO ARTURO',
  direccion: '1939 S GOODNIGHT TRL ODESSA TX 79763',
  estado: 'TEXAS',
  tipo_licencia: 'REGULAR',
  correo: 'Arturoprieto913@gmail.com',
  foto_url: 'fotos/arturitoo.jpeg',
  foto_doc_url: 'fotos/arturito.doc.jpeg',
  fecha_nacimiento: '1958-07-28',
  sexo: 'M',
  estatura: '5\'11"',
  peso: '220 LB',
  color_ojos: 'BROWN',
  color_cabello: 'BLACK',
  telefono: '8572464247',
  pin: '',
  status: 'Pending'
},    

{
  id_cliente: 'C616145915000', // Conservado o actualizable según tu sistema
  nombre: 'CASTILLO MARTÍNEZ RIGOBERTO',
  direccion: '5461 NW 36TH TERRACE, FT LAUDERDALE, FL 33309',
  estado: 'FLORIDA',
  tipo_licencia: 'REGULAR',
  correo: 'Rigobertocastillo485@gmail.com',
  foto_url: '/fotos/rigobertoo.png',
  foto_doc_url: '/fotos/RIGOBERTO.doc.png',
  fecha_nacimiento: '1983-05-19',
  sexo: 'M',
  estatura: '5\'05"',
  peso: '80 kg',
  color_ojos: 'NEGROS',
  color_cabello: 'NEGRO',
  telefono: '754 2242933',
  pin: '',
  status: 'Pending'
},


{
  id_cliente: '253 123 928',
  nombre: 'PINEDA GARCÍA MARIO ROBERTO',
  direccion: '25D CASTLETON AVE STATEN ISLAND, NY 10301',
  estado: 'NEW YORK',
  tipo_licencia: 'REGULAR D',
  correo: 'robertbtp24@gmail.com', 
  foto_url: 'fotos/PINEDA.png',
  foto_doc_url: 'fotos/pineda.doc.png',
  fecha_nacimiento: '1973-06-07',
  sexo: 'M',
  estatura: '5\'03"',
  peso: '180LB',
  color_ojos: 'BLACK',
  color_cabello: 'BLACK',
  telefono: '6109902225', 
  fecha_vencimiento: '2031-06-07',
  pin: '',
  status: 'Pending'
},


{
  id_cliente: 'Y0357961', 
  nombre: 'CARRERA AGUILAR SEBASTIÁN',
  direccion: '1632 SEGUNDA STREET RICHMOND, CA 94801',
  estado: 'CALIFORNIA',
  tipo_licencia: 'REGULAR',
  correo: 'Sebastianaguilar1574@iCloud.com',
  foto_url: 'fotos/sebastian.png', 
  foto_doc_url: 'fotos/SEBASTIAN.doc.png',
  fecha_nacimiento: '1974-12-21',
  sexo: 'M', 
  estatura: '5\'08"',
  peso: '195LB',
  color_ojos: 'BLACK',
  color_cabello: 'BLACK',
  telefono: '415 553 0091',
  fecha_vencimiento: '21/12/1974',
  pin: '', // 
  status: 'Pending'
},
        
 {
  id_cliente: 'Y0357961',
  nombre: 'CARRANZA CAMPOS OFELIA',
  direccion: '5467 TYHURST WALKWAY, APT 1 SAN JOSÉ, CA 95123',
  estado: 'CALIFORNIA',
  tipo_licencia: 'REGULAR C',
  correo: 'Carranofelia@yahoo.com',
  foto_url: 'fotos/carranzaz.png',
  foto_doc_url: 'fotos/carranza.doc.png',
  fecha_nacimiento: '1968-02-07',
  sexo: 'F',
  estatura: '5"5', // O "5'5" usando comillas dobles afuera
  peso: '195LB',
  color_ojos: 'BRN',
  color_cabello: 'BLACK',
  telefono: 4083408580,
  pin:,
  status: 'Pending'
};      
    ];

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO clientes (
            id_cliente, nombre, direccion, estado, tipo_licencia, correo, foto_url, foto_doc_url,
            fecha_nacimiento, sexo, estatura, peso, color_ojos, color_cabello, telefono, pin, documento
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const c of clientes) {
        stmt.run(
            c.id_cliente, c.nombre, c.direccion, c.estado, c.tipo_licencia, c.correo, 
            c.foto_url, c.foto_doc_url || '', c.fecha_nacimiento, c.sexo, c.estatura, 
            c.peso, c.color_ojos, c.color_cabello, c.telefono, c.pin || '', c.documento || 'Pending'
        );
    }
    stmt.finalize();
    console.log(`✅ ${clientes.length} clientes cargados correctamente.`);
    console.log(`🔧 Cliente de prueba disponible: TEST001 / CLIENTE DE PRUEBA (PIN: 123)`);
});

// API Routes
app.post('/api/verificar', (req, res) => {
    const { nombre, id_cliente } = req.body;
    const nombreNormalizado = nombre ? nombre.trim().toLowerCase() : null;
    const idClienteNormalizado = id_cliente ? id_cliente.trim().toUpperCase() : null;

    if (!nombreNormalizado && !idClienteNormalizado) {
        return res.status(400).json({ success: false, error: 'Se requiere nombre o id_cliente para verificar.' });
    }

    const query = `SELECT * FROM clientes WHERE (? IS NOT NULL AND LOWER(nombre) = ?) OR (? IS NOT NULL AND UPPER(id_cliente) = ?)`;
    
    db.get(query, [nombreNormalizado, nombreNormalizado, idClienteNormalizado, idClienteNormalizado], (err, fila) => {
        if (err) {
            console.error('Error al verificar cliente:', err.message);
            return res.status(500).json({ success: false, error: 'Error interno del servidor.' });
        }
        res.json({ success: !!fila, datos: fila || null });
    });
});

app.get('/api/clientes', (req, res) => {
    db.all("SELECT * FROM clientes", [], (err, filas) => {
        if (err) {
            console.error('Error al obtener clientes:', err.message);
            return res.status(500).json({ success: false, error: 'Error interno del servidor.' });
        }
        res.json(filas);
    });
});

app.put('/api/clientes/:id_cliente/documento', (req, res) => {
    const { documento } = req.body;
    const { id_cliente } = req.params;

    if (!documento || typeof documento !== 'string') {
        return res.status(400).json({ success: false, error: 'El campo "documento" es requerido.' });
    }

    db.run("UPDATE clientes SET documento = ? WHERE UPPER(id_cliente) = UPPER(?)", [documento.trim(), id_cliente.trim()], function(err) {
        if (err) {
            console.error('Error al actualizar documento:', err.message);
            return res.status(500).json({ success: false, error: 'Error interno del servidor.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, error: `No se encontró el cliente con id: ${id_cliente}` });
        }
        res.json({ success: true, changes: this.changes });
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 Servidor DMV activo en puerto: ${PORT}`);
    console.log(`========================================`);
    console.log(`📝 Datos de prueba para verificar:`);
    console.log(`   - ID: TEST001`);
    console.log(`   - Nombre: CLIENTE DE PRUEBA`);
    console.log(`   - PIN: 123`);
    console.log(`========================================`);
});
