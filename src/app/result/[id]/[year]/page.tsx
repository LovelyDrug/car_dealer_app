import { fetchVehicleModels } from "@/app/utils";
import Link from "next/link";
import { Suspense } from "react";

export default async function ResultPage({ params } : { params: { id: number, year: number } }) {
  const { id, year } = await params;
  const models = await fetchVehicleModels(id, year);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 gap-3">
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex flex-col gap-3 justify-center items-center relative bg-white p-10 shadow-md rounded-lg w-fit-content">
          <Link
            href={"/"}
            className={
              "absolute top-3 left-3 flex gap-2 items-center text-center p-1 px-3 rounded text-white bg-blue-300 hover:bg-blue-500"
            }
          >
            &#8592;
          </Link>
          <h1 className="text-2xl font-bold mb-4">
            Vehicle Models for {year}
          </h1>
          {models.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 text-center">
              {models.map((model, index) => (
                <div
                  key={index}
                  className=" bg-gray-200 rounded p-4 hover:scale-110 transition-all"
                >
                  {model.Model_Name}
                </div>
              ))}
            </div>
          ) : (
            <p>No models found for this make and year.</p>
          )}
        </div>
      </Suspense>
    </div>
  );
}
