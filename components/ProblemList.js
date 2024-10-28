"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Plus, Minus, FileText } from "lucide-react";

// Skeleton loader component
const SkeletonLoader = () => (
    <div className="animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
);

const ProblemList = ({ problems }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-4 p-4 border border-gray-700 rounded-lg bg-gray-900 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">Problems Solved</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading
                    ? Array(6)
                          .fill(0)
                          .map((_, index) => (
                              <li
                                  key={index}
                                  className="p-4 border border-gray-700 rounded-md shadow-sm bg-gray-800"
                              >
                                  <SkeletonLoader />
                              </li>
                          ))
                    : problems
                          .filter(problem => problem.stats !== null)
                          .sort((a, b) => a.message.localeCompare(b.message))
                          .map((problem, index) => (
                              <motion.li
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                  className="p-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                              >
                                  <div>
                                      {problem.blob_url ? (
                                          <a
                                              href={problem.blob_url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-400 hover:underline flex items-center gap-2 mb-2"
                                          >
                                              <FileText size={18} />
                                              <span className="font-medium text-gray-200 line-clamp-2">
                                                  {problem.message}
                                              </span>
                                              <ExternalLink
                                                  size={14}
                                                  className="flex-shrink-0"
                                              />
                                          </a>
                                      ) : (
                                          <span className="text-gray-300 font-medium flex items-center gap-2 mb-2">
                                              <FileText size={18} />
                                              <span className="line-clamp-2">
                                                  {problem.message}
                                              </span>
                                          </span>
                                      )}
                                  </div>
                                  <div className="mt-2 text-sm">
                                      <div className="flex justify-between items-center text-gray-400">
                                          <span>Total:</span>
                                          <span>{problem.stats.total}</span>
                                      </div>
                                      <div className="flex justify-between items-center text-green-400">
                                          <span className="flex items-center">
                                              <Plus size={14} className="mr-1" />{" "}
                                              Additions:
                                          </span>
                                          <span>{problem.stats.additions}</span>
                                      </div>
                                      <div className="flex justify-between items-center text-red-400">
                                          <span className="flex items-center">
                                              <Minus size={14} className="mr-1" />{" "}
                                              Deletions:
                                          </span>
                                          <span>{problem.stats.deletions}</span>
                                      </div>
                                  </div>
                              </motion.li>
                          ))}
            </ul>
        </div>
    );
};

export default ProblemList;
