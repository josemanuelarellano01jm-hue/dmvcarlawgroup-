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
            id_cliente: 'A7810895',
            nombre: 'VASQUEZ ANTONIO SIERRA',
            direccion: '1828 FLORES ST SEASIDE CA 93955',
            estado: 'CALIFORNIA',
            tipo_licencia: 'COMERCIAL',
            correo: 'antoniosierra63@yahoo.com',
            foto_url: '/fotos/antonioo.png',
            foto_doc_url: '/fotos/antonio.doc.png',
            fecha_nacimiento: '1972-07-11',
            sexo: 'M',
            estatura: `5'04"`,
            peso: '140 lb',
            color_ojos: 'BROWN',
            color_cabello: 'BLACK',
            telefono: '8312385293',
            pin: '',
            documento: 'Pending'
        },

{
            id_cliente: 'A7810885', // ID de cliente original
            nombre: 'FELIX GUZMÁN LÓPEZ',
            direccion: '234 S VOLUNTARIO ST APT C SANTA BARBARA CA 93103',
            estado: 'CALIFORNIA',
            tipo_licencia: 'REGULAR',
            correo: 'NONE', // Se asume 'NONE' si no se proporciona correo
            foto_url: '/fotos/felix.png',
            foto_doc_url: '/fotos/felix.doc.png',
            fecha_nacimiento: '1986-06-03',
            sexo: 'M',
            estatura: `5'03"`, // Conversión de 5.32 (se asume pies.pulgadas)
            peso: '143 lb', // Conversión de 65,200 (se asume gramos a libras)
            color_ojos: 'BROWN',
            color_cabello: 'BLACK',
            telefono: '8312385293', // Teléfono original
            pin: '',
            documento: 'Pending'
        },


   {
id_cliente: 'E1848782',
nombre: 'RAMÍREZ NAVARRO HÉCTOR GUADAL',
direccion: '805 ACAPULCO DR, MCFARLAND, CA 93250',
estado: 'CALIFORNIA',
tipo_licencia: 'CDL A',
correo: 'Hector12742@gmail.com',
foto_url: '/fotos/HECTOR.png',
foto_doc_url: '/fotos/LICENCIA HECTOR.doc.png',
fecha_nacimiento: '1989-07-03',
sexo: 'M',
estatura: `6'01"`,
peso: '170 LB',
color_ojos: 'BROWN',
color_cabello: 'AUBURN',
telefono: '',
pin: '123',
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
  id_cliente: '04191975',
  nombre: 'LITO ALBERTO GUERRA MELGAR',
  direccion: '4654 COLORADO RIVER DR, FIRESTONE, CO 80504',
  estado: 'COLORADO',
  tipo_licencia: 'REGULAR',
  correo: 'NONE',
  foto_url: '/fotos/melgar.png',
  foto_doc_url: '/fotos/guerra.doc.png',
  fecha_nacimiento: '1975-04-19',
  sexo: 'M',
  estatura: `5'08"`,
  peso: 'N/A',
  color_ojos: 'HAZEL',
  color_cabello: 'NEGRO',
  telefono: '(505) 780-0825',
  pin: '123',
  documento: 'Pending'
},

   {
        id_cliente: '255924160',
  nombre: 'Pedro Vargas Huertas',
  direccion: '1757 S. FOOTHILL DR. 84108 SALT Lake CITY, UTAH',
  estado: 'UTAH',
  tipo_licencia: 'REGULAR',
  correo: 'Pedrovargas121314@gmail.com',
  foto_url: '/fotos/pedro.png',
  foto_doc_url: '/fotos/pedro.doc.png',
  fecha_nacimiento: '1967-02-22',
  sexo: 'M',
  estatura: '1.60Cm',
  peso: '180LB',
  color_ojos: 'BLACK',
  color_cabello: 'BLACK',
  telefono: '(385) 259-2886',
  pin: '',
  status: 'aprobado'
   },  


  {
  id_cliente: 'Y0706960',
  nombre: 'MARTÍNEZ DULCE ESMERALDA',
  direccion: '18953 ORANGE ST, WOODBRIDGE, CA 95258',
  estado: 'CALIFORNIA',
  tipo_licencia: 'REGULAR',
  correo: 'dulce5martinez@icloud.com',
  foto_url: '/fotos/dulce.png',
  foto_doc_url: '/fotos/dulce.doc.png',
  fecha_nacimiento: '2005-09-11',
  sexo: 'F',
  estatura: `4'10"`,
  peso: '136LB',
  color_ojos: 'BROWN',
  color_cabello: 'BROWN',
  telefono: '(505) 780-0825',
  pin: '123',
  status: 'aprobado'
 },  

        {
        id_cliente: '072226458',
  nombre: 'PATRICIO MORALES RODRÍGUEZ',
  direccion: '10740 JONES BRIDGE RD, ALPHARETTA, GA 30022',
  estado: 'GEORGIA',
  tipo_licencia: 'REGULAR',
  correo: 'patriciomoralesm09@gmail.com',
  foto_url: '/fotos/patricio.png',
  foto_doc_url: '/fotos/patricio.doc.png',
  fecha_nacimiento: '1964-03-17',
  sexo: 'M',
  estatura: `5'02"`,
  peso: '128LB',
  color_ojos: 'BLACK',
  color_cabello: 'BLACK',
  telefono: '(662) 308-7203',
  pin: 'Pending',
  status: 'aprobado'
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
