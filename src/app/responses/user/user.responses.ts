// {
//     "status": 200,
//     "code": "USR_2005",
//     "message": "Get profile success!",
//     "data": {
//         "username": "anv",
//         "fullName": "Nguyễn Văn A",
//         "email": "anv@gmail.com",
//         "avatar": "",
//         "dayOfBirth": "2003-07-12",
//         "locked": false
//     }

import { RoleResponse } from "../role/role.response";

// }
export interface UserResponse {
    id: string;
    username: string;
    fullName: string;
    email: string;
    avatar: string;
    dayOfBirth: string;
    locked?: boolean;
    ROLE: RoleResponse[];
}