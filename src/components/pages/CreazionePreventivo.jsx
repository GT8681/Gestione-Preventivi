import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button, Table, Badge } from 'react-bootstrap';

const CreazionePreventivo = () => {
    // 1. Dati Azienda & Cliente
    const [cliente, setCliente] = useState({
        nome: '',
        indirizzo: '',
        telefono: '',
        email: '',
        data: new Date().toLocaleDateString('it-IT'),
        numeroPreventivo: `PREV-${Math.floor(1000 + Math.random() * 9000)}`
    });

    // 2. Conteggio Infissi e Serramenti
    const [conteggioElementi, setConteggioElementi] = useState({
        finestre: 4,
        porteFinestre: 2,
        tapparellePersiane: true,
        porteInterne: 5,
        zanzariere: 6,
        inferriate: 4,
        tendeDaSole: 2
    });

    // 3. Squadra e Tariffa
    const [squadra, setSquadra] = useState({
        operatori: 2,
        costoOrarioOperatore: 25.0
    });

    // 4. CAMPI ORE DEDICATI (INFISSI E MONOSPAZZOLA)
    const [oreStimate, setOreStimate] = useState({
        oreInfissiEProtezioni: 2.5, // Ore manuali per le finestre
        orePavimenti: 2.0           // Ore per la monospazzola
    });

    // 5. Pavimenti e Superfici (m²) - Monospazzola
    const [lavorazioniMq, setLavorazioniMq] = useState([
        { id: 1, zona: 'Zona Giorno / Post-Cantiere', tipoPavimento: 'Gres Porcellanato', mq: 80, servizio: 'Monospazzola + Aspiraliquidi' },
        { id: 2, zona: 'Taverna', tipoPavimento: 'Cotto / Ceramica', mq: 25, servizio: 'Monospazzola + Aspiraliquidi' },
        { id: 3, zona: 'Balconi Esterni', tipoPavimento: 'Klinker / Esterno', mq: 15, servizio: 'Lavaggio Sgrosso Esterno' }
    ]);

    // 6. Lavori Extra Manuali
    const [lavorazioniExtra, setLavorazioniExtra] = useState([
        { id: 1, descrizione: 'Igienizzazione e decalcificazione 2 Bagni', ore: 1.5 },
        { id: 2, descrizione: 'Trattamento e pulizia Scala in Legno', ore: 1.0 }
    ]);

    // Form Aggiunte
    const [nuovaZona, setNuovaZona] = useState({ zona: '', tipoPavimento: 'Gres Porcellanato', mq: '', servizio: 'Monospazzola + Aspiraliquidi' });
    const [nuovoExtra, setNuovoExtra] = useState({ descrizione: '', ore: '' });

    // Handlers
    const aggiornaContatore = (campo, delta) => setConteggioElementi(prev => ({ ...prev, [campo]: Math.max(0, prev[campo] + delta) }));
    const toggleTapparelle = () => setConteggioElementi(prev => ({ ...prev, tapparellePersiane: !prev.tapparellePersiane }));

    const aggiungiZona = () => {
        if (!nuovaZona.mq || nuovaZona.mq <= 0) return;
        setLavorazioniMq([...lavorazioniMq, { ...nuovaZona, id: Date.now(), mq: parseFloat(nuovaZona.mq) }]);
        setNuovaZona({ zona: '', tipoPavimento: 'Gres Porcellanato', mq: '', servizio: 'Monospazzola + Aspiraliquidi' });
    };
    const rimuoviZona = (id) => setLavorazioniMq(lavorazioniMq.filter(item => item.id !== id));

    const aggiungiExtra = () => {
        if (!nuovoExtra.descrizione || !nuovoExtra.ore || nuovoExtra.ore <= 0) return;
        setLavorazioniExtra([...lavorazioniExtra, { id: Date.now(), descrizione: nuovoExtra.descrizione, ore: parseFloat(nuovoExtra.ore) }]);
        setNuovoExtra({ descrizione: '', ore: '' });
    };
    const rimuoviExtra = (id) => setLavorazioniExtra(lavorazioniExtra.filter(item => item.id !== id));

    // Totali M² ed Extra
    const totaleMq = lavorazioniMq.reduce((acc, item) => acc + item.mq, 0);
    const totaleOreExtra = lavorazioniExtra.reduce((acc, item) => acc + item.ore, 0);

    // Suggerimento automatico ore Monospazzola
    useEffect(() => {
        const resaMqOraPerPersona = 35;
        const oreTotaliLavoroDovute = totaleMq / resaMqOraPerPersona;
        const tempoOrologioStimato = Math.max(0.5, (oreTotaliLavoroDovute / squadra.operatori));
        setOreStimate(prev => ({ ...prev, orePavimenti: Math.round(tempoOrologioStimato * 2) / 2 }));
    }, [totaleMq, squadra.operatori]);

    // CALCOLI FINALI ORE
    const oreOrologioTotali = (oreStimate.oreInfissiEProtezioni || 0) + (oreStimate.orePavimenti || 0) + totaleOreExtra;
    const oreUomoTotali = oreOrologioTotali * squadra.operatori;
    const imponibileManodopera = oreUomoTotali * squadra.costoOrarioOperatore;
    const iva = imponibileManodopera * 0.22;
    const totaleIvato = imponibileManodopera + iva;

    return (
        <div className="bg-light min-vh-100 py-4 font-sans-serif">
            <Container style={{ maxWidth: '920px' }}>

                {/* HEADER AZIENDALE */}
                <Card className="border-0 shadow-sm rounded-3 mb-4 overflow-hidden">
                    <div className="bg-dark text-white p-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="fw-bold tracking-wider mb-0 text-success">BOLNET</h2>
                            <small className="text-muted fw-semibold">Pulizie Speciali & Trattamenti Post-Cantiere</small>
                        </div>
                        <div className="text-end">
                            <Badge bg="success" className="px-3 py-2 fs-6 fw-normal mb-2 d-inline-block">Preventivo Ufficiale</Badge>
                            <div className="text-muted small">N° {cliente.numeroPreventivo} | Data: {cliente.data}</div>
                        </div>
                    </div>
                </Card>

                {/* DATI CLIENTE */}
                <Card className="border-0 shadow-sm rounded-3 mb-4">
                    <Card.Body className="p-4">
                        <h6 className="text-uppercase text-secondary fw-bold mb-3 small tracking-wide">📍 Dati Destinatario & Cantiere</h6>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small text-muted fw-semibold mb-1">Cliente / Ragione Sociale</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Es. Spett.le Mario Rossi" 
                                        value={cliente.nome} 
                                        onChange={e => setCliente({...cliente, nome: e.target.value})}
                                        className="border-1 shadow-none"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small text-muted fw-semibold mb-1">Indirizzo Cantiere</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Es. Via Roma 12, Milano" 
                                        value={cliente.indirizzo} 
                                        onChange={e => setCliente({...cliente, indirizzo: e.target.value})}
                                        className="border-1 shadow-none"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* SEZIONE 1: INFISSI E SERRAMENTI + CAMPO ORE DEDICATO */}
                <Card className="border-0 shadow-sm rounded-3 mb-4">
                    <Card.Body className="p-4">
                        <h6 className="text-uppercase text-secondary fw-bold mb-3 small tracking-wide">🪟 Conteggio Infissi & Protezioni</h6>
                        
                        <Row className="g-3 mb-3">
                            {[
                                { t: 'Finestre', k: 'finestre' },
                                { t: 'Porte Finestre', k: 'porteFinestre' },
                                { t: 'Porte Interne', k: 'porteInterne' },
                                { t: 'Zanzariere', k: 'zanzariere' },
                                { t: 'Inferriate', k: 'inferriate' },
                                { t: 'Tende da Sole', k: 'tendeDaSole' }
                            ].map(item => (
                                <Col md={4} sm={6} key={item.k}>
                                    <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center border">
                                        <span className="fw-semibold text-dark small">{item.t}</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <Button variant="outline-secondary" size="sm" className="px-2 py-0 fw-bold print-hide" onClick={() => aggiornaContatore(item.k, -1)}>-</Button>
                                            <span className="fw-bold fs-6">{conteggioElementi[item.k]}</span>
                                            <Button variant="outline-secondary" size="sm" className="px-2 py-0 fw-bold print-hide" onClick={() => aggiornaContatore(item.k, 1)}>+</Button>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                        <div className="p-3 bg-light rounded-3 border d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <span className="fw-semibold small text-dark d-block">Lavaggio Persiane / Tapparelle Incluso</span>
                                <small className="text-muted">Applica la pulizia profonda su tutti i serramenti esterni.</small>
                            </div>
                            <Form.Check 
                                type="switch"
                                id="tapparelle-switch-prof"
                                checked={conteggioElementi.tapparellePersiane}
                                onChange={toggleTapparelle}
                                className="fs-5 print-hide"
                            />
                        </div>

                        {/* CAMPO ORE FINESTRE/INFISSI */}
                        <div className="p-3 bg-white rounded-3 border border-info">
                            <Form.Group>
                                <Form.Label className="fw-bold text-dark small mb-1">⏱️ Ore Stimate per Pulizia Finestre & Infissi:</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    step="0.5"
                                    value={oreStimate.oreInfissiEProtezioni}
                                    onChange={e => setOreStimate({...oreStimate, oreInfissiEProtezioni: parseFloat(e.target.value) || 0})}
                                />
                            </Form.Group>
                        </div>
                    </Card.Body>
                </Card>

                {/* SEZIONE 2: PAVIMENTI, MONOSPAZZOLA + CAMPO ORE MONOSPAZZOLA */}
                <Card className="border-0 shadow-sm rounded-3 mb-4">
                    <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-uppercase text-secondary fw-bold mb-0 small tracking-wide">🧹 Superfici Pavimenti & Monospazzola</h6>
                            <Badge bg="dark" className="px-3 py-2 fw-normal">{totaleMq} m² Totali</Badge>
                        </div>

                        {/* Form aggiunta M² */}
                        <Row className="g-2 mb-3 print-hide">
                            <Col md={3}>
                                <Form.Control 
                                    size="sm" 
                                    placeholder="Ambiente (Es. Zona Giorno)" 
                                    value={nuovaZona.zona} 
                                    onChange={e => setNuovaZona({...nuovaZona, zona: e.target.value})} 
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Select 
                                    size="sm" 
                                    value={nuovaZona.tipoPavimento} 
                                    onChange={e => setNuovaZona({...nuovaZona, tipoPavimento: e.target.value})}
                                >
                                    <option value="Gres Porcellanato">Gres Porcellanato</option>
                                    <option value="Cotto / Ceramica">Cotto / Ceramica</option>
                                    <option value="Klinker / Esterno">Klinker / Esterno</option>
                                    <option value="Marmo / Travertino">Marmo / Travertino</option>
                                    <option value="Parquet">Parquet</option>
                                </Form.Select>
                            </Col>
                            <Col md={3}>
                                <Form.Select 
                                    size="sm" 
                                    value={nuovaZona.servizio} 
                                    onChange={e => setNuovaZona({...nuovaZona, servizio: e.target.value})}
                                >
                                    <option value="Monospazzola + Aspiraliquidi">Monospazzola + Aspiraliquidi</option>
                                    <option value="Lavaggio Manuale Sgrosso">Lavaggio Manuale Sgrosso</option>
                                    <option value="Trattamento Protettivo">Trattamento Protettivo</option>
                                </Form.Select>
                            </Col>
                            <Col md={2}>
                                <Form.Control 
                                    size="sm" 
                                    type="number" 
                                    placeholder="m²" 
                                    value={nuovaZona.mq} 
                                    onChange={e => setNuovaZona({...nuovaZona, mq: e.target.value})} 
                                />
                            </Col>
                            <Col md={1}>
                                <Button size="sm" variant="success" className="w-100 fw-bold" onClick={aggiungiZona}>+</Button>
                            </Col>
                        </Row>

                        <Table hover responsive size="sm" className="align-middle border mb-3">
                            <thead className="bg-light">
                                <tr className="text-secondary small">
                                    <th>Ambiente</th>
                                    <th>Materiale</th>
                                    <th>Lavorazione</th>
                                    <th>Superficie</th>
                                    <th className="text-end print-hide"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {lavorazioniMq.map(item => (
                                    <tr key={item.id}>
                                        <td className="fw-semibold text-dark">{item.zona}</td>
                                        <td><span className="badge bg-secondary bg-opacity-10 text-dark fw-normal">{item.tipoPavimento}</span></td>
                                        <td className="text-success fw-semibold small">{item.servizio}</td>
                                        <td className="fw-bold">{item.mq} m²</td>
                                        <td className="text-end print-hide">
                                            <Button variant="link" className="text-danger p-0 border-0 fw-bold" onClick={() => rimuoviZona(item.id)}>✕</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* CAMPO ORE MONOSPAZZOLA */}
                        <div className="p-3 bg-white rounded-3 border border-primary">
                            <Form.Group>
                                <Form.Label className="fw-bold text-dark small mb-1">⏱️ Ore Stimate per Monospazzola & Pavimenti:</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    step="0.5"
                                    value={oreStimate.orePavimenti}
                                    onChange={e => setOreStimate({...oreStimate, orePavimenti: parseFloat(e.target.value) || 0})}
                                />
                                <small className="text-muted">Calcolate in automatico in base ai m² totali, ma puoi modificarle a piacimento.</small>
                            </Form.Group>
                        </div>
                    </Card.Body>
                </Card>

                {/* SEZIONE 3: LAVORI EXTRA A MANO */}
                <Card className="border-0 shadow-sm rounded-3 mb-4">
                    <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-uppercase text-secondary fw-bold mb-0 small tracking-wide">✨ Lavori Extra & Interventi Specifici</h6>
                            <Badge bg="secondary" className="px-3 py-2 fw-normal">{totaleOreExtra} h Totali Extra</Badge>
                        </div>

                        <Row className="g-2 mb-3 print-hide">
                            <Col md={7}>
                                <Form.Control 
                                    size="sm" 
                                    placeholder="Descrizione intervento (Es. Sanificazione Bagni)" 
                                    value={nuovoExtra.descrizione} 
                                    onChange={e => setNuovoExtra({...nuovoExtra, descrizione: e.target.value})} 
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control 
                                    size="sm" 
                                    type="number" 
                                    step="0.5" 
                                    placeholder="Ore stimate" 
                                    value={nuovoExtra.ore} 
                                    onChange={e => setNuovoExtra({...nuovoExtra, ore: e.target.value})} 
                                />
                            </Col>
                            <Col md={2}>
                                <Button size="sm" variant="success" className="w-100 fw-bold" onClick={aggiungiExtra}>+ Aggiungi</Button>
                            </Col>
                        </Row>

                        <Table hover responsive size="sm" className="align-middle border mb-0">
                            <thead className="bg-light">
                                <tr className="text-secondary small">
                                    <th>Descrizione Intervento Extra</th>
                                    <th>Tempo Stimato</th>
                                    <th className="text-end print-hide"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {lavorazioniExtra.map(item => (
                                    <tr key={item.id}>
                                        <td className="fw-semibold text-dark">{item.descrizione}</td>
                                        <td className="fw-bold">{item.ore} ore</td>
                                        <td className="text-end print-hide">
                                            <Button variant="link" className="text-danger p-0 border-0 fw-bold" onClick={() => rimuoviExtra(item.id)}>✕</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* SQUADRA & TEMPI DI LAVORO */}
                <Card className="border-0 shadow-sm rounded-3 mb-4">
                    <Card.Body className="p-4">
                        <h6 className="text-uppercase text-secondary fw-bold mb-3 small tracking-wide">⏱️ Pianificazione Cantiere & Squadra</h6>
                        
                        <Row className="g-3 align-items-center">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="small text-muted fw-semibold">Operatori Assegnati</Form.Label>
                                    <Form.Select 
                                        value={squadra.operatori} 
                                        onChange={e => setSquadra({...squadra, operatori: parseInt(e.target.value)})}
                                    >
                                        <option value="1">1 Operatore</option>
                                        <option value="2">2 Operatori (Standard)</option>
                                        <option value="3">3 Operatori</option>
                                        <option value="4">4 Operatori</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="small text-muted fw-semibold">Tariffa Oraria (€/ora per operatore)</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        value={squadra.costoOrarioOperatore} 
                                        onChange={e => setSquadra({...squadra, costoOrarioOperatore: parseFloat(e.target.value) || 0})} 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <small className="text-muted d-block uppercase fw-bold" style={{ fontSize: '11px' }}>Stima Ore Lavoro</small>
                                    <span className="fs-5 fw-bold text-dark">{oreOrologioTotali} h Cantiere</span>
                                    <small className="d-block text-muted">({oreUomoTotali} Ore Uomo Complessive)</small>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* QUADRO ECONOMICO E TOTALE */}
                <Card className="border-0 shadow-sm rounded-3 bg-white overflow-hidden">
                    <Card.Body className="p-4">
                        <Row className="align-items-center">
                            <Col md={7}>
                                <h6 className="text-uppercase text-secondary fw-bold mb-3 small tracking-wide">📋 Dettaglio Costi</h6>
                                <div className="small text-muted mb-1">Imponibile Manodopera: <strong>{imponibileManodopera.toFixed(2)} €</strong></div>
                                <div className="small text-muted mb-1">IVA (22%): <strong>{iva.toFixed(2)} €</strong></div>
                                <div className="small text-muted">Termini di Pagamento: <strong>A vista / Bonifico Bancario</strong></div>
                            </Col>
                            <Col md={5} className="text-md-end mt-3 mt-md-0">
                                <span className="text-uppercase text-muted small fw-bold d-block">Totale Offerta Ivata</span>
                                <span className="display-6 fw-bold text-success">{totaleIvato.toFixed(2)} €</span>
                                <Button 
                                    variant="success" 
                                    size="lg" 
                                    className="w-100 mt-3 fw-bold shadow-sm print-hide"
                                    onClick={() => window.print()}
                                >
                                    🖨️ Stampa / Salva PDF
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Container>
        </div>
    );
};

export default CreazionePreventivo;
