"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Calendar, Code2, Loader2 } from "lucide-react";
import Heatmap from "../../components/HeatMap";
import ProblemList from "../../components/ProblemList";

export default function Home() {
    const [heatmapData, setHeatmapData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [commitData, setCommitData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("./api/github");
                const data = await response.data;
                setHeatmapData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setCommitData(null);
        const fetchCommitData = async () => {
            if (selectedDate && heatmapData[selectedDate]) {
                const commitsData = heatmapData[selectedDate];
                try {
                    const response = await axios.post("./api/commit", {
                        commits: heatmapData[selectedDate],
                    });
                    const data = await response.data;
                    setCommitData(data);
                } catch (error) {
                    console.error("Error fetching commit data:", error);
                }
            }
        };
        fetchCommitData();
    }, [selectedDate, heatmapData]);

    const handleClickDay = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto"
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold mb-8 flex items-center">
                        <Calendar className="mr-2" /> LeetCode Heatmap
                    </h1>
                    <a
                        href="https://github.com/vansh-codes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4"
                    >
                        <svg
                            className="w-8 h-8 text-gray-200 fill-current -mt-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            data-tooltip-id="github-tooltip"
                            data-tooltip-content="Visit my GitHub"
                        >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                    </a>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin h-8 w-8 mr-2" />
                        <p className="text-xl">Loading data...</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Heatmap
                            heatmapData={heatmapData}
                            onClickDay={handleClickDay}
                        />
                    </motion.div>
                )}
                {selectedDate && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-8 relative"
                    >
                        <button
                            onClick={() => setSelectedDate(null)}
                            className="absolute top-0 right-0 p-1 text-gray-100 hover:text-gray-300"
                            aria-label="Close"
                        >
                            &#10005;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <Code2 className="mr-2" /> Problems Solved on{" "}
                            {selectedDate}
                        </h2>
                        {heatmapData[selectedDate] === undefined ? (
                            <div className="flex justify-center items-center h-32">
                                <p className="text-lg">
                                    No commits available for {selectedDate}
                                </p>
                            </div>
                        ) : commitData ? (
                            <ProblemList problems={commitData} />
                        ) : (
                            <div className="flex justify-center items-center h-32">
                                <Loader2 className="animate-spin h-6 w-6 mr-2" />
                                <p className="text-lg">
                                    Loading commit data...
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </motion.div>
            <ReactTooltip id="github-tooltip" />
        </div>
    );
}
