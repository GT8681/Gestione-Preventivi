import React, { useState } from 'react';
import { Button, Offcanvas, Nav } from 'react-bootstrap';

const SidebarMenu = ({ paginaAttiva, onSelezionaPagina }) => {
    const [mostra, setMostra] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const apriMenu = () => setMostra(true);
    const chiudiMenu = () => setMostra(false);

    const gestisciSelezione = (chiavePagina) => {
        onSelezionaPagina(chiavePagina);
        chiudiMenu();
    };

    return (
        <>
            {/* LINGUETTA PREMIUM ED ELEGANTE A SINISTRA */}
            <div
                onClick={apriMenu}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="print-hide d-flex align-items-center justify-content-center gap-2"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '0px',
                    transform: 'translateY(-50%)',
                    width: isHovered ? '95px' : '38px', // Si espande fluidamente al passaggio del mouse
                    height: '52px',
                    backgroundColor: 'rgba(25, 135, 84, 0.85)', // Verde Bolnet trasparente
                    backdropFilter: 'blur(8px)', // Effetto vetro sfuocato
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderLeft: 'none',
                    cursor: 'pointer',
                    zIndex: 1040,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    overflow: 'hidden',
                    paddingLeft: '8px'
                }}
                title="Apri Menu Navigazione"
            >
                {/* ICONA MENU HAMBURGER / FRECCIA */}
                <span style={{ fontSize: '16px', lineHeight: 1 }} className="fw-bold">
                    ☰
                </span>

                {/* TESTO ESPLICATIVO (Compare solo se allarghi la linguetta) */}
                <span 
                    className="fw-semibold text-uppercase"
                    style={{ 
                        fontSize: '11px', 
                        letterSpacing: '1px',
                        whiteSpace: 'nowrap',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.2s ease-in-out'
                    }}
                >
                    Menu
                </span>
            </div>

            {/* PANNELLO LATERALMENTE A SCOMPARSA (OFFCANVAS) */}
            <Offcanvas 
                show={mostra} 
                onHide={chiudiMenu} 
                placement="start"
                className="bg-dark text-white print-hide"
                style={{ backdropFilter: 'blur(10px)' }}
            >
                <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-secondary pb-3">
                    <Offcanvas.Title className="fw-bold text-success d-flex align-items-center gap-2">
                        <span className="fs-4">⚙️</span> BOLNET NAVIGAZIONE
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-4 d-flex flex-column justify-content-between">
                    <div>
                        <p className="text-secondary small fw-bold tracking-wider mb-3">SELEZIONA STRUMENTO</p>
                        <Nav className="flex-column gap-3">
                            <Button 
                                variant={paginaAttiva === 'preventivatore' ? 'success' : 'outline-light'} 
                                onClick={() => gestisciSelezione('preventivatore')}
                                className="text-start py-3 px-3 fw-bold d-flex align-items-center gap-3 border-0 shadow-sm"
                                style={{ borderRadius: '10px' }}
                            >
                                <span className="fs-5">📊</span> Preventivatore Cantiere
                            </Button>
                            <Button 
                                variant={paginaAttiva === 'depliant' ? 'success' : 'outline-light'} 
                                onClick={() => gestisciSelezione('depliant')}
                                className="text-start py-3 px-3 fw-bold d-flex align-items-center gap-3 border-0 shadow-sm"
                                style={{ borderRadius: '10px' }}
                            >
                                <span className="fs-5">📄</span> Dépliant Promozionale
                            </Button>
                        </Nav>
                    </div>

                    <div className="pt-3 border-top border-secondary text-center text-muted small">
                        <small>Bolnet Servizi Integrati © 2026</small>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SidebarMenu;
