import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ActivityCalendar from "react-activity-calendar";

const Heatmap = ({ heatmapData = {}, onClickDay }) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const startDate = new Date(selectedYear, 0, 1); // january 1, selectedYear
    let endDate =
        selectedYear === currentYear
            ? new Date()
            : new Date(selectedYear, 11, 31);

    endDate.setDate(endDate.getDate() + 1);
    const   activityData = [];

    for (let dt = startDate; dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        const dateString = dt.toISOString().slice(0, 10); // format date as YYYY-MM-DD
        const count = heatmapData[dateString]?.length || 0; // count of problems solved
        const level =
            count > 15 ? 4 : count > 9 ? 3 : count > 4 ? 2 : count > 0 ? 1 : 0; // set level

        activityData.push({
            date: dateString,
            count: count,
            level: level,
        });
    }

    // handle year change
    const handleYearChange = (event) => {
        const year = parseInt(event.target.value, 10);
        setSelectedYear(year);
    };

    // generate year options dynamically from 2024 to current year
    const yearOptions = [];
    for (let year = 2024; year <= currentYear; year++) {
        yearOptions.push(year);
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <ActivityCalendar
                data={activityData}
                eventHandlers={{
                    onClick: (event) => (value) => {
                        onClickDay(value.date);
                    },
                }}
                labels={{ 
                    legend: {
                        "less": "Less",
                        "more": "More"
                    },
                    totalCount: `{{count}} problems solved`
                }}
                blockRadius={5}
                blockSize={15}
                hideColorLegend={false}
                hideMonthLabels={false}
                hideTotalCount={false}
                maxLevel={4}
                theme={{
                    light: [
                        "#f0fff4",
                        "#c4edde",
                        "#7ac7c4",
                        "#f73859",
                        "#384259",
                    ],
                    dark: [
                        "hsl(0, 0%, 22%)",
                        "#c6f6d5",
                        "#9ae6b4",
                        "#68d391",
                        "#48bb78",
                    ],
                }}
                renderBlock={(block, activity) =>
                    React.cloneElement(block, {
                        "data-tooltip-id": "react-tooltip",
                        "data-tooltip-html": `${activity.count} activities on ${activity.date}`,
                    })
                }
            />
            <ReactTooltip id="react-tooltip" />

            {/* Year Dropdown */}
            {yearOptions.length > 1 && (
                <select
                    className="mt-4 sm:mt-0 px-3 py-2 bg-gray-800 border border-gray-300 rounded-lg shadow-sm text-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 text-center"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    {yearOptions.map((year) => (
                        <option
                            key={year}
                            value={year}
                            className="text-gray-500 hover:bg-green-100"
                        >
                            {year}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default Heatmap;
