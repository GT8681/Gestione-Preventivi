import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button, Table, Badge } from 'react-bootstrap';


const CreazionePreventivo = () => {
    // 1. Dati Cliente e Cantiere
    const [cliente, setCliente] = useState({
        nome: '',
        indirizzo: '',
        telefono: '',
        data: new Date().toLocaleDateString('it-IT')
    });

    // 2. Conteggio Completo Infissi, Porte, Protezioni & Tende
    const [conteggioElementi, setConteggioElementi] = useState({
        finestre: 4,
        porteFinestre: 2,
        tapparellePersiane: true,
        porteInterne: 5,
        zanzariere: 6,
        inferriate: 4,
        tendeDaSole: 2
    });

    // 3. SEZIONE SQUADRA E OPERATORI (RIPRISTINATA)
    const [squadra, setSquadra] = useState({
        operatori: 2,               // Numero di operai al lavoro
        costoOrarioOperatore: 25.0  // €/ora per operatore
    });

    // 4. Stima Tempi Base (Ore Cantiere)
    const [oreStimate, setOreStimate] = useState({
        oreInfissiEProtezioni: 2.5, 
        orePavimenti: 2.0           // Ore stimate per la Monospazzola
    });

    // 5. SEZIONE MONOSPAZZOLA & PAVIMENTI M² (RIPRISTINATA)
    const [lavorazioniMq, setLavorazioniMq] = useState([
        { id: 1, zona: 'Appartamento Post-Cantiere', tipoPavimento: 'Gres Porcellanato', mq: 80, servizio: 'Monospazzola + Aspiraliquidi' },
        { id: 2, zona: 'Taverna', tipoPavimento: 'Cotto / Ceramica', mq: 25, servizio: 'Monospazzola + Aspiraliquidi' },
        { id: 3, zona: 'Balconi Lunghi', tipoPavimento: 'Klinker / Esterno', mq: 15, servizio: 'Lavaggio Sgrosso Esterno' }
    ]);

    // 6. Lavorazioni Extra a Mano (Bagni, Scale, ecc.)
    const [lavorazioniExtra, setLavorazioniExtra] = useState([
        { id: 1, descrizione: 'Rivestimenti Pareti 2 Bagni (Piastrelle/Sanitari)', ore: 1.5 },
        { id: 2, descrizione: 'Pulizia & Trattamento Scala in Legno (Taverna)', ore: 1.0 }
    ]);

    // Stati Form per Aggiunte
    const [nuovaZona, setNuovaZona] = useState({ zona: '', tipoPavimento: 'Gres Porcellanato', mq: '', servizio: 'Monospazzola + Aspiraliquidi' });
    const [nuovoExtra, setNuovoExtra] = useState({ descrizione: '', ore: '' });

    // Funzioni Gestione Contatori ed Elementi
    const aggiornaContatore = (campo, delta) => setConteggioElementi(prev => ({ ...prev, [campo]: Math.max(0, prev[campo] + delta) }));
    const toggleTapparelle = () => setConteggioElementi(prev => ({ ...prev, tapparellePersiane: !prev.tapparellePersiane }));

    // Aggiunta / Rimozione Superfici Monospazzola
    const aggiungiZona = () => {
        if (!nuovaZona.mq || nuovaZona.mq <= 0) return;
        setLavorazioniMq([...lavorazioniMq, { ...nuovaZona, id: Date.now(), mq: parseFloat(nuovaZona.mq) }]);
        setNuovaZona({ zona: '', tipoPavimento: 'Gres Porcellanato', mq: '', servizio: 'Monospazzola + Aspiraliquidi' });
    };
    const rimuoviZona = (id) => setLavorazioniMq(lavorazioniMq.filter(item => item.id !== id));

    // Aggiunta / Rimozione Extra
    const aggiungiExtra = () => {
        if (!nuovoExtra.descrizione || !nuovoExtra.ore || nuovoExtra.ore <= 0) return;
        setLavorazioniExtra([...lavorazioniExtra, { id: Date.now(), descrizione: nuovoExtra.descrizione, ore: parseFloat(nuovoExtra.ore) }]);
        setNuovoExtra({ descrizione: '', ore: '' });
    };
    const rimuoviExtra = (id) => setLavorazioniExtra(lavorazioniExtra.filter(item => item.id !== id));

    // Calcolo Totali M² ed Extra
    const totaleMq = lavorazioniMq.reduce((acc, item) => acc + item.mq, 0);
    const totaleOreExtra = lavorazioniExtra.reduce((acc, item) => acc + item.ore, 0);

    // SUGGERIMENTO AUTOMATICO ORE MONOSPAZZOLA
    useEffect(() => {
        const resaMqOraPerPersona = 35; // Resa media monospazzola + aspiraliquidi
        const oreTotaliLavoroDovute = totaleMq / resaMqOraPerPersona;
        const tempoOrologioStimato = Math.max(0.5, (oreTotaliLavoroDovute / squadra.operatori));
        const tempoArrotondato = Math.round(tempoOrologioStimato * 2) / 2;
        
        setOreStimate(prev => ({ ...prev, orePavimenti: tempoArrotondato }));
    }, [totaleMq, squadra.operatori]);

    // CALCOLI FINALI CON SQUADRA E OPERATORI
    const oreOrologioTotali = (oreStimate.oreInfissiEProtezioni || 0) + (oreStimate.orePavimenti || 0) + totaleOreExtra;
    const oreUomoTotali = oreOrologioTotali * squadra.operatori;
    const imponibileManodopera = oreUomoTotali * squadra.costoOrarioOperatore;
    const iva = imponibileManodopera * 0.22;
    const totaleIvato = imponibileManodopera + iva;

    // Stampa PDF
    const gestisciStampaPdf = () => {
        window.print();
    };

    return (
        <div className="bg-light min-vh-100 py-4 text-dark">
            <Container style={{ maxWidth: '980px' }}>
                
                {/* BRAND HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-2">
                    <div>
                        <h1 className="fw-bold text-success mb-0 tracking-wide">BOLNET</h1>
                        <small className="text-secondary fw-semibold">Servizi Integrati di Pulizia & Trattamenti Speciali</small>
                    </div>
                    <div className="text-end print-hide">
                        <Badge bg="success" className="p-2 fs-6 shadow-sm mb-2 d-block">Sopralluogo Attivo</Badge>
                        <Button variant="outline-success" size="sm" className="fw-bold" onClick={gestisciStampaPdf}>
                            🖨️ Stampa / Salva PDF
                        </Button>
                    </div>
                    <div className="text-end print-only d-none">
                        <strong>Data:</strong> {cliente.data}<br />
                        <strong>Preventivo N°:</strong> {Math.floor(1000 + Math.random() * 9000)}
                    </div>
                </div>

                {/* DATI CLIENTE */}
                <Card className="mb-4 bg-white border-0 shadow-sm rounded-3">
                    <Card.Header className="bg-success text-white fw-bold py-3">
                        📍 Dati Cantiere & Cliente
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Label className="small text-secondary fw-bold print-hide">NOME CLIENTE / RIFERIMENTO</Form.Label>
                                <Form.Control 
                                    placeholder="Es. Mario Rossi / Villa Rossi" 
                                    value={cliente.nome} 
                                    onChange={e => setCliente({...cliente, nome: e.target.value})} 
                                    className="bg-light"
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label className="small text-secondary fw-bold print-hide">INDIRIZZO CANTIERE</Form.Label>
                                <Form.Control 
                                    placeholder="Es. Via Roma 12, Milano" 
                                    value={cliente.indirizzo} 
                                    onChange={e => setCliente({...cliente, indirizzo: e.target.value})} 
                                    className="bg-light"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* SEZIONE 1: INFISSI, PORTE, PROTEZIONI & TENDE DA SOLE */}
                <Card className="mb-4 bg-white border-0 shadow-sm rounded-3">
                    <Card.Header className="bg-info text-dark fw-bold py-3">
                        🪟 Infissi, Serramenti, Protezioni & Tende da Sole
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Row className="g-3 mb-4">
                            <Col md={4} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border h-100 d-flex flex-column justify-content-between">
                                    <span className="fw-bold text-secondary">Finestre</span>
                                    <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                                        <Button variant="outline-danger" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('finestre', -1)}>-</Button>
                                        <span className="fs-4 fw-bold">{conteggioElementi.finestre}</span>
                                        <Button variant="outline-success" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('finestre', 1)}>+</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border h-100 d-flex flex-column justify-content-between">
                                    <span className="fw-bold text-secondary">Porte Finestre</span>
                                    <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                                        <Button variant="outline-danger" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('porteFinestre', -1)}>-</Button>
                                        <span className="fs-4 fw-bold">{conteggioElementi.porteFinestre}</span>
                                        <Button variant="outline-success" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('porteFinestre', 1)}>+</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border h-100 d-flex flex-column justify-content-between">
                                    <span className="fw-bold text-secondary">Porte Interne</span>
                                    <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                                        <Button variant="outline-danger" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('porteInterne', -1)}>-</Button>
                                        <span className="fs-4 fw-bold">{conteggioElementi.porteInterne}</span>
                                        <Button variant="outline-success" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('porteInterne', 1)}>+</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border h-100 d-flex flex-column justify-content-between">
                                    <span className="fw-bold text-secondary">Zanzariere</span>
                                    <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                                        <Button variant="outline-danger" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('zanzariere', -1)}>-</Button>
                                        <span className="fs-4 fw-bold">{conteggioElementi.zanzariere}</span>
                                        <Button variant="outline-success" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('zanzariere', 1)}>+</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border h-100 d-flex flex-column justify-content-between">
                                    <span className="fw-bold text-secondary">Inferriate / Grate</span>
                                    <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                                        <Button variant="outline-danger" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('inferriate', -1)}>-</Button>
                                        <span className="fs-4 fw-bold">{conteggioElementi.inferriate}</span>
                                        <Button variant="outline-success" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('inferriate', 1)}>+</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} sm={6}>
                                <div className="p-3 bg-light rounded-3 text-center border h-100 d-flex flex-column justify-content-between">
                                    <span className="fw-bold text-secondary">Tende da Sole</span>
                                    <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                                        <Button variant="outline-danger" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('tendeDaSole', -1)}>-</Button>
                                        <span className="fs-4 fw-bold">{conteggioElementi.tendeDaSole}</span>
                                        <Button variant="outline-success" size="sm" className="fw-bold px-3 print-hide" onClick={() => aggiornaContatore('tendeDaSole', 1)}>+</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className="p-3 bg-light rounded-3 border d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <span className="fw-bold d-block text-dark">Includi lavaggio Tapparelle / Persiane?</span>
                                <small className="text-muted">Applica il lavaggio di persiane/tapparelle a tutte le finestre e porte-finestre.</small>
                            </div>
                            <Form.Check 
                                type="switch"
                                id="tapparelle-switch"
                                checked={conteggioElementi.tapparellePersiane}
                                onChange={toggleTapparelle}
                                className="fs-4 print-hide"
                            />
                            <span className="fw-bold print-only d-none">{conteggioElementi.tapparellePersiane ? 'SÌ' : 'NO'}</span>
                        </div>

                        <Form.Group className="print-hide">
                            <Form.Label className="fw-bold text-dark">⏱️ Ore stimate per la pulizia di serramenti, protezioni e tende:</Form.Label>
                            <Form.Control 
                                type="number" 
                                step="0.5"
                                value={oreStimate.oreInfissiEProtezioni}
                                onChange={e => setOreStimate({...oreStimate, oreInfissiEProtezioni: parseFloat(e.target.value) || 0})}
                                className="bg-light"
                            />
                        </Form.Group>
                    </Card.Body>
                </Card>

                {/* SEZIONE 2: PAVIMENTI INTERNI & BALCONI ESTERNI (MONOSPAZZOLA M²) */}
                <Card className="mb-4 bg-white border-0 shadow-sm rounded-3">
                    <Card.Header className="bg-primary text-white fw-bold py-3 d-flex justify-content-between align-items-center">
                        <span>🧱 Misurazione Pavimenti & Balconi (Monospazzola / Sgrosso)</span>
                        <Badge bg="light" className="text-primary fs-6 fw-bold">Totale: {totaleMq} m²</Badge>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Row className="g-2 mb-3 align-items-end print-hide">
                            <Col md={4}>
                                <Form.Label className="small text-secondary fw-bold">Ambiente / Balcone</Form.Label>
                                <Form.Control 
                                    placeholder="Es. Balcone Principale, Taverna..." 
                                    value={nuovaZona.zona}
                                    onChange={e => setNuovaZona({...nuovaZona, zona: e.target.value})}
                                    className="bg-light"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label className="small text-secondary fw-bold">Tipo Pavimento</Form.Label>
                                <Form.Select 
                                    value={nuovaZona.tipoPavimento}
                                    onChange={e => setNuovaZona({...nuovaZona, tipoPavimento: e.target.value})}
                                    className="bg-light"
                                >
                                    <option value="Gres Porcellanato">Gres Porcellanato</option>
                                    <option value="Cotto / Ceramica">Cotto / Ceramica</option>
                                    <option value="Klinker / Esterno (Balconi)">Klinker / Esterno (Balconi)</option>
                                    <option value="Marmo / Travertino">Marmo / Travertino</option>
                                    <option value="Parquet">Parquet</option>
                                </Form.Select>
                            </Col>
                            <Col md={3}>
                                <Form.Label className="small text-secondary fw-bold">Superficie (m²)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="es. 25" 
                                    value={nuovaZona.mq}
                                    onChange={e => setNuovaZona({...nuovaZona, mq: e.target.value})}
                                    className="bg-light"
                                />
                            </Col>
                            <Col md={2}>
                                <Button variant="primary" className="w-100 fw-bold shadow-sm" onClick={aggiungiZona}>+ Aggiungi</Button>
                            </Col>
                        </Row>

                        <Table responsive hover size="sm" className="align-middle border mt-3">
                            <thead className="table-light">
                                <tr className="text-secondary small">
                                    <th>Ambiente / Zona</th>
                                    <th>Tipo Pavimento</th>
                                    <th>Superficie</th>
                                    <th>Lavorazione</th>
                                    <th className="text-center print-hide">Azione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lavorazioniMq.map(item => (
                                    <tr key={item.id}>
                                        <td className="fw-semibold">{item.zona || 'Zona Generica'}</td>
                                        <td><Badge bg="info" className="text-dark fw-normal">{item.tipoPavimento}</Badge></td>
                                        <td className="fw-bold text-success">{item.mq} m²</td>
                                        <td className="small text-muted">{item.servizio}</td>
                                        <td className="text-center print-hide">
                                            <Button variant="outline-danger" size="sm" onClick={() => rimuoviZona(item.id)}>🗑️</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* SEZIONE 3: LAVORAZIONI SPECIALI & EXTRA A MANO */}
                <Card className="mb-4 bg-white border-0 shadow-sm rounded-3">
                    <Card.Header className="bg-secondary text-white fw-bold py-3 d-flex justify-content-between align-items-center">
                        <span>✨ Lavorazioni Speciali & Extra a Mano (Bagni, Scale, Ecc.)</span>
                        <Badge bg="light" className="text-dark fs-6 fw-bold">Totale Extra: {totaleOreExtra} ore</Badge>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Row className="g-2 mb-3 align-items-end print-hide">
                            <Col md={7}>
                                <Form.Label className="small text-secondary fw-bold">Descrizione Lavorazione Extra</Form.Label>
                                <Form.Control 
                                    placeholder="Es. Pulizia rivestimento 2 bagni, Scala in legno..." 
                                    value={nuovoExtra.descrizione}
                                    onChange={e => setNuovoExtra({...nuovoExtra, descrizione: e.target.value})}
                                    className="bg-light"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label className="small text-secondary fw-bold">Ore Stimate</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    step="0.5"
                                    placeholder="Es. 1.5" 
                                    value={nuovoExtra.ore}
                                    onChange={e => setNuovoExtra({...nuovoExtra, ore: e.target.value})}
                                    className="bg-light"
                                />
                            </Col>
                            <Col md={2}>
                                <Button variant="secondary" className="w-100 fw-bold shadow-sm" onClick={aggiungiExtra}>+ Aggiungi</Button>
                            </Col>
                        </Row>

                        <Table responsive hover size="sm" className="align-middle border mt-3">
                            <thead className="table-light">
                                <tr className="text-secondary small">
                                    <th>Descrizione Lavorazione Extra</th>
                                    <th>Ore Stimate</th>
                                    <th className="text-center print-hide">Azione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lavorazioniExtra.map(item => (
                                    <tr key={item.id}>
                                        <td className="fw-semibold text-dark">{item.descrizione}</td>
                                        <td className="fw-bold text-primary">{item.ore} ore</td>
                                        <td className="text-center print-hide">
                                            <Button variant="outline-danger" size="sm" onClick={() => rimuoviExtra(item.id)}>🗑️</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* SEZIONE 4: ORGANIZZAZIONE SQUADRA & QUANTI OPERAI LAVORANO */}
                <Card className="mb-4 bg-white border-0 shadow-sm rounded-3">
                    <Card.Header className="bg-warning text-dark fw-bold py-3">
                        ⏱️ Organizzazione Squadra, Operai & Ore Cantiere
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Row className="g-3 align-items-center">
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small text-secondary fw-bold">Quanti Operai Lavorano?</Form.Label>
                                    <Form.Select 
                                        value={squadra.operatori}
                                        onChange={e => setSquadra({...squadra, operatori: parseInt(e.target.value) || 1})}
                                        className="bg-light"
                                    >
                                        <option value="1">1 Operatore (Solo)</option>
                                        <option value="2">2 Operatori (Squadra Bolnet)</option>
                                        <option value="3">3 Operatori</option>
                                        <option value="4">4 Operatori</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small text-secondary fw-bold">Ore Monospazzola Stimate</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        step="0.5"
                                        value={oreStimate.orePavimenti}
                                        onChange={e => setOreStimate({...oreStimate, orePavimenti: parseFloat(e.target.value) || 0})}
                                        className="bg-light"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label className="small text-secondary fw-bold">Tariffa Oraria (€/ora)</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        value={squadra.costoOrarioOperatore}
                                        onChange={e => setSquadra({...squadra, costoOrarioOperatore: parseFloat(e.target.value) || 0})}
                                        className="bg-light"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <div className="p-3 bg-light rounded-3 text-center border">
                                    <small className="text-secondary d-block fw-bold">Totale Ore Uomo</small>
                                    <span className="fs-5 fw-bold text-primary">{oreUomoTotali} Ore Uomo</span>
                                    <small className="d-block text-muted" style={{ fontSize: '0.75rem' }}>
                                        ({oreOrologioTotali}h cantiere x {squadra.operatori} op.)
                                    </small>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* RIEPILOGO FINALE PREVENTIVO */}
                <Card className="bg-white border-2 border-success shadow-sm rounded-3">
                    <Card.Header className="bg-success text-white fw-bold text-center fs-5 py-3">
                        💰 RIEPILOGO FINALE PREVENTIVO BOLNET
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Row className="align-items-center">
                            <Col md={7}>
                                <p className="mb-2 fs-6">
                                    🧱 <strong>Superficie Pavimenti e Balconi (Monospazzola):</strong> {totaleMq} m² ({lavorazioniMq.length} zone)
                                </p>
                                <p className="mb-2 fs-6">
                                    🪟 <strong>Serramenti & Infissi:</strong> {conteggioElementi.finestre} Finestre, {conteggioElementi.porteFinestre} Porte Finestre {conteggioElementi.tapparellePersiane ? '(con Tapparelle/Persiane)' : ''}
                                </p>
                                <p className="mb-2 fs-6">
                                    ✨ <strong>Lavorazioni Speciali Extra:</strong> {lavorazioniExtra.length} Voci inserite ({totaleOreExtra} ore totali)
                                </p>
                                <p className="mb-2 fs-6 text-primary fw-bold">
                                    ⏱️ <strong>Squadra Cantiere:</strong> {squadra.operatori} Operatori | ~{oreOrologioTotali}h cantiere ({oreUomoTotali} Ore Uomo × {squadra.costoOrarioOperatore}€/h)
                                </p>
                                <hr className="my-3" />
                                <p className="mb-0 text-muted">Imponibile Manodopera: {imponibileManodopera.toFixed(2)} € | IVA (22%): {iva.toFixed(2)} €</p>
                            </Col>
                            <Col md={5} className="text-md-end mt-3 mt-md-0">
                                <span className="fs-6 text-muted d-block fw-semibold">TOTALE PREVENTIVO IVATO</span>
                                <span className="display-5 fw-bold text-success">{totaleIvato.toFixed(2)} €</span>
                                <Button 
                                    variant="success" 
                                    size="lg" 
                                    className="w-100 mt-3 fw-bold shadow-sm print-hide"
                                    onClick={gestisciStampaPdf}
                                >
                                    📑 Genera PDF / Scarica Preventivo
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
