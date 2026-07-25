import React, { useState } from 'react';
import CreazionePreventivo from './components/pages/CreazionePreventivo';
import DepliantBolnet from './components/pages/DepliantBolnet';
import SidebarMenu from './components/menu/SidebarMenu';

function App() {
  const [pagina, setPagina] = useState('preventivatore');

  return (
    <div>
      {/* IL MENU SEPARATO */}
      <SidebarMenu 
        paginaAttiva={pagina} 
        onSelezionaPagina={(nuovaPagina) => setPagina(nuovaPagina)} 
      />

      {/* VISTA CONTENUTO */}
      {pagina === 'preventivatore' ? <CreazionePreventivo /> : <DepliantBolnet />}
    </div>
  );
}

export default App;
