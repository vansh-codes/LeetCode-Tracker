"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Heatmap from "../../components/HeatMap";
import ProblemList from "../../components/ProblemList";
import { Calendar, Code2, Loader2 } from "lucide-react";

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
                <h1 className="text-4xl font-bold mb-8 flex items-center">
                    <Calendar className="mr-2" /> LeetCode Heatmap
                </h1>
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
        </div>
    );
}
