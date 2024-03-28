// {
//     "status": 200,
//     "code": "INV_13003",
//     "message": "Get all Invoice!",
//     "data": [
//         {
//             "id": "7072816c-9d43-41b7-9725-fe4cf0fa6775",
//             "createdDate": "2024-03-19T18:15:33",
//             "createdBy": "a6caaec4-7deb-4adf-b07a-4df6703d2d1c",
//             "lastModifiedDate": "2024-03-19T18:15:33",
//             "lastModifiedBy": "a6caaec4-7deb-4adf-b07a-4df6703d2d1c",
//             "isDeleted": false,
//             "orderID": "68860685",
//             "transId": null,
//             "date": "2024-03-19T18:15:33",
//             "total": 99000.0,
//             "userId": "a6caaec4-7deb-4adf-b07a-4df6703d2d1c",
//             "status": "Khởi tạo hoá đơn!"
//         }
//     ]
// }
export interface InvoiceResponses {
    id: string;
    createdDate: Date;
    createdBy: string;
    lastModifiedDate: Date;
    lastModifiedBy: string;
    isDeleted: boolean;
    order_id: string;
    trans_id?: string | null;
    date: Date;
    total: number;
    user_info_id: string;
    status: string;
}