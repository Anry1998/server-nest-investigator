export declare enum TypeDocyment {
    RESOLUTION = "\u041F\u041E\u0421\u0422\u0410\u041D\u041E\u0412\u041B\u0415\u041D\u0418\u0415",
    PROTOCOL = "\u041F\u0420\u041E\u0422\u041E\u041A\u041E\u041B",
    REPORT = "\u0420\u0410\u041F\u041E\u0420\u0422",
    COVER_LETTER = "\u0421\u041E\u041F\u0420\u041E\u0412\u041E\u0414\u0418\u0422\u0415\u041B\u042C\u041D\u041E\u0415 \u041F\u0418\u0421\u042C\u041C\u041E",
    NOTIFICATION = "\u0423\u0412\u0415\u0414\u041E\u041C\u041B\u0415\u041D\u0418\u0415"
}
export declare class Document {
    id: number;
    createTime: Date;
    organId: number;
    formТumber: number;
    value: string;
    employee: number[];
}
