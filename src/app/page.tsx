"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

interface Make {
  MakeId: number;
  MakeName: string;
}

export default function Home() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    )
      .then((res) => res.json())
      .then((data) => setMakes(data.Results))
      .catch((error) => console.error("Error fetching vehicle makes:", error));
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Select Vehicle Make & Model Year
      </h1>
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <label className="block mb-2">Vehicle Make:</label>
        <Suspense fallback={<p>Loading...</p>}>
          <select
            className="w-full p-2 border rounded mb-4"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select a Make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </Suspense>

        <label className="block mb-2">Model Year:</label>
        <Suspense fallback={<p>Loading...</p>}>
          <select
            className="w-full p-2 border rounded mb-4"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select a Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </Suspense>
        <Link
          href={
            selectedMake && selectedYear
              ? `/result/${selectedMake}/${selectedYear}`
              : "#"
          }
          className={`block text-center p-2 rounded text-white ${
            selectedMake && selectedYear
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
