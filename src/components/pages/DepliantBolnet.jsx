import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

const DepliantBolnet = () => {
    const stampaDepliant = () => {
        window.print();
    };

    return (
        <div className="bg-light min-vh-100 py-4 text-dark">
            <Container style={{ maxWidth: '900px' }}>
                
                {/* BARRA AZIONI (Nascosta in stampa) */}
                <div className="d-flex justify-content-between align-items-center mb-4 print-hide">
                    <span className="text-muted fw-bold">📄 Vista Dépliant Promozionale Bolnet</span>
                    <Button variant="success" className="fw-bold shadow-sm" onClick={stampaDepliant}>
                        🖨️ Stampa / Salva Dépliant in PDF
                    </Button>
                </div>

                {/* FOGLIO DÉPLIANT (Formato Stampa A4) */}
                <div className="bg-white p-5 rounded-3 shadow border">
                    
                    {/* INTESTAZIONE / HEADER BRAND */}
                    <div className="text-center pb-4 mb-4 border-bottom border-3 border-success">
                        <h1 className="display-4 fw-bold text-success mb-1 tracking-wide">BOLNET</h1>
                        <p className="fs-5 text-secondary fw-semibold mb-2">
                            Servizi Integrati di Pulizia Post-Cantiere & Trattamenti Speciali
                        </p>
                        <Badge bg="success" className="p-2 fs-6">
                            Privati • Aziende • Cantieri • Ristrutturazioni
                        </Badge>
                    </div>

                    {/* PRESENTAZIONE BREVE */}
                    <div className="p-4 bg-light rounded-3 mb-4 text-center border">
                        <h4 className="fw-bold text-dark mb-2">Cerchi una pulizia profonda, rapida e professionale?</h4>
                        <p className="mb-0 text-secondary">
                            Bolnet è specializzata negli interventi di sgrosso post-cantiere, lavaggio professionale di pavimenti con monospazzola, igienizzazione serramenti e pulizia di superfici delicate.
                        </p>
                    </div>

                    {/* GRIGLIA SERVIZI OFFERTI */}
                    <h3 className="fw-bold text-success mb-3 pb-2 border-bottom">✨ I Nostri Servizi Specializzati</h3>

                    <Row className="g-4 mb-4">
                        {/* SERVIZIO 1 */}
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm bg-light">
                                <Card.Body className="p-4">
                                    <div className="fs-3 mb-2">🧱</div>
                                    <h5 className="fw-bold text-dark">Trattamento Pavimenti & Monospazzola</h5>
                                    <ul className="small text-secondary mb-0 ps-3">
                                        <li>Lavaggio a fondo e decapaggio post-cantiere</li>
                                        <li>Trattamento Gres Porcellanato, Cotto e Ceramica</li>
                                        <li>Aspirazione liquidi e rimozione residui di pittura/stucco</li>
                                        <li>Trattamenti per Parquet, Marmo e Travertino</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* SERVIZIO 2 */}
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm bg-light">
                                <Card.Body className="p-4">
                                    <div className="fs-3 mb-2">🪟</div>
                                    <h5 className="fw-bold text-dark">Infissi, Serramenti & Protezioni</h5>
                                    <ul className="small text-secondary mb-0 ps-3">
                                        <li>Pulizia vetri, telai, finestre e porte-finestre</li>
                                        <li>Sgrassaggio Tapparelle, Persiane e Scuri</li>
                                        <li>Pulizia approfondita Zanzariere e Grate</li>
                                        <li>Lavaggio e manutenzione Tende da Sole</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* SERVIZIO 3 */}
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm bg-light">
                                <Card.Body className="p-4">
                                    <div className="fs-3 mb-2">🚿</div>
                                    <h5 className="fw-bold text-dark">Rivestimenti Bagni & Igienizzazione</h5>
                                    <ul className="small text-secondary mb-0 ps-3">
                                        <li>Pulizia e sgrassaggio piastrelle/rivestimenti a parete</li>
                                        <li>Disincrostazione e lucidatura sanitari e rubinetterie</li>
                                        <li>Trattamento anticalcare su box doccia e ceramiche</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* SERVIZIO 4 */}
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm bg-light">
                                <Card.Body className="p-4">
                                    <div className="fs-3 mb-2">🪵</div>
                                    <h5 className="fw-bold text-dark">Scale in Legno & Lavorazioni Extra</h5>
                                    <ul className="small text-secondary mb-0 ps-3">
                                        <li>Trattamento delicato e pulizia scale in legno</li>
                                        <li>Lavaggio balconi e terrazzi esterni (Klinker/Esterno)</li>
                                        <li>Interventi personalizzati su misura del cliente</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* PERCHÉ SCEGLIERE BOLNET */}
                    <div className="p-4 bg-success text-white rounded-3 mb-4">
                        <h4 className="fw-bold text-center mb-3">Punti di Forza Bolnet</h4>
                        <Row className="text-center g-3">
                            <Col md={4}>
                                ⏱️ <strong>Interventi Rapidi</strong>
                                <small className="d-block text-white-50">Squadre operative da 2 o più operatori</small>
                            </Col>
                            <Col md={4}>
                                🧼 <strong>Attrezzature Professionali</strong>
                                <small className="d-block text-white-50">Monospazzole e aspiratori industriali</small>
                            </Col>
                            <Col md={4}>
                                📋 <strong>Preventivi Chiari</strong>
                                <small className="d-block text-white-50">Sopralluoghi veloci e prezzi trasparenti</small>
                            </Col>
                        </Row>
                    </div>

                    {/* FOOTER CONTATTI */}
                    <div className="border-top pt-4 text-center">
                        <h5 className="fw-bold text-dark mb-2">Richiedi un Sopralluogo Gratuito!</h5>
                        <p className="text-muted small mb-3">Siamo a tua disposizione per valutare insieme gli interventi necessari.</p>
                        <Row className="justify-content-center g-3 text-secondary fw-semibold">
                            <Col sm={4}>📞 Tel / WhatsApp: <strong>+39 3XX XXX XXXX</strong></Col>
                            <Col sm={4}>✉️ Email: <strong>info@bolnet.it</strong></Col>
                        </Row>
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default DepliantBolnet;
