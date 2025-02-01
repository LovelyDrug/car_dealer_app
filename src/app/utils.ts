import { MakesData, path } from "@/app/types/Make";
import { ModelData } from "@/app/types/Model";

export async function generateStaticParams() {
  const makesRes = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const makesData: MakesData = await makesRes.json();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  const paths: path[] = [];

  if (makesData.Results) {
    for (const result of makesData.Results) {
      for (const year of years) {
        paths.push({ MakeId: result.MakeId, Year: year });
      }
    }
  }
  return paths;
}

export async function fetchVehicleModels(makeId: number, year: number) {
  try {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data: ModelData = await res.json();
    return data.Results;
  } catch (error) {
    console.error("Error fetching vehicle models:", error);
    return [];
  }
}
