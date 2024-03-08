// "data": {
//     "totalPage": 1,
//     "data": [
//         {
//             "id": "f7896d46-d43c-4e3c-8709-c067025dd691",
//             "title": "123",
//             "description": null,
//             "weighted": 123.0,
//             "answers": [
//                 {
//                     "value": "123",
//                     "is_correct": true
//                 }
//             ],
//             "created_date": "2024-03-08T19:56:40",
//             "created_by": "dd6bd5ed-0932-458f-9d64-4f45c1285003",
//             "last_modified_date": "2024-03-08T19:56:40",
//             "last_modified_by": "dd6bd5ed-0932-458f-9d64-4f45c1285003",
//             "question_type_id": "dabc3414-759f-4d57-a45e-8d74c6d40d43"
//         }
//     ]

import { AnswerResponses } from "../answer/answer.responses";

// }
export interface QuestionResponses{
    id: string;
    title: string;
    description: string;
    weighted: number;
    answers: AnswerResponses[];
    created_date: Date;
    created_by: string;
    last_modified_date: Date;
    last_modified_by: string;
    question_type_id: string;
}
