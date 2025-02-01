export interface Make {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface MakesData {
  Count: number;
  Results: Make[];
}

export interface path {
  MakeId: number;
  Year: number;
}
