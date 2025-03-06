import React from "react";

interface LogSheet {
  date: string;
  grid: string[];
  events: Array<{
    status: string;
    start: string;
    end: string;
    duration: number;
    activity?: string;
  }>;
  totals: {
    driving: number;
    on_duty: number;
    off_duty: number;
    sleeper: number;
  };
}

interface ELDLogSheetProps {
  logSheets: LogSheet[] | null;
}

const ELDLogSheet: React.FC<ELDLogSheetProps> = ({ logSheets }) => {
  if (!logSheets || logSheets.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md log-sheet-container flex items-center justify-center">
        <p className="text-gray-500">Log sheet visualization will appear here</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">ELD Log Sheet</h2>
      <div className="log-sheet-container">
        {logSheets.map((log, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Date: {log.date}
            </h3>
            <div className="grid grid-cols-24 gap-1 mb-4">
              {log.grid.map((status, idx) => (
                <div
                  key={idx}
                  className={`h-4 ${
                    status === "D"
                      ? "bg-blue-500"
                      : status === "ON"
                      ? "bg-green-500"
                      : status === "SB"
                      ? "bg-yellow-500"
                      : "bg-gray-200"
                  }`}
                  title={`${Math.floor(idx / 4)}:${(idx % 4) * 15}`}
                />
              ))}
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600">Events:</h4>
              {log.events.map((event, idx) => (
                <p key={idx} className="text-sm text-gray-600">
                  {event.start} - {event.end}: {event.status}{" "}
                  {event.activity && `(${event.activity})`} (
                  {event.duration.toFixed(2)} hrs)
                </p>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600">Totals:</h4>
              <p className="text-sm text-gray-600">
                Driving: {log.totals.driving.toFixed(2)} hrs
              </p>
              <p className="text-sm text-gray-600">
                On Duty: {log.totals.on_duty.toFixed(2)} hrs
              </p>
              <p className="text-sm text-gray-600">
                Off Duty: {log.totals.off_duty.toFixed(2)} hrs
              </p>
              <p className="text-sm text-gray-600">
                Sleeper: {log.totals.sleeper.toFixed(2)} hrs
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ELDLogSheet;