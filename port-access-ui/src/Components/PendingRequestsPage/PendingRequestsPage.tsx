import { useMemo, useState } from "react";

import "./PendingRequestsPage.css";
import Topbar from "../Layouts/Topbar";
import Ai from "../Ai/Ai";

type RiskFlag =
  | "LATE_HISTORY"
  | "DOCUMENT_EXPIRED"
  | "UNVERIFIED_DRIVER"
  | "NONE";

type RequestRow = {
  id: string;
  carrierCode: string;
  carrierName: string;
  carrierId: string;
  vehicleNo: string;
  driverName: string;
  slotTime: string;
  slotDate: string;
  gate: string;
  risk: RiskFlag;
};

const mockRows: RequestRow[] = [
  {
    id: "1",
    carrierCode: "GL",
    carrierName: "Global Logistics",
    carrierId: "ID: #C-99021",
    vehicleNo: "ABC - 1234",
    driverName: "Johnathan Miller",
    slotTime: "09:00 - 09:30",
    slotDate: "Oct 24, 2023",
    gate: "Gate 04",
    risk: "LATE_HISTORY",
  },
  {
    id: "2",
    carrierCode: "FT",
    carrierName: "FastTrack Inc",
    carrierId: "ID: #C-11421",
    vehicleNo: "XYZ - 5678",
    driverName: "Sarah Connor",
    slotTime: "09:15 - 09:45",
    slotDate: "Oct 24, 2023",
    gate: "Gate 02",
    risk: "NONE",
  },
  {
    id: "3",
    carrierCode: "CS",
    carrierName: "CargoStream",
    carrierId: "ID: #C-00512",
    vehicleNo: "LMN - 9012",
    driverName: "Dave Batista",
    slotTime: "09:30 - 10:00",
    slotDate: "Oct 24, 2023",
    gate: "Gate 04",
    risk: "DOCUMENT_EXPIRED",
  },
  {
    id: "4",
    carrierCode: "BT",
    carrierName: "Blue Sky Trans",
    carrierId: "ID: #C-22394",
    vehicleNo: "BJT - 4421",
    driverName: "Marco Polo",
    slotTime: "10:00 - 10:30",
    slotDate: "Oct 24, 2023",
    gate: "Gate 01",
    risk: "NONE",
  },
  {
    id: "5",
    carrierCode: "EE",
    carrierName: "Eagle Eye",
    carrierId: "ID: #C-55821",
    vehicleNo: "VRT - 0092",
    driverName: "Elena Gilbert",
    slotTime: "10:15 - 10:45",
    slotDate: "Oct 24, 2023",
    gate: "Gate 03",
    risk: "UNVERIFIED_DRIVER",
  },
];

function riskMeta(risk: RiskFlag) {
  switch (risk) {
    case "LATE_HISTORY":
      return { label: "LATE HISTORY", tone: "warn" as const };
    case "DOCUMENT_EXPIRED":
      return { label: "DOCUMENT EXPIRED", tone: "danger" as const };
    case "UNVERIFIED_DRIVER":
      return { label: "UNVERIFIED DRIVER", tone: "warn" as const };
    default:
      return { label: "No risks detected", tone: "muted" as const };
  }
}

export default function PendingRequestsPage() {
  const [highRiskOnly, setHighRiskOnly] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const rows = useMemo(() => {
    if (!highRiskOnly) return mockRows;
    return mockRows.filter((r) => r.risk !== "NONE");
  }, [highRiskOnly]);

  const allSelected = rows.length > 0 && rows.every((r) => selected[r.id]);
  const toggleAll = () => {
    const next: Record<string, boolean> = {};
    if (!allSelected) rows.forEach((r) => (next[r.id] = true));
    setSelected(next);
  };

  return (
    <div className="prqPage">
      <Topbar />
      {/* This assumes your Topbar is fixed and takes height ~72px */}
      <div className="prqContainer">
        {/* Header */}
        <div className="prqHeader">
          <div className="prqTitleWrap">
            <div className="prqTitleRow">
              <h1 className="prqTitle">Pending Requests Queue</h1>
              <span className="prqPill">24 New</span>
            </div>
            <p className="prqSubtitle">
              Real-time gate assignment and slot verification system.
            </p>
          </div>

          <div className="prqHeaderActions">
            <button className="prqBtn prqBtnGhost">
              <span className="prqBtnIcon">⬇</span> Export CSV
            </button>
            <button className="prqBtn prqBtnPrimary">
              <span className="prqBtnIcon">＋</span> New Booking
            </button>
          </div>
        </div>

        {/* Filters Card */}
        <div className="prqCard prqFilters">
          <div className="prqFiltersLeft">
            <div className="prqFiltersLabel">
              <span className="prqFunnel">⎇</span>
              <span>FILTERS</span>
            </div>

            <div className="prqSelect">
              <span className="prqSelectText">All Gates</span>
              <span className="prqSelectCaret">▾</span>
            </div>
            <div className="prqSelect">
              <span className="prqSelectText">Today&apos;s Slots</span>
              <span className="prqSelectCaret">▾</span>
            </div>
            <div className="prqSelect">
              <span className="prqSelectText">All Carriers</span>
              <span className="prqSelectCaret">▾</span>
            </div>

            <button
              className={`prqRiskToggle ${highRiskOnly ? "isOn" : ""}`}
              onClick={() => setHighRiskOnly((v) => !v)}
              type="button"
            >
              <span className="prqRiskIcon">▲</span>
              High Risk Only
            </button>
          </div>

          <div className="prqFiltersRight">
            <span className="prqShowing">
              Showing 1-{rows.length} of {rows.length}
            </span>
            <div className="prqPagerMini">
              <button className="prqIconBtn" type="button">
                ‹
              </button>
              <button className="prqIconBtn" type="button">
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="prqCard prqTableCard">
          <div className="prqTableHead">
            <label className="prqCheckbox">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
              />
              <span className="prqCheckMark" />
            </label>

            <div className="prqTh">CARRIER</div>
            <div className="prqTh">VEHICLE DETAILS</div>
            <div className="prqTh">REQUESTED SLOT</div>
            <div className="prqTh">GATE</div>
            <div className="prqTh">RISK FLAGS</div>
            <div className="prqTh prqThRight">ACTIONS</div>
          </div>

          <div className="prqTableBody">
            {rows.map((r) => {
              const meta = riskMeta(r.risk);
              const checked = !!selected[r.id];

              return (
                <div className="prqRow" key={r.id}>
                  <label className="prqCheckbox">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setSelected((prev) => ({
                          ...prev,
                          [r.id]: !prev[r.id],
                        }))
                      }
                    />
                    <span className="prqCheckMark" />
                  </label>

                  <div className="prqCarrier">
                    <div className="prqAvatar">{r.carrierCode}</div>
                    <div className="prqCarrierMeta">
                      <div className="prqCarrierName">{r.carrierName}</div>
                      <div className="prqCarrierId">{r.carrierId}</div>
                    </div>
                  </div>

                  <div className="prqVehicle">
                    <div className="prqVehicleNo">{r.vehicleNo}</div>
                    <div className="prqDriver">{r.driverName}</div>
                  </div>

                  <div className="prqSlot">
                    <div className="prqSlotTime">{r.slotTime}</div>
                    <div className="prqSlotDate">{r.slotDate}</div>
                  </div>

                  <div className="prqGate">
                    <span className="prqGatePill">{r.gate}</span>
                  </div>

                  <div className="prqRisk">
                    {r.risk === "NONE" ? (
                      <span className="prqRiskMuted">No risks detected</span>
                    ) : (
                      <span className={`prqBadge ${meta.tone}`}>
                        {meta.label}
                      </span>
                    )}
                  </div>

                  <div className="prqActions">
                    <div className="prqSplitBtn">
                      <button className="prqBtn prqBtnDangerSm" type="button">
                        Reject
                      </button>
                      <button
                        className="prqBtn prqBtnDangerSm prqBtnCaret"
                        type="button"
                      >
                        ▾
                      </button>
                    </div>
                    <button className="prqBtn prqBtnPrimarySm" type="button">
                      Confirm
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="prqTableFooter">
            <div className="prqItemsPerPage">
              <span>Items per page:</span>
              <div className="prqSelect prqSelectSmall">
                <span className="prqSelectText">25</span>
                <span className="prqSelectCaret">▾</span>
              </div>
            </div>

            <div className="prqPagination">
              <button className="prqIconBtn" type="button">
                «
              </button>
              <button className="prqIconBtn" type="button">
                ‹
              </button>
              <button className="prqPageBtn isActive" type="button">
                1
              </button>
              <button className="prqPageBtn" type="button">
                2
              </button>
              <button className="prqPageBtn" type="button">
                3
              </button>
              <span className="prqDots">…</span>
              <button className="prqPageBtn" type="button">
                12
              </button>
              <button className="prqIconBtn" type="button">
                ›
              </button>
              <button className="prqIconBtn" type="button">
                »
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="prqStatsGrid">
          <div className="prqCard prqStat">
            <div className="prqStatIcon">⏱</div>
            <div>
              <div className="prqStatLabel">AVG DECISION TIME</div>
              <div className="prqStatValue">
                4.2 <span className="prqStatUnit">min</span>
              </div>
            </div>
          </div>

          <div className="prqCard prqStat">
            <div className="prqStatIcon">✅</div>
            <div>
              <div className="prqStatLabel">CONF. RATE (TODAY)</div>
              <div className="prqStatValue">
                88.5<span className="prqStatUnit">%</span>
              </div>
            </div>
          </div>

          <div className="prqCard prqStat">
            <div className="prqStatIcon">⏳</div>
            <div>
              <div className="prqStatLabel">PENDING VERIFICATION</div>
              <div className="prqStatValue">14</div>
            </div>
          </div>
          <Ai />
        </div>
      </div>
    </div>
  );
}
