import { Assignment } from "../adapters/services/assignment.service";

const Log = (functionName: string, start: number, end: number) => {
  console.log("");
  console.log(`Function '${functionName}'`);
  console.log("start time is", start);
  console.log("end time is", end);
  console.log("diff time is", end - start);
  console.log("");
};

const assignment = new Assignment();

// Time Performance of function "getTotalRevenueV1"
const startV1 = performance.now();
assignment.getTotalRevenueV1();
const endV1 = performance.now();
Log("getTotalRevenueV1", startV1, endV1);

// Time Performance of function "getTotalRevenueV2"
const startV2 = performance.now();
assignment.getTotalRevenueV2();
const endV2 = performance.now();
Log("getTotalRevenueV2", startV2, endV2);

// Time Performance of function "getTotalRevenueV3"
const startV3 = performance.now();
assignment.getTotalRevenueV3();
const endV3 = performance.now();
Log("getTotalRevenueV3", startV3, endV3);