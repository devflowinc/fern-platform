export interface PartialOrganziation {
    id: string;
    name: string;
}

export interface PartialUser {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
}

export const DummyUsers: PartialUser[] = [
    {
        id: "user-1",
        name: "John Doe",
        email: "john@doe.com",
    },
    {
        id: "user-2",
        name: "Jane Doe",
        email: "jane@doe.com",
        imageUrl:
            "data:image/jpeg;base64,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",
    },
    {
        id: "user-3",
        name: "Sam Doe",
        email: "sam@doe.com",
    },
];
