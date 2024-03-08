// {
//     "status": 200,
//     "code": "RP_7002",
//     "message": "Find Report Success!",
//     "data": {
//         "totalPage": 3,
//         "data": [
//             {
//                 "reportId": "05959af1-0843-4867-baae-64de1979071c",
//                 "timeReport": "2024-03-06T15:01:04",
//                 "reason": "Bài học như hạch",
//                 "status": "PENDING",
//                 "targetId": "e1c642c3-ca64-4f97-8c97-587486e7b9f4",
//                 "type": "LESSON",
//                 "userReport": "anhdt"
//             }
//         ]  
//     }
// }

export interface ReportResponses {
  reportId: string;
  timeReport: string;
  reason: string;
  status: string;
  targetId: string;
  type: string;
  imageUrl: string;
  userReport: string;
}