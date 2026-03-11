import { useState, useCallback } from 'react';
import { useDeal } from '../../context/DealContext';
import { useLBOCalculations } from '../../hooks/useLBOCalculations';
import SectionHeader from '../shared/SectionHeader';
import { EGYPT_PARAMS } from '../../constants/egyptParams';
import { FileText, Download, Loader2, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';

/* ── CONSTANTS ─────────────────────────────────────────────── */
const COLORS = {
  navy: [11, 15, 26],
  darkBlue: [26, 35, 64],
  gold: [197, 164, 78],
  ivory: [244, 237, 228],
  steel: [124, 141, 176],
  red: [229, 57, 53],
  green: [76, 175, 80],
  white: [255, 255, 255],
  black: [0, 0, 0],
};

const PAGE_W = 210; // A4 mm
const PAGE_H = 297;
const MARGIN = 15;
const COL_W = PAGE_W - 2 * MARGIN;

export default function DispatchPDF() {
  const { state, formatNumber } = useDeal();
  const lboCalc = useLBOCalculations(state.lbo);
  const [status, setStatus] = useState('idle'); // idle | generating | done

  const fm = (v, d = 1) => (v !== null && v !== undefined && !isNaN(v)) ? formatNumber(v, d) : '—';

  const generatePDF = useCallback(async () => {
    setStatus('generating');
    // Timeout to allow UI to update
    await new Promise(r => setTimeout(r, 100));

    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      let y = 0;

      /* ── HELPERS ─────────────────────────────────────────── */
      const setFont = (size, style = 'normal', color = COLORS.ivory) => {
        doc.setFontSize(size);
        doc.setFont('helvetica', style);
        doc.setTextColor(...color);
      };

      const checkPage = (needed = 20) => {
        if (y + needed > PAGE_H - 20) {
          addFooter(doc.getNumberOfPages());
          doc.addPage();
          y = MARGIN;
          return true;
        }
        return false;
      };

      const addFooter = (pageNum) => {
        doc.setFontSize(7);
        doc.setTextColor(...COLORS.steel);
        doc.text('Valor M&A Engine | Part of the Wolf Financial Suite', MARGIN, PAGE_H - 8);
        doc.text(`Page ${pageNum}`, PAGE_W - MARGIN, PAGE_H - 8, { align: 'right' });
      };

      const sectionTitle = (title) => {
        checkPage(15);
        y += 3;
        doc.setFillColor(...COLORS.gold);
        doc.rect(MARGIN, y, COL_W, 7, 'F');
        setFont(10, 'bold', COLORS.navy);
        doc.text(title, MARGIN + 3, y + 5);
        y += 10;
      };

      const tableRow = (label, value, isBold = false, color = COLORS.ivory) => {
        checkPage(6);
        setFont(8, isBold ? 'bold' : 'normal', color);
        doc.text(label, MARGIN + 2, y + 4);
        doc.text(String(value), PAGE_W - MARGIN - 2, y + 4, { align: 'right' });
        doc.setDrawColor(...COLORS.steel);
        doc.setLineWidth(0.1);
        doc.line(MARGIN, y + 5.5, PAGE_W - MARGIN, y + 5.5);
        y += 6;
      };

      const kpiCard = (x, w, label, value) => {
        doc.setFillColor(...COLORS.darkBlue);
        doc.roundedRect(x, y, w, 14, 1.5, 1.5, 'F');
        doc.setFillColor(...COLORS.gold);
        doc.rect(x, y, 1.5, 14, 'F');
        setFont(6, 'normal', COLORS.steel);
        doc.text(label, x + 5, y + 5);
        setFont(10, 'bold', COLORS.ivory);
        doc.text(String(value), x + 5, y + 11);
      };

      /* ── COVER PAGE ──────────────────────────────────────── */
      doc.setFillColor(...COLORS.navy);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

      // Gold accent line
      doc.setFillColor(...COLORS.gold);
      doc.rect(0, 75, PAGE_W, 2, 'F');

      // Title
      setFont(28, 'bold', COLORS.gold);
      doc.text('VALOR', PAGE_W / 2, 55, { align: 'center' });
      setFont(10, 'normal', COLORS.steel);
      doc.text('M&A Engine', PAGE_W / 2, 63, { align: 'center' });

      setFont(18, 'bold', COLORS.ivory);
      doc.text('Deal Memorandum', PAGE_W / 2, 95, { align: 'center' });

      // Campaign info
      setFont(14, 'bold', COLORS.gold);
      doc.text(state.campaignName || 'New Campaign', PAGE_W / 2, 115, { align: 'center' });

      if (state.acquirerName || state.targetName) {
        setFont(12, 'normal', COLORS.ivory);
        doc.text(`${state.acquirerName || '—'} × ${state.targetName || '—'}`, PAGE_W / 2, 125, { align: 'center' });
      }

      // Date
      setFont(9, 'normal', COLORS.steel);
      doc.text(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), PAGE_W / 2, 145, { align: 'center' });
      doc.text(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), PAGE_W / 2, 152, { align: 'center' });

      // Status badge
      setFont(9, 'bold', COLORS.green);
      doc.text(`Status: ${state.status}`, PAGE_W / 2, 165, { align: 'center' });

      // Currency
      setFont(8, 'normal', COLORS.steel);
      doc.text(`Currency: ${state.currency} | FX: USD/EGP ${fm(state.fxRateUSDEGP, 2)}`, PAGE_W / 2, 175, { align: 'center' });

      addFooter(1);

      /* ── PAGE 2: DEAL OVERVIEW ───────────────────────────── */
      doc.addPage();
      doc.setFillColor(...COLORS.navy);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
      y = MARGIN;

      // KPI Cards
      sectionTitle('Deal Overview');
      const a = state.acquirer;
      const t = state.target;
      const dt = state.dealTerms;
      const purchaseEq = dt.offerPricePerShare * t.sharesOutstanding;
      const premium = t.sharePrice > 0 ? ((dt.offerPricePerShare / t.sharePrice) - 1) * 100 : 0;

      const cardW = (COL_W - 6) / 3;
      kpiCard(MARGIN, cardW, 'Deal Value', `EGP ${fm(purchaseEq, 0)}M`);
      kpiCard(MARGIN + cardW + 3, cardW, 'Premium Paid', `${fm(premium, 1)}%`);
      kpiCard(MARGIN + 2 * (cardW + 3), cardW, 'Consideration', `${fm(dt.cashPercent, 0)}% Cash / ${fm(dt.stockPercent, 0)}% Stock`);
      y += 18;

      // Acquirer
      sectionTitle('Acquirer Financials');
      tableRow('Revenue', `EGP ${fm(a.revenue)}M`);
      tableRow('EBITDA', `EGP ${fm(a.ebitda)}M`);
      tableRow('Net Income', `EGP ${fm(a.netIncome)}M`);
      tableRow('Shares Outstanding', `${fm(a.sharesOutstanding)}M`);
      tableRow('Share Price', `EGP ${fm(a.sharePrice, 2)}`);
      tableRow('Existing Debt', `EGP ${fm(a.existingDebt)}M`);
      tableRow('Cash', `EGP ${fm(a.cash)}M`);
      tableRow('Tax Rate', `${fm(a.taxRate * 100)}%`);

      // Target
      sectionTitle('Target Financials');
      tableRow('Revenue', `EGP ${fm(t.revenue)}M`);
      tableRow('EBITDA', `EGP ${fm(t.ebitda)}M`);
      tableRow('Net Income', `EGP ${fm(t.netIncome)}M`);
      tableRow('Shares Outstanding', `${fm(t.sharesOutstanding)}M`);
      tableRow('Share Price', `EGP ${fm(t.sharePrice, 2)}`);
      tableRow('Existing Debt', `EGP ${fm(t.existingDebt)}M`);
      tableRow('Book Value of Equity', `EGP ${fm(t.bookValueOfEquity)}M`);

      // Deal Terms
      sectionTitle('Deal Terms');
      tableRow('Offer Price per Share', `EGP ${fm(dt.offerPricePerShare, 2)}`);
      tableRow('Purchase Equity Value', `EGP ${fm(purchaseEq)}M`, true);
      tableRow('Premium / (Discount)', `${fm(premium)}%`, false, premium >= 0 ? COLORS.green : COLORS.red);
      tableRow('Cash %', `${fm(dt.cashPercent, 0)}%`);
      tableRow('Stock %', `${fm(dt.stockPercent, 0)}%`);
      tableRow('New Debt for Cash %', `${fm(dt.newDebtForCashPercent, 0)}%`);
      tableRow('New Debt Interest Rate', `${fm(dt.newDebtInterestRate * 100)}%`);

      addFooter(doc.getNumberOfPages());

      /* ── PAGE 3: SOURCES & USES ──────────────────────────── */
      doc.addPage();
      doc.setFillColor(...COLORS.navy);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
      y = MARGIN;

      sectionTitle('Sources of Funds');
      const su = state.sourcesUses;
      const sources = [
        ['Revolver Draw', su.revolverDraw], ['Term Loan A', su.termLoanA],
        ['Term Loan B', su.termLoanB], ['Senior Notes', su.seniorNotes],
        ['Subordinated Notes', su.subordinatedNotes], ['Mezzanine', su.mezzanineFinancing],
        ['Seller Financing', su.sellerFinancing], ['Sponsor Equity', su.sponsorEquity],
        ['Rollover Equity', su.rolloverEquity], ['Cash on Hand', su.cashOnHand],
      ];
      const totalSources = sources.reduce((s, [, v]) => s + v, 0);
      sources.forEach(([label, val]) => { if (val) tableRow(label, `EGP ${fm(val)}M`); });
      tableRow('Total Sources', `EGP ${fm(totalSources)}M`, true, COLORS.gold);

      sectionTitle('Uses of Funds');
      const uses = [
        ['Refinance Target Debt', su.refinanceTargetDebt], ['Refinance Acquirer Debt', su.refinanceAcquirerDebt],
        ['Advisory Fees', su.advisoryFees], ['Financing Fees', su.financingFees],
        ['Legal & DD Fees', su.legalDueDiligenceFees], ['FRA Filing Fee', su.fraFilingFee],
        ['ECA Filing Fee', su.ecaFilingFee], ['Stamp Duty', su.stampDuty],
        ['Cash to Balance Sheet', su.cashToBalanceSheet],
      ];
      const totalUses = uses.reduce((s, [, v]) => s + v, 0) + purchaseEq;
      tableRow('Purchase Equity Value', `EGP ${fm(purchaseEq)}M`);
      uses.forEach(([label, val]) => { if (val) tableRow(label, `EGP ${fm(val)}M`); });
      tableRow('Total Uses', `EGP ${fm(totalUses)}M`, true, COLORS.gold);

      const delta = totalSources - totalUses;
      tableRow('Sources − Uses', `EGP ${fm(delta)}M`, true, Math.abs(delta) < 0.1 ? COLORS.green : COLORS.red);

      addFooter(doc.getNumberOfPages());

      /* ── PAGE 4: LBO SUMMARY ─────────────────────────────── */
      doc.addPage();
      doc.setFillColor(...COLORS.navy);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
      y = MARGIN;

      sectionTitle('LBO Model — Returns Summary');
      const lbo = lboCalc;
      if (lbo && lbo.returns) {
        const r = lbo.returns;
        kpiCard(MARGIN, (COL_W - 3) / 2, 'MOIC', `${fm(r.moic, 2)}x`);
        kpiCard(MARGIN + (COL_W - 3) / 2 + 3, (COL_W - 3) / 2, 'IRR', r.irr !== null ? `${fm(r.irr * 100)}%` : 'N/A');
        y += 18;

        tableRow('Entry EV/EBITDA', `${fm(lbo.entry?.entryEVEBITDA, 1)}x`);
        tableRow('Equity Invested', `EGP ${fm(r.equityInvested)}M`);
        tableRow('Equity Returned', `EGP ${fm(r.equityReturned)}M`, false, r.equityReturned >= 0 ? COLORS.green : COLORS.red);
        tableRow('Total Gain', `EGP ${fm(r.totalGain)}M`, false, r.totalGain >= 0 ? COLORS.green : COLORS.red);
        tableRow('Hold Period', `${fm(r.holdPeriod, 0)} years`);
      } else {
        setFont(9, 'normal', COLORS.steel);
        doc.text('No LBO data entered.', MARGIN + 2, y + 4);
        y += 8;
      }

      // Capital Structure
      if (lbo && lbo.capitalStructure) {
        sectionTitle('LBO — Capital Structure');
        const cs = lbo.capitalStructure;
        tableRow('Term Loan A', `EGP ${fm(cs.termLoanA)}M`);
        tableRow('Term Loan B', `EGP ${fm(cs.termLoanB)}M`);
        tableRow('Senior Notes', `EGP ${fm(cs.seniorNotes)}M`);
        tableRow('Mezzanine', `EGP ${fm(cs.mezzanine)}M`);
        tableRow('Total Debt', `EGP ${fm(cs.totalDebt)}M`, true);
        tableRow('Sponsor Equity', `EGP ${fm(cs.sponsorEquity)}M`, true, COLORS.gold);
        tableRow('Leverage (Debt / EBITDA)', `${fm(cs.leverageRatio, 1)}x`);
        tableRow('Equity %', `${fm(cs.equityPercent * 100)}%`);
      }

      addFooter(doc.getNumberOfPages());

      /* ── PAGE 5: SYNERGY SUMMARY ─────────────────────────── */
      doc.addPage();
      doc.setFillColor(...COLORS.navy);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
      y = MARGIN;

      sectionTitle('Synergy Analysis Summary');
      const syn = state.synergies;
      const revTotal = [syn.crossSelling, syn.geoExpansion, syn.pricingPower, syn.newProducts, syn.customerBase]
        .map(arr => arr.reduce((s, v) => s + v, 0));
      const totalRevSyn = revTotal.reduce((s, v) => s + v, 0);
      tableRow('Total Revenue Synergies (5Y)', `EGP ${fm(totalRevSyn)}M`);

      const hcSavings = syn.redundantPositions * syn.avgAnnualSalary * (1 + EGYPT_PARAMS.SOCIAL_INSURANCE_EMPLOYER_RATE + EGYPT_PARAMS.EMPLOYEE_PROFIT_SHARING_RATE);
      const facSavings = syn.duplicateFacilities * syn.avgRentPerFacility;
      const procSavings = syn.combinedProcurementSpend * (syn.procurementDiscountPct / 100);
      const itSGA = syn.itSavings + (syn.combinedSGA * (syn.sgaOverlapPct / 100));
      const totalCostSyn = hcSavings + facSavings + procSavings + itSGA;
      tableRow('Total Cost Synergies (Run-Rate)', `EGP ${fm(totalCostSyn)}M`);

      const integrationCosts = syn.redundantPositions * syn.avgAnnualSalary
        * EGYPT_PARAMS.SEVERANCE_MONTHS_PER_YEAR_OF_SERVICE * syn.avgYearsOfService / 12
        + syn.facilityClosureCosts + syn.itIntegrationCosts + syn.rebrandingCosts + syn.otherIntegrationCosts;
      tableRow('Integration Costs', `EGP ${fm(integrationCosts)}M`, false, COLORS.red);

      /* ── FAIRNESS OPINION ────────────────────────────────── */
      sectionTitle('Fairness Opinion');
      const fair = state.fairness;
      const methodologies = [
        { label: 'DCF Valuation', low: fair.dcfLow, high: fair.dcfHigh },
        { label: 'Trading Comparables', low: fair.compsLow, high: fair.compsHigh },
        { label: 'Precedent Transactions', low: fair.precedentLow, high: fair.precedentHigh },
        { label: '52-Week Trading Range', low: fair.week52Low, high: fair.week52High },
        { label: 'Analyst Price Targets', low: fair.analystLow, high: fair.analystHigh },
        { label: 'LBO Floor', low: fair.lboLow, high: fair.lboHigh },
      ].filter(m => m.low > 0 || m.high > 0);

      const offerPrice = dt.offerPricePerShare;
      const inRange = methodologies.filter(m => offerPrice >= m.low && offerPrice <= m.high).length;
      const isFair = methodologies.length > 0 && inRange >= Math.ceil(methodologies.length * 0.6);

      if (methodologies.length > 0) {
        // Table header
        checkPage(10);
        doc.setFillColor(...COLORS.darkBlue);
        doc.rect(MARGIN, y, COL_W, 6, 'F');
        setFont(7, 'bold', COLORS.gold);
        doc.text('Methodology', MARGIN + 2, y + 4);
        doc.text('Low', MARGIN + 90, y + 4);
        doc.text('High', MARGIN + 115, y + 4);
        doc.text('Within Range', MARGIN + 140, y + 4);
        y += 7;

        methodologies.forEach(m => {
          checkPage(6);
          const within = offerPrice >= m.low && offerPrice <= m.high;
          setFont(7, 'normal', COLORS.ivory);
          doc.text(m.label, MARGIN + 2, y + 4);
          doc.text(`EGP ${fm(m.low, 2)}`, MARGIN + 90, y + 4);
          doc.text(`EGP ${fm(m.high, 2)}`, MARGIN + 115, y + 4);
          setFont(7, 'bold', within ? COLORS.green : COLORS.red);
          doc.text(within ? '✓' : '✗', MARGIN + 148, y + 4);
          doc.setDrawColor(...COLORS.steel);
          doc.setLineWidth(0.1);
          doc.line(MARGIN, y + 5.5, PAGE_W - MARGIN, y + 5.5);
          y += 6;
        });

        y += 3;
        setFont(10, 'bold', isFair ? COLORS.green : COLORS.red);
        doc.text(isFair ? 'FAIR' : 'OUTSIDE FAIR RANGE', MARGIN + 2, y + 4);
        setFont(8, 'normal', COLORS.steel);
        doc.text(`${inRange} of ${methodologies.length} methodologies (${Math.round(inRange / methodologies.length * 100)}%) contain the offer price`, MARGIN + 35, y + 4);
        y += 8;
      } else {
        setFont(9, 'normal', COLORS.steel);
        doc.text('No fairness data entered.', MARGIN + 2, y + 4);
        y += 8;
      }

      addFooter(doc.getNumberOfPages());

      /* ── PAGE 6: REGULATORY + EGYPT PARAMS ───────────────── */
      doc.addPage();
      doc.setFillColor(...COLORS.navy);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
      y = MARGIN;

      sectionTitle('Regulatory Checklist Status');
      const reg = state.regulatoryChecklist;
      const regItems = [
        ['ECA Merger Notification', reg.eca],
        ['GAFI Registration', reg.gafi],
        ['Shareholder Approval', reg.shareholderApproval],
        ['FRA Pre-Notification', reg.fraPreNotification],
        ['Mandatory Tender Offer', reg.mandatoryTenderOffer],
        ['Fairness Opinion Filed', reg.fairnessOpinionFiled],
        ['CBE Approval', reg.cbeApproval],
        ['CBE FX Approval', reg.cbeFXApproval],
        ['FRA Insurance Approval', reg.fraInsurance],
        ['Commercial Registry Update', reg.commercialRegistry],
        ['Tax Authority Notification', reg.taxAuthority],
        ['Labor Authority Notification', reg.laborAuthority],
        ['CBE Cross-Border Registration', reg.cbeRegistration],
      ];
      const completed = regItems.filter(([, v]) => v).length;
      tableRow('Progress', `${completed} / ${regItems.length} (${Math.round(completed / regItems.length * 100)}%)`, true,
        completed === regItems.length ? COLORS.green : COLORS.gold);
      regItems.forEach(([label, done]) => {
        tableRow(`${done ? '☑' : '☐'} ${label}`, done ? 'Complete' : 'Pending', false, done ? COLORS.green : COLORS.steel);
      });

      /* ── EGYPT PARAMETERS TABLE ──────────────────────────── */
      sectionTitle('Egyptian Regulatory Parameters');
      const EP = EGYPT_PARAMS;
      tableRow('Corporate Tax Rate', `${(EP.CORPORATE_TAX_RATE * 100).toFixed(1)}%`);
      tableRow('Capital Gains Tax (Listed)', `${(EP.CAPITAL_GAINS_TAX_LISTED * 100).toFixed(1)}%`);
      tableRow('Capital Gains Tax (Unlisted)', `${(EP.CAPITAL_GAINS_TAX_UNLISTED * 100).toFixed(1)}%`);
      tableRow('Stamp Duty (per side)', `${(EP.STAMP_DUTY_RATE_PER_SIDE * 100).toFixed(3)}%`);
      tableRow('CBE Overnight Lending Rate', `${(EP.CBE_OVERNIGHT_LENDING_RATE * 100).toFixed(2)}%`);
      tableRow('CBE Discount Rate', `${(EP.CBE_DISCOUNT_RATE * 100).toFixed(2)}%`);
      tableRow('MTO Threshold', `${(EP.MANDATORY_TENDER_OFFER_THRESHOLD * 100).toFixed(0)}%`);
      tableRow('ECA Revenue Threshold', `EGP ${(EP.ECA_NOTIFICATION_THRESHOLD_REVENUE_EGP / 1e6).toFixed(0)}M`);
      tableRow('Severance (months/year)', `${EP.SEVERANCE_MONTHS_PER_YEAR_OF_SERVICE}`);
      tableRow('Social Insurance (Employer)', `${(EP.SOCIAL_INSURANCE_EMPLOYER_RATE * 100).toFixed(2)}%`);
      tableRow('Goodwill Amortization', `${EP.GOODWILL_AMORTIZATION_YEARS} years`);
      tableRow('USD/EGP Rate', `${EP.USD_EGP_RATE}`);

      addFooter(doc.getNumberOfPages());

      /* ── FINAL PAGE: DISCLAIMER ──────────────────────────── */
      doc.addPage();
      doc.setFillColor(...COLORS.navy);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
      y = MARGIN;

      sectionTitle('Disclaimer');
      setFont(8, 'normal', COLORS.steel);
      const disclaimer = [
        'This memorandum was prepared using Valor M&A Engine. All parameters are',
        'calibrated to Egyptian law and CBE rates as of Q4 2024. Tax rates, regulatory',
        'thresholds, and CBE interest rates are subject to change. Users must verify',
        'current rates with qualified legal and tax advisors before relying on this',
        'engine for actual transactions.',
        '',
        'This engine does not constitute legal, tax, or financial advisory services.',
        '',
        'This analysis is prepared in reference to the requirements of the Financial',
        'Regulatory Authority (FRA) under Capital Market Law No. 95 of 1992 and its',
        'executive regulations. This analysis does not constitute a formal fairness',
        'opinion and should not be relied upon as such without independent',
        'professional review.',
      ];
      disclaimer.forEach(line => {
        doc.text(line, MARGIN + 2, y + 4);
        y += 5;
      });

      y += 10;
      doc.setFillColor(...COLORS.gold);
      doc.rect(MARGIN, y, COL_W, 0.5, 'F');
      y += 8;
      setFont(10, 'bold', COLORS.gold);
      doc.text('VALOR', PAGE_W / 2, y, { align: 'center' });
      setFont(7, 'normal', COLORS.steel);
      doc.text('M&A Engine | Part of the Wolf Financial Suite', PAGE_W / 2, y + 6, { align: 'center' });

      addFooter(doc.getNumberOfPages());

      /* ── SAVE ────────────────────────────────────────────── */
      const filename = `VALOR_Deal_Memo_${(state.campaignName || 'export').replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(filename);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('PDF generation error:', err);
      setStatus('idle');
    }
  }, [state, lboCalc, fm, formatNumber]);

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader
        title="Dispatch — Deal Memorandum"
        subtitle="Generate a comprehensive PDF export of all deal analysis modules"
      />

      {/* Preview Cards */}
      <div className="grid grid-cols-3 gap-4">
        <PreviewCard title="Deal Overview" items={['Acquirer & Target Financials', 'Deal Terms & Premium', 'Sources & Uses']} />
        <PreviewCard title="Analysis" items={['LBO Returns (MOIC / IRR)', 'Synergy Summary', 'Fairness Opinion Verdict']} />
        <PreviewCard title="Compliance" items={['Regulatory Checklist Status', 'Egypt Parameters Table', 'FRA Disclaimer']} />
      </div>

      {/* Generate Button */}
      <div className="flex flex-col items-center justify-center py-10 rounded-lg border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <FileText className="w-10 h-10 mb-4" style={{ color: '#C5A44E' }} />
        <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: '#F4EDE4' }}>
          Deal Memorandum
        </h3>
        <p className="text-xs mb-6" style={{ color: '#7C8DB0' }}>
          {state.campaignName || 'New Campaign'} — {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <button
          onClick={generatePDF}
          disabled={status === 'generating'}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer"
          style={{
            backgroundColor: status === 'done' ? '#4CAF50' : '#C5A44E',
            color: '#0B0F1A',
            opacity: status === 'generating' ? 0.7 : 1,
          }}
        >
          {status === 'idle' && <><Download className="w-4 h-4" />Generate & Download PDF</>}
          {status === 'generating' && <><Loader2 className="w-4 h-4 animate-spin" />Generating Memorandum...</>}
          {status === 'done' && <><CheckCircle2 className="w-4 h-4" />Downloaded Successfully</>}
        </button>

        <p className="text-[10px] mt-3" style={{ color: '#7C8DB0' }}>
          7-page A4 document • Dark theme • All module data included
        </p>
      </div>

      {/* Document Structure */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
        <div className="px-4 py-2 border-b" style={{ backgroundColor: '#0B0F1A', borderColor: '#2C3E6B' }}>
          <h3 className="text-xs font-semibold" style={{ color: '#C5A44E' }}>Document Structure</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {[
            { page: 1, title: 'Cover Page', desc: 'VALOR branding, campaign name, date stamp' },
            { page: 2, title: 'Deal Overview', desc: 'Acquirer/Target financials, deal terms, KPI cards' },
            { page: 3, title: 'Sources & Uses', desc: 'Full funding structure with balance check' },
            { page: 4, title: 'LBO Returns', desc: 'MOIC, IRR, capital structure summary' },
            { page: 5, title: 'Synergy & Fairness', desc: 'Synergy totals, fairness opinion table & verdict' },
            { page: 6, title: 'Regulatory & Parameters', desc: 'Checklist status, Egypt regulatory constants' },
            { page: 7, title: 'Disclaimer', desc: 'FRA disclosure, legal caveats, footer' },
          ].map((p) => (
            <div key={p.page} className="flex items-start gap-3 px-3 py-2 rounded" style={{ backgroundColor: '#0B0F1A' }}>
              <div className="text-xs font-bold flex-shrink-0 w-6 h-6 flex items-center justify-center rounded" style={{ backgroundColor: '#2C3E6B', color: '#C5A44E' }}>{p.page}</div>
              <div>
                <p className="text-xs font-medium" style={{ color: '#F4EDE4' }}>{p.title}</p>
                <p className="text-[10px]" style={{ color: '#7C8DB0' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ title, items }) {
  return (
    <div className="p-4 rounded-lg border" style={{ backgroundColor: '#1A2340', borderColor: '#2C3E6B' }}>
      <h4 className="text-xs font-semibold mb-2" style={{ color: '#C5A44E' }}>{title}</h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[11px] flex items-center gap-1.5" style={{ color: '#7C8DB0' }}>
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#C5A44E' }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
