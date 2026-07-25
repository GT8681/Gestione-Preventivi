import React, { useState } from 'react';
import { Button, Offcanvas, Nav } from 'react-bootstrap';

const SidebarMenu = ({ paginaAttiva, onSelezionaPagina }) => {
    const [mostra, setMostra] = useState(false);

    const apriMenu = () => setMostra(true);
    const chiudiMenu = () => setMostra(false);

    const gestisciSelezione = (chiavePagina) => {
        onSelezionaPagina(chiavePagina);
        chiudiMenu();
    };

    return (
        <>
            {/* LINGUETTA SUL BORDO SINISTRO */}
            <div
                onClick={apriMenu}
                className="print-hide d-flex align-items-center justify-content-center"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '0px', // <-- Spostato a sinistra
                    transform: 'translateY(-50%)',
                    width: '24px',
                    height: '65px',
                    backgroundColor: '#198754', // Verde Bolnet
                    color: '#ffffff',
                    borderTopRightRadius: '10px', // Rounded a destra
                    borderBottomRightRadius: '10px',
                    cursor: 'pointer',
                    zIndex: 1040,
                    opacity: 0.8,
                    boxShadow: '2px 0 8px rgba(0,0,0,0.25)',
                    transition: 'all 0.2s ease-in-out'
                }}
                title="Apri Menu"
            >
                <span style={{ fontSize: '12px' }}>▶</span> {/* Freccia verso destra */}
            </div>

            {/* PANNELLO MENU CHE COMPARE DA SINISTRA */}
            <Offcanvas 
                show={mostra} 
                onHide={chiudiMenu} 
                placement="start" // <-- Comparsa da sinistra
                className="bg-dark text-white print-hide"
            >
                <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-secondary">
                    <Offcanvas.Title className="fw-bold text-success">
                        ⚙️ Menu Bolnet
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-4">
                    <p className="text-secondary small fw-semibold mb-3">NAVIGAZIONE</p>
                    <Nav className="flex-column gap-2">
                        <Button 
                            variant={paginaAttiva === 'preventivatore' ? 'success' : 'outline-light'} 
                            onClick={() => gestisciSelezione('preventivatore')}
                            className="text-start py-3 fw-bold d-flex align-items-center gap-2"
                        >
                            📊 Preventivatore Cantiere
                        </Button>
                        <Button 
                            variant={paginaAttiva === 'depliant' ? 'success' : 'outline-light'} 
                            onClick={() => gestisciSelezione('depliant')}
                            className="text-start py-3 fw-bold d-flex align-items-center gap-2"
                        >
                            📄 Dépliant Promozionale
                        </Button>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SidebarMenu;
