export interface CreateAnswerDto {
    text: string;
    password: string;
    files: string[];
    answerer_id: number;
    frequent: boolean;
}